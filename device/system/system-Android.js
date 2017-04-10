const AndroidConfig        = require('sf-core/util/Android/androidconfig')
const NativeBuild          = requireClass('android.os.Build');
const NativeIntentFilter   = requireClass('android.content.IntentFilter');
const NativeBatteryManager = requireClass('android.os.BatteryManager');
const NativeClipData       = requireClass('android.content.ClipData');
const NativeViewConfig     = requireClass('android.view.ViewConfiguration');
const NativeLocale         = requireClass('java.util.Locale');

//NativeIntent.ACTION_BATTERY_CHANGED
const ACTION_BATTERY_CHANGED = 'android.intent.action.BATTERY_CHANGED';

// Context.CLIPBOARD_SERVICE
const CLIPBOARD_SERVICE = 'clipboard';
const CLIPBOARD_MANAGER = 'android.content.ClipboardManager';

// Context.VIBRATOR_SERVICE
const VIBRATOR_SERVICE = 'vibrator';
const VIBRATOR_MANAGER = 'android.os.Vibrator';

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
            var clipboard = AndroidConfig.getSystemService(CLIPBOARD_SERVICE, CLIPBOARD_MANAGER);
            var storedData = clipboard.getPrimaryClip();
            if (storedData != null) { // NEEDED!
                return storedData.getItemAt(0).getText();
            } else {
                return null;
            }
        },
        set: function(text) {
            var clip = NativeClipData.newPlainText("sf-core", text);
            var clipboard = AndroidConfig.getSystemService(CLIPBOARD_SERVICE, CLIPBOARD_MANAGER);
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

System.android.isApplicationInstalled = function(packageName) {
    var packageList = Android.getActivity().getPackageManager().getInstalledApplications(0);
    for (var i = 0; i < packageList.size(); i++) {
        if(packageList.get(i).packageName === packageName) {
            return true;
        }
    }
    return false;
};

System.vibrate = function() {
    var vibrator = AndroidConfig.getSystemService(VIBRATOR_SERVICE, VIBRATOR_MANAGER);
    vibrator.vibrate(500);
};

function getBatteryIntent() {
    var intentFilter = new NativeIntentFilter(ACTION_BATTERY_CHANGED);
    return Android.getActivity().registerReceiver(null, intentFilter);
};

// iOS specifics
System.ios = {};
Object.defineProperties(System.ios, {
    'validateFingerPrint': {
        value: function(onSuccess, onError) {}
    }
});

module.exports = System;