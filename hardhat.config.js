require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
const RSK_TESTNET_PRIVATE_KEY = process.env.RSK_TESTNET_PRIVATE_KEY;
module.exports = {
  solidity: "0.8.1",
 networks: {
   hardhat: {},
   rsk_testnet: {
    url: "https://public-node.testnet.rsk.co",
    accounts: [`0x8c14811e4530e2e8293f158e1883538409269a44709cf8db64e11858cca73737`],
    chainId: 31
  }
 },
};
