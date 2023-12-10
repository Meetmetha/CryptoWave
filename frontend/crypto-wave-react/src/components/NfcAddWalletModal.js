import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { dropDownOptions } from '../utils/utils';
import { web3AuthContext } from '../AuthContext';
import RPC from '../web3RPC';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



const NfcAddWalletModal = ({ openModal, handleClose }) => {

    const [chain, setChain] = useState("5")
    const [token, setToken] = useState("0x67BFa3C931d3e6C73BFBEA2C87257B4C36839875")
    const [amount, setAmount] = useState(100)
    const context = useContext(web3AuthContext)


    const getChainId = async () => {
        if (!context.web3Auth.provider) {
            toast("provider not initialized yet");
            return;
        }
        const rpc = new RPC(context.web3Auth.provider);
        const chainId = await rpc.getChainId();
        console.log(chainId);
        return chainId
    };

    const hasApproval = async (tkad, amt, dec) => {
        const rpc = new RPC(context.web3Auth.provider);
        const hasApproval = await rpc.hasApproval(tkad, amt, dec, dropDownOptions.find(item => item.chainId === chain).bondsContractAddress);
        return hasApproval
    }

    const handleApprove = async () => {
        const currentChainId = await getChainId()
        console.log(currentChainId);
        if (currentChainId !== chain) {
            // const chainItem = dropDownOptions.find((item) => item.chainId === chain);
            toast(`please switch to the ${dropDownOptions.find(
                (item) => item.chainId === chain
            ).name} network
             in your wallet`);
            return;
        }

        const rpc = new RPC(context.web3Auth.provider);
        const tx = await rpc.approve(token, amount,
            dropDownOptions.find(item => item.chainId === chain)?.tokens.find(item => item.address === token)?.decimal,
            dropDownOptions.find(item => item.chainId === chain)?.bondsContractAddress);
        console.log(tx);
        toast("transaction sent");
        toast("token Approved");
    }

    const handleSubmit = async () => {
        const currentChainId = await getChainId()
        console.log(currentChainId);
        if (currentChainId !== chain) {
            // const chainItem = dropDownOptions.find((item) => item.chainId === chain);
            toast(`please switch to the ${dropDownOptions.find(
                (item) => item.chainId === chain
            )?.name} network
             in your wallet`);
            return;
        }

        hasApproval(token, amount, dropDownOptions.find(item => item.chainId === chain)?.tokens.find(item => item.address === token)?.decimal).then
            (async (res) => {

                if (res) {
                    toast("has approval");
                } else {
                    toast("no approval: intializing approval process");
                    await handleApprove()
                    
                }
            }
            )
    }

    const handleChange = (event) => {
        setChain(event.target.value);
    }

    const handleTokenChange = (event) => {
        setToken(event.target.value);
    }

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    }
    return (
        <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Chain</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={chain}
                        label="Chain"
                        onChange={handleChange}
                    >
                        {
                            dropDownOptions.map((item, index) => (
                                <MenuItem key={index} value={item.chainId}>{item.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth className='mt-4'>
                    <InputLabel id="demo-simple-select-label">Select Token</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={token}
                        label="Select token"
                        onChange={handleTokenChange}
                    >
                        {
                            dropDownOptions.find(item => item.chainId === chain)?.tokens.map((item, index) => (
                                <MenuItem key={index} value={item.address}>{item.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth className='mt-4'>
                    <TextField id="outlined-basic" value={amount} onChange={handleAmountChange} label="Enter Amount" variant="outlined" />
                </FormControl>
                
                <FormControl fullWidth className='mt-4'>
                <Button onClick={handleSubmit} variant="contained">Load contract</Button>
                </FormControl>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Add funds to your NFC wallet
                </Typography>
            </Box>
        </Modal>
    )
}

export default NfcAddWalletModal