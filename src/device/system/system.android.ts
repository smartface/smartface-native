import { AbstractSystem, OSType } from '.';
import { AndroidConfig, TypeUtil } from '../../util';

const NativeBuild = requireClass('android.os.Build');
const NativeIntentFilter = requireClass('android.content.IntentFilter');
const NativeBatteryManager = requireClass('android.os.BatteryManager');
const NativeClipData = requireClass('android.content.ClipData');
const NativeViewConfig = requireClass('android.view.ViewConfiguration');
const NativeLocale = requireClass('java.util.Locale');
//NativeIntent.ACTION_BATTERY_CHANGED
const ACTION_BATTERY_CHANGED = 'android.intent.action.BATTERY_CHANGED';
const SFBiometricPrompt = requireClass('io.smartface.android.sfcore.device.system.SFBiometricPrompt');
const NativeFingerprintAuthenticationDialogFragment = requireClass('com.android.fingerprintdialog.FingerprintAuthenticationDialogFragment');
const NativeFingerPrintListener = requireClass('com.android.fingerprintdialog.FingerPrintListener');

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

const DIALOG_FRAGMENT_TAG = 'myFragment';

function getBatteryIntent() {
  const intentFilter = new NativeIntentFilter(ACTION_BATTERY_CHANGED);
  return AndroidConfig.activity.registerReceiver(null, intentFilter);
}

class SystemAndroid implements AbstractSystem {
  OSVersion = NativeBuild.VERSION.RELEASE;
  OS = OSType.ANDROID;
  OSType = OSType;
  BiometryType = { BIOMETRICS: SFBiometricPrompt.BiometricType.BIOMETRICS, NONE: SFBiometricPrompt.BiometricType.NONE };
  ios = {
    validateFingerPrint() {},
    LAContextBiometricType() {},
    LABiometryType: {}
  };
  private _android;
  constructor() {
    const android = {
      get apiLevel() {
        return NativeBuild.VERSION.SDK_INT;
      },
      get supported64BitAbis() {
        return toJSArray(NativeBuild.SUPPORTED_64_BIT_ABIS);
      },
      get supported32BitAbis() {
        return toJSArray(NativeBuild.SUPPORTED_32_BIT_ABIS);
      },
      get menuKeyAvaliable() {
        return NativeViewConfig.get(AndroidConfig.activity).hasPermanentMenuKey();
      },
      isApplicationInstalled(packageName) {
        const packageList = AndroidConfig.activity.getPackageManager().getInstalledApplications(0);
        for (let i = 0; i < packageList.size(); i++) {
          if (packageList.get(i).packageName.toString() === packageName) {
            return true;
          }
        }
        return false;
      },
      getPackageVersion(params: { packageName: string; onSuccess: (version: string) => void; onError: (error: string) => void }) {
        if (params && params.packageName) {
          try {
            const packageVersion = AndroidConfig.activity.getPackageManager().getPackageInfo(params.packageName, 0).versionName;
            params?.onSuccess?.(packageVersion);
          } catch (err) {
            params?.onError?.(err);
          }
        }
      }
    };
    Object.assign(this._android, android);
  }
  get region() {
    return NativeLocale.getDefault().getCountry();
  }
  get language() {
    return NativeLocale.getDefault().getLanguage().toString();
  }
  get isBatteryCharged() {
    const batteryStatus = getBatteryIntent().getIntExtra(NativeBatteryManager.EXTRA_STATUS, -1);
    return batteryStatus === NativeBatteryManager.BATTERY_STATUS_CHARGING;
  }
  get batteryLevel() {
    const level = getBatteryIntent().getIntExtra(NativeBatteryManager.EXTRA_LEVEL, -1);
    const scale = getBatteryIntent().getIntExtra(NativeBatteryManager.EXTRA_SCALE, -1);
    return (level / scale) * 100;
  }
  get clipboard() {
    const clipboard = AndroidConfig.getSystemService(CLIPBOARD_SERVICE, CLIPBOARD_MANAGER);
    const storedData = clipboard.getPrimaryClip();
    if (storedData !== null) {
      // NEEDED!
      return storedData.getItemAt(0).getText().toString();
    } else {
      return null;
    }
  }
  set clipboard(text: string | null) {
    const clip = NativeClipData.newPlainText('sf-core', text);
    const clipboard = AndroidConfig.getSystemService(CLIPBOARD_SERVICE, CLIPBOARD_MANAGER);
    clipboard.setPrimaryClip(clip);
  }
  vibrate(options?: { millisecond: number }) {
    const millisecond = options?.millisecond || 500;
    const vibrator = AndroidConfig.getSystemService(VIBRATOR_SERVICE, VIBRATOR_MANAGER);
    vibrator.vibrate(millisecond);
  }
  get fingerPrintAvailable() {
    if (AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_MARSHMALLOW) {
      const fingerprintManager = AndroidConfig.getSystemService(FINGERPRINT_SERVICE, FINGERPRINT_MANAGER);
      return fingerprintManager && fingerprintManager.isHardwareDetected() && fingerprintManager.hasEnrolledFingerprints();
    }
    return false;
  }
  get biometricsAvailable() {
    return SFBiometricPrompt.getBiometricType(AndroidConfig.activity) === this.BiometryType.BIOMETRICS;
  }
  validateBiometric(params: {
    android: {
      title: string;
      cancelButtonText?: string;
      subTitle?: string;
      confirmationRequired?: boolean;
    };
    message: string;
    onSuccess: () => void;
    onError: (cancelled?: boolean, error?: string) => void;
  }) {
    const {
      message,
      android: { title: title = 'title', subTitle: subTitle = 'subTitle', cancelButtonText: cancelButtonText = 'Cancel', confirmationRequired: confirmationRequired = true } = {},
      onError = () => {},
      onSuccess = () => {}
    } = params;

    if (!title || !TypeUtil.isString(title)) throw new Error('Title must be set and non-empty.');

    if (!cancelButtonText || !TypeUtil.isString(cancelButtonText)) throw new Error('Cancel text must be set and non-empty.');

    const biometricPrompt = new SFBiometricPrompt(AndroidConfig.activity, {
      onError,
      onSuccess
    });

    biometricPrompt.setTitle(title);
    biometricPrompt.setDescription(message);
    biometricPrompt.setSubTitle(subTitle);
    biometricPrompt.setCancelButtonText(cancelButtonText);
    biometricPrompt.setConfirmationRequired(confirmationRequired);

    biometricPrompt.authenticate();
  }
  get biometricType() {
    return SFBiometricPrompt.getBiometricType(AndroidConfig.activity);
  }
  validateFingerPrint(params: {
    android: Partial<{
      title: string;
    }>;
    message: string;
    onSuccess: () => void;
    onError: () => void;
  }) {
    if (AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_MARSHMALLOW && this.fingerPrintAvailable) {
      const fragmentManager = AndroidConfig.activity.getFragmentManager();
      const fragment = new NativeFingerprintAuthenticationDialogFragment();

      const listeners = NativeFingerPrintListener.implement({
        onError: function () {
          params?.onError?.();
        },
        onAuthenticated: function () {
          params?.onSuccess?.();
        },
        onTimeout: function () {
          params?.onError?.();
        },
        onCancel: function () {
          params?.onError?.();
        },
        onLockout: function () {
          params?.onError?.();
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
    params?.onError?.();
  }
  get isEmulator() {
    return AndroidConfig.isEmulator;
  }
}

const System = new SystemAndroid();
export default System;
