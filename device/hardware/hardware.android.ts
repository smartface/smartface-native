import { HardwareBase } from './hardware';

const NativeSettings = requireClass('android.provider.Settings');
const NativeBuild = requireClass('android.os.Build');
// Context.TELEPHONY_SERVICE
const TELEPHONY_SERVICE = 'phone';
const TELEPHONY_MANAGER = 'android.telephony.TelephonyManager';

class Hardware implements HardwareBase {
  IMEI?: string;
  MANUFACTURER = NativeBuild.MANUFACTURER;
  ios = { microphone: { requestRecordPermission() {} } };
  brandModel = NativeBuild.MODEL;
  brandName = NativeBuild.BRAND;
  get android() {
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
  get UID() {
    const activity = AndroidConfig.activity;
    const contentResolver = activity.getContentResolver();
    return NativeSettings.Secure.getString(contentResolver, NativeSettings.Secure.ANDROID_ID);
  }
  getDeviceModelName() {
    return this.MANUFACTURER + ' ' + this.brandName + ' ' + this.brandModel;
  }
}

module.exports = Hardware;
