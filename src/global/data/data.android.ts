import AndroidConfig from '../../util/Android/androidconfig';
import TypeUtil from '../../util/type';
import { IData } from './data';

class DataAndroidClass implements IData {
  private jsSharedPreferences = AndroidConfig.activity.getSharedPreferences('JS', 0);
  getStringVariable(key: string): string | null {
    if (TypeUtil.isString(key) && this.jsSharedPreferences.contains(key)) {
      return this.jsSharedPreferences.getString(key, null);
    }
    return null;
  }
  getBooleanVariable(key: string): boolean | null {
    if (TypeUtil.isString(key) && this.jsSharedPreferences.contains(key)) {
      return this.jsSharedPreferences.getBoolean(key, false);
    }
    return null;
  }
  getIntVariable(key: string): number | null {
    if (TypeUtil.isString(key) && this.jsSharedPreferences.contains(key)) {
      return this.jsSharedPreferences.getInt(key, -1);
    }
    return null;
  }
  getFloatVariable(key: string): number | null {
    if (TypeUtil.isString(key) && this.jsSharedPreferences.contains(key)) {
      return this.jsSharedPreferences.getFloat(key, -1);
    }
    return null;
  }
  getLongVariable(key: string): number | null {
    if (TypeUtil.isString(key) && this.jsSharedPreferences.contains(key)) {
      return this.jsSharedPreferences.getLong(key, -1);
    }
    return null;
  }
  setStringVariable(key: string, value: string): void {
    if (TypeUtil.isString(key) && TypeUtil.isString(value)) {
      this.jsSharedPreferences.edit().putString(key, value).commit();
    }
  }
  setBooleanVariable(key: string, value: boolean): void {
    if (TypeUtil.isString(key) && TypeUtil.isBoolean(value)) {
      this.jsSharedPreferences.edit().putBoolean(key, value).commit();
    }
  }
  setIntVariable(key: string, value: number): void {
    if (TypeUtil.isString(key) && TypeUtil.isNumeric(value)) {
      this.jsSharedPreferences.edit().putInt(key, value).commit();
    }
  }
  setFloatVariable(key: string, value: number): void {
    if (TypeUtil.isString(key) && TypeUtil.isNumeric(value)) {
      this.jsSharedPreferences.edit().putFloat(key, value).commit();
    }
  }
  setLongVariable(key: string, value: number): void {
    if (TypeUtil.isString(key) && TypeUtil.isNumeric(value)) {
      this.jsSharedPreferences.edit().putLong(key, long(value)).commit();
    }
  }
  containsVariable(key: string): boolean {
    if (TypeUtil.isString(key)) {
      return this.jsSharedPreferences.contains(key);
    }
    return false;
  }
  removeVariable(key: string): void {
    if (TypeUtil.isString(key)) {
      this.jsSharedPreferences.edit().remove(key).commit();
    }
  }
  removeAllVariables(): void {
    this.jsSharedPreferences.edit().clear().commit();
  }
}

const DataAndroid = new DataAndroidClass();
export default DataAndroid;
