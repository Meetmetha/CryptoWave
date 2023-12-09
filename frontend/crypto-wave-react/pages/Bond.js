import React, { useState, useContext, useEffect } from 'react'
import { web3AuthContext } from '../AuthContext'
import LoggedInLayout from './LoggedInLayout'
import createKeccakHash from 'keccak'
import { CHAIN_NAMESPACES } from "@web3auth/base";

import { Button, Card, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { toast } from 'react-toastify'
import RPC from '../web3RPC'
import { Web3Auth } from '@web3auth/modal';

const Bond = () => {
    const [tab, setTab] = useState(0)
    const [chain, setChain] = useState("11155111")
    const [redeemChain, setRedeemChain] = useState("11155111")
    const [redeemSecret, setRedeemSecret] = useState("")
    const [bondId, setBondId] = useState('')
    const [token, setToken] = useState("0x1234567890")
    const [redeemToken, setRedeemToken] = useState("0x1234567890")
    const [hasTransactionApproval, setHasTransactionApproval] = useState(true)
    const [amount, setAmount] = useState(100)
    const [secret, setSecret] = useState("")
    const context = useContext(web3AuthContext)
    const dropDownOptions = [
        {
            name: "Goerli",
            chainId: "5",
            bondsContractAddress: '0x5013d127469B5088E4B4576b51C7D6303ADa9D20',
            tokens: [
                {
                    name: "DAI",
                    address: "0x8E89aB6F92B0Cdf99be9FFcee448df8198F8EaE7",
                    decimal: 18
                },
                {
                    name: "USDC",
                    address: "0x67BFa3C931d3e6C73BFBEA2C87257B4C36839875",
                    decimal: 8
                },
                {
                    name: "Link",
                    address: "0xb598418856fcF1b865D2fc8d82e22Dfb9a8fCE5a",
                    decimal: 18
                },
            ]
        },
    ]

    const clientId =
        "BMrrbJU8DbyV7FKnGrvovVqozQOOvFpP3Dkab63myF4wL7gZdTynfQaDNGi9b0lIgMlAgnfjUu6kAGp7CBbtvjk"; // get from https://dashboard.web3auth.io

    useEffect(() => {
        const init = async () => {
            try {
                const web3auth = new Web3Auth({
                    clientId,
                    chainConfig: {
                        chainNamespace: CHAIN_NAMESPACES.EIP155,
                        chainId: "0x5",
                        rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
                    }
                });
                context.setWeb3Auth(web3auth);
                // setWeb3Auth(web3auth)
                await web3auth.initModal();

                if (!web3auth.connected) {
                    console.log("not connected");
                }
            } catch (error) {
                console.error(error);
            }
        };

        init();
    }, []);

    const handleRedeemChainChange = (event) => {
        setRedeemChain(event.target.value);
    }
    
    const handleRedeemTokenChange = (event) => {
        setRedeemToken(event.target.value);
    }

    const handleRedeemSecret = (event) => {
        setRedeemSecret(event.target.value);
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

    const handleSecretChange = (event) => {
        setSecret(event.target.value);
    }

    const hasApproval = async (tkad, amt, dec) => {
        const rpc = new RPC(context.web3Auth.provider);
        const hasApproval = await rpc.hasApproval(tkad, amt, dec, dropDownOptions.find(item => item.chainId === chain).bondsContractAddress);
        return hasApproval
    }

    const handleCreateBond = async (tokenAddress, amount, decimal, hash, bondsContractAddress) => {
        const rpc = new RPC(context.web3Auth.provider);
        const tx = await rpc.createBond(tokenAddress, amount, decimal, hash, bondsContractAddress);
        console.log(tx);
        toast("transaction sent");
        toast("Bond created");
    }

    const handleRedeemBond = async () => {
        const rpc = new RPC(context.web3Auth.provider);
        const tx = await rpc.redeemGaslessBond(bondId, redeemSecret, dropDownOptions.find(item => item.chainId === redeemChain)?.bondsContractAddress);
        console.log(redeemSecret);
        console.log(tx);
        toast("transaction sent");
        toast("Bond redeemed");
    }

    const handleRedeemSubmit = async () => {
        const currentChainId = await getChainId()
        console.log(currentChainId);
        if (currentChainId !== redeemChain) {
            // const chainItem = dropDownOptions.find((item) => item.chainId === redeemChain);
            toast(`please switch to the ${dropDownOptions.find(
                (item) => item.chainId === redeemChain
            )?.name} network
             in your wallet`);
            return;
        }
        await handleRedeemBond()
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

        //convert secret to hex

        let secretHash = createKeccakHash('keccak256').update(secret).digest('hex')
        secretHash = '0x' + secretHash
        console.log(secretHash);
        hasApproval(token, amount, dropDownOptions.find(item => item.chainId === chain)?.tokens.find(item => item.address === token)?.decimal).then
            (async (res) => {

                if (res) {
                    setHasTransactionApproval(true)
                    toast("has approval");
                    handleCreateBond(token, amount, dropDownOptions.find(item => item.chainId === chain)?.tokens.find(item => item.address === token)?.decimal, secretHash, dropDownOptions.find(item => item.chainId === chain)?.bondsContractAddress)
                } else {
                    toast("no approval: intializing approval process");
                    await handleApprove()
                    handleCreateBond(token, amount, dropDownOptions.find(item => item.chainId === chain)?.tokens.find(item => item.address === token)?.decimal, secretHash, dropDownOptions.find(item => item.chainId === chain)?.bondsContractAddress)
                }
            }
            )
    }


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
        setHasTransactionApproval(true)
    }

    return (
        <LoggedInLayout>
            <div className=" bg-slate-400  mx-auto mt-2 p-2">
                <button onClick={() => setTab(0)} className={`${tab === 0 ? 'bg-white rounded-sm p-2' : ''}`}>Create bond</button>
                <button onClick={() => setTab(1)} className={`${tab === 1 ? 'bg-white rounded-sm p-2' : ''}`}>Redeem bond</button>
            </div>
            <div className=" border p-4 m-2">
                <p
                    className=' text-[#64748B]'
                >Make changes to your account here. Click save when you're done.</p>
                {
                    tab === 0 ?
                        (
                            <div className=" flex flex-col gap-4 pt-2">
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
                                <FormControl fullWidth>
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
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select amount</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={amount}
                                        label="Select token"
                                        onChange={handleAmountChange}
                                    >
                                        <MenuItem value={100}>$100</MenuItem>
                                        <MenuItem value={200}>$200</MenuItem>
                                        <MenuItem value={300}>$300</MenuItem>
                                        <MenuItem value={400}>$400</MenuItem>
                                        <MenuItem value={500}>$500</MenuItem>
                                    </Select>
                                    <p>Min Amount : $100 </p>
                                </FormControl>
                                <FormControl fullWidth>
                                    <TextField id="outlined-basic" value={secret} onChange={handleSecretChange} label="Enter key" variant="outlined" />
                                </FormControl>

                                <FormControl fullWidth>
                                    <button onClick={handleSubmit} variant="contained">Load contract</button>

                                </FormControl>
                            </div>
                        ) :
                        (
                            <div className=" flex flex-col gap-4 pt-2">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Chain</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={redeemChain}
                                        defaultValue={redeemChain}
                                        placeholder='Select chain'
                                        label="Chain"
                                        onChange={handleRedeemChainChange}
                                    >
                                        {
                                            dropDownOptions.map((item, index) => (
                                                <MenuItem key={index} value={item.chainId}>{item.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Token</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simpmle-select"
                                        value={redeemToken}
                                        label="Select token"
                                        onChange={handleRedeemTokenChange}
                                    >
                                        {
                                            dropDownOptions.find(item => item.chainId === redeemChain)?.tokens.map((item, index) => (
                                                <MenuItem key={index} value={item.address}>{item.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <TextField id="outlined-basic" value={redeemSecret}
                                    onChange={handleRedeemSecret} label="Enter key" variant="outlined" />
                                </FormControl>
                                <FormControl fullWidth>
                                    <TextField id="outlined-basic" value={bondId}
                                    onChange={(event)=>setBondId(event.target.value)} label="Enter bond id" variant="outlined" />
                                </FormControl>
                                <FormControl fullWidth>
                                    <Button onClick={handleRedeemSubmit} variant="contained">Sign to redeem</Button>
                                </FormControl>
                            </div>
                        )
                }
                <div className=" pt-4">
                    <h2 className=' text-lg font-bold'>Active bonds</h2>
                    <div className="pt-2 flex flex-col gap-2">
                        <Card className='p-2' variant="outlined">
                            <p>
                                <b>4.5 DAI </b>
                                $34.67
                            </p>
                            <p>Polygon</p>
                        </Card>
                        <Card className='p-2' variant="outlined">
                            <p>
                                <b>4.5 DAI </b>
                                $34.67
                            </p>
                            <p>Polygon</p>
                        </Card>
                        <Card className='p-2' variant="outlined">
                            <p>
                                <b>4.5 DAI </b>
                                $34.67
                            </p>
                            <p>Polygon</p>
                        </Card>
                        <Card className='p-2' variant="outlined">
                            <p>
                                <b>4.5 DAI </b>
                                $34.67
                            </p>
                            <p>Polygon</p>
                        </Card>
                    </div>
                </div>
            </div>

        </LoggedInLayout>
    )
}

export default Bond