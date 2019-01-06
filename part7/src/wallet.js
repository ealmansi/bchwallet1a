var bitcore = require('bitcore-lib-cash')
var fetch = require('isomorphic-fetch')

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
  var self = this
  return fetch(
    'https://rest.bitcoin.com/v1/address/utxo/' + this.getDepositAddress()
  ).then(
    function (res) {
      if (!res.ok) {
        throw new Error('Fetching UTXOs failed. Please, try again later.')
      }
      return res.json()
    }
  ).then(
    function (utxos) {
      var balance = utxos.reduce(
        function (acc, curr) {
          return acc + curr.satoshis
        },
        0
      )
      var fee = 250
      var transaction = new bitcore.Transaction()
      transaction = transaction.from(utxos)
      transaction = transaction.to(address, amount)
      transaction = transaction.to(self.getDepositAddress(), balance - amount - fee)
      transaction = transaction.sign(self._privateKey)
      var rawTransaction = transaction.checkedSerialize()
      return fetch(
        'https://rest.bitcoin.com/v1/rawtransactions/sendRawTransaction/' + rawTransaction,
        { method: 'POST' }
      )
    }
  ).then(
    function (res) {
      if (!res.ok) {
        throw new Error('Broadcasting transaction failed. Please, try again later.')
      }
      return res.text()
    }
  ).then(
    function (text) {
      if (text.match(/^"[0-9a-fA-F]{64}"$/) === null) {
        throw new Error('Broadcasting transaction failed with error: "' + text + '". Please, try again later.')
      }
      return text
    }
  )
}

Wallet.prototype.getPrivateKey = function getPrivateKey () {
  return this._privateKey.toWIF()
}

module.exports = Wallet
