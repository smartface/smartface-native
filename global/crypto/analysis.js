/**
 * @class Crypto
 * @since 4.4
 * 
 * Contains crypto standarts
 */
function Crypto(params) {}

/**
 * 
 * @class Crypto.RSA
 * @since 4.4
 * Enables asymmetrical encryption/decryption in the RSA.
 * 
 *     @example
 *     const Crypto = require('@smartface/native/crypto');
 *     let keyPair = Crypto.RSA.generateKeyPair({ keySize: 1024 });
 *     const publicKey = keyPair.publicKey;
 *     const privateKey = keyPair.privateKey;
 */
Crypto.RSA = {};

/**
 * Generates RSA private and public key.
 * 
 * @method generateKeyPair
 * @param {Object} params
 * @param {number} [params.keySize=2048] Length of the key 
 * @returns {Object} returns private/public key
 * @ios
 * @android
 * @since 4.4
 */
Crypto.RSA.generateKeyPair = function(params) {};

/**
 * Used to encrypt the provided content with given public key.
 * 
 * @method encrypt
 * @param {Object} params
 * @param {string} params.plainText Text to encrypt
 * @param {string} params.key Public key in base64
 * @returns {string} Encrypted text which encoded with Base64
 * @ios
 * @android
 * @since 4.4
 */
Crypto.RSA.encrypt = function(params) {}

/**
 * Used to decrypt the provided encrypted content with given private key.
 * 
 * @method decrypt
 * @param {Object} params
 * @param {string} params.encryptedText Encrypted text to decrypt. Encoded with Base64.
 * @param {string} params.key Private key in base64
 * @returns {string} Decrypted text
 * @ios
 * @android
 * @since 4.4
 */
Crypto.RSA.decrypt = function(params) {}


/**
 * On iOS, instead of using getBase64PublicString to retrieve generated public key, using this will yield better result.
 * 
 * @method getExportedPublicKey
 * @ios
 * @since 4.4
 */
Crypto.RSA.getExportedPublicKey = function() {}

/**
 * 
 * @class Crypto.AES
 * @since 4.4
 * 
 * Enables to encryption/decryption in the Advanced Encryption Standard (AES). 
 *
 *		@example
 *      import Crypto from '@smartface/native/global/crypto';
 *		let plainText = "Hello World!";
 *      let keyBase64 = Crypto.AES.generateKey(256);
 *      Crypto.AES.encryptGCMAsync({
 *          plainText: plainText,
 *          key: keyBase64,
 *          onComplete: (encryptedText, iv): void => {
 *              console.info({ encryptedText, iv })
 *          },
 *          onFailure: (err) => {
 *              console.error(err);
 *          }
 *      });
 *      Crypto.AES.decryptGCMAsync({
 *          encryptedText: encryptedTextBase64,
 *          key: keyBase64,
 *          iv: ivBase64,
 *          onComplete: (plainText) => {
 *              console.info(plainText);
 *          },
 *          onFailure: (err) => {
 *              console.error(err);
 *          }
 *      });
 */
Crypto.AES = {};

/**
 * Used to encrypt the provided plain text with given parameters.
 * 
 * @method encryptGCMAsync
 * @param {Object} params 
 * @param {String} params.plainText Content to encrypt. 
 * @param {String} params.key Secret AES key which is encoded with Bas64.
 * @param {Number} [params.ivSize = 16] The IV byte size to specify while encrypting the content with. 
 * @param {Function} params.onComplete This event called when content encrypted successfully.
 * @param {String} params.onComplete.encryptedText Encrypted content in Base64.
 * @param {String} params.onComplete.iv IV which is generated during encryption procees. It is in Base64.
 * @param {Function} params.onFailure This event called when an exception occured while encrypting content.
 * @param {Function} params.onFailure.err Contains error message.
 * @ios
 * @android
 * @since 4.4
 */
Crypto.AES.encryptGCMAsync = function (params) {};


/**
 * Used to decrypt the provided encrypted text with given parameters.
 * 
 * @method decryptGCMAsync
 * @param {Object} params 
 * @param {String} params.encryptedText The content to decrypt which in Base64. 
 * @param {String} params.key Secret AES key which is encoded with Bas64.
 * @param {String} params.iv The IV in Base64.
 * @param {Function} params.onComplete This event called when content decrypted successfully.
 * @param {String} params.onComplete.plainText The decrypted plain content.
 * @param {Function} params.onFailure This event called when an exception occured while encrypting content.
 * @param {Function} params.onFailure.err Contains error message.
 * @ios
 * @android
 * @since 4.4
 */
Crypto.AES.decryptGCMAsync = function (params) {};


/**
 * Used to generate secure random key with given size. Key could be one of 16, 24, or 32 bytes
 * 
 * @method generateKey
 * @param {Number} [size = 32]
 * @ios
 * @android
 * @since 4.4
 */
Crypto.AES.generateKey = function (size) {}

module.exports = Crypto;