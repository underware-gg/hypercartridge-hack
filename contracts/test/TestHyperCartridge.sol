// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// These files are dynamically created at test time
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HyperCartridge.sol";

contract TestHyperCartridge {

  // TODO Add some tests
  // function testInitialBalanceUsingDeployedContract() public {
  //   MetaCoin meta = MetaCoin(DeployedAddresses.MetaCoin());

  //   uint expected = 10000;

  //   Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  // }

  // function testInitialBalanceWithNewMetaCoin() public {
  //   MetaCoin meta = new MetaCoin();

  //   uint expected = 10000;

  //   Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  // }

}
