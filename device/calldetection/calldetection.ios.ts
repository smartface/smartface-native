import { eventCallbacksAssign } from '../../core/eventemitter/eventCallbacksAssign';
import { CallDetectionBase, State } from './calldetection';
import { CallDetectionEvents } from './calldetection-events';

class CallDetectionAndroid extends CallDetectionBase {
  private _onCallStateChanged: (params: { state: State; incomingNumber?: string; observer?: any }) => void;
  private callObserverDelegate: __SF_CallObserverDelegate;
  constructor() {
    super();
    const EventFunctions = {
      [CallDetectionEvents.CallStateChanged]: (e) => {
        this.onCallStateChanged(e);
      }
    };
    eventCallbacksAssign(this, EventFunctions);
    this.callObserverDelegate = new __SF_CallObserverDelegate();
    this.callObserverDelegate.callObserverCallChanged = (observer, call) => {
      let state;
      if (call.hasEnded) {
        state = State.DISCONNECTED;
      } else if (call.hasConnected) {
        state = State.CONNECTED;
      } else if (call.isOutgoing) {
        state = State.DIALING;
      } else {
        state = State.INCOMING;
      }
      this.onCallStateChanged && this.onCallStateChanged({ state, observer });
    };
  }
  set onCallStateChanged(callback: ({ state, incomingNumber }: { state: State; incomingNumber?: string; observer?: any }) => void) {
    this._onCallStateChanged = callback;
  }
  get onCallStateChanged(): ({ state, incomingNumber }: { state: State; incomingNumber?: string; observer?: any }) => void {
    return this._onCallStateChanged;
  }
}

export default CallDetectionAndroid;
