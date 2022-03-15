import { AbstractSystem, BiometryType, OSType } from '.';
import Application from '../../application';
import Invocation from '../../util/iOS/invocation';

class SystemIOS implements AbstractSystem {
  OSVersion = __SF_UIDevice.currentDevice().systemVersion;
  OS = OSType.IOS;
  OSType = OSType;
  BiometryType = BiometryType;
  android = {
    isApplicationInstalled() {}
  };
  private _ios = {};
  constructor() {
    const self = this;
    const ios = {
      validateFingerPrint(params) {
        self.validateFingerPrint(params);
      }
    };
    Object.assign(this._ios, ios);
  }
  get region() {
    const argCountryCode = new Invocation.Argument({
      type: 'NSString',
      value: 'kCFLocaleCountryCodeKey'
    });
    return Invocation.invokeInstanceMethod(__SF_NSLocale.currentLocale(), 'objectForKey:', [argCountryCode], 'NSString');
  }
  get language() {
    const argLanguageCode = new Invocation.Argument({
      type: 'NSString',
      value: 'kCFLocaleLanguageCodeKey'
    });
    return Invocation.invokeInstanceMethod(__SF_NSLocale.currentLocale(), 'objectForKey:', [argLanguageCode], 'NSString');
  }
  get batteryLevel() {
    __SF_UIDevice.currentDevice().batteryMonitoringEnabled = true;
    return __SF_UIDevice.currentDevice().batteryLevel;
  }
  get isBatteryCharged() {
    __SF_UIDevice.currentDevice().batteryMonitoringEnabled = true;
    if (__SF_UIDevice.currentDevice().batteryState === 2 || __SF_UIDevice.currentDevice().batteryState === 3) {
      return true;
    } else if (__SF_UIDevice.currentDevice().batteryState === 1) {
      return false;
    }
    return false;
  }
  get clipboard() {
    return __SF_UIPasteboard.generalPasteboard().string;
  }
  set clipboard(value: string) {
    __SF_UIPasteboard.generalPasteboard().string = value;
  }
  get isEmulator() {
    const isBundleIdEmulator = Application.ios.bundleIdentifier === 'io.smartface.SmartfaceEnterpriseApp';
    return SMFApplication?.isEmulator?.() || isBundleIdEmulator;
  }
  get fingerPrintAvaliable() {
    return this.biometricsAvailable;
  }
  get biometricType() {
    const context = new __SF_LAContext();
    context.canEvaluatePolicy();
    return Invocation.invokeInstanceMethod(context, 'biometryType', [], 'NSInteger');
  }
  get ios() {
    return this._ios;
  }
  get biometricsAvailable() {
    const context = new __SF_LAContext();
    return context.canEvaluatePolicy();
  }
  vibrate() {
    __SF_UIDevice.vibrate();
  }
  validateBiometric(params: { message: string; onSuccess: () => void; onError: (cancelled?: boolean, error?: string) => void }) {
    const context = new __SF_LAContext();
    context.evaluatePolicy(params.message, params.onSuccess, params.onError);
  }
  validateFingerPrint(params: { message: string; onSuccess: () => void; onError: (cancelled?: boolean, error?: string) => void }) {
    this.validateBiometric(params);
  }
  isApplicationInstalled(packageName) {
    const url = __SF_NSURL.URLWithString(packageName);
    if (__SF_UIApplication.sharedApplication().canOpenURL(url)) {
      return true;
    } else {
      return false;
    }
  }
}

const System = new SystemIOS();

export default System;
