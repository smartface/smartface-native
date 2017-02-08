const NativeBuild          = requireClass('android.os.Build');
const NativeIntent         = requireClass('android.content.Intent');
const NativeIntentFilter   = requireClass('android.content.IntentFilter');
const NativeBatteryManager = requireClass('android.os.BatteryManager');
const NativeContext        = requireClass('android.content.Context');
const NativeClipData       = requireClass('android.content.ClipData');
const NativeViewConfig     = requireClass('android.view.ViewConfiguration');
const NativeLocale         = requireClass('java.util.Locale');

const System = {};
System.android = {};

Object.defineProperties(System, {
    'language': {
        get: function() {
            return NativeLocale.getDefault().getDisplayLanguage();
        },
        configurable: false
    },
    'OS': {
        get: function() {
            return "Android";
        },
        configurable: false
    },
    'OSVersion': {
        get: function() {
            return NativeBuild.VERSION.RELEASE;
        },
        configurable: false
    },
    'isBatteryCharged': {
        get: function() {
            var batteryStatus = getBatteryIntent().getIntExtra(NativeBatteryManager.EXTRA_STATUS, -1);
            return batteryStatus === NativeBatteryManager.BATTERY_STATUS_CHARGING;
        },
        configurable: false
    },
    'batteryLevel': {
        get: function() {
            var level = getBatteryIntent().getIntExtra(NativeBatteryManager.EXTRA_LEVEL, -1);
            var scale = getBatteryIntent().getIntExtra(NativeBatteryManager.EXTRA_SCALE, -1);
            return (level / scale) * 100;
        },
        configurable: false
    },
    'clipboard': {
        get: function() {
            var clipboard = Android.getActivity().getSystemService(NativeContext.CLIPBOARD_SERVICE);
            var storedData = clipboard.getPrimaryClip();
            if (storedData != null) { // NEEDED!
                return storedData.getItemAt(0).getText();
            } else {
                return null;
            }
        },
        set: function(text) {
            var clip = NativeClipData.newPlainText("nf-core", text);
            var clipboard = Android.getActivity().getSystemService(NativeContext.CLIPBOARD_SERVICE);
            clipboard.setPrimaryClip(clip);
        },
        configurable: false
    }
});

Object.defineProperties(System.android, {
    'apiLevel': {
        get: function() {
            return NativeBuild.VERSION.SDK_INT;
        },
        configurable: false
    },
    'menuKeyAvaliable': {
        get: function() {
            var activity = Android.getActivity();
            return NativeViewConfig.get(activity).hasPermanentMenuKey();
        },
        configurable: false
    }
});

// TODO: open after fixing [AND-2592]
// System.android.isApplicationInstalled = function(packageName) {
//     var packageList = Android.getActivity().getPackageManager().getInstalledApplications(0);
//     for (var i = 0; i < packageList.size(); i++) {
//         if(packageList.get(i).packageName.equals(packageName)) {
//             return true;
//         }
//     }
//     return false;
// };

System.vibrate = function() {
    var vibrator = Android.getActivity().getSystemService(NativeContext.VIBRATOR_SERVICE);
    vibrator.vibrate(500);
};

function getBatteryIntent() {
    var intent = NativeIntent.ACTION_BATTERY_CHANGED;
    var intentFilter = new NativeIntentFilter(intent);
    return Android.getActivity().registerReceiver(null, intentFilter);
};

module.exports = System;