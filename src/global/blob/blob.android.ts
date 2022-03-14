import Base64Util from 'src/util/base64';
import IBlob from './blob';

const NativeBlob = requireClass('io.smartface.android.sfcore.global.SFBlob');
const NativeByteArrayOutputStream = requireClass('java.io.ByteArrayOutputStream');
const NativeBase64 = requireClass('android.util.Base64');

class BlobAndroid implements IBlob {
  private _parts: string[];
  private _type: string;
  constructor(parts?: string[], properties?: { type: string }) {
    if (parts && properties?.type) {
      this._type = properties.type;
      this.nativeObject = new NativeByteArrayOutputStream();
      if (Array.isArray(parts)) {
        this.nativeObject.write(array(parts, 'byte'));
      } else {
        this.nativeObject.write(parts);
      }
      // TODO: This line added for AND-3357.
      // But investigate whether parts property is need.
      this._parts = parts;
    }
  }
  nativeObject: { [key: string]: any };
  get type(): string {
    return this._type;
  }
  get size(): number {
    return this.nativeObject && arrayLength(this.nativeObject.toByteArray());
  }
  slice(start: number, end: number): IBlob {
    const newBlob = new BlobAndroid();
    const byteArray = this.nativeObject.toByteArray();
    newBlob.nativeObject.write(byteArray, arrayLength(byteArray) - start, end - start); //  write(byte[] b, int off, int len)
    return newBlob;
  }
  toBase64() {
    const byteArray = this.nativeObject.toByteArray();
    const encodedString = NativeBase64.encodeToString(byteArray, NativeBase64.NO_WRAP);
    return encodedString;
  }
  toBase64Async(callbacks: { onComplete: (base64: String) => void; onFailure?: () => void }) {
    NativeBlob.toBase64Async(this.nativeObject, callbacks);
  }

  toString() {
    return this.nativeObject.toString();
  }
  /** @todo
   * Error: Attempt to invoke virtual method 'int io.smartface.ExposingEngine.FastArray.size()' on a null object reference
   */
  static createFromBase64(base64String: string) {
    const byteArray = NativeBase64.decode(base64String, NativeBase64.NO_WRAP);
    const newBlob = new BlobAndroid(byteArray, {
      type: 'image'
    });
    return newBlob;
  }
  static createFromUTF8String(str: string) {
    // utf string or string
    const utf8Array = Base64Util.StrToUtf8Array(str);
    return new BlobAndroid(array(utf8Array, 'byte'), {
      type: 'text'
    });
  }

  get parts() {
    return this._parts;
  }
}

export default BlobAndroid;
