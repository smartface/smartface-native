function System() {}

System.android = {}
System.android.isApplicationInstalled = function(){}

System.ios = {}

const UIDeviceBatteryState = {
    unknown : 0,
    unplugged : 1,// on battery, discharging
    charging : 2,// plugged in, less than 100%
    full : 3// plugged in, at 100%
}

Object.defineProperty(System, 'language', {
  value: __SF_NSLocale.currentLocale().identifier,  
  writable: false,
  enumerable: true
});

Object.defineProperty(System, 'batteryLevel', {
  get: function() {
      __SF_UIDevice.currentDevice().batteryMonitoringEnabled = true;
      return __SF_UIDevice.currentDevice().batteryLevel;
  },
  enumerable: true
});

Object.defineProperty(System, 'isBatteryCharged', {
  get: function() {
      __SF_UIDevice.currentDevice().batteryMonitoringEnabled = true;
      if(__SF_UIDevice.currentDevice().batteryState === 2 || __SF_UIDevice.currentDevice().batteryState === 3){
        return true;
      }else if (__SF_UIDevice.currentDevice().batteryState === 1){
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
  value: __SF_UIDevice.currentDevice().systemVersion,  
  writable: false,
  enumerable: true
});

Object.defineProperty(System, 'clipboard', {
  get: function() {
      return __SF_UIPasteboard.generalPasteboard().string;
  },
  set : function(value){
    __SF_UIPasteboard.generalPasteboard().string = value;
  },
  enumerable: true
});

Object.defineProperty(System.ios, 'fingerPrintAvaliable', {
  get: function() {
      var context = new __SF_LAContext();
      return context.canEvaluatePolicy();
  },
  enumerable: true
});

Object.defineProperty(System, 'vibrate', {
  value:function(){
     __SF_UIDevice.vibrate();
  },  
  writable: false,
  enumerable: true
});

System.ios.validateFingerPrint = function(params){
    var context = new __SF_LAContext();
    context.evaluatePolicy(params.message,params.onSuccess,params.onError);
}

System.isApplicationInstalled = function(packageName) {
  var url = __SF_NSURL.URLWithString(packageName);
  if (__SF_UIApplication.sharedApplication().canOpenURL(url)){
    return true;
  }else{
    return false;
  }
};

module.exports = System;