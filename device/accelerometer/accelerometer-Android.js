/* globals requireClass */
const NativeSFAccelerometerListener = requireClass('io.smartface.android.sfcore.device.accelerometer.SFAccelerometerListener');

const Accelerometer = {};
var _callback;

Accelerometer.ios = {};
Accelerometer.android = {};

Accelerometer.__instance = new NativeSFAccelerometerListener();
Accelerometer.__isSetCallback = false;
Accelerometer.__isStarted = false;

Accelerometer.__getInstance = function() {
    return Accelerometer.__instance;
};

Object.defineProperties(Accelerometer, {
    'start': {
        value: function() {
            if(Accelerometer.__isStarted) return;
            Accelerometer.__isStarted = true;
            Accelerometer.__getInstance().startListener();
        }
    },
    'stop': {
        value: function() {
            if(!Accelerometer.__isStarted) return;
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
            if(typeof(callback) === "function") {
                if(Accelerometer.__isSetCallback) return;
                Accelerometer.__isSetCallback = true;
                Accelerometer.__getInstance().onAccelerateCallback = function(x, y, z) {
                    _callback && _callback({x, y, z});
                };
            } else {
                if(!Accelerometer.__isSetCallback) return;
                Accelerometer.__isSetCallback = false;
                Accelerometer.__getInstance().onAccelerateCallback = null;
            }
        }
    }
});

module.exports = Accelerometer;