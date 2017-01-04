const View = require('../view');
const Color = require("sf-core/ui/color");
const extend = require('js-base/core/extend');
const UIControlEvents = require("sf-core/util").UIControlEvents;

const Switch = extend(View)(
    function (_super, params)  {
       var self = this;
       
       if(!self.nativeObject){
           self.nativeObject = new UISwitch();            
       }
         
       _super(this);
       
       self.nativeObject.thumbTintColor = Color.GRAY; //thumbOffColor
       self.nativeObject.onTintColor = Color.GRAY; // toggleOnColor
       
       var _thumbOnColor = Color.GREEN;
       Object.defineProperty(self, 'thumbOnColor', {
            get: function() {
                return _thumbOnColor;
            },
            set: function(value) {
                _thumbOnColor = value;
                self.changeThumbTint();
            },
            enumerable: true
         });
         
       var _thumbOffColor = Color.GRAY;
       Object.defineProperty(self, 'thumbOffColor', {
            get: function() {
                return _thumbOffColor;
            },
            set: function(value) {
                _thumbOffColor = value;
                self.changeThumbTint();
            },
            enumerable: true
         });
         
       var _toggleOnColor = Color.GRAY;
       Object.defineProperty(self, 'toggleOnColor', {
            get: function() {
                return _toggleOnColor;
            },
            set: function(value) {
                _toggleOnColor = value;
                self.nativeObject.onTintColor = value;
            },
            enumerable: true
         });
        
       Object.defineProperty(self, 'toggle', {
            get: function() {
                return self.nativeObject.isOn;
            },
            set: function(value) {
                self.nativeObject.setOnAnimated(value,true);
                self.changeThumbTint();
            },
            enumerable: true
         });
         
        var _onToggleChanged;
        Object.defineProperty(self, 'onToggleChanged', {
            get: function() {
                return _onToggleChanged;
            },
            set: function(value) {
                _onToggleChanged = value;
                var functionWithListener = function(){
                    value();
                    self.changeThumbTint();
                }
                self.nativeObject.addJSTarget(functionWithListener,UIControlEvents.valueChanged);
            },
            enumerable: true
         });
        
        self.changeThumbTint = function(){
            if (self.toggle) {
                self.nativeObject.thumbTintColor = self.thumbOnColor;
            }else{
                self.nativeObject.thumbTintColor = self.thumbOffColor;
            }
        };
        
        self.onToggleChanged = function(){};
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    
    }
);

module.exports = Switch;
