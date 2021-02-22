/**
 * @class Crypto
 * @since 4.4
 * 
 * Generates RSA private and public key.
 * 
 *     @example
 *     const Crypto = require('sf-core/crypto');
 *     Crypto.generateKeyPair({ keySize: 1024 });
 *     const publicKey = Crypto.getBase64PublicString();
 *     const privateKey = Crypto.getBase64PrivateString();
 */
function Crypto(params) {}

/**
 * Generates RSA private and public key.
 * To retrieve the keys, you can use getBase64PublicString and getBase64PrivateString methods.
 * On iOS, public key should be retrieved with getExportedPublicKey function
 * @method generateKeyPair
 * @param {Object} params
 * @param {number} params.keySize Length of the key 
 * @returns If they keypair generated successfully, it will return true
 */
Crypto.generateKeyPair = function(params) {};

/**
 * If useServerKey parameter is set to true while calling encrypt method, 
 * the key entered via setServerPublicKey will be used.
 * @method encrypt
 * @param {Object} params
 * @param {string} params.plainText Text to encrypt
 * @param {boolean} params.useServerKey Toggles whether to use server key to encrypt the plainText
 * @param {string} params.cipherType Cipher type to encrypt for. 'RSA/ECB/PKCS1Padding' is recommended
 * @returns {string} Encrypted text
 */
Crypto.encrypt = function(params) {}

/**
 * If useServerKey parameter is set to true while calling decrypt method, 
 * the key entered via setServerPublicKey will be used.
 * @method decrypt
 * @param {Object} params
 * @param {string} params.encryptedText Encrypted text to decrypt
 * @param {boolean} params.useServerKey Toggles whether to use server key to decrpyt given text
 * @param {string} params.cipherType Cipher type to decrypt for. 'RSA/ECB/PKCS1Padding' is recommended
 * @returns {string} Decrypted text
 */
Crypto.decrypt = function(params) {}

/**
 * Returns the last generated public key of keyPair
 * @method getBase64PublicString
 * @returns {string}
 */
Crypto.getBase64PublicString = function(params) {}

/**
 * Returns the last generated ptrivate key of keyPair
 * @method generateKeyPair
 * @returns {string} Decrypted text
 */
Crypto.getBase64PrivateString = function(params) {}

/**
 * Overrides the private key to be used with keyPair
 * @method setPrivateKey
 * @param {string} base64String Private key to override
 */
Crypto.setPrivateKey = function(base64String) {}

/**
 * Overrides the public key to be used with keyPair
 * @method setPublicKey
 * @param {string} base64String Public key to override
 */
Crypto.setPublicKey = function(base64String) {}

/**
 * If useServerKey parameter is set to true while calling encrypt method, 
 * this key will be used to encrypt the text. Useful when two-way encryption is needed
 * @method setServerPublicKey
 * @param {string} base64String 
 */
Crypto.setServerPublicKey = function(base64String) {}

/**
 * On iOS, instead of using getBase64PublicString to retrieve generated public key, using this will yield better result.
 * @method getExportedPublicKey
 * @ios
 */
Crypto.getExportedPublicKey = function() {}

module.exports = Crypto;