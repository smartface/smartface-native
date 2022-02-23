import { eventCallbacksAssign } from '../../core/eventemitter/eventCallbacksAssign';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { ICallDetection, State } from './calldetection';
import { CallDetectionEvents } from './calldetection-events';

const SFPhoneStateListener = requireClass('io.smartface.android.sfcore.device.calldetection.SFPhoneStateListener');
const TELEPHONY_SERVICE = 'phone';
const TELEPHONY_MANAGER = 'android.telephony.TelephonyManager';

class CallDetectionAndroid extends NativeEventEmitterComponent<CallDetectionEvents> implements ICallDetection {
  onCallStateChanged: (params: { state: State; incomingNumber?: string; observer?: any }) => void;
  constructor() {
    super();
    const EventFunctions = {
      [CallDetectionEvents.CallStateChanged]: (e) => {
        this.onCallStateChanged?.(e);
      }
    };
    eventCallbacksAssign(this, EventFunctions);
    const self = this;
    const phoneListener = new SFPhoneStateListener(function (state, incomingNumber) {
      self.onCallStateChanged?.({
        state: state,
        incomingNumber: incomingNumber
      });
    });

    const telephonyManager = AndroidConfig.getSystemService(TELEPHONY_SERVICE, TELEPHONY_MANAGER);
    telephonyManager.listen(phoneListener, SFPhoneStateListener.LISTEN_CALL_STATE);
  }
}

const CallDetection = new CallDetectionAndroid();

export default CallDetection;
