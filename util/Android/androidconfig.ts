const SpratAndroidActivity = requireClass('io.smartface.android.SpratAndroidActivity').getActivity();
const NativeBuild = requireClass('android.os.Build');
const NativeClass = requireClass('java.lang.Class');

const PACKAGE_NAME = SpratAndroidActivity.getPackageName();
const EMULATOR_KEYWORD = 'emulator';

const NativeBuildConfig = requireClass(PACKAGE_NAME + '.BuildConfig');

const classesCache = new Map();
const servicesCache = new Map();

namespace AndroidConfig {
  export const isEmulator = (NativeBuildConfig.FLAVOR as string).toLowerCase().indexOf(EMULATOR_KEYWORD) !== -1;
  export const packageName = PACKAGE_NAME;
  export const sdkVersion = NativeBuild.VERSION.SDK_INT;
  export enum SDK {
    SDK_NOUGAT = 24,
    SDK_MARSHMALLOW = 23,
    SDK_LOLLIPOP = 21,
    SDK_KITKAT = 19
  }
  export const activity = SpratAndroidActivity;
  export const activityResources = AndroidConfig.activity.getResources();
  export function getResourceId(resourceName: string, type: any) {
    return AndroidConfig.activity.getResources().getIdentifier(resourceName, type, PACKAGE_NAME);
  }
  export function getClass(className: string) {
    if (!classesCache.has(className)) {
      classesCache.set(className, NativeClass.forName(className));
    }
    return classesCache.get(className);
  }
  export function getSystemService(serviceName: string, serviceClassName: string) {
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

export default AndroidConfig;
