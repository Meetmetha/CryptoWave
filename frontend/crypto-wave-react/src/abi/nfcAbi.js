export const nfcAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_lzEndpoint",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "router",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "router",
				"type": "address"
			}
		],
		"name": "InvalidRouter",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint16",
				"name": "_srcChainId",
				"type": "uint16"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "_srcAddress",
				"type": "bytes"
			},
			{
				"indexed": false,
				"internalType": "uint64",
				"name": "_nonce",
				"type": "uint64"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "_payload",
				"type": "bytes"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "_reason",
				"type": "bytes"
			}
		],
		"name": "MessageFailed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "messageId",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "uint64",
				"name": "sourceChainSelector",
				"type": "uint64"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "depositor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "MessageReceived",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint16",
				"name": "sourceChainSelector",
				"type": "uint16"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "depositor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "MessageReceivedbyLZ",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint16",
				"name": "_srcChainId",
				"type": "uint16"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "_srcAddress",
				"type": "bytes"
			},
			{
				"indexed": false,
				"internalType": "uint64",
				"name": "_nonce",
				"type": "uint64"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "_payloadHash",
				"type": "bytes32"
			}
		],
		"name": "RetryMessageSuccess",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint16",
				"name": "_dstChainId",
				"type": "uint16"
			},
			{
				"indexed": false,
				"internalType": "uint16",
				"name": "_type",
				"type": "uint16"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_minDstGas",
				"type": "uint256"
			}
		],
		"name": "SetMinDstGas",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "precrime",
				"type": "address"
			}
		],
		"name": "SetPrecrime",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint16",
				"name": "_remoteChainId",
				"type": "uint16"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "_path",
				"type": "bytes"
			}
		],
		"name": "SetTrustedRemote",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint16",
				"name": "_remoteChainId",
				"type": "uint16"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "_remoteAddress",
				"type": "bytes"
			}
		],
		"name": "SetTrustedRemoteAddress",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "depositFor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "depositor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint64",
				"name": "chainID",
				"type": "uint64"
			}
		],
		"name": "depositCrosschain",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "payFrom",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "payTo",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "paymentSuccess",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [],
		"name": "DEFAULT_PAYLOAD_SIZE_LIMIT",
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
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "allowed",
				"type": "bool"
			}
		],
		"name": "allowlistSender",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "_sourceChainSelector",
				"type": "uint64"
			},
			{
				"internalType": "bool",
				"name": "allowed",
				"type": "bool"
			}
		],
		"name": "allowlistSourceChain",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "allowlistedSenders",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"name": "allowlistedSourceChains",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
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
				"components": [
					{
						"internalType": "bytes32",
						"name": "messageId",
						"type": "bytes32"
					},
					{
						"internalType": "uint64",
						"name": "sourceChainSelector",
						"type": "uint64"
					},
					{
						"internalType": "bytes",
						"name": "sender",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "token",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "amount",
								"type": "uint256"
							}
						],
						"internalType": "struct Client.EVMTokenAmount[]",
						"name": "destTokenAmounts",
						"type": "tuple[]"
					}
				],
				"internalType": "struct Client.Any2EVMMessage",
				"name": "message",
				"type": "tuple"
			}
		],
		"name": "ccipReceive",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endpoint",
		"outputs": [
			{
				"internalType": "contract ILayerZeroEndpoint",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			},
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"name": "failedMessages",
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
				"internalType": "uint16",
				"name": "_srcChainId",
				"type": "uint16"
			},
			{
				"internalType": "bytes",
				"name": "_srcAddress",
				"type": "bytes"
			}
		],
		"name": "forceResumeReceive",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "_version",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "_chainId",
				"type": "uint16"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_configType",
				"type": "uint256"
			}
		],
		"name": "getConfig",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRouter",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
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
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "_remoteChainId",
				"type": "uint16"
			}
		],
		"name": "getTrustedRemoteAddress",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
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
				"internalType": "uint16",
				"name": "_srcChainId",
				"type": "uint16"
			},
			{
				"internalType": "bytes",
				"name": "_srcAddress",
				"type": "bytes"
			}
		],
		"name": "isTrustedRemote",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lzEndpoint",
		"outputs": [
			{
				"internalType": "contract ILayerZeroEndpoint",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "_srcChainId",
				"type": "uint16"
			},
			{
				"internalType": "bytes",
				"name": "_srcAddress",
				"type": "bytes"
			},
			{
				"internalType": "uint64",
				"name": "_nonce",
				"type": "uint64"
			},
			{
				"internalType": "bytes",
				"name": "_payload",
				"type": "bytes"
			}
		],
		"name": "lzReceive",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			}
		],
		"name": "minDstGasLookup",
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
				"internalType": "uint16",
				"name": "_srcChainId",
				"type": "uint16"
			},
			{
				"internalType": "bytes",
				"name": "_srcAddress",
				"type": "bytes"
			},
			{
				"internalType": "uint64",
				"name": "_nonce",
				"type": "uint64"
			},
			{
				"internalType": "bytes",
				"name": "_payload",
				"type": "bytes"
			}
		],
		"name": "nonblockingLzReceive",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			}
		],
		"name": "payloadSizeLimitLookup",
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
		"inputs": [],
		"name": "precrime",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
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
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_spendlimit",
				"type": "uint256"
			}
		],
		"name": "resetSpendLimit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "_srcChainId",
				"type": "uint16"
			},
			{
				"internalType": "bytes",
				"name": "_srcAddress",
				"type": "bytes"
			},
			{
				"internalType": "uint64",
				"name": "_nonce",
				"type": "uint64"
			},
			{
				"internalType": "bytes",
				"name": "_payload",
				"type": "bytes"
			}
		],
		"name": "retryMessage",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			}
		],
		"name": "setAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "_version",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "_chainId",
				"type": "uint16"
			},
			{
				"internalType": "uint256",
				"name": "_configType",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_config",
				"type": "bytes"
			}
		],
		"name": "setConfig",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "setCustomBalanceForUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "_dstChainId",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "_packetType",
				"type": "uint16"
			},
			{
				"internalType": "uint256",
				"name": "_minGas",
				"type": "uint256"
			}
		],
		"name": "setMinDstGas",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "_dstChainId",
				"type": "uint16"
			},
			{
				"internalType": "uint256",
				"name": "_size",
				"type": "uint256"
			}
		],
		"name": "setPayloadSizeLimit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_precrime",
				"type": "address"
			}
		],
		"name": "setPrecrime",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "_version",
				"type": "uint16"
			}
		],
		"name": "setReceiveVersion",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "_version",
				"type": "uint16"
			}
		],
		"name": "setSendVersion",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "_remoteChainId",
				"type": "uint16"
			},
			{
				"internalType": "bytes",
				"name": "_path",
				"type": "bytes"
			}
		],
		"name": "setTrustedRemote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "_remoteChainId",
				"type": "uint16"
			},
			{
				"internalType": "bytes",
				"name": "_remoteAddress",
				"type": "bytes"
			}
		],
		"name": "setTrustedRemoteAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "spendLimits",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "spendLimitSet",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "spendLimitUsed",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			}
		],
		"name": "trustedRemoteLookup",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]