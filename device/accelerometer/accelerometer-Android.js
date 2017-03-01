const NativeContext             = requireClass('android.content.Context');
const NativeSensor              = requireClass('android.hardware.Sensor');
const NativeSensorManager       = requireClass('android.hardware.SensorManager');
const NativeSensorEventListener = requireClass('android.hardware.SensorEventListener');

const activity = Android.getActivity();
const Accelerometer = {};

var sensorManager = activity.getSystemService(NativeContext.SENSOR_SERVICE);
var sensor = sensorManager.getDefaultSensor(NativeSensor.TYPE_ACCELEROMETER);

var _callback;
var _sensorListener;
Object.defineProperties(Accelerometer, {
    'start': {
        value: function() {
            _sensorListener = NativeSensorEventListener.implement({
                onAccuracyChanged: function(sensor, accuracy) {},
                onSensorChanged: function(event) {
                    _callback && _callback({
                        x: event.values[0],
                        y: event.values[1],
                        z: event.values[2]
                    });
                }
            });
            sensorManager.registerListener(_sensorListener, sensor, NativeSensorManager.SENSOR_DELAY_UI);
        }
    },
    'stop': {
        value: function() {
            if (_sensorListener) {
                sensorManager.unregisterListener(_sensorListener, sensor);
                _sensorListener = null;
            }
        }
    },
    'onAccelerate': {
        get: function() {
            return _callback;
        },
        set: function(callback) {
            _callback = callback;
        }
    }
});

module.exports = Accelerometer;