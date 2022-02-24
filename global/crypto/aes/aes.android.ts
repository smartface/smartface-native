import { AbstractAES } from './aes';

class AESAndroid implements AbstractAES {
  static AESCrypto = requireClass('io.smartface.android.sfcore.global.crypto.AESCrypto');
  static generateKey(length = 32) {
    return AESAndroid.AESCrypto.generateKey(length);
  }
  static encryptGCMAsync(params: { plainText: string; key: string; ivSize: number; onComplete: (encryptedText: string, iv: string) => void; onFailure: (err: string) => void }) {
    const { plainText, key, ivSize = 16, onComplete = () => {}, onFailure = () => {} } = params;
    AESAndroid.AESCrypto.encryptGCMAsync(plainText, key, ivSize, {
      onComplete,
      onFailure
    });
  }
  static decryptGCMAsync(params: { encryptedText: string; key: string; iv: string; onComplete: (decryptedText: string) => void; onFailure: (err: string) => void }) {
    const { encryptedText, key, iv, onComplete = () => {}, onFailure = () => {} } = params;

    AESAndroid.AESCrypto.decryptGCMAsync(encryptedText, key, iv, {
      onComplete,
      onFailure
    });
  }
}

export default AESAndroid;
