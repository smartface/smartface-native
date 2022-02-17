export declare class AESBase {
  static encryptGCMAsync: (params: { plainText: string; key: string; ivSize: number; onComplete: (encryptedText: string, iv: string) => void; onFailure: (err: string) => void }) => void;
  static decryptGCMAsync: (params: { encryptedText: string; key: string; iv: string; onComplete: (decryptedText: string) => void; onFailure: (err: string) => void }) => void;
  static generateKey: (length: number) => string;
}