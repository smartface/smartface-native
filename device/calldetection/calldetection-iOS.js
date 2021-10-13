const { EventEmitterCreator } = require("../../core/eventemitter");
const Events = require('./events');

CallDetection.Events = { ...Events };
function CallDetection() { 
    const self = this;
    const EventFunctions = {
        [Events.CallStateChanged]: function() {
            this.onCallStateChanged = function (state) {
                this.emitter.emit(Events.CallStateChanged, state);
            } 
        }
    };
    EventEmitterCreator(this, EventFunctions);
    this.callObserverDelegate = new __SF_CallObserverDelegate();
    this.callObserverDelegate.callObserverCallChanged = (observer, call) => {
        let state;
        if(call.hasEnded) {
            state = CallDetection.State.DISCONNECTED;
        } else if(call.hasConnected) {
            state = CallDetection.State.CONNECTED;
        } else if(call.isOutgoing) {
            state = CallDetection.State.DIALING;
        } else {
            state = CallDetection.State.INCOMING;
        }
        self.onCallStateChanged && self.onCallStateChanged({state});
    };
    
    let _onCallStateChanged;
    Object.defineProperties(this, {
        'onCallStateChanged': {
            get: () => _onCallStateChanged,
            set: (callback) => {
                _onCallStateChanged = callback;
            },
            enumerable: true
        }
    });
}

CallDetection.State = {
	DISCONNECTED: "Disconnected",
	CONNECTED: "Connected",
	DIALING: "Dialing",
	INCOMING: "Incoming"
};

Object.freeze(CallDetection.State);

module.exports = CallDetection;