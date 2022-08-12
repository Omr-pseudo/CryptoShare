require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.9',
  networks: {
    ropsten: {
      url: 'https://ropsten.infura.io/v3/63bbee5a46b24489919f23a327afc3f4',
      accounts: ['7539342fbbe6dacdd5bd4679163f7fc058d5d3fc44e273b0f7e1dcb422b4824c']
    }
  }
}