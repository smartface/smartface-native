import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { ICallDetection, State } from './calldetection';
import { CallDetectionEvents } from './calldetection-events';
import AndroidConfig from '../../util/Android/androidconfig';

const SFPhoneStateListener = requireClass('io.smartface.android.sfcore.device.calldetection.SFPhoneStateListener');
const TELEPHONY_SERVICE = 'phone';
const TELEPHONY_MANAGER = 'android.telephony.TelephonyManager';

class CallDetectionAndroid extends NativeEventEmitterComponent<CallDetectionEvents> implements ICallDetection {
  protected createNativeObject() {
    return null;
  }
  onCallStateChanged: (params: { state: State; incomingNumber?: string; observer?: any }) => void;
  constructor() {
    super();
    const phoneListener = new SFPhoneStateListener((state, incomingNumber) => {
      this.onCallStateChanged?.({
        state: state,
        incomingNumber: incomingNumber
      });
      this.emit(CallDetectionEvents.CallStateChanged, state, incomingNumber);
    });

    const telephonyManager = AndroidConfig.getSystemService(TELEPHONY_SERVICE, TELEPHONY_MANAGER);
    telephonyManager.listen(phoneListener, SFPhoneStateListener.LISTEN_CALL_STATE);
  }
}

const CallDetection = new CallDetectionAndroid();

export default CallDetection;
