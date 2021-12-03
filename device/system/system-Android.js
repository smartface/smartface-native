const TypeUtil = require('../../util/type');
const AndroidConfig = require('../../util/Android/androidconfig');
const NativeBuild = requireClass('android.os.Build');
const NativeIntentFilter = requireClass('android.content.IntentFilter');
const NativeBatteryManager = requireClass('android.os.BatteryManager');
const NativeClipData = requireClass('android.content.ClipData');
const NativeViewConfig = requireClass('android.view.ViewConfiguration');
const NativeLocale = requireClass('java.util.Locale');
const OSType = require('./ostype');
//NativeIntent.ACTION_BATTERY_CHANGED
const ACTION_BATTERY_CHANGED = 'android.intent.action.BATTERY_CHANGED';
const SFBiometricPrompt = requireClass("io.smartface.android.sfcore.device.system.SFBiometricPrompt");

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

const DIALOG_FRAGMENT_TAG = "myFragment";

const System = {};
System.android = {};

Object.defineProperties(System, {
    'region': {
        get: function () {
            return NativeLocale.getDefault().getCountry();
        },
        enumerable: true
    },
    'language': {
        get: function () {
            return NativeLocale.getDefault().getLanguage().toString();
        },
        enumerable: true
    },
    'OS': {
        get: function () {
            return OSType.ANDROID;
        },
        enumerable: true
    },
    'OSVersion': {
        get: function () {
            return NativeBuild.VERSION.RELEASE;
        },
        enumerable: true
    },
    'OSType': {
        value: OSType
    },
    'isBatteryCharged': {
        get: function () {
            var batteryStatus = getBatteryIntent().getIntExtra(NativeBatteryManager.EXTRA_STATUS, -1);
            return batteryStatus === NativeBatteryManager.BATTERY_STATUS_CHARGING;
        },
        enumerable: true
    },
    'batteryLevel': {
        get: function () {
            var level = getBatteryIntent().getIntExtra(NativeBatteryManager.EXTRA_LEVEL, -1);
            var scale = getBatteryIntent().getIntExtra(NativeBatteryManager.EXTRA_SCALE, -1);
            return (level / scale) * 100;
        },
        enumerable: true
    },
    'clipboard': {
        get: function () {
            var clipboard = AndroidConfig.getSystemService(CLIPBOARD_SERVICE, CLIPBOARD_MANAGER);
            var storedData = clipboard.getPrimaryClip();
            if (storedData != null) { // NEEDED!
                return storedData.getItemAt(0).getText().toString();
            } else {
                return null;
            }
        },
        set: function (text) {
            var clip = NativeClipData.newPlainText("sf-core", text);
            var clipboard = AndroidConfig.getSystemService(CLIPBOARD_SERVICE, CLIPBOARD_MANAGER);
            clipboard.setPrimaryClip(clip);
        },
        enumerable: true
    },
    'vibrate': {
        value: function (options = {}) {
            let millisecond = options.millisecond || 500;
            var vibrator = AndroidConfig.getSystemService(VIBRATOR_SERVICE, VIBRATOR_MANAGER);
            vibrator.vibrate(millisecond);
        },
        enumerable: true
    },
    'fingerPrintAvailable': {
        get: function () {
            if (AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_MARSHMALLOW) {
                var fingerprintManager = AndroidConfig.getSystemService(FINGERPRINT_SERVICE, FINGERPRINT_MANAGER);
                return fingerprintManager && fingerprintManager.isHardwareDetected() && fingerprintManager.hasEnrolledFingerprints();
            }
            return false;
        },
        enumerable: true
    },
    'biometricsAvailable': {
        get: () => (SFBiometricPrompt.getBiometricType(AndroidConfig.activity) === System.BiometryType.BIOMETRICS),
        enumerable: true
    },
    'validateBiometric': {
        value: (params) => {
            const {
                message,
                android: {
                    title: title,
                    subTitle: subTitle,
                    cancelButtonText: cancelButtonText = "Cancel",
                    confirmationRequired: confirmationRequired = true
                } = {},
                onError = () => { }, onSuccess = () => { }
            } = params;

            if (!title || !TypeUtil.isString(title))
                throw new Error("Title must be set and non-empty.");

            if (!cancelButtonText || !TypeUtil.isString(cancelButtonText))
                throw new Error("Cancel text must be set and non-empty.");

            let biometricPrompt = new SFBiometricPrompt(AndroidConfig.activity, {
                onError,
                onSuccess
            });

            biometricPrompt.setTitle(title);
            biometricPrompt.setDescription(message);
            biometricPrompt.setSubTitle(subTitle);
            biometricPrompt.setCancelButtonText(cancelButtonText);
            biometricPrompt.setConfirmationRequired(confirmationRequired);

            biometricPrompt.authenticate();
        },
        enumerable: true
    },
    'biometricType': {
        get: () => SFBiometricPrompt.getBiometricType(AndroidConfig.activity),
        enumerable: true
    },
    'validateFingerPrint': {
        value: function (params) {
            if (AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_MARSHMALLOW && this.fingerPrintAvailable) {
                const NativeFingerprintAuthenticationDialogFragment = requireClass("com.android.fingerprintdialog.FingerprintAuthenticationDialogFragment");
                const NativeFingerPrintListener = requireClass("com.android.fingerprintdialog.FingerPrintListener");

                var fragmentManager = AndroidConfig.activity.getFragmentManager();
                var fragment = new NativeFingerprintAuthenticationDialogFragment();

                var listeners = NativeFingerPrintListener.implement({
                    'onError': function () {
                        params && params.onError && params.onError();
                    },
                    'onAuthenticated': function () {
                        params && params.onSuccess && params.onSuccess();
                    },
                    'onTimeout': function () {
                        params && params.onError && params.onError();
                    },
                    'onCancel': function () {
                        params && params.onError && params.onError();
                    },
                    'onLockout': function () {
                        params && params.onError && params.onError();
                    }
                });

                if (params && TypeUtil.isString(params.message)) {
                    fragment.setMessage(params.message);
                }
                if (params && TypeUtil.isObject(params.android) && TypeUtil.isString(params.android.title)) {
                    fragment.setTitle(params.android.title);
                }

                fragment.addFingerPrintListener(listeners);
                fragment.show(fragmentManager, DIALOG_FRAGMENT_TAG);
                return;
            }
            params && params.onError && params.onError();
        },
        enumerable: true
    },
    'isEmulator': {
        get: () => AndroidConfig.isEmulator,
        enumerable: true
    }
});

Object.defineProperties(System.android, {
    'apiLevel': {
        get: function () {
            return NativeBuild.VERSION.SDK_INT;
        },
        enumerable: true
    },
    'supported64BitAbis': {
        get: () => toJSArray(NativeBuild.SUPPORTED_64_BIT_ABIS),
        enumerable: true
    },
    'supported32BitAbis': {
        get: () => toJSArray(NativeBuild.SUPPORTED_32_BIT_ABIS),
        enumerable: true
    },
    'menuKeyAvaliable': {
        get: function () {
            return NativeViewConfig.get(AndroidConfig.activity).hasPermanentMenuKey();
        },
        enumerable: true
    },
    'isApplicationInstalled': {
        value: function (packageName) {
            var packageList = AndroidConfig.activity.getPackageManager().getInstalledApplications(0);
            for (var i = 0; i < packageList.size(); i++) {
                if (packageList.get(i).packageName.toString() === packageName) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true
    },
    'getPackageVersion': {
        value: function (params) {
            if (params && params.packageName) {
                try {
                    var packageVersion = AndroidConfig.activity.getPackageManager().getPackageInfo(params.packageName, 0).versionName;
                    params.onSuccess && params.onSuccess(packageVersion)
                } catch (err) {
                    params.onError && params.onError(err);
                }
            }
        },
        enumerable: true
    }
});

function getBatteryIntent() {
    var intentFilter = new NativeIntentFilter(ACTION_BATTERY_CHANGED);
    return AndroidConfig.activity.registerReceiver(null, intentFilter);
};

System.BiometryType = Object.freeze({
    BIOMETRICS: SFBiometricPrompt.BiometricType.BIOMETRICS,
    NONE: SFBiometricPrompt.BiometricType.NONE
});

// iOS specifics
System.ios = {};

Object.defineProperties(System.ios, {
    'validateFingerPrint': {
        value: function (onSuccess, onError) { }
    }
});

Object.defineProperties(System.ios, {
    'LAContextBiometricType': {
        value: function (onSuccess, onError) { }
    }
});

System.ios.LABiometryType = {};

module.exports = System;