require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-etherscan')
require('hardhat-spdx-license-identifier')

require('./tasks/')

const getEnvironmentVariable = (_envVar) => process.env[_envVar]

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.19',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    goerli: {
      url: getEnvironmentVariable('GOERLI_JSON_RPC_URL'),
      accounts: [getEnvironmentVariable('PRIVATE_KEY')],
      gasPrice: 2.5e9
    },
    gnosis: {
      url: getEnvironmentVariable('GNOSIS_JSON_RPC_URL'),
      accounts: [getEnvironmentVariable('PRIVATE_KEY')],
      gasPrice: 20e9
    },
  },
  etherscan: {
    apiKey: {
      goerli: getEnvironmentVariable('GOERLISCAN_API_KEY'),
      gnosis: getEnvironmentVariable('GNOSISSCAN_API_KEY')
    }
  },
}
