function Accelerometer() {}

Accelerometer.ios = {};
Accelerometer.android = {};

Accelerometer.monitonManager = new __SF_CMMotionManager();

Accelerometer.start = function() {
    Accelerometer.monitonManager.accelerometerUpdateInterval = Accelerometer.ios._accelerometerUpdateInterval / 1000; // Convert to second
    Accelerometer.monitonManager.startAccelerometerUpdates();
}

Accelerometer.stop = function() {
    Accelerometer.monitonManager.stopAccelerometerUpdates();
}

Object.defineProperty(Accelerometer, 'onAccelerate', {
    set: function(value) {
        Accelerometer.monitonManager.callback = value;
    },
    enumerable: true
});

Accelerometer.ios._accelerometerUpdateInterval = 100;
Object.defineProperty(Accelerometer.ios, 'accelerometerUpdateInterval', {
    get: function() {
        return Accelerometer.ios._accelerometerUpdateInterval;
    },
    set: function(value) {
        Accelerometer.ios._accelerometerUpdateInterval = value;
    },
    enumerable: true
});

module.exports = Accelerometer;