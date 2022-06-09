import { NativeMobileComponent } from '../../core/native-mobile-component';
import { DeviceType, IHardware } from './hardware';
import deviceMapping from './deviceMapping.json';

class HardwareIOSClass extends NativeMobileComponent implements IHardware {
  constructor(params?: IHardware) {
    super(params);
    this.addIOSProps(this.getIOSProps());
    this.addAndroidProps(this.getAndroidProps());
  }
  protected createNativeObject() {
    return null;
  }
  get UID() {
    return __SF_UIDevice.currentDevice().UUID;
  }
  get brandName() {
    return 'Apple';
  }
  get manufacturer() {
    // Since Apple phones are manufactured by.... Apple, we can safely assume that Apple is the manufacturer.
    return this.brandName;
  }
  get deviceType(): DeviceType {
    const nativeDeviceType = __SF_UIDevice.currentDevice().userInterfaceIdiom;
    switch (nativeDeviceType) {
      case 0:
        return DeviceType.PHONE;
      case 1:
        return DeviceType.TABLET;
      default:
        return DeviceType.UNSPECIFIED;
    }
  }

  get brandModel() {
    return __SF_UIDevice.modelName();
  }
  getDeviceModelName() {
    return this.modelName;
  }
  get modelName(): string {
    const identifier = __SF_UIDevice.modelName();
    return deviceMapping[identifier] || identifier;
  }

  private getIOSProps(): IHardware['ios'] {
    return {
      microphone: {
        requestRecordPermission(callback: (...args: any[]) => any) {
          const avaudiosession = __SF_AVAudioSession.sharedInstance();
          avaudiosession.requestRecordPermissionWithHandler((e) => {
            callback?.(e.granted);
          });
        }
      }
    };
  }
  private getAndroidProps(): IHardware['android'] {
    return {
      get IMEI() {
        return '-1';
      },
      get vendorID() {
        return 0;
      }
    };
  }
}

const HardwareIOS = new HardwareIOSClass();
export default HardwareIOS;
