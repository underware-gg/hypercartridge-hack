# HyperCartridge Smart Contracts
_Freshly baked not-so-smart-not-so-contracts on their way to your local repo!_


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
