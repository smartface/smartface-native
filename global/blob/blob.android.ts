import NativeComponent from 'core/native-component';
import Base64Util from 'util/base64';
import Blob from './blob';

const NativeBlob = requireClass('io.smartface.android.sfcore.global.SFBlob');
const NativeByteArrayOutputStream = requireClass('java.io.ByteArrayOutputStream');

class BlobAndroid extends NativeComponent {
  private _parts: string[];
  private _type: string;
  constructor(parts?: string[], properties?: { type: string }) {
    super();
    if (parts && properties && properties.type) {
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
  get type(): string {
    return this._type;
  }
  get size(): number {
    //TODO: arrayLength
    return this.nativeObject && arrayLength(this.nativeObject.toByteArray());
  }
  slice(start: number, end: number): Blob {
    var newBlob = new Blob();
    var byteArray = this.nativeObject.toByteArray();
    newBlob.nativeObject.write(byteArray, arrayLength(byteArray) - start, end - start); //  write(byte[] b, int off, int len)
    return newBlob;
  }
  toBase64() {
    const NativeBase64 = requireClass('android.util.Base64');
    let byteArray = this.nativeObject.toByteArray();
    let encodedString = NativeBase64.encodeToString(byteArray, NativeBase64.NO_WRAP);
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
    const NativeBase64 = requireClass('android.util.Base64');
    let byteArray = NativeBase64.decode(base64String, NativeBase64.NO_WRAP);
    let newBlob = new Blob(byteArray, {
      type: 'image'
    });
    return newBlob;
  }
  static createFromUTF8String(str: string) {
    // utf string or string
    var utf8Array = Base64Util.StrToUtf8Array(str);
    return new Blob(array(utf8Array, 'byte'), {
      type: 'text'
    });
  }
}

export default BlobAndroid;
