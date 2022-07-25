import { NativeMobileComponent } from '../../core/native-mobile-component';
import AndroidConfig from '../../util/Android/androidconfig';
import ISecureData from './securedata';
const NativeSFKeyStore = requireClass('io.smartface.android.sfcore.global.SFKeyStore');

class SecureDataAndroid extends NativeMobileComponent implements ISecureData {
  protected _key: string;
  protected _service?: string;
  constructor(params: any) {
    super(params);
  }
  get key() {
    return this._key;
  }
  set key(value) {}
  protected createNativeObject(params) {
    if (!params || !params.key) {
      throw new Error('Constructor parameters must have key parameter.');
    }

    const nativeObject = new NativeSFKeyStore(params.key);
    AndroidConfig.activity.getLifecycle().addObserver(nativeObject);
    return nativeObject;
  }
  service: string | undefined;
  read(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.nativeObject.decryptData(function (msg, error) {
        if (error) reject(msg);
        else resolve(msg);
      });
    });
  }
  save(params): Promise<void> {
    return new Promise((resolve, reject) => {
      this.nativeObject.encryptData(params.value, function (msg, error) {
        if (error) reject(msg);
        else resolve();
      });
    });
  }
  delete(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.nativeObject.deleteEntry(function (msg, error) {
        if (error) reject(msg);
        else resolve();
      });
    });
  }
}

export default SecureDataAndroid;
