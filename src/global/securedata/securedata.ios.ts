import { SecureDataBase } from './securedata';

class SecureDataIOS extends SecureDataBase {
  static _iOS = {
    _Message: {
      NOPASSWORD: 'The specified item could not be found in the keychain.',
      UNEXPECTEDPASSWORDDATA: 'Unexpected data in the keychain.',
      UNHANDLEDERROR: 'Keychain unhandled error.'
    }
  };
  constructor(params?: { key: string; ios?: { service?: any } }) {
    super();

    const _key = params && params.key;
    const _service = params && params.ios && params.ios.service;
    if (!_key || !_service) {
      throw new Error('Constructor must have service and key parameter.');
    }
    if (!this.nativeObject) {
      this.nativeObject = new __SF_KeychainPasswordItem(_service, _key, undefined);
    }

    if (params) {
      for (const param in params) {
        this[param] = params[param];
      }
    }
  }
  get service() {
    return this._service;
  }
  get key() {
    return this._key;
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
