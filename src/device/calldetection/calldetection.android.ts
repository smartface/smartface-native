import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { ICallDetection, State } from './calldetection';
import { CallDetectionEvents } from './calldetection-events';
import AndroidConfig from '../../util/Android/androidconfig';

const SFPhoneStateBroadcastReceiver = requireClass('io.smartface.android.sfcore.device.calldetection.SFPhoneStateBroadcastReceiver');
const NativeTelephonyManager = requireClass('android.telephony.TelephonyManager');
const NativeIntentFilter = requireClass('android.content.IntentFilter');

class CallDetectionAndroid extends NativeEventEmitterComponent<CallDetectionEvents> implements ICallDetection {
  private phoneStateBroadcastReceiver: any;
  protected createNativeObject() {
    return null;
  }
  onCallStateChanged: (params: { state: State; incomingNumber?: string; observer?: any }) => void;
  constructor() {
    super();
    this.phoneStateBroadcastReceiver = this.createPhoneStateBroadcastReceiver();
    this.registerPhoneStateBroadcastReceiver(this.phoneStateBroadcastReceiver);
  }

  private createPhoneStateBroadcastReceiver() {
    return new SFPhoneStateBroadcastReceiver((state, incomingNumber) => {
      this.onCallStateChanged?.({
        state: state,
        incomingNumber: incomingNumber
      });
      this.emit(CallDetectionEvents.CallStateChanged, state, incomingNumber);
    });
  }

  private registerPhoneStateBroadcastReceiver(broadcastReceiver: any) {
    const intentFilter = new NativeIntentFilter(NativeTelephonyManager.ACTION_PHONE_STATE_CHANGED);
    AndroidConfig.activity.registerReceiver(broadcastReceiver, intentFilter);
  }

  private dispose() {
    AndroidConfig.activity.unregisterReceiver(this.phoneStateBroadcastReceiver);
  }
}

const CallDetection = new CallDetectionAndroid();

export default CallDetection;
