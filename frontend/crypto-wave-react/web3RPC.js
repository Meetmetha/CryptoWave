import Web3 from "web3";
import { bondsAbi, erc20Abi } from "./abi/abi";
import { Biconomy } from "@biconomy/mexa";
import { nfcAbi } from "./abi/nfcAbi";

export default class RPC {
  constructor(provider) {
    this.provider = provider;
  }

  async getChainId() {
    try {
      const web3 = new Web3(this.provider);

      // Get the connected Chain's ID
      const chainId = await web3.eth.getChainId();

      return chainId.toString();
    } catch (error) {
      return error;
    }
  }

  async getAccounts() {
    try {
      const web3 = new Web3(this.provider);

      // Get user's Ethereum public address
      const address = (await web3.eth.getAccounts())[0];

      return address;
    } catch (error) {
      return error;
    }
  }
  async getBalance() {
    try {
      const web3 = new Web3(this.provider);

      // Get user's Ethereum public address
      const address = (await web3.eth.getAccounts())[0];

      // Get user's balance in ether
      const balance = web3.utils.fromWei(
        await web3.eth.getBalance(address) // Balance is in wei
      );

      return balance;
    } catch (error) {
      return error;
    }
  }


  async getNfcBalance() {
    try {
      const web3 = new Web3(this.provider);
      const web31 = new Web3("https://goerli.base.org");
      const address = (await web3.eth.getAccounts())[0];
      console.log(address);
      var contract = new web31.eth.Contract(nfcAbi, "0x5013d127469B5088E4B4576b51C7D6303ADa9D20");
      const balance = await contract.methods.balanceOf(address).call();
      console.log(balance);
      return balance;

    } catch (error) {
      return error;
    }
  }

  async getSpendingLimit() {
    try {
      const web3 = new Web3(this.provider);
      const web31 = new Web3("https://goerli.base.org");
      const address = (await web3.eth.getAccounts())[0];
      console.log(address);
      var contract = new web31.eth.Contract(nfcAbi, "0x5013d127469B5088E4B4576b51C7D6303ADa9D20");
      const spendLimit = await contract.methods.getSpendlimit(address).call();
      console.log(spendLimit);
      const spendLimitUsed = await contract.methods.getSpendlimitUsed(address).call();
        return spendLimit - spendLimitUsed

    } catch (error) {
      return error;
    }
  }


  async sendTransaction() {
    try {
      const web3 = new Web3(this.provider);

      // Get user's Ethereum public address
      const fromAddress = (await web3.eth.getAccounts())[0];

      const destination = fromAddress;
      console.log(this.provider);
      const amount = web3.utils.toWei("0.001"); // Convert 1 ether to wei
      // Submit transaction to the blockchain and wait for it to be mined
      const receipt = await web3.eth.sendTransaction({
        from: fromAddress,
        to: destination,
        value: amount,
        maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
        maxFeePerGas: "6000000000000", // Max fee per gas
      });

      return receipt;
    } catch (error) {
      return error;
    }
  }


  async approve(tokenAddress, amount, decimal, bondsContractAddress) {
    const web3 = new Web3(this.provider);
    const transformedAmount = amount * 10 ** decimal
    const fromAddress = (await web3.eth.getAccounts())[0];

    var contract = new web3.eth.Contract(erc20Abi, tokenAddress);
    try {
      const transaction = await contract.methods.approve(
        bondsContractAddress,
        transformedAmount)
      const data = transaction.encodeABI();
      console.log(data);
      const receipt = await web3.eth.sendTransaction({
        from: fromAddress,
        to: tokenAddress,
        value: 0,
        data: data,
        maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
        maxFeePerGas: "6000000000000", // Max fee per gas
      });
      return receipt
    } catch (error) {
      return error
    }
  }

  async hasApproval(tokenAddress, amount, decimal, bondsContractAddress) {

    const web3 = new Web3(this.provider);
    const transformedAmount = amount * 10 ** decimal
    const fromAddress = (await web3.eth.getAccounts())[0];

    var contract = new web3.eth.Contract(erc20Abi, tokenAddress);
    try {
      const allowance = await contract.methods.allowance(fromAddress, bondsContractAddress).call()
      if (allowance >= transformedAmount) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return error
    }
  }

