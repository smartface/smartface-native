const View = require('../view');
const extend = require('js-base/core/extend');
const UIControlEvents = require("sf-core/util").UIControlEvents;
const Color = require("sf-core/ui/color");

const SliderState = {
        normal: 0,
        disabled: 1,
        selected: 2,
        pressed: 3,
        focused: 4 // #available(iOS 9.0, *)
    }
    
    
const Slider = extend(View)(
     function (_super, params) {
        var self = this;
        
        if(!self.nativeObject){
            self.nativeObject = new SMFUISlider(); 
        }
        
        _super(this);
        
        //defaults
         self.nativeObject.minimumTrackTintColor = Color.DARKGRAY;
         self.nativeObject.maximumTrackTintColor = Color.GREEN;
         self.nativeObject.minimumValue = 0;
         self.nativeObject.maximumValue = 100;
         
        Object.defineProperty(self, 'thumbColor', {
            get: function() {
                return self.nativeObject.thumbTintColor;
            },
            set: function(value) {
                self.nativeObject.thumbTintColor = value;
            },
            enumerable: true
        });
        
        var _thumbImage;
        Object.defineProperty(self, 'thumbImage', {
            get: function() {
                return _thumbImage;
            }, 
            set: function(image) {
                _thumbImage = image;
                self.nativeObject.setThumbImage(new UIImage(image),SliderState.normal);
                 self.nativeObject.setThumbImage(new UIImage(image),SliderState.pressed);
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'minTrackColor', {
            get: function() {
                return self.nativeObject.minimumTrackTintColor;
            },
            set: function(value) {
                self.nativeObject.minimumTrackTintColor = value;
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'maxTrackColor', {
            get: function() {
                return self.nativeObject.maximumTrackTintColor;
            },
            set: function(value) {
                self.nativeObject.maximumTrackTintColor = value;
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'minValue', {
            get: function() {
                return self.nativeObject.minimumValue;
            },
            set: function(value) {
                self.nativeObject.minimumValue = value;
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'maxValue', {
            get: function() {
                return self.nativeObject.maximumValue;
            },
            set: function(value) {
                self.nativeObject.maximumValue = value;
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'value', {
            get: function() {
                return self.nativeObject.value;
            },
            set: function(value) {
                self.nativeObject.value = value;
            },
            enumerable: true
        });
        
        var _onValueChange;
        Object.defineProperty(self, 'onValueChange', {
            get: function() {
                return _onValueChange;
            },
            set: function(value) {
                _onValueChange = value;
                self.nativeObject.addJSTarget(value,UIControlEvents.valueChanged);
            },
            enumerable: true
         });
         
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
});
     
module.exports = Slider;