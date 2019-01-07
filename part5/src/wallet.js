var bitcore = require('bitcore-lib-cash')
var fetch = require('whatwg-fetch').fetch

function Wallet (privateKey) {
  if (privateKey !== undefined) {
    this._privateKey = bitcore.PrivateKey.fromWIF(privateKey)
  }
  else {
    this._privateKey = new bitcore.PrivateKey()
  }
}

Wallet.prototype.getBalance = function getBalance () {
  return fetch(
    'https://rest.bitcoin.com/v1/address/details/' + this.getDepositAddress()
  ).then(
    function (res) {
      if (!res.ok) {
        throw new Error('Fetching balance failed. Please, try again later.')
      }
      return res.json()
    }
  ).then(
    function (json) {
      return json.balanceSat + json.unconfirmedBalanceSat
    }
  )
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
