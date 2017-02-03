function System() {}

System.android = {}

const UIDeviceBatteryState = {
    unknown : 0,
    unplugged : 1,// on battery, discharging
    charging : 2,// plugged in, less than 100%
    full : 3// plugged in, at 100%
}

Object.defineProperty(System, 'language', {
  value: NSLocale.currentLocale().identifier,  
  writable: false,
  enumerable: true
});

Object.defineProperty(System, 'batteryLevel', {
  get: function() {
      UIDevice.currentDevice().batteryMonitoringEnabled = true;
      return UIDevice.currentDevice().batteryLevel;
  },
  enumerable: true
});

Object.defineProperty(System, 'isBatteryCharged', {
  get: function() {
      UIDevice.currentDevice().batteryMonitoringEnabled = true;
      if(UIDevice.currentDevice().batteryState == 2 || UIDevice.currentDevice().batteryState == 3){
        return true;
      }else if (UIDevice.currentDevice().batteryState == 1){
        return false;
      }
      return false;
  },
  enumerable: true
});

Object.defineProperty(System, 'OS', {
  value: "iOS",  
  writable: false,
  enumerable: true
});

Object.defineProperty(System, 'OSVersion', {
  value: UIDevice.currentDevice().systemVersion,  
  writable: false,
  enumerable: true
});

Object.defineProperty(System, 'clipboard', {
  get: function() {
      return UIPasteboard.generalPasteboard().string;
  },
  set : function(value){
    UIPasteboard.generalPasteboard().string = value;
  },
  enumerable: true
});

Object.defineProperty(System, 'fingerPrintAvaliable', {
  get: function() {
      var context = new LAContext();
      return context.canEvaluatePolicy();
  },
  enumerable: true
});

Object.defineProperty(System, 'vibrate', {
  value:function(){
     UIDevice.vibrate();
  },  
  writable: false,
  enumerable: true
});

System.validateFingerPrint = function(params){
    var context = new LAContext();
    context.evaluatePolicy(params.message,params.onSuccess,params.onError);
}

System.isApplicationInstalled = function(packageName) {
  var url = NSURL.URLWithString(packageName);
  if (UIApplication.sharedApplication().canOpenURL(url)){
    return true;
  }else{
    return false;
  }
};

module.exports = System;