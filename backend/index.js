const express = require('express');
const web3 = require('web3');
var bodyParser = require('body-parser')
const axios = require('axios');
var cors = require('cors')
const { NFTStorage, File, Blob } = require('nft.storage')
const NFT_STORAGE_TOKEN = process.env.NFT_STORAGE_TOKEN;
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })
const NFCABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getUserHash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getUserdata",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
  {
		"inputs": [
			{
				"internalType": "address",
				"name": "payFrom",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "payTo",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "processPay",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
		  {
			"name": "_owner",
			"type": "address"
		  }
		],
		"name": "balanceOf",
		"outputs": [
		  {
			"name": "balance",
			"type": "uint256"
		  }
		],
		"payable": false,
		"type": "function"
	  },
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_spenderAddress",
				"type": "address"
			}
		],
		"name": "getSpendlimit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_spenderAddress",
				"type": "address"
			}
		],
		"name": "getSpendlimitUsed",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}

]
var utils = require('ethereumjs-util');
require("dotenv").config();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
let web3Instance = new web3('https://goerli.base.org');
const NFCWALLETCONTRACTADDRESS = process.env.NFCWALLETCONTRACTADDRESS;
const privateKeyAdmin = process.env.privateKeyAdmin;
const publicKeyAdmin = process.env.publicKeyAdmin;
let contract = new web3Instance.eth.Contract(NFCABI, NFCWALLETCONTRACTADDRESS);

app.get('/getsigninghash/:address', async (req, res) => {
  let spender = req.params.address;
  if (!web3.utils.isAddress(spender)) {
    res.status(400).json({ message:'User address is not an EVM compatible address' });
    return;
  }
  spender = web3Instance.utils.toChecksumAddress(spender);
  const userHashdata = await contract.methods.getUserHash(spender).call();
  const signature = await signMessage(userHashdata);
  const content = new Blob([JSON.stringify({spender:spender,paymenthash:signature.signature})]);
  const ipfsHash = await client.storeBlob(content)
  res.status(200).json({payHash:ipfsHash});
});

app.post('/processpay', async (req, res) => {
	console.log(req.body);
	const ipfsHash = req.body.payHash
	try{
		const status = await client.check(ipfsHash);
	}
	catch{
		res.status(400).json({ message:'payHash Invalid' });
		return
	}
	const fetchHashDataURL = `https://${ipfsHash}.ipfs.nftstorage.link`
	const fetchedHashData = await axios.get(fetchHashDataURL);
  const paymenthash = fetchedHashData.data.paymenthash;
  const spender = fetchedHashData.data.spender;
  const reciever = req.body.reciever;
  const amount = req.body.amount;
  if (!web3.utils.isAddress(spender)) {
    res.status(400).json({ message:'spender is not an EVM compatible address' });
    return;
  }
  if (!web3.utils.isAddress(reciever)) {
    res.status(400).json({ message:'reciever is not an EVM compatible address' });
    return;
  }
  if(amount <= 1e6){
    res.status(400).json({ message:'Amount is less than 0.01$' });
    return;
  }
  const userHashdata = await contract.methods.getUserHash(spender).call();
  try{
    let address = await getSignerAddress(userHashdata,paymenthash);
  }catch{
    res.status(400).json({ message:"Error Decoding PaymentHash"});
    return
  }
  const signeraddress = await getSignerAddress(userHashdata,paymenthash);
  if(web3Instance.utils.toChecksumAddress(signeraddress) != web3Instance.utils.toChecksumAddress(publicKeyAdmin)){
    res.status(400).json({ message:"Moye Moye, You are wrong signer"});
    return
  }
  const spendLimitSet = await contract.methods.getSpendlimit(spender);
  const spendLimitUsed = await contract.methods.getSpendlimitUsed(spender);
  if(amount > (spendLimitSet - spendLimitUsed)){
    res.status(400).json({ message:"SpendLimit Exceeded"});
    return
  }
  const spenderBalanceOnChain = await contract.methods.balanceOf(spender);
  if(amount > spenderBalanceOnChain){
    res.status(400).json({ message:"Spender don't have enough balance please load NFC pay"});
    return
  }
  res.status(200).json({ message:"Payment Success"});
  const transaction = contract.methods.processPay(spender,reciever,amount);
  const options = {
  to      : NFCWALLETCONTRACTADDRESS,
  data    : transaction.encodeABI(),
  gas     : 100000,
  gasPrice: await web3Instance.eth.getGasPrice()};  
  const signed  = await web3Instance.eth.accounts.signTransaction(options, privateKeyAdmin);
  const txHash = await web3Instance.eth.sendSignedTransaction(signed.rawTransaction);
  return
});

const signMessage = async function(datatosign){
    const sign = await web3Instance.eth.accounts.sign(datatosign, privateKeyAdmin);
    return sign;
}
const getSignerAddress = async function(userHash,paymenthash){
  const addr = await web3Instance.eth.accounts.recover(userHash,paymenthash);
  return addr;
}

app.listen(process.env.PORT, () => {
  console.log('Server listening on port 3000');
});