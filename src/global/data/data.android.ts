import AndroidConfig from '../../util/Android/androidconfig';
import TypeUtil from '../../util/type';
import { BaseData } from './data';

class DataAndroid implements BaseData {
  private static activity = AndroidConfig.activity;
  private static jsSharedPreferences = DataAndroid.activity.getSharedPreferences('JS', 0);
  static getStringVariable(key: string) {
    if (TypeUtil.isString(key) && DataAndroid.jsSharedPreferences.contains(key)) {
      return DataAndroid.jsSharedPreferences.getString(key, null);
    }
    return null;
  }
  static getBooleanVariable(key: string) {
    if (TypeUtil.isString(key) && DataAndroid.jsSharedPreferences.contains(key)) {
      return DataAndroid.jsSharedPreferences.getBoolean(key, false);
    }
    return null;
  }
  static getIntVariable(key: string) {
    if (TypeUtil.isString(key) && DataAndroid.jsSharedPreferences.contains(key)) {
      return DataAndroid.jsSharedPreferences.getInt(key, -1);
    }
    return null;
  }
  static getFloatVariable(key: string) {
    if (TypeUtil.isString(key) && DataAndroid.jsSharedPreferences.contains(key)) {
      return DataAndroid.jsSharedPreferences.getFloat(key, -1);
    }
    return null;
  }
  static getLongVariable(key: string) {
    if (TypeUtil.isString(key) && DataAndroid.jsSharedPreferences.contains(key)) {
      return DataAndroid.jsSharedPreferences.getLong(key, -1);
    }
    return null;
  }
  static setStringVariable(key: string, value: string) {
    if (TypeUtil.isString(key) && TypeUtil.isString(value)) {
      DataAndroid.jsSharedPreferences.edit().putString(key, value).commit();
    }
  }
  static setBooleanVariable(key: string, value: boolean) {
    if (TypeUtil.isString(key) && TypeUtil.isBoolean(value)) {
      DataAndroid.jsSharedPreferences.edit().putBoolean(key, value).commit();
    }
  }
  static setIntVariable(key: string, value: number) {
    if (TypeUtil.isString(key) && TypeUtil.isNumeric(value)) {
      DataAndroid.jsSharedPreferences.edit().putInt(key, value).commit();
    }
  }
  static setFloatVariable(key: string, value: number) {
    if (TypeUtil.isString(key) && TypeUtil.isNumeric(value)) {
      DataAndroid.jsSharedPreferences.edit().putFloat(key, value).commit();
    }
  }
  static setLongVariable(key: string, value: number) {
    if (TypeUtil.isString(key) && TypeUtil.isNumeric(value)) {
      DataAndroid.jsSharedPreferences.edit().putLong(key, long(value)).commit();
    }
  }
  static containsVariable(key: string) {
    if (TypeUtil.isString(key)) {
      return DataAndroid.jsSharedPreferences.contains(key);
    }
  }
  static removeVariable(key: string) {
    if (TypeUtil.isString(key)) {
      DataAndroid.jsSharedPreferences.edit().remove(key).commit();
    }
  }
  static removeAllVariables() {
    DataAndroid.jsSharedPreferences.edit().clear().commit();
  }
}

export default DataAndroid;
