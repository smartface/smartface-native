const Image = require("nf-core/ui/image");

function Screen() {}

Screen.ios = {};
/*
    0 unknown
    1 portrait
    2 portraitUpsideDown
    3 landscapeLeft
    4 landscapeRight
    5 faceUp
    6 faceDown
*/
Object.defineProperty(Screen, 'orientation', {
  value: UIDevice.currentDevice().orientation,  
  writable: false,
  enumerable: true
});

Object.defineProperty(Screen, 'height', {
  value: UIScreen.mainScreen().bounds.height,  
  writable: false,
  enumerable: true
});

Object.defineProperty(Screen, 'width', {
  value: UIScreen.mainScreen().bounds.width,  
  writable: false,
  enumerable: true
});

Object.defineProperty(Screen, 'touchSupported', {
  value: 1,  
  writable: false,
  enumerable: true
});

Object.defineProperty(Screen.ios, 'forceTouchAvaliable', {
  value: UIDevice.forceTouchAvaliable(),  
  writable: false,
  enumerable: true
});

Object.defineProperty(Screen, 'capture', {
  value: function(){
    return Image.createFromImage(UIDevice.takeSnapShot());
  },  
  writable: false,
  enumerable: true
});


Object.defineProperty(Screen, 'dpi', {
  get: function() {
          if (UIScreen.mainScreen().scale == 2){
              return 326;
          }else if (UIScreen.mainScreen().scale == 3){
              return 401;
          }else{
              return 163;
          }
     },
     enumerable: true
});

module.exports = Screen;