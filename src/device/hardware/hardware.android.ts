import { DeviceType, IHardware } from './hardware';
import AndroidConfig from '../../util/Android/androidconfig';
import { NativeMobileComponent } from '../../core/native-mobile-component';

const NativeR = requireClass(AndroidConfig.packageName + '.R');
const NativeSettings = requireClass('android.provider.Settings');
const NativeBuild = requireClass('android.os.Build');
// Context.TELEPHONY_SERVICE
const TELEPHONY_SERVICE = 'phone';
const TELEPHONY_MANAGER = 'android.telephony.TelephonyManager';

class HardwareAndroidClass extends NativeMobileComponent implements IHardware {
  constructor(params?: Partial<IHardware>) {
    super(params);
    this.addAndroidProps(this.getAndroidProps());
    this.addIOSProps(this.getIOSProps());
  }

  protected createNativeObject(params?: Partial<Record<string, any>>) {
    return null;
  }
  get brandModel() {
    return NativeBuild.MODEL;
  }
  get brandName() {
    return NativeBuild.BRAND;
  }
  get UID() {
    const activity = AndroidConfig.activity;
    const contentResolver = activity.getContentResolver();
    return NativeSettings.Secure.getString(contentResolver, NativeSettings.Secure.ANDROID_ID);
  }
  getDeviceModelName() {
    return this.modelName;
  }
  get deviceType() {
    const isTablet = AndroidConfig.activity.getResources().getBoolean(NativeR.bool.isTablet);
    return isTablet ? DeviceType.TABLET : DeviceType.PHONE;
  }
  get modelName(): string {
    return `${this.android.manufacturer} ${this.brandName} ${this.brandModel}`;
  }

  private getIOSProps(): IHardware['ios'] {
    return {
      microphone: {
        requestRecordPermission() {}
      }
    };
  }
  private getAndroidProps(): IHardware['android'] {
    return {
      get IMEI() {
        const telephonyManager = AndroidConfig.getSystemService(TELEPHONY_SERVICE, TELEPHONY_MANAGER);
        return telephonyManager.getDeviceId();
      },
      get vendorID() {
        return NativeBuild.SERIAL;
      },
      get manufacturer() {
        return NativeBuild.MANUFACTURER;
      }
    };
  }
}

const HardwareAndroid = new HardwareAndroidClass();
export default HardwareAndroid;
