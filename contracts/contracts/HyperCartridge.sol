// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract HyperCartridge is ERC721, ERC721Enumerable, ERC721Burnable, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIdCounter;

  mapping(uint256 => string) private _states;

  event StateChanged(uint256 indexed tokenId);

  constructor() ERC721("HyperCartridge", "HCart") {}
  
  function mint(address to) public {
    _tokenIdCounter.increment();
    uint256 tokenId = _tokenIdCounter.current();
    _safeMint(to, tokenId);
  }

  // Required overrides
  function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId, batchSize);
  }
  function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  // Based on: https://docs.opensea.io/docs/metadata-standards
  function tokenURI(uint256 tokenId) public view override (ERC721) returns (string memory) {
	require(_exists(tokenId), 'HyperCartridge: invalid token ID');
    return string.concat(
      '{'
        '"name":"HyperCartridge State #', Strings.toString(tokenId), '",'
        '"description":"HyperCartridge State #', Strings.toString(tokenId), '",'
        '"background_color":"000000",'
        '"external_url":"https://fundaomental.com/",'
        '"image":"https://fundaomental.com/gravitymap/2048x2048.gif",'
        '"attributes":[]'
      '}'
	);
  }

  function setState(uint256 tokenId, string calldata state) public {
    require(_exists(tokenId), 'HyperCartridge: invalid token ID');
    require(_ownerOf(tokenId) == _msgSender(), 'HyperCartridge: not owner');
    _states[tokenId] = state;
    emit StateChanged(tokenId);
	}

  function getState(uint256 tokenId) public view returns (string memory) {
    require(_exists(tokenId), 'HyperCartridge: invalid token ID');
    return _states[tokenId];
	}

}