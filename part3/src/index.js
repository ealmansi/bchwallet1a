var Wallet = require('./wallet')

var wallet = new Wallet()

var balanceDisplay = document.getElementById('balance-display')
var depositAddressDisplay = document.getElementById('deposit-address-display')
var withdrawalForm = document.getElementById('withdrawal-form')
var withdrawalAddress = document.getElementsByName('withdrawal-address').item(0)
var withdrawalAmount = document.getElementsByName('withdrawal-amount').item(0)
var importForm = document.getElementById('import-form')
var privateKey = document.getElementsByName('private-key').item(0)
var exportButton = document.getElementById('export-button')
var privateKeyDisplay = document.getElementById('private-key-display')

balanceDisplay.innerText = wallet.getBalance()

depositAddressDisplay.innerText = wallet.getDepositAddress()

withdrawalForm.addEventListener('submit', function (event) {
  event.preventDefault()
  var txid = wallet.withdraw(withdrawalAddress.value, withdrawalAmount.value)
  alert(['Transaction ID:', txid].join(' '))
})

importForm.addEventListener('submit', function (event) {
  event.preventDefault()
  console.log('privateKey.value', privateKey.value)
})

exportButton.addEventListener('click', function (event) {
  if (privateKeyDisplay.innerText === '(hidden)') {
    privateKeyDisplay.innerText = wallet.getPrivateKey()
  }
  else {
    privateKeyDisplay.innerText = '(hidden)'
  }
})
