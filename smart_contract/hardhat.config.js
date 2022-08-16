require('@nomiclabs/hardhat-waffle');

import {private_key} from './secret.json';

module.exports = {
  solidity: '0.8.9',
  networks: {
    ropsten: {
      url: 'https://ropsten.infura.io/v3/API_KEY',
      accounts: [private_key]
    }
  }
}
