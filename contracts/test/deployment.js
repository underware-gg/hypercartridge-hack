// OpenZeppelin test suite
// https://github.com/OpenZeppelin/openzeppelin-test-environment
const { BN, constants } = require('@openzeppelin/test-helpers')
const { accounts, contract } = require('@openzeppelin/test-environment')
const { ZERO_ADDRESS } = constants
const [ownerAccount, accountOne, accountTwo] = accounts

//--------------------------
// Hypercartridge deployment
//
const Hypercartridge = contract.fromArtifact('Hypercartridge')
const ConvertLib = contract.fromArtifact('ConvertLib')
async function _deployContracts(owner, options = {}) {
  // libs
  // const convertLib = await ConvertLib.new({ from: owner })
  // await Hypercartridge.detectNetwork()
  // await Hypercartridge.link('ConvertLib', convertLib.address)
  // contracts
  const token = await Hypercartridge.new({ from: owner })
  return { token }
}

async function _deployToken(owner, options = {}) {
  const contracts = await _deployContracts(owner, options)
  return contracts.token
}

//--------------------------
// Exports
//
module.exports = {
  _deployContracts,
  _deployToken,
}

