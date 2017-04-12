function Accelerometer() {}

Accelerometer.monitonManager = new __SF_CMMotionManager();

Accelerometer.start = function(){
      Accelerometer.monitonManager.accelerometerUpdateInterval = 0.1;
      Accelerometer.monitonManager.startAccelerometerUpdates();
}

Accelerometer.stop = function(){
      Accelerometer.monitonManager.stopAccelerometerUpdates();
}

Object.defineProperty(Accelerometer, 'onAccelerate', {
    set : function(value){
    Accelerometer.monitonManager.callback = value;
  },
  enumerable: true
});

module.exports = Accelerometer;