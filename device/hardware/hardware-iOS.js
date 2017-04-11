function Hardware() {}

Hardware.android = {}

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

module.exports = Hardware;