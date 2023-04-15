// const ConvertLib = artifacts.require("ConvertLib");
const HyperCartridge = artifacts.require("HyperCartridge");

module.exports = function(deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(HyperCartridge);
};
