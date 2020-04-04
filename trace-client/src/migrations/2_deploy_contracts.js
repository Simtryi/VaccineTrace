var Trace = artifacts.require("../contracts/Trace.sol");

module.exports = function(deployer) {
  deployer.deploy(Trace);
};
