# CryptoWave

Make crypto payments with NFC and Vouchers for larger adoption along with Gasless features.

## Overview

CryptoWave enables seamless crypto payments through NFC and Vouchers. The project focuses on enhancing adoption by introducing gasless transactions and innovative features.

### Features

1. **Bonds (Vouchers)**
   - Create vouchers locking tokens in contracts.
   - Redeem vouchers using a SecretKey.
   - Redeem vouchers gasless

2. **NFC Pay**
   - Spend and accept crypto using NFC.
   - No KYC required.
   - Build your own NFC payment devices.
   - Spending limits onchain

## Integrations

1. **Biconomy**
   - Gasless transactions with ERC2771 relayed during voucher redemption.
   - Users never pay fees.
   - [Transaction with Biconomy Relay](https://goerli.etherscan.io/tx/0xd2dbb231ec2cfeafdbe920a5e1fcf939de64425697beb4a20a45b807108690e5)

2. **Chainlink CCIP**
   - CrossChain Messaging from supported chains (Sepolia) to the base chain.
   - [CCIP Message & DataFeed Integration](https://ccip.chain.link/msg/0xef2c358a9ae98c1944afb83664e71cc9de2c6b158a89cc211e86dbc9c9323c33)
   - [Transaction Explorer](https://explorer.phalcon.xyz/tx/sepolia/0x14988a7a7ff6a3352b2b9a8e9f6cbbeaf0e115c250a8c7ff6d820b8bc0cf5ac1)

3. **LayerZero**
   - CrossChain Messaging for other EVM chains (Scroll, Mantle, Zkevm, Polygon, Celo, Linea).
   - Deposits are processed via Layerzero cross-chain messaging from Mumbai to Base Testnet.
   - [LayerZero Transaction Explorer](https://testnet.layerzeroscan.com/tx/0x43bf95317ef40367670a9de1822ba0f8a493a5e8998d9ca83af1be61beb2aca7)

4. **NFT.Storage**
   - Create IPFS hash to transfer signed messages between NFC devices.
   - Accommodate larger data in bytes data size.
   - [IPFS Hash for NFC Data](https://bafkreiciulrdlfq2ky22spks2gcnkt66d7v3qrrjzvtoqfd5qtbgt4uzom)
   - Corresponding JSON with spender address and messageHash.

5. **Chainlink Datafeed**
   - Determine USD value of user-deposited tokens to issue $ value on NFC payment chain. If datafeed is missing use default value


## How Bonds Work

Bonds are created seamlessly across various blockchain networks, offering the flexibility to be redeemed on the same chain where they were initiated. The process involves the following key steps:

1. **Token Deposit:**
   - Users deposit allowed tokens to create a bond.

2. **Supplying Unique Key - "secretKey":**
   - Users supply a unique key called "secretKey" during the bond creation process.

3. **Hash Generation:**
   - A Keccak256 hash is generated from the provided secretKey.

4. **On-Chain Storage:**
   - The generated hash is securely stored on the blockchain as part of the bond creation transaction.

5. **Redemption Process:**
   - When redeeming a bond, users provide the secretKey.
   - The system verifies if the hash of the provided secretKey matches the stored hash on the blockchain.

6. **Gasless Transaction with Biconomy SDK:**
   - The redemption transaction is executed seamlessly and gaslessly using the Biconomy SDK.
   - Users receive back their initial tokens upon successful redemption.

This process ensures a secure and gas-efficient bond creation and redemption experience across different blockchain networks.

## How NFC Payments Work

NFC (Near Field Communication) payments on the base chain serve as the payment chain, holding a USD value in user balances on the contract. The process involves several key steps:

1. **Balance Loading:**
   - Users can add money to their balance by supplying approved assets on multiple chains.
   - Chainlink data feed is utilized to determine the USD value of the user's assets.

2. **Cross-Chain Messaging:**
   - A cross-chain message is sent to the base chain (payment chain) to update the user's balance.

3. **Spend Limit Feature:**
   - Users can set a custom spend limit, ensuring controlled spending within their wallet balance.
   - The spend limit is less than the loaded balance and is suitable for tap payments.

4. **Unique Hash Generation:**
   - Upon setting the spend limit, users receive a unique hash associated with their NFC card.

5. **NFC Card Tap for Payment:**
   - Users tap their NFC card to initiate payments up to their set spend limit.
   - The irreversible nature of blockchain transactions is managed through this secure process.

6. **Transaction Verification and Centralized Relayer:**
   - An API is maintained to verify spending limits on-chain.
   - The transaction is processed using a centralized relayer for swift confirmation.
   - The `limitUsed` variable is updated to ensure users never exceed their set spend limit.

This comprehensive approach ensures a secure, user-controlled NFC payment experience, where users can confidently tap their cards for convenient and controlled transactions.


## Chain Deployments (Bonds)

- Goerli testnet
- Mumbai testnet
- ZkEvm testnet
- Celo testnet
- Mantle testnet

## Chain Deployments (NFC Wallet Deposits)

- Sepolia
- Mumbai Polygon
- Mantle
- Celo
- ZkEvm
- Arbitrum
- Scroll
- Linea
- Base (This acts as Payment chain)


## Deployment Addresses Bonds
### Goerli Testnet

| Contract Address                                | DAI                                      | USDC                                     | LINK                                    |
| ----------------------------------------------- | ---------------------------------------- | ---------------------------------------- | --------------------------------------- |
| 0x5013d127469B5088E4B4576b51C7D6303ADa9D20    | 0x8E89aB6F92B0Cdf99be9FFcee448df8198F8EaE7 | 0x67BFa3C931d3e6C73BFBEA2C87257B4C36839875 | 0xb598418856fcF1b865D2fc8d82e22Dfb9a8fCE5a |

### Mumbai Testnet

| Contract Address                                | DAI                                      | USDC                                     | LINK                                    |
| ----------------------------------------------- | ---------------------------------------- | ---------------------------------------- | --------------------------------------- |
| 0x5013d127469B5088E4B4576b51C7D6303ADa9D20    | 0x67BFa3C931d3e6C73BFBEA2C87257B4C36839875 | 0xb598418856fcF1b865D2fc8d82e22Dfb9a8fCE5a | 0x8E89aB6F92B0Cdf99be9FFcee448df8198F8EaE7 |

### Zkevm Testnet

| Contract Address                                | DAI                                      | USDC                                     | LINK                                    |
| ----------------------------------------------- | ---------------------------------------- | ---------------------------------------- | --------------------------------------- |
| 0x5013d127469B5088E4B4576b51C7D6303ADa9D20    | 0x67BFa3C931d3e6C73BFBEA2C87257B4C36839875 | 0xb598418856fcF1b865D2fc8d82e22Dfb9a8fCE5a | 0x8E89aB6F92B0Cdf99be9FFcee448df8198F8EaE7 |

### Celo Testnet

| Contract Address                                | DAI                                      | USDC                                     | LINK                                    |
| ----------------------------------------------- | ---------------------------------------- | ---------------------------------------- | --------------------------------------- |
| 0x5013d127469B5088E4B4576b51C7D6303ADa9D20    | 0x8E89aB6F92B0Cdf99be9FFcee448df8198F8EaE7 | 0xb598418856fcF1b865D2fc8d82e22Dfb9a8fCE5a | 0x67BFa3C931d3e6C73BFBEA2C87257B4C36839875 |

### Mantle Testnet

| Contract Address                                | DAI                                      | USDC                                     | LINK                                    |
| ----------------------------------------------- | ---------------------------------------- | ---------------------------------------- | --------------------------------------- |
| 0x5013d127469B5088E4B4576b51C7D6303ADa9D20    | 0x67BFa3C931d3e6C73BFBEA2C87257B4C36839875 | 0xb598418856fcF1b865D2fc8d82e22Dfb9a8fCE5a | 0x8E89aB6F92B0Cdf99be9FFcee448df8198F8EaE7 |


## NFC Deposits Addresses:

**Sepolia Testnet:**
| NFC Deposit Address                               | LINK                                     | DAI                                      | USDC                                    |
| ------------------------------------------------- | ---------------------------------------- | ---------------------------------------- | --------------------------------------- |
| 0xb598418856fcF1b865D2fc8d82e22Dfb9a8fCE5a       | 0xd2F474D09B552C0C2cACC330d29440E622FE5917 | 0x90e413963e68b90153F8370924Bd0FB6d504B778 | 0xCE60598B9320D47e78f8B60eCF7F6a9e5986a161 |

**Mumbai Testnet:**
| NFC Deposit Address                               | LINK                                     | DAI                                      | USDC                                    |
| ------------------------------------------------- | ---------------------------------------- | ---------------------------------------- | --------------------------------------- |
| 0x90e413963e68b90153F8370924Bd0FB6d504B778       | 0xCE60598B9320D47e78f8B60eCF7F6a9e5986a161 | 0xe12A2d74E17659Cca2c111257992BA68eA42Ba77 | 0x80c4F3957E75686593A91e146503f2aa9A5FDe23 |

**Mantle Testnet:**
| NFC Deposit Address                               | LINK                                     | DAI                                      | USDC                                    |
| ------------------------------------------------- | ---------------------------------------- | ---------------------------------------- | --------------------------------------- |
| 0xD3ae32608fd2a86CF5a4652Ab4E6A08f4509f685       | 0x90e413963e68b90153F8370924Bd0FB6d504B778 | 0xCE60598B9320D47e78f8B60eCF7F6a9e5986a161 | 0x80c4F3957E75686593A91e146503f2aa9A5FDe23 |

**Celo Testnet:**
| NFC Deposit Address                               | LINK                                     | DAI                                      | USDC                                    |
| ------------------------------------------------- | ---------------------------------------- | ---------------------------------------- | --------------------------------------- |
| 0x80c4F3957E75686593A91e146503f2aa9A5FDe23       | 0x90e413963e68b90153F8370924Bd0FB6d504B778 | 0xCE60598B9320D47e78f8B60eCF7F6a9e5986a161 | 0xe12A2d74E17659Cca2c111257992BA68eA42Ba77 |

**Zkevm Testnet:**
| NFC Deposit Address                               | LINK                                     | DAI                                      | USDC                                    |
| ------------------------------------------------- | ---------------------------------------- | ---------------------------------------- | --------------------------------------- |
| 0x90e413963e68b90153F8370924Bd0FB6d504B778       | 0xCE60598B9320D47e78f8B60eCF7F6a9e5986a161 | 0xe12A2d74E17659Cca2c111257992BA68eA42Ba77 | 0x80c4F3957E75686593A91e146503f2aa9A5FDe23 |

**Arbitrum Testnet:**
| NFC Deposit Address                               | LINK                                     | DAI                                      | USDC                                    |
| ------------------------------------------------- | ---------------------------------------- | ---------------------------------------- | --------------------------------------- |
| 0x5013d127469B5088E4B4576b51C7D6303ADa9D20       | 0x8E89aB6F92B0Cdf99be9FFcee448df8198F8EaE7 | 0x67BFa3C931d3e6C73BFBEA2C87257B4C36839875 | 0xb598418856fcF1b865D2fc8d82e22Dfb9a8fCE5a |

**Scroll Testnet:**
| NFC Deposit Address                               | LINK                                     | DAI                                      | USDC                                    |
| ------------------------------------------------- | ---------------------------------------- | ---------------------------------------- | --------------------------------------- |
| 0x90e413963e68b90153F8370924Bd0FB6d504B778       | 0x8E89aB6F92B0Cdf99be9FFcee448df8198F8EaE7 | 0x67BFa3C931d3e6C73BFBEA2C87257B4C36839875 | 0xd2F474D09B552C0C2cACC330d29440E622FE5917 |

**Linea Testnet:**
| NFC Deposit Address                               | LINK                                     | DAI                                      | USDC                                    |
| ------------------------------------------------- | ---------------------------------------- | ---------------------------------------- | --------------------------------------- |
| 0x8E89aB6F92B0Cdf99be9FFcee448df8198F8EaE7       | 0x67BFa3C931d3e6C73BFBEA2C87257B4C36839875 | 0xb598418856fcF1b865D2fc8d82e22Dfb9a8fCE5a | 0xd2F474D09B552C0C2cACC330d29440E622FE5917 |


## NFC Payment Base 

**NFC Wallet:** 0x5013d127469B5088E4B4576b51C7D6303ADa9D20

s