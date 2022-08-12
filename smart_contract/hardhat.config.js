require('@nomiclabs/hardhat-waffle');

import {private_key} from './secret.json';

module.exports = {
  solidity: '0.8.9',
  networks: {
    ropsten: {
      url: 'https://ropsten.infura.io/v3/63bbee5a46b24489919f23a327afc3f4',
      accounts: [private_key]
    }
  }
}