const TypeUtil             = require('../../util/type');
const AndroidConfig        = require('../../util/Android/androidconfig')
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

//
// Context.FINGERPRINT_SERVICE
const FINGERPRINT_SERVICE = 'fingerprint';
const FINGERPRINT_MANAGER = 'android.hardware.fingerprint.FingerprintManager';

const DIALOG_FRAGMENT_TAG = "myFragment"

const System = {};
System.android = {};

Object.defineProperties(System, {
    'language': {
        get: function() {
            return string(NativeLocale.getDefault().getDisplayLanguage());
        },
        enumerable: true
    },
    'OS': {
        get: function() {
            return "Android";
        },
        enumerable: true
    },
    'OSVersion': {
        get: function() {
            return string(NativeBuild.VERSION.RELEASE);
        },
        enumerable: true
    },
    'isBatteryCharged': {
        get: function() {
            var batteryStatus = getBatteryIntent().getIntExtra(NativeBatteryManager.EXTRA_STATUS, -1);
            return batteryStatus === NativeBatteryManager.BATTERY_STATUS_CHARGING;
        },
        enumerable: true
    },
    'batteryLevel': {
        get: function() {
            var level = getBatteryIntent().getIntExtra(NativeBatteryManager.EXTRA_LEVEL, -1);
            var scale = getBatteryIntent().getIntExtra(NativeBatteryManager.EXTRA_SCALE, -1);
            return (level / scale) * 100;
        },
        enumerable: true
    },
    'clipboard': {
        get: function() {
            var clipboard = AndroidConfig.getSystemService(CLIPBOARD_SERVICE, CLIPBOARD_MANAGER);
            var storedData = clipboard.getPrimaryClip();
            if (storedData != null) { // NEEDED!
                return string(storedData.getItemAt(0).getText());
            } else {
                return null;
            }
        },
        set: function(text) {
            var clip = NativeClipData.newPlainText("sf-core", text);
            var clipboard = AndroidConfig.getSystemService(CLIPBOARD_SERVICE, CLIPBOARD_MANAGER);
            clipboard.setPrimaryClip(clip);
        },
        enumerable: true
    },
    'vibrate': {
        value: function() {
            var vibrator = AndroidConfig.getSystemService(VIBRATOR_SERVICE, VIBRATOR_MANAGER);
            vibrator.vibrate(long(500));
        },
        enumerable: true
    },
    'fingerPrintAvailable': {
        get: function() {
            if(AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_MARSHMALLOW){
                var fingerprintManager = AndroidConfig.getSystemService(FINGERPRINT_SERVICE, FINGERPRINT_MANAGER);
                return fingerprintManager && fingerprintManager.isHardwareDetected() && fingerprintManager.hasEnrolledFingerprints();
            }
            return false;
        },
        enumerable: true
    },
    'validateFingerPrint': {
        value: function(params){
            if(AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_MARSHMALLOW && this.fingerPrintAvailable){
                const NativeFingerprintAuthenticationDialogFragment = requireClass("com.android.fingerprintdialog.FingerprintAuthenticationDialogFragment");
                const NativeFingerPrintListener = requireClass("com.android.fingerprintdialog.FingerPrintListener");
                
                var fragmentManager = AndroidConfig.activity.getFragmentManager();
                var fragment = new NativeFingerprintAuthenticationDialogFragment();
                
                var listeners = NativeFingerPrintListener.implement({
                    'onError': function() {
                        params && params.onError && params.onError();
                    },
                    'onAuthenticated': function() {
                        params && params.onSuccess && params.onSuccess();
                    },
                    'onTimeout': function(){
                        params && params.onError && params.onError();
                    },
                    'onCancel': function() {
                        params && params.onError && params.onError();
                    },
                    'onLockout': function() {
                        params && params.onError && params.onError();
                    }
                });
                
                if(params && TypeUtil.isString(params.message)){
                    fragment.setMessage(params.message);
                }
                if(params && TypeUtil.isObject(params.android) && TypeUtil.isString(params.android.title)){
                    fragment.setTitle(params.android.title);
                }
                
                fragment.addFingerPrintListener(listeners);
                fragment.show(fragmentManager, DIALOG_FRAGMENT_TAG);
                return;
            }
            params && params.onError && params.onError();
        },
        enumerable: true
    }
});

Object.defineProperties(System.android, {
    'apiLevel': {
        get: function() {
            return NativeBuild.VERSION.SDK_INT;
        },
        enumerable: true
    },
    'menuKeyAvaliable': {
        get: function() {
            return NativeViewConfig.get(AndroidConfig.activity).hasPermanentMenuKey();
        },
        enumerable: true
    },
    'isApplicationInstalled': {
        value: function(packageName) {
            var packageList = AndroidConfig.activity.getPackageManager().getInstalledApplications(0);
            for (var i = 0; i < packageList.size(); i++) {
                if(string(packageList.get(i).packageName) === packageName) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true
    }
});

function getBatteryIntent() {
    var intentFilter = new NativeIntentFilter(ACTION_BATTERY_CHANGED);
    return AndroidConfig.activity.registerReceiver(null, intentFilter);
};

// iOS specifics
System.ios = {};
Object.defineProperties(System.ios, {
    'validateFingerPrint': {
        value: function(onSuccess, onError) {}
    }
});

module.exports = System;