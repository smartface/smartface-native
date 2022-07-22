import { NativeMobileComponent } from '../../core/native-mobile-component';
import ISecureData from './securedata';

class SecureDataIOS extends NativeMobileComponent implements ISecureData {
  protected _key: string;
  protected _service?: string;
  constructor(params?: Partial<ISecureData>) {
    super(params);
    this.addIOSProps(this.getIOSProps());
  }
  private getIOSProps() {
    const self = this;
    return {
      get service() {
        return self._service;
      }
    };
  }
  protected createNativeObject(params?: Partial<ISecureData>) {
    const _key = params?.key;
    const _service = params?.ios?.service;
    if (!_key || !_service) {
      throw new Error('Constructor must have service and key parameter.');
    }
    return new __SF_KeychainPasswordItem(_service, _key, undefined);
  }
  static _iOS = {
    _Message: {
      NOPASSWORD: 'The specified item could not be found in the keychain.',
      UNEXPECTEDPASSWORDDATA: 'Unexpected data in the keychain.',
      UNHANDLEDERROR: 'Keychain unhandled error.'
    }
  };
  get key() {
    return this._key;
  }

  set key(value: string) {
    this._key = value;
  }

  read(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.nativeObject.readPasswordWithBlock(function (e) {
        if (e.error) {
          let errorMessage;
          if (e.error.code === 1) {
            errorMessage = SecureDataIOS._iOS._Message.NOPASSWORD;
          } else if (e.error.code === 2) {
            errorMessage = SecureDataIOS._iOS._Message.UNEXPECTEDPASSWORDDATA;
          } else {
            errorMessage = SecureDataIOS._iOS._Message.UNHANDLEDERROR;
          }
          reject(errorMessage);
        } else {
          resolve(e.password);
        }
      });
    });
  }
  save(e): Promise<void> {
    return new Promise((resolve, reject) => {
      this.nativeObject.savePasswordWithBlock(e.value, function (e) {
        if (e.error) {
          reject(SecureDataIOS._iOS._Message.UNHANDLEDERROR);
        } else {
          resolve();
        }
      });
    });
  }
  delete(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.nativeObject.deleteItemWithBlock(function (e) {
        if (e.error) {
          reject(SecureDataIOS._iOS._Message.UNHANDLEDERROR);
        } else {
          resolve();
        }
      });
    });
  }
}

export default SecureDataIOS;
