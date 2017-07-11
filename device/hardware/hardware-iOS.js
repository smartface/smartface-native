function Hardware() {}

Hardware.android = {}
Hardware.ios = {}
Hardware.ios.microphone = {}

Object.defineProperty(Hardware, 'UID', {
  value: __SF_UIDevice.currentDevice().UUID,  
  writable: false,
  enumerable: true
});

Object.defineProperty(Hardware, 'IMEI', {
  value: -1,  
  writable: false,
  enumerable: true
});

Object.defineProperty(Hardware, 'brandModel', {
  value: __SF_UIDevice.currentDevice().model,  
  writable: false,
  enumerable: true
});

Object.defineProperty(Hardware, 'brandName', {
  value: __SF_UIDevice.currentDevice().name,  
  writable: false,
  enumerable: true
});

Hardware.ios.microphone.requestRecordPermission = function(callback){
  var avaudiosession = __SF_AVAudioSession.sharedInstance();
  avaudiosession.requestRecordPermissionWithHandler(function(e){
     if (typeof callback === 'function'){
        callback(e.granted);
     }
  });
};

module.exports = Hardware;