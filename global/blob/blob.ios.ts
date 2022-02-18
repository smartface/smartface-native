import { BlobBase } from './blob';

class BlobIOS extends BlobBase {
  constructor(parts: string[], properties?: { type: string }) {
    super();
    if (!this.nativeObject) {
      this.nativeObject = parts;
    }
  }
  get size() {
    return this.nativeObject.length;
  }
  toBase64() {
    return this.nativeObject.toBase64();
  }
  toString() {
    return this.nativeObject.toUtf8();
  }
  toBase64Async(handlers: { onComplete: (base64: string) => void; onFailure?: (base64: string) => void }) {
    const onComplete = handlers.onComplete;
    const onFailure = handlers.onFailure;
    this.nativeObject.toBase64Async(function (base64: string) {
      if (base64) {
        if (typeof onComplete == 'function') {
          onComplete(base64);
        }
      } else {
        if (typeof onFailure == 'function') {
          onFailure(base64);
        }
      }
    });
  }
  static __base64AddPadding(str: string) {
    return str + Array(((4 - (str.length % 4)) % 4) + 1).join('=');
  }
  static createFromBase64(base64: string) {
    //TODO: __SF
    return new BlobIOS(__SF_NSData.base64Encoded(BlobIOS.__base64AddPadding(base64)));
  }
  static createFromUTF8String(utf8String: string) {
    //TODO: __SF
    return new BlobIOS(__SF_NSData.dataFromUTF8String(utf8String));
  }
}

export default BlobIOS;
