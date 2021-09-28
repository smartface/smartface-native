/* globals requireClass */
const NativeSFAccelerometerListener = requireClass('io.smartface.android.sfcore.device.accelerometer.SFAccelerometerListener');
const { EventEmitter, EventEmitterMixin } = require('../../core/eventemitter');
const Events = require('./events');

const Accelerometer = {};
Object.assign(Accelerometer, EventEmitterMixin);

Accelerometer.emitter = new EventEmitter();

const EventFunctions = {
    [Events.Accelerate]: function() {
        Accelerometer.__getInstance().onAccelerateCallback = function(x, y, z) {
            Accelerometer.emitter.emit(Events.Accelerate, { x, y, z });
        }
    }
}
Object.defineProperty(Accelerometer, 'on', {
    value: (event, callback) => {
        EventFunctions[event].call(Accelerometer);
        Accelerometer.emitter.on(event, callback);
    }
});

var _callback;

Accelerometer.ios = {};
Accelerometer.android = {};

Accelerometer.__instance = null;
Accelerometer.__isSetCallback = false;
Accelerometer.__isStarted = false;

Accelerometer.__getInstance = function() {
    if (!Accelerometer.__instance)
        Accelerometer.__instance = new NativeSFAccelerometerListener();
    return Accelerometer.__instance;
};

Object.defineProperties(Accelerometer, {
    'start': {
        value: function() {
            if (Accelerometer.__isStarted) return;
            Accelerometer.__isStarted = true;
            Accelerometer.__getInstance().startListener();
        }
    },
    'stop': {
        value: function() {
            if (!Accelerometer.__isStarted) return;
            Accelerometer.__isStarted = false;
            Accelerometer.__getInstance().stopListener();
        }
    },
    'onAccelerate': {
        get: function() {
            return _callback;
        },
        set: function(callback) {
            _callback = callback;
            if (typeof(callback) === "function") {
                if (Accelerometer.__isSetCallback) return;
                Accelerometer.__isSetCallback = true;
                Accelerometer.__getInstance().onAccelerateCallback = function(x, y, z) {
                    _callback && _callback({
                        x,
                        y,
                        z
                    });
                };
            } else {
                if (!Accelerometer.__isSetCallback) return;
                Accelerometer.__isSetCallback = false;
                Accelerometer.__getInstance().onAccelerateCallback = null;
            }
        }
    }
});

module.exports = Accelerometer;