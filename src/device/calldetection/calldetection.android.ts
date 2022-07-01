import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { ICallDetection, State } from './calldetection';
import { CallDetectionEvents } from './calldetection-events';
import AndroidConfig from '../../util/Android/androidconfig';

const TELEPHONY_SERVICE = 'phone';
const TELEPHONY_MANAGER = 'android.telephony.TelephonyManager';
const NativeBuild = requireClass('android.os.Build');
const NativeContextCompat = requireClass('androidx.core.content.ContextCompat');
const NativeManifest = requireClass('android.Manifest');
const NativePackageManager = requireClass('android.content.pm.PackageManager');

class CallDetectionAndroid extends NativeEventEmitterComponent<CallDetectionEvents> implements ICallDetection {
  protected createNativeObject() {
    return null;
  }
  onCallStateChanged: (params: { state: State; observer?: any }) => void;
  constructor() {
    super();
    const callStateChangedCallback = (state) => {
      this.onCallStateChanged?.({
        state
      });
      this.emit(CallDetectionEvents.CallStateChanged, { state });
    };
    const telephonyManager = AndroidConfig.getSystemService(TELEPHONY_SERVICE, TELEPHONY_MANAGER);
    if (NativeBuild.VERSION.SDK_INT >= NativeBuild.VERSION_CODES.S) {
      if (this.hasReadPhoneStatePermission()) {
        const SFCallStateListener = requireClass('io.smartface.android.sfcore.device.calldetection.SFCallStateListener');
        const callStateListener = new SFCallStateListener(callStateChangedCallback);
        telephonyManager.registerTelephonyCallback(NativeContextCompat.getMainExecutor(AndroidConfig.activity), callStateListener);
      }
    } else {
      const SFPhoneStateListener = requireClass('io.smartface.android.sfcore.device.calldetection.SFPhoneStateListener');
      const phoneListener = new SFPhoneStateListener(callStateChangedCallback);
      telephonyManager.listen(phoneListener, SFPhoneStateListener.LISTEN_CALL_STATE);
    }
  }

  private hasReadPhoneStatePermission(): boolean {
    return NativeContextCompat.checkSelfPermission(AndroidConfig.activity, NativeManifest.permission.READ_PHONE_STATE) === NativePackageManager.PERMISSION_GRANTED;
  }
}

const CallDetection = new CallDetectionAndroid();

export default CallDetection;
