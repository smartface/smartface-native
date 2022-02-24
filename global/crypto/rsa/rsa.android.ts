const ENCRYPT_ALGORITHM = 'RSA';

import { AbstractRSA } from './rsa';

class RSAAndroid implements AbstractRSA {
  static SFCrypto = requireClass('io.smartface.android.sfcore.global.crypto.RSACrypto');
  static generateKeyPair(params: { keySize: number }) {
    const { keySize = 2048 } = params;
    const keyPair = RSAAndroid.SFCrypto.generateKeyPair(keySize, ENCRYPT_ALGORITHM);
    return {
      publicKey: keyPair.getPublicKeyBase64(),
      privateKey: keyPair.getPrivateKeyBase64()
    };
  }
  static encrypt(params: { plainText: string; key: string; cipherType: string }) {
    const { plainText, key, cipherType } = params;
    return RSAAndroid.SFCrypto.encrypt(plainText, key, cipherType, ENCRYPT_ALGORITHM);
  }
  static decrypt(params: { encryptedText: string; key: string; cipherType: string }) {
    const { encryptedText, key, cipherType } = params;
    return RSAAndroid.SFCrypto.decrypt(encryptedText, key, cipherType, ENCRYPT_ALGORITHM);
  }
  static ios = {
    getExportedPublicKey() {}
  };
}

export default RSAAndroid;
