# HyperCartridge Smart Contracts
_Freshly baked not-so-smart-not-so-contracts on their way to your local repo!_


# Installation

Step by step guide to create, test and deploy a new smart contract enviroment for a simple ERC721 token, using [Truffle](https://trufflesuite.com/docs/truffle/quickstart/) and OpenZeppelin.

## Step 1
Suggested IDE: VSCode. I prefer [VSCodium](https://vscodium.com/) without MS telemetry, else [VSCode](https://code.visualstudio.com/).
Install the [Nomics solidity (w/ hardhat)](https://open-vsx.org/extension/NomicFoundation/hardhat-solidity) or [juanblanco solidity](https://open-vsx.org/extension/juanblanco/solidity) extension.

## Step 2
Install / update **truffle** globally

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
Node v17.0.1
Web3.js v1.8.2
```