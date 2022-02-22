import { eventCallbacksAssign } from '../../core/eventemitter/eventCallbacksAssign';
import { CallDetectionBase, State } from './calldetection';
import { CallDetectionEvents } from './calldetection-events';

const SFPhoneStateListener = requireClass('io.smartface.android.sfcore.device.calldetection.SFPhoneStateListener');
const TELEPHONY_SERVICE = 'phone';
const TELEPHONY_MANAGER = 'android.telephony.TelephonyManager';

class CallDetectionAndroid extends CallDetectionBase {
  private _onCallStateChanged: (params: { state: State; incomingNumber?: string }) => void;
  constructor() {
    super();
    const EventFunctions = {
      [CallDetectionEvents.CallStateChanged]: (e) => {
        this.onCallStateChanged(e);
      }
    };
    eventCallbacksAssign(this, EventFunctions);
    const phoneListener = new SFPhoneStateListener(function (state, incomingNumber) {
      this.onCallStateChanged &&
        this.onCallStateChanged({
          state: state,
          incomingNumber: incomingNumber
        });
    });

    const telephonyManager = AndroidConfig.getSystemService(TELEPHONY_SERVICE, TELEPHONY_MANAGER);
    telephonyManager.listen(phoneListener, SFPhoneStateListener.LISTEN_CALL_STATE);
  }
  set onCallStateChanged(callback: ({ state, incomingNumber }: { state: any; incomingNumber: any }) => void) {
    this._onCallStateChanged = callback;
  }
  get onCallStateChanged(): ({ state, incomingNumber }: { state: any; incomingNumber: any }) => void {
    return this._onCallStateChanged;
  }
}

export default CallDetectionAndroid;
