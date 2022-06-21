import { IData } from './data';

class DataIOSClass implements IData {
  private nativeData: __SF_NSUserDefaults;
  constructor() {
    this.nativeData = new __SF_NSUserDefaults('SF_USER_DEFAULTS');
  }
  getBooleanVariable(key: string): boolean | null {
    let retval = null;
    if (typeof key === 'string' && this.nativeData.objectForKey(key) !== undefined) {
      retval = this.nativeData.boolForKey(key);
    }
    return retval;
  }
  getStringVariable(key: string): string | null {
    if (typeof key === 'string') {
      return this.nativeData.stringForKey(key);
    } else {
      return null;
    }
  }
  getIntVariable(key: string): number | null {
    let retval = null;
    if (typeof key === 'string' && this.nativeData.objectForKey(key) !== undefined) {
      retval = this.nativeData.integerForKey(key);
    }
    return retval;
  }
  getFloatVariable(key: string): number | null {
    let retval = null;
    if (typeof key === 'string' && this.nativeData.objectForKey(key) !== undefined) {
      retval = this.nativeData.floatForKey(key);
    }
    return retval;
  }
  getLongVariable(key: string): number | null {
    let retval = null;
    if (typeof key === 'string' && this.nativeData.objectForKey(key) !== undefined) {
      retval = this.nativeData.doubleForKey(key);
    }
    return retval;
  }
  setStringVariable(key: string, value: string): void {
    if (typeof key === 'string' && typeof value === 'string') {
      this.nativeData.setObjectForKey(value, key);
      this.nativeData.synchronize();
    }
  }
  setBooleanVariable(key: string, value: boolean): void {
    if (typeof key === 'string' && typeof value === 'boolean') {
      this.nativeData.setBoolForKey(value, key);
      this.nativeData.synchronize();
    }
  }
  setIntVariable(key: string, value: number): void {
    if (typeof key === 'string' && typeof value === 'number') {
      this.nativeData.setIntegerForKey(value, key);
      this.nativeData.synchronize();
    }
  }
  setFloatVariable(key: string, value: number): void {
    if (typeof key === 'string' && typeof value === 'number') {
      this.nativeData.setFloatForKey(value, key);
      return this.nativeData.synchronize();
    }
  }
  setLongVariable(key: string, value: number): void {
    if (typeof key === 'string' && typeof value === 'number') {
      this.nativeData.setDoubleForKey(value, key);
      this.nativeData.synchronize();
    }
  }
  containsVariable(key: string): boolean {
    if (typeof key === 'string') {
      let retval = false;
      if (this.nativeData.objectForKey(key) !== undefined) {
        retval = true;
      }
      return retval;
    } else {
      return false;
    }
  }
  removeVariable(key: string): void {
    if (typeof key === 'string') {
      this.nativeData.removeObjectForKey(key);
      this.nativeData.synchronize();
    }
  }
  removeAllVariables(): void {
    const dictionary = this.nativeData.dictionaryRepresentation();
    for (const key in dictionary) {
      //TODO: prototype method
      // eslint-disable-next-line no-prototype-builtins
      if (dictionary.hasOwnProperty(key)) {
        this.nativeData.removeObjectForKey(key);
      }
    }
    this.nativeData.synchronize();
  }
}

const DataIOS = new DataIOSClass();
export default DataIOS;
