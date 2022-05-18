import { AbstractRSA } from './rsa';

class RSAIOS implements AbstractRSA {
  static SFCrypto = new __SF_SMFCrypto();
  static generateKeyPair(params: { keySize: number }) {
    const { keySize } = params;
    return RSAIOS.SFCrypto.generateKeyPair(keySize);
  }
  static encrypt(params: { plainText: string; key: string }) {
    const { plainText, key } = params;
    return RSAIOS.SFCrypto.encrypt(plainText, key);
  }
  static decrypt(params: { encryptedText: string; key: string }) {
    const { encryptedText, key } = params;
    return RSAIOS.SFCrypto.decrypt(encryptedText, key);
  }
  static ios = {
    getExportedPublicKey(key: string) {
      return RSAIOS.SFCrypto.getExportedPublicKey(key);
    }
  };
}

export default RSAIOS;
