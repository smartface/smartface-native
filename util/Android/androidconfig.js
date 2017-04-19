function AndroidConfig() {}

const NativeBuildConfig = requireClass(Android.getActivity().getPackageName()+".BuildConfig");
const NativeBuild = requireClass("android.os.Build");

AndroidConfig.isEmulator = (NativeBuildConfig.FLAVOR.toLowerCase().indexOf("emulator") !== -1);
AndroidConfig.packageName = Android.getActivity().getPackageName();
AndroidConfig.sdkVersion = NativeBuild.VERSION.SDK_INT;

AndroidConfig.SDK = {};
AndroidConfig.SDK.SDK_NOUGAT = 24;
AndroidConfig.SDK.SDK_MARSHMALLOW = 23;
AndroidConfig.SDK.SDK_LOLLIPOP = 21;
AndroidConfig.SDK.SDK_KITKAT = 19;

var classesCache = {};
var servicesCache = {};
var activity = Android.getActivity();

AndroidConfig.getClass = function(className){
    if(classesCache[className]){
        return classesCache[className];
    }
    const NativeClass = requireClass('java.lang.Class');
    classesCache[className] = NativeClass.forName(className);
    return classesCache[className];
}

AndroidConfig.getSystemService = function(serviceName, serviceClassName){
    if(!servicesCache[serviceName]){
        if(AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_MARSHMALLOW){
            var serviceClass = AndroidConfig.getClass(serviceClassName);
            servicesCache[serviceName] = activity.getSystemService(serviceClass);
        }
        else{
            servicesCache[serviceName] = activity.getSystemService(serviceName);
        }
    }
    return servicesCache[serviceName];
}

module.exports = AndroidConfig;