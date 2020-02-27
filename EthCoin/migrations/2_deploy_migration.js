const sheeracoin = artifacts.require("sheeraCoin");

module.exports = function(deployer) {
    deployer.deploy(sheeracoin);
};