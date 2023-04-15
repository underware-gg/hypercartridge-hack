// OpenZeppelin test suite
// https://docs.openzeppelin.com/test-environment/0.1/migrating-from-truffle
// https://github.com/OpenZeppelin/openzeppelin-test-helpers
// https://github.com/OpenZeppelin/openzeppelin-test-environment
// https://github.com/OpenZeppelin/chai-bn
// https://github.com/indutny/bn.js
const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers')
const { ZERO_ADDRESS } = constants
const { accounts } = require('@openzeppelin/test-environment')
const [owner, accountOne, accountTwo] = accounts

// https://www.chaijs.com/api/bdd/
const { expect } = require('chai')
require('chai').should()

const { _deployToken } = require('./deployment.js')

//-----------------------------------------------------------------------------------------
//
// UNIT TESTS
//

describe(`HyperCartridgeToken (${require('path').basename(__filename)})`, () => {

  //--------------------------------------------------------------------
  // All tests share the same instance
  //
  describe('# single instance', async () => {
    let _instance = null
    let _totalSupply = 0
    before(async function () {
      _instance = await _deployToken(owner)
    })

    async function _mint(instance, to, expectedEvent = null, expectedArgs = {}) {
      const receipt = await instance.mint(to, { from: to })
      if (expectedEvent) {
        expectEvent(receipt, expectedEvent, expectedArgs)
      }
      _totalSupply++
      return receipt
    }

    it('initial state', async () => {
      expect((await _instance.totalSupply()).toNumber()).equals(0)
      expect((await _instance.balanceOf(owner)).toNumber()).equals(0)
      expect((await _instance.balanceOf(accountOne)).toNumber()).equals(0)
      expect((await _instance.balanceOf(accountTwo)).toNumber()).equals(0)
    })

    it('mint()', async () => {
      // mint the first token
      await _mint(_instance, owner, 'Transfer', { from: ZERO_ADDRESS, to: owner })
      expect((await _instance.totalSupply()).toNumber()).equals(_totalSupply)

      // must own one token
      expect((await _instance.balanceOf(owner)).toNumber()).equals(1)

      // first token id is 1
      await expectRevert(_instance.ownerOf(0), 'ERC721: invalid token ID')
      expect((await _instance.ownerOf(1))).equals(owner)
      expect((await _instance.tokenByIndex(0)).toNumber()).equals(1)
      expect((await _instance.tokenOfOwnerByIndex(owner, 0)).toNumber()).equals(1)

      // mint some more tokens
      for (let i = 1; i <= 4; ++i) {
        await _mint(_instance, accountOne, 'Transfer', { from: ZERO_ADDRESS, to: accountOne })
        expect((await _instance.totalSupply()).toNumber()).equals(_totalSupply)
        expect((await _instance.balanceOf(accountOne)).toNumber()).equals(i)
        expect((await _instance.ownerOf(_totalSupply))).equals(accountOne)
      }
    })

    it('tokenURI()', async () => {
      // invalid, must revert
      await expectRevert(_instance.tokenURI(0), 'Hyperbox: invalid token ID')
      
      // check metadata contents
      let metadata = await _instance.tokenURI(1)
      expect(metadata.length).greaterThan(0)
      metadata = JSON.parse(metadata)
      expect(metadata.name?.length ?? 0).greaterThan(1)
      expect(metadata.description?.length ?? 0).greaterThan(1)
      expect(metadata.background_color?.length ?? 0).greaterThan(1)
      expect(metadata.external_url?.length ?? 0).greaterThan(1)
      expect(metadata.image?.length ?? 0).greaterThan(1)
      expect(Array.isArray(metadata.attributes)).equal(true)
    })

    it('setState(), getState()', async () => {
      // invalid, must revert
      await expectRevert(_instance.getState(0), 'Hyperbox: invalid token ID')

      // initial state is empty
      let state = await _instance.getState(1)
      expect(state).equals('')

      // only the owner can write
      const _sampleState = '{}'
      await expectRevert(_instance.setState(1, _sampleState, { from: accountOne }), 'Hyperbox: not owner')
      expectEvent(await _instance.setState(1, _sampleState, { from: owner }), 'StateChanged', { tokenId: '1' })

      // anyone can read
      expect(await _instance.getState(1, { from: owner })).equals(_sampleState)
      expect(await _instance.getState(1, { from: accountOne })).equals(_sampleState)

      // erase state
      expectEvent(await _instance.setState(1, '', { from: owner }), 'StateChanged', { tokenId: '1' })
      expect(await _instance.getState(1, { from: owner })).equals('')
      expect(await _instance.getState(1, { from: accountOne })).equals('')
    })

  })

})

