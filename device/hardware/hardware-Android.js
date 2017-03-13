const NativeContext  = requireClass('android.content.Context');
const NativeSettings = requireClass('android.provider.Settings');
const NativeBuild    = requireClass('android.os.Build');

const Hardware = {};

Hardware.android = {};

Object.defineProperty(Hardware.android, 'IMEI', {
    get: function () {
        var activity = Android.getActivity();
        var telephonyManager;
        if (NativeBuild.VERSION.SDK_INT < 23) {
            telephonyManager = activity.getSystemService(NativeContext.TELEPHONY_SERVICE);
        } else {
            const NativeClass = requireClass('java.lang.Class');
            const NativeTelephonyManagerClass = NativeClass.forName('android.telephony.TelephonyManager');
            telephonyManager = activity.getSystemService(NativeTelephonyManagerClass);
        }
        return telephonyManager.getDeviceId();
    },
    configurable: false
});

Object.defineProperty(Hardware, 'UID', {
    get: function () {
        var activity = Android.getActivity();
        var contentResolver = activity.getContentResolver();

        return NativeSettings.Secure.getString(contentResolver, NativeSettings.Secure.ANDROID_ID);
    },
    configurable: false
});

Object.defineProperty(Hardware, 'brandName', {
    get: function () {
        return NativeBuild.BRAND;
    },
    configurable: false
});

Object.defineProperty(Hardware, 'brandModel', {
    get: function () {
        return NativeBuild.MODEL;
    },
    configurable: false
});

Object.defineProperty(Hardware.android, 'vendorID', {
    get: function () {
        return NativeBuild.SERIAL;
    },
    configurable: false
});

module.exports = Hardware;