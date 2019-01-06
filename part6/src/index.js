var Wallet = require('./wallet')

var STORAGE_KEY_PRIVATE_KEY = 'bchwallet1a:privateKey'

var wallet
if (localStorage.getItem(STORAGE_KEY_PRIVATE_KEY) !== null) {
  wallet = new Wallet(localStorage.getItem(STORAGE_KEY_PRIVATE_KEY))
}
else {
  wallet = new Wallet()
  localStorage.setItem(STORAGE_KEY_PRIVATE_KEY, wallet.getPrivateKey())
}

var balanceDisplay = document.getElementById('balance-display')
var depositAddressDisplay = document.getElementById('deposit-address-display')
var withdrawalForm = document.getElementById('withdrawal-form')
var withdrawalAddress = document.getElementsByName('withdrawal-address').item(0)
var withdrawalAmount = document.getElementsByName('withdrawal-amount').item(0)
var importForm = document.getElementById('import-form')
var privateKey = document.getElementsByName('private-key').item(0)
var exportButton = document.getElementById('export-button')
var privateKeyDisplay = document.getElementById('private-key-display')

wallet.getBalance().then(
  function (balance) {
    balanceDisplay.innerText = balance
  }
).catch(
  function (err) {
    alert(err.message || err.title || 'Unknown error.')
  }
)

depositAddressDisplay.innerText = wallet.getDepositAddress()

withdrawalForm.addEventListener('submit', function (event) {
  event.preventDefault()
  var txid = wallet.withdraw(withdrawalAddress.value, withdrawalAmount.value)
  alert(['Transaction ID:', txid].join(' '))
})

importForm.addEventListener('submit', function (event) {
  event.preventDefault()
  var privateKeyValue = privateKey.value.trim()
  localStorage.setItem(STORAGE_KEY_PRIVATE_KEY, privateKeyValue)
  privateKey.value = ''
  window.location.reload()
})

exportButton.addEventListener('click', function (event) {
  if (privateKeyDisplay.innerText === '(hidden)') {
    privateKeyDisplay.innerText = wallet.getPrivateKey()
  }
  else {
    privateKeyDisplay.innerText = '(hidden)'
  }
})
