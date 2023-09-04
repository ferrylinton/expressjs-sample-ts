console.log(require('crypto').randomBytes(64).toString('hex'));

var PBKDF2 = require('crypto-js/pbkdf2');

var key = PBKDF2("passphrase", "salt");
console.log(key);

//var salt = CryptoJS.lib.WordArray.random(128 / 8);

//var key128Bits = CryptoJS.PBKDF2("passphrase", "salt", { keySize: 128 / 32 });