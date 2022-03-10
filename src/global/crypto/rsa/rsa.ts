export declare class AbstractRSA {
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
  static encrypt: (params: { plainText: string; key: string; cipherType?: string }) => string;
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
  static decrypt: (params: { encryptedText: string; key: string; cipherType?: string }) => string;
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
  static generateKeyPair: (params: { keySize: number }) => string;
  static ios: {
    /**
     * On iOS, instead of using getBase64PublicString to retrieve generated public key, using this will yield better result.
     * @param {String} key RSA public key
     * @ios
     */
    getExportedPublicKey: (key: string) => string;
  };
}
