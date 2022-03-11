import { AndroidConfig } from '../../util';
import { SecureDataBase } from './securedata';
const NativeSFKeyStore = requireClass('io.smartface.android.sfcore.global.SFKeyStore');

class SecureDataAndroid extends SecureDataBase {
  constructor(params: { key: string }) {
    super();
    if (!params || !params.key) {
      throw new Error('Constructor parameters must have key parameter.');
    }

    if (!this.nativeObject) {
      this.nativeObject = new NativeSFKeyStore(params.key);
      AndroidConfig.activity.getLifecycle().addObserver(this.nativeObject);
    }
  }
  get key() {
    return this._key;
  }
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
