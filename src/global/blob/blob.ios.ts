import { NativeMobileComponent } from '../../core/native-mobile-component';
import IBlob from './blob';

export default class BlobIOS extends NativeMobileComponent implements IBlob {
  protected createNativeObject(parts) {
    return parts;
  }
  constructor(parts: string[], properties?: { type: string }) {
    super(parts as any);
    this.addAndroidProps(this.getAndroidProps());
  }
  private getAndroidProps() {
    const self = this;
    return {
      slice: () => {
        return self;
      }
    };
  }
  type: string;
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
    this.nativeObject.toBase64Async((base64: string) => {
      if (base64) {
        onComplete?.(base64);
      } else {
        onFailure?.(base64);
      }
    });
  }
  static __base64AddPadding(str: string) {
    return str + Array(((4 - (str.length % 4)) % 4) + 1).join('=');
  }
  static createFromBase64(base64: string) {
    return new BlobIOS(__SF_NSData.base64Encoded(BlobIOS.__base64AddPadding(base64)));
  }
  static createFromUTF8String(utf8String: string) {
    return new BlobIOS(__SF_NSData.dataFromUTF8String(utf8String));
  }
}
