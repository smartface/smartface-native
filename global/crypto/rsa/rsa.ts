export declare class RSABase {
  static encrypt: (params: { plainText: string; key: string; cipherType?: string }) => string;
  static decrypt: (params: { encryptedText: string; key: string; cipherType?: string }) => string;
  static generateKeyPair: (params: { keySize: number }) => string;
  static ios: {
    getExportedPublicKey: (key: string) => string;
  };
}
