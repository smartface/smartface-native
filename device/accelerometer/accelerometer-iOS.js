function Accelerate() {}

Accelerate.monitonManager = new CMMotionManager();

Accelerate.start = function(){
      Accelerate.monitonManager.accelerometerUpdateInterval = 0.1;
      Accelerate.monitonManager.startAccelerometerUpdates();
}

Accelerate.stop = function(){
      Accelerate.monitonManager.stopAccelerometerUpdates();
}

Object.defineProperty(Accelerate, 'onAccelerate', {
    set : function(value){
    Accelerate.monitonManager.callback = value;
  },
  enumerable: true
});

module.exports = Accelerate;