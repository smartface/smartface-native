declare const Crypto: {
  RSA: {
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
    generateKeyPair(params: { keySize: number }): {
      privateKey: string;
      publicKey: string;
    };
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
    encrypt(params: { plainText: string; key: string }): string;
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
    decrypt(params: { encryptedText: string; key: string }): string;
    ios: Partial<{
      /**
       * On iOS, instead of using getBase64PublicString to retrieve generated public key, using this will yield better result.
       * @param {String} key RSA public key
       * @ios
       */
      getExportedPublicKey(key): string;
    }>;
  };

  AES: {
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
    encryptGCMAsync(params: { plainText: String; key: String; ivSize?: number; onComplete: (encryptedText: String, iv: String) => void; onFailure?: (err: String) => void }): void;

    /**
     * Used to decrypt the provided encrypted text with given parameters.
     *
     * @method decryptGCMAsync
     * @param {Object} params
     * @param {String} params.encryptedText The content to decrypt which is in Base64.
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
    decryptGCMAsync(params: { encryptedText: String; key: String; iv: String; onComplete: (plainText: String) => void; onFailure?: (err: String) => void }): void;

    generateKey(length: Number): String;
  };
};

export = Crypto;
