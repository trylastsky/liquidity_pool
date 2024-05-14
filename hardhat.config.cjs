require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  paths: {
    artifacts: './contracts/artifacts',
    cache: './contracts/cache'
  },
  networks: {
    hardhat: {
      accounts: [
        {privateKey: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", //tom
          balance: "10000000000000000000000"
        },
        {privateKey: "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d", //ben
          balance: "20000000000000000000000"
        },
        {privateKey: "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a", //rick
          balance: "30000000000000000000000"
        }
      ]
    }
}
}
