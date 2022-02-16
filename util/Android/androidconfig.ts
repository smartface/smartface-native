const SpratAndroidActivity = requireClass('io.smartface.android.SpratAndroidActivity').getActivity();
const NativeBuild = requireClass('android.os.Build');
const NativeClass = requireClass('java.lang.Class');

const PACKAGE_NAME = SpratAndroidActivity.getPackageName();
const EMULATOR_KEYWORD = 'emulator';

const NativeBuildConfig = requireClass(PACKAGE_NAME + '.BuildConfig');

const classesCache = new Map();
const servicesCache = new Map();

export default abstract class AndroidConfig {
  static readonly isEmulator = (NativeBuildConfig.FLAVOR as string).toLowerCase().indexOf(EMULATOR_KEYWORD) !== -1;
  static readonly packageName = PACKAGE_NAME;
  static readonly sdkVersion = NativeBuild.VERSION.SDK_INT;
  static readonly SDK = Object.freeze({
    SDK_NOUGAT: 24,
    SDK_MARSHMALLOW: 23,
    SDK_LOLLIPOP: 21,
    SDK_KITKAT: 19
  });
  static readonly activity = SpratAndroidActivity;
  static readonly activityResources = AndroidConfig.activity.getResources();
  static getResourceId(resourceName: string, type: any) {
    return AndroidConfig.activity.getResources().getIdentifier(resourceName, type, PACKAGE_NAME);
  }
  static getClass(className: string) {
    if (!classesCache.has(className)) {
      classesCache.set(className, NativeClass.forName(className));
    }
    return classesCache.get(className);
  }
  static getSystemService(serviceName: string, serviceClassName: string) {
    if (!servicesCache.has(serviceName)) {
      if (AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_MARSHMALLOW) {
        const serviceClass = AndroidConfig.getClass(serviceClassName);
        servicesCache.set(serviceName, AndroidConfig.activity.getSystemService(serviceClass));
      } else {
        servicesCache.set(serviceName, AndroidConfig.activity.getSystemService(serviceName));
      }
    }
    return servicesCache.get(serviceName);
  }
}
