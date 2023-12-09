import React, { useState } from 'react'
import { FormControl, Backdrop, CircularProgress, InputLabel, TextField, Select, MenuItem, Button } from '@mui/material'


const Nfc = () => {
  const [tab, setTab] = useState(0)
  const [receivingAmt, setAmt] = useState(0);
  const [loading, setLoading] = useState(false);
  const tempWalletAdd = "0x24115509B5D3D12cdA1Ee1391975478a567E70Ec";
  const receiverWallet = "0x5B0Dcb05eD89f6124A5e3D5C0A25C4ABBe3B7325";

  async function loadNFC() {
    setLoading(true);
    const response = await fetch(`https://ethindiasignerapi-production.up.railway.app/getsigninghash/${tempWalletAdd}`);
    let paymentStatus = await response.json();
    console.log(paymentStatus["payHash"]);
    await onWrite(paymentStatus["payHash"]);
    setLoading(false);
  }


  const onWrite = async (message) => {
    try {
      const ndef = new window.NDEFReader();
      await ndef.scan();
      await ndef.write({ records: [{ recordType: "text", data: message }] });
      alert(`Value Saved!`);
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
      };

    } catch (error) {
      console.log(`Error! Scan failed to start: ${error}.`);
    };
    setLoading(false);
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
        "reciever": receiverWallet,
        "amount": receivingAmt * 10e8,
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

  return (
    <div>
      {loading ?
        <Backdrop
          sx={{ color: '#fff', zIndex: 5, opacity: 1, visibility: "visible" }}
          open={{ loading }}
        >
          <CircularProgress color="inherit" />
        </Backdrop> : null
      }
      <div className=" rounded-md text-white bg-black">
        <div className="p-2">
          fdsf
        </div>
        <hr />
        <div className="p-2 flex flex-col ">
          <p>$24</p>
          <p>Current Balance</p>
          <p>Current Balance:
            Current Balance</p>
        </div>
      </div>
      <div className=" pt-2">
        <div className=" bg-slate-400  mx-auto mt-2 p-2">
          <button onClick={() => setTab(0)} className={`${tab === 0 ? 'bg-white rounded-sm p-2' : ''}`}>Spend via NFC</button>
          <button onClick={() => setTab(1)} className={`${tab === 1 ? 'bg-white rounded-sm p-2' : ''}`}>Accept via NFC</button>
        </div>
        {
          tab === 0 ?
            (
              <div className=" border rounded-sm mt-4 p-4">
                <p>Make changes to your account here. Click save when you're done.</p>
                <div className="flex flex-col gap-4 pt-2 mt-4 w-full h-[120px]">
                  <FormControl fullWidth>
                    <TextField id="outlined-basic" type='number' label="Send Amount" variant="outlined" />
                  </FormControl>
                  <Button onClick={loadNFC} variant="contained">Load Card</Button>
                </div>
              </div>
            )
            : (<div className=" border rounded-sm mt-4 p-4">
              <p>Make changes to your account here. Click save when you're done.</p>
              <div className="flex flex-col gap-4 pt-2 mt-4 w-full h-[200px]">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Chain</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={chain}
                    label="Chain"
                  // onChange={handleChange}
                  >
                    <MenuItem value={10}>Polygon</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <TextField id="outlined-basic" value={receivingAmt} onChange={function (event: React.ChangeEvent<HTMLInputElement>) {
                    setAmt(event.target.value);
                  }} type='number' label="Receive Amount" variant="outlined" />
                </FormControl>
                <Button onClick={onRead} variant="contained">Receive Amount</Button>
              </div>
            </div>)
        }
      </div>
    </div >
  )
}

export default Nfc