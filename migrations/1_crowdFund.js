var SimpleStorage = artifacts.require("./CrowdFund.sol");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
};