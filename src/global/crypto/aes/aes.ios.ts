import { AbstractAES } from './aes';

class AESIOS implements AbstractAES {
  static SFCrypto = new __SF_SMFCrypto();
  static generateKey(length = 32) {
    return AESIOS.SFCrypto.generateAESKey(length);
  }
  static encryptGCMAsync(params: { plainText: string; key: string; ivSize: number; onComplete: (encryptedText: string, iv: string) => void; onFailure: (err: string) => void }) {
    const { plainText, key, ivSize = 16, onComplete = () => {}, onFailure = () => {} } = params;
    AESIOS.SFCrypto.encryptAES(plainText, key, ivSize, onComplete, onFailure);
  }
  static decryptGCMAsync(params: { encryptedText: string; key: string; iv: string; onComplete: (decryptedText: string) => void; onFailure: (err: string) => void }) {
    const { encryptedText, key, iv, onComplete = () => {}, onFailure = () => {} } = params;
    AESIOS.SFCrypto.decryptAES(encryptedText, key, iv, onComplete, onFailure);
  }
}

export default AESIOS;
