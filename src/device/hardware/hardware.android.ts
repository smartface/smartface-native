import { HardwareBase } from './hardware';
import AndroidConfig from '../../util/Android/androidconfig';

const NativeSettings = requireClass('android.provider.Settings');
const NativeBuild = requireClass('android.os.Build');
// Context.TELEPHONY_SERVICE
const TELEPHONY_SERVICE = 'phone';
const TELEPHONY_MANAGER = 'android.telephony.TelephonyManager';

class HardwareAndroid implements HardwareBase {
  static IMEI = '-1';
  static MANUFACTURER = NativeBuild.MANUFACTURER;
  static ios = { microphone: { requestRecordPermission() {} } };
  static brandModel = NativeBuild.MODEL;
  static brandName = NativeBuild.BRAND;
  static get android() {
    return {
      get IMEI() {
        const telephonyManager = AndroidConfig.getSystemService(TELEPHONY_SERVICE, TELEPHONY_MANAGER);
        return telephonyManager.getDeviceId();
      },
      get vendorId() {
        return NativeBuild.SERIAL;
      }
    };
  }
  static get UID() {
    const activity = AndroidConfig.activity;
    const contentResolver = activity.getContentResolver();
    return NativeSettings.Secure.getString(contentResolver, NativeSettings.Secure.ANDROID_ID);
  }
  static getDeviceModelName() {
    return HardwareAndroid.MANUFACTURER + ' ' + HardwareAndroid.brandName + ' ' + HardwareAndroid.brandModel;
  }
}

export default HardwareAndroid;
