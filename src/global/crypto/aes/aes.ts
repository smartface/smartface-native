export declare class AbstractAES {
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
  static encryptGCMAsync: (params: { plainText: string; key: string; ivSize: number; onComplete: (encryptedText: string, iv: string) => void; onFailure: (err: string) => void }) => void;
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
  static decryptGCMAsync: (params: { encryptedText: string; key: string; iv: string; onComplete: (decryptedText: string) => void; onFailure: (err: string) => void }) => void;
  /**
   * Used to generate secure random key with given size. Key could be one of 16, 24, or 32 bytes
   *
   * @method generateKey
   * @param {Number} [size = 32]
   * @ios
   * @android
   * @since 4.4
   */
  static generateKey: (length: number) => string;
}
