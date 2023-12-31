import React, { useContext, useEffect, useState } from 'react'
import { FormControl, Backdrop, CircularProgress, InputLabel, TextField, Select, MenuItem, Button } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import RPC from "../web3RPC";
import { web3AuthContext } from '../AuthContext';
import NfcAddWalletModal from '../components/NfcAddWalletModal';

const clientId =
  "BMrrbJU8DbyV7FKnGrvovVqozQOOvFpP3Dkab63myF4wL7gZdTynfQaDNGi9b0lIgMlAgnfjUu6kAGp7CBbtvjk"; // get from https://dashboard.web3auth.io

const Nfc = () => {
  const [tab, setTab] = useState(0)
  const [resetLimit, setResetLimit] = useState(0)
  const [receivingAmt, setAmt] = useState(0);
  const [walletBalance, setWalletBalance] = useState(99999);
  const [cardBalance, setCardBalance] = useState(99999);
  const [loadCard, setLoadCard] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [provider, setProvider] = useState(null);
  const [web3auth, setWeb3auth] = useState(null);
  const [address, setAddress] = useState(null);
  const [openModal, setOpenModal] = useState(false)


  useEffect(() => {

    if (cardBalance > 1 * 10 ** 8) {
      setLoadCard(false);
    }
  });

  const object = useContext(web3AuthContext);

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
        setWeb3auth(web3auth);
        await web3auth.initModal();
        console.log(web3auth.provider);
        setProvider(web3auth.provider);

        await getAccounts(web3auth.provider);
        await getBalance(web3auth.provider);
        await getAvailableBalance(web3auth.provider);
      } catch (error) {
        console.error(error);
      }
    };

    init();

    if (cardBalance > 1 * 10 ** 8) {
      setLoadCard(false);
    }
  }, []);

  const getAccounts = async (provider) => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    setAddress(address);
    console.log(address);
  };

  const getAvailableBalance = async (provider) => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const availableBalance = await rpc.getSpendingLimit();
    setCardBalance(availableBalance);

  }

  const getBalance = async (provider) => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getNfcBalance();
    setWalletBalance(balance);
    console.log(balance);
  };

  function showSuccess() {
    setSuccess(true);
    setTimeout(function () {
      console.log("Success");
      setSuccess(false)
    }, 2000);

  }

  async function resetSpendingLimit() {
    setLoading(true);
    if (!web3auth.provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider);
    const balance = await rpc.getNfcBalance(resetLimit, address);
    setCardBalance(balance);
    console.log(balance);
    await loadNFC();
    setLoading(false)
  }


  async function initWalletValue() {
    return null
  }

  function goToResetSpendingLimit() {
    setLoadCard(true)
  }

  async function loadNFC() {
    setLoading(true);
    await onWrite();
    setLoading(false);
    showSuccess();
  }


  const onWrite = async () => {
    try {
      const ndef = new window.NDEFReader();
      await ndef.scan();
      const response = await fetch(`https://ethindiasignerapi-production.up.railway.app/getsigninghash/${address}`);
      let paymentStatus = await response.json();
      console.log(paymentStatus["payHash"]);
      await ndef.write({ records: [{ recordType: "text", data: paymentStatus["payHash"] }] });
      // alert(`Value Saved!`);
    } catch (error) {
      alert(error);
    }
  };

  const onRead = async () => {
    setLoading(true);
    try {
      const ndef = new window.NDEFReader();
      await ndef.scan();

      console.log("Scan started successfully.");
      ndef.onreadingerror = () => {
        console.log("Cannot read data from the NFC tag. Try another one?");
        setLoading(false);
      };

      ndef.onreading = async event => {
        console.log("NDEF message read.");
        await onReading(event);
        setLoading(false);
        showSuccess();
      };

    } catch (error) {
      console.log(`Error! Scan failed to start: ${error}.`);
    };
  };

  const onReading = async ({ message }) => {
    for (const record of message.records) {
      switch (record.recordType) {
        case "text":
          const textDecoder = new TextDecoder(record.encoding);
          console.log(textDecoder)
          console.log(textDecoder.decode(record.data));
          await receiveNFC(textDecoder.decode(record.data));
          break;
        case "url":
          // TODO: Read URL record with record data.
          break;
        default:
        // TODO: Handle other records with record data.
      }
    }
  };

  async function receiveNFC(payHashStr) {
    try {
      const payHash = {
        "reciever": address,
        "amount": receivingAmt * 10 ** 8,
        "payHash": payHashStr
      };

      const response = await fetch(`https://ethindiasignerapi-production.up.railway.app/processpay`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(payHash), // body data type must match "Content-Type" header
      });
      console.log(response.json());
      const paymentStatus = await response.json();
      console.log(paymentStatus);
    }
    catch (error) {
      console.log(error);
    }
  }

  function addBalance() {
    console.log("ADD BALANCE")
  }

  const handleClose = () => {
    setOpenModal(false);
  }

  const showAddress = address?.slice(0, 10) + "..."

  return (
    <div>
      {loading ?
        <div className="flex flex-row gap-4">
          <Backdrop
            sx={{ color: '#fff', zIndex: 5, opacity: 1, visibility: "visible" }}
            open={{ loading }}
          >
            <CircularProgress color="inherit" />
            <p>Transaction in Progress</p>
          </Backdrop>
        </div> : null
      }
      {
        success ?
          <div className="flex flex-row gap-4">
            <Backdrop
              sx={{ color: '#fff', zIndex: 5, opacity: 1, visibility: "visible" }}
              open={{ loading }}
            >
              <DoneIcon color="inherit" />
              {
                tab === 0 ? <p>Money should reach your wallet</p>
                  : <p>Money is loaded in card</p>}
            </Backdrop>
          </div > : null
      }
      <div className=" rounded-md text-white bg-black mt-4 mx-2">
        <div className="p-4">
          {showAddress}
        </div>
        <hr />
        <div className="p-4 flex flex-col ">
          <p className='text-2xl'> ${walletBalance / 10 ** 8}</p>
          <p className=' text-gray-400 '>Current Balance</p>
          <p> <span className='text-gray-400'> Card Redeemable Balance </span> : ${cardBalance / 10 ** 8}</p>
          <button onClick={() => setOpenModal(true)} className='bg-white p-2 font-semibold mt-2 text-black rounded-sm'>
            Add to Nfc wallet
          </button>
        </div>
      </div>
      <div className=" pt-2 flex flex-col justify-center items-center">
        <div className=" bg-[#F1F5F9] inline mx-auto rounded-md mt-2 p-2">
          <button onClick={() => setTab(0)} className={`rounded-md p-2 ${tab === 0 ? 'bg-white  ' : ''}`}>Accept via NFC</button>
          <button onClick={() => setTab(1)} className={`rounded-md p-2 ${tab === 1 ? 'bg-white  ' : ''}`}>Spend via NFC</button>
        </div>
        {
          tab === 0 ?
            (<div className=" border rounded-sm mt-4 p-4">
              <p>Receive Amount To Accept Payment</p>
              <div className="flex flex-col gap-4 py-2 mt-4 w-full h-[200px]">
                <FormControl fullWidth>
                </FormControl>
                <FormControl fullWidth>
                  <TextField id="outlined-basic" value={receivingAmt} onChange={function (event) {
                    setAmt(event.target.value);
                  }} type='number' label="Receive Amountt" variant="outlined" />
                </FormControl>
                <Button onClick={onRead} className='bg-black p-2 font-semibold  text-white rounded-sm' variant="contained">Wave and Accept</Button>
              </div>
            </div>)
            : (
              <div>

                <div className=" border rounded-sm mt-4 p-4">
                  {
                    (loadCard) ? (
                      <div>
                        <p>Your balance is too low, You need to add balance from card</p>
                        <div className="flex flex-col gap-4 pt-2 mt-4 w-full h-[120px]">
                          <FormControl fullWidth>
                            <TextField id="outlined-basic" value={resetLimit} onChange={function (event) {
                              setResetLimit(event.target.value);
                            }} type='number' label="Add Amount to Spendable Limit" variant="outlined" />
                          </FormControl>
                          <Button onClick={resetSpendingLimit} variant="contained">Add Balance</Button>
                        </div>
                      </div>) : (<div>
                        <p>Your current spendable limit is {cardBalance / 10 ** 8}</p>
                        <div className="flex flex-col gap-4 pt-2 mt-4 w-full h-[120px]">
                          <Button onClick={loadNFC} variant="contained">Load Balance to Card</Button>
                          <Button onClick={goToResetSpendingLimit} variant="contained">Reset Spending Limit</Button>
                        </div>
                      </div>)}
                </div>

              </div>
            )
        }
      </div>
      <NfcAddWalletModal openModal={openModal} handleClose={handleClose} />
    </div >
  )
}

export default Nfc