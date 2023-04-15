# HyperCartridge Smart Contracts

Multiplayer NFT Application Cartridges!

# Installation

Step by step guide to create, test and deploy a new smart contract enviroment for a simple ERC721 token, using Truffle ([Quickstart guide](https://trufflesuite.com/docs/truffle/quickstart/)) and OpenZeppelin.

## Step 1

Suggested IDE: VSCode. I prefer [VSCodium](https://vscodium.com/) without MS telemetry, else [VSCode](https://code.visualstudio.com/).
Install the [Nomics solidity (w/ hardhat)](https://open-vsx.org/extension/NomicFoundation/hardhat-solidity) or [juanblanco solidity](https://open-vsx.org/extension/juanblanco/solidity) extension.

## Step 2

Install / update **Truffle** globally

```
npm uninstall -g truffle
npm install -g truffle
truffle --version
```

You should see something like:
```
Truffle v5.8.2 (core: 5.8.2)
Ganache v7.7.7
Solidity v0.5.16 (solc-js)
Node v16.14.0
Web3.js v1.8.2
```

## Step 3

Create Truffle project template using the MetaCoin box.

```
truffle unbox metacoin
```

You should get project structure like this:
```
contracts/
migrations/
test/
truffle-config.js
```

## Step 4

Install OpenZeppelin contracts package

```
npm install -s @openzeppelin/contracts
```

Create ERC721 contract with the [OpenZeppelin Wizard](https://wizard.openzeppelin.com/#erc721) and selecting Mintable, Auto Increment Ids, Burnable, Enumerable and Ownable. Customize contract name, token name and symbol.

Install OpenZeppelin test environment (for local development only)

```
npm install --save-dev @openzeppelin/test-environment @openzeppelin/test-helpers chai mocha ethers
```

# Building and testing

Compile the contract artifacts in `/build`, containing the ABI

```
truffle compile
```

Run all the tests located in `/test`

```
npm test
```

Run one single test script

```
npm test test/HyperCartridge.js
```

# Testnet Deployment (Goerli)

Go to [Infura](https://www.infura.io/), create an account and an Ethereum project. This is required to get a connection to any live network.

You'll also need a wallet with GETH in it. Better not use your mainnet wallet, because the mnemonic need to be stored on a local file. You can request some GETH in the [Infura Faucet](https://www.infura.io/faucet)

Now create a file called `.env` and paste your wallet menemonic (the 12 words) and Infura project id:

```
MNEMONIC=paste here all your mnemonic words the full twelve words here yes
INFURA_PROJECT_ID=<infura_project_id>
```

Install the `dotenv` package to access `.env` from truffle, and the wallet connector

```
npm install --save-dev dotenv @truffle/hdwallet-provider
```

Configure/uncomment the Goerli network in `truffle-config.js`. Paste the wallet address you want to use in the `from` property.

```
...
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
...
  goerli: {
    provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`),
    network_id: 5, // Goerli's id
    chain_id: 5,
    from: 0x0,
  }
...
```

Simulate the migration using `--dry-run`. This will not publish, only check if you have access, enough GETH, etc.

```
truffle migrate --network goerli --dry-run
```

Now migrate...

```
truffle migrate --network goerli
```


# Testnet contract verification

This is **optional**. By verifying the contract, its source code becomes available on etherscan, and anyone can interact with it.

First, go to [Etherscan](https://docs.etherscan.io/getting-started/viewing-api-usage-statistics) and get a free API key. Paste it to `.env`:

```
ETHERSCAN_API_KEY=<api_key>
```

Install the `truffle-plugin-verify` plugin

```
npm install --save-dev truffle-plugin-verify
```

Add this to the end of your `truffle-config.js` `module.exports`:

```
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  },
```

Verify each contract one by one, using their name:

```
truffle verify --network goerli HyperCartridge
```


# Testnet interaction

To interact with any smart contract, we need the **contract address** and **ABI**. After migration, both will be stored on the artifacts file, located at `/build/contracts` by default. Each contract has it's own artifacts file in JSON format, that can be copied to your dapp repository, and updated every time a new contract is deployed.

The artifacts file can contain multiple networks addresses, indexed by network Id (mainnet is 1, goerli is 5). Here's an example of how to get ABI and contract address from the artifacts file:

```
const HyperCartridge = require('build/contracts/HyperCartridge.json')
const abi = HyperCartridge.abi
const contractAddress = HyperCartridge.networks[5].address
```

The best way to fetch on-chain data today is using [wagmi](https://wagmi.sh/) and [ConnectKit](https://docs.family.co/connectkit).
