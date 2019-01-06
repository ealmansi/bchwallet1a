var bitcore = require('bitcore-lib-cash')
var fetch = require('isomorphic-fetch')

function Wallet () {
  this._privateKey = new bitcore.PrivateKey()
  console.log(fetch)
}

Wallet.prototype.getBalance = function getBalance () {
  return 'getBalance'
}

Wallet.prototype.getDepositAddress = function getDepositAddress () {
  return this._privateKey.toAddress().toString()
}

Wallet.prototype.withdraw = function withdraw (address, amount) {
  return ['withdraw', address, amount].join(' ')
}

Wallet.prototype.getPrivateKey = function getPrivateKey () {
  return this._privateKey.toWIF()
}

module.exports = Wallet
