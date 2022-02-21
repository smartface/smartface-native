import { BaseData } from './data';

class DataIOS implements BaseData {
  static ios = {
    getNativeObject() {
      return new __SF_NSUserDefaults('SF_USER_DEFAULTS');
    }
  };
  static getStringVariable(key: string) {
    if (typeof key === 'string') {
      return DataIOS.ios.getNativeObject().stringForKey(key);
    }
  }

  static getBooleanVariable(key: string) {
    let retval = null;
    if (typeof key === 'string' && DataIOS.ios.getNativeObject().objectForKey(key) !== undefined) {
      retval = DataIOS.ios.getNativeObject().boolForKey(key);
    }
    return retval;
  }

  static getIntVariable(key: string) {
    let retval = null;
    if (typeof key === 'string' && DataIOS.ios.getNativeObject().objectForKey(key) !== undefined) {
      retval = DataIOS.ios.getNativeObject().integerForKey(key);
    }
    return retval;
  }

  static getFloatVariable(key: string) {
    let retval = null;
    if (typeof key === 'string' && DataIOS.ios.getNativeObject().objectForKey(key) !== undefined) {
      retval = DataIOS.ios.getNativeObject().floatForKey(key);
    }
    return retval;
  }

  static getLongVariable(key: string) {
    let retval = null;
    if (typeof key === 'string' && DataIOS.ios.getNativeObject().objectForKey(key) !== undefined) {
      retval = DataIOS.ios.getNativeObject().doubleForKey(key);
    }
    return retval;
  }

  static setStringVariable(key: string, value: string) {
    if (typeof key === 'string' && typeof value === 'string') {
      DataIOS.ios.getNativeObject().setObjectForKey(value, key);
      return DataIOS.ios.getNativeObject().synchronize();
    }
  }

  static setBooleanVariable(key: string, value: boolean) {
    if (typeof key === 'string' && typeof value === 'boolean') {
      DataIOS.ios.getNativeObject().setBoolForKey(value, key);
      return DataIOS.ios.getNativeObject().synchronize();
    }
  }

  static setIntVariable(key: string, value: number) {
    if (typeof key === 'string' && typeof value === 'number') {
      DataIOS.ios.getNativeObject().setIntegerForKey(value, key);
      return DataIOS.ios.getNativeObject().synchronize();
    }
  }

  static setFloatVariable(key: string, value: number) {
    if (typeof key === 'string' && typeof value === 'number') {
      DataIOS.ios.getNativeObject().setFloatForKey(value, key);
      return DataIOS.ios.getNativeObject().synchronize();
    }
  }

  static setLongVariable(key: string, value: number) {
    if (typeof key === 'string' && typeof value === 'number') {
      DataIOS.ios.getNativeObject().setDoubleForKey(value, key);
      return DataIOS.ios.getNativeObject().synchronize();
    }
  }

  static containsVariable(key: string) {
    if (typeof key === 'string') {
      let retval = false;
      if (DataIOS.ios.getNativeObject().objectForKey(key) !== undefined) {
        retval = true;
      }
      return retval;
    }
  }

  static removeVariable(key: string) {
    if (typeof key === 'string') {
      DataIOS.ios.getNativeObject().removeObjectForKey(key);
      return DataIOS.ios.getNativeObject().synchronize();
    }
  }

  static removeAllVariables() {
    const dictionary = DataIOS.ios.getNativeObject().dictionaryRepresentation();
    for (const key in dictionary) {
      //TODO: prototype method
      // eslint-disable-next-line no-prototype-builtins
      if (dictionary.hasOwnProperty(key)) {
        DataIOS.ios.getNativeObject().removeObjectForKey(key);
      }
    }
    return DataIOS.ios.getNativeObject().synchronize();
  }
}

export default DataIOS;