  async createBond(tokenAddress, amount, decimal, hash, bondsContractAddress) {
    const contractabi = bondsAbi;
    const web3 = new Web3(this.provider);
    const transformedAmount = amount * 10 ** decimal;
    var contract = new web3.eth.Contract(contractabi, bondsContractAddress);
    try {
      const transaction = contract.methods.createBond(
        tokenAddress,
        transformedAmount,
        hash
      );

      console.log(typeof tokenAddress, tokenAddress);
      console.log(typeof transformedAmount, transformedAmount);
      console.log(typeof hash, hash);

      const data = transaction.encodeABI();

      const fromAddress = (await web3.eth.getAccounts())[0];

      const receipt = await web3.eth.sendTransaction({
        from: fromAddress,
        to: bondsContractAddress,
        value: 0,
        data: data,
      });

      return receipt;
    } catch (error) {
      console.log(error);
    }
  }

  async redeemGaslessBond(tokenId, secret, bondsContractAddress) {
    try {
      // console.log(tokenId);
      // const biconomy = new Biconomy(this.provider, {
      //   apiKey: "l_FudXjpA.ceb6719d-57b2-4f0a-88ce-1fdeec3217a4",
      //   debug: true,
      //   contractAddresses: [bondsContractAddress],
      // });
      // await biconomy.init();
      const web3 = new Web3(this.provider);
      var contractInstance = new web3.eth.Contract(bondsAbi, bondsContractAddress);
      // const contractInstance = new web3.Contract(
      //   bondsContractAddress,
      //   bondsAbi,
      //   biconomy.ethersProvider
      // );
      const transaction = await contractInstance.methods.redeemBond(
        tokenId,
        secret
      );
      let data = transaction.encodeABI();
      const address = await this.getAccounts()
      const receipt = await web3.eth.sendTransaction({
        from: address,
        to: bondsContractAddress,
        value: 0,
        data: data,
      });
      console.log(receipt);
    } catch (error) { }
  }

  async sendContractTransaction() {
    try {
      let tokenConstant;

      tokenConstant = {
        abi: [
          {
            inputs: [
              {
                internalType: "string",
                name: "name_",
                type: "string",
              },
              {
                internalType: "string",
                name: "symbol_",
                type: "string",
              },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "Approval",
            type: "event",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            name: "approve",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            name: "burn",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            name: "burnFrom",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "subtractedValue",
                type: "uint256",
              },
            ],
            name: "decreaseAllowance",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "addedValue",
                type: "uint256",
              },
            ],
            name: "increaseAllowance",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
              },
            ],
            name: "Paused",
            type: "event",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "recipient",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            name: "transfer",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "Transfer",
            type: "event",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "sender",
                type: "address",
              },
              {
                internalType: "address",
                name: "recipient",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            name: "transferFrom",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
              },
            ],
            name: "Unpaused",
            type: "event",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
            ],
            name: "allowance",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
            ],
            name: "balanceOf",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "decimals",
            outputs: [
              {
                internalType: "uint8",
                name: "",
                type: "uint8",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "name",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "paused",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "symbol",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "totalSupply",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
        ],
      };

      const web3 = new Web3(this.provider);

      var tokenContract = new web3.eth.Contract(
        tokenConstant.abi,
        "0x07920F6d18464E56Da438D1ffF38f125C8AB90dD"
      );

      // Get user's Ethereum public address
      const fromAddress = (await web3.eth.getAccounts())[0];

      //dsdf
      const response = await tokenContract.methods
        .approve(
          "0xd1d25EAc33401b97568869564ee4ba6e259DCB35",
          "100000000000000000000000000"
        )
        .send(
          {
            from: fromAddress,
          },
          function (error, transactionHash) {
            if (transactionHash) {
              console.log(transactionHash);

              // setApproveCase(3);
            } else {
              console.log(error);
            }
          }
        )
        .on("receipt", async function (receipt) {
          console.log(receipt);
        })
        .on("error", async function (error) {
          console.log(error);
        });
      // Submit transaction to the blockchain and wait for it to be mined
      //   const receipt = await web3.eth.sendTransaction({
      //     from: fromAddress,
      //     to: destination,
      //     value: amount,
      //     maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
      //     maxFeePerGas: "6000000000000", // Max fee per gas
      //   });

      return response;
    } catch (error) {
      return error;
    }
  }

  async getPrivateKey() {
    try {
      const privateKey = await this.provider.request({
        method: "eth_private_key",
      });

      return privateKey;
    } catch (error) {
      return error;
    }
  }
}
