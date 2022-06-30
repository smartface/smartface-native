import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { ICallDetection, State } from './calldetection';
import { CallDetectionEvents } from './calldetection-events';

class CallDetectionIOS extends NativeEventEmitterComponent<CallDetectionEvents> implements ICallDetection {
  protected createNativeObject() {
    return null;
  }
  onCallStateChanged: (params: { state: State; incomingNumber?: string; observer?: any }) => void;
  private callObserverDelegate: __SF_CallObserverDelegate;
  constructor() {
    super();
    this.callObserverDelegate = new __SF_CallObserverDelegate();
    this.callObserverDelegate.callObserverCallChanged = (observer, call) => {
      let state: State;
      if (call.hasEnded) {
        state = State.DISCONNECTED;
      } else if (call.hasConnected) {
        state = State.CONNECTED;
      } else if (call.isOutgoing) {
        state = State.DIALING;
      } else {
        state = State.INCOMING;
      }
      this.onCallStateChanged?.({ state, observer });
      this.emit(CallDetectionEvents.CallStateChanged, { state, observer });
    };
  }
}
const CallDetection = new CallDetectionIOS();

export default CallDetection;
