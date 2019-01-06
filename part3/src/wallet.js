var bitcore = require('bitcore-lib-cash')
var fetch = require('isomorphic-fetch')

function Wallet () {
  console.log('Constructing a Wallet.')
  console.log(bitcore)
  console.log(fetch)
}

Wallet.prototype.getBalance = function getBalance () {
  return 'getBalance'
}

Wallet.prototype.getDepositAddress = function getDepositAddress () {
  return 'getDepositAddress'
}

Wallet.prototype.withdraw = function withdraw (address, amount) {
  return ['withdraw', address, amount].join(' ')
}

Wallet.prototype.getPrivateKey = function getPrivateKey () {
  return 'getPrivateKey'
}

module.exports = Wallet
