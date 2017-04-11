const View = require('../view');
const Color = require("sf-core/ui/color");
const extend = require('js-base/core/extend');
const UIControlEvents = require("sf-core/util").UIControlEvents;

const Switch = extend(View)(
    function (_super, params)  {
       var self = this;
       
       if(!self.nativeObject){
           self.nativeObject = new __SF_UISwitch();            
       }
         
       _super(this);
       
       self.nativeObject.thumbTintColor = Color.GREEN; //thumbOffColor
       self.nativeObject.onTintColor = Color.GRAY; // toggleOnColor
       
       Object.defineProperty(self, 'enabled', {
            get: function() {
                return self.nativeObject.setEnabled;
            },
            set: function(value) {
                self.nativeObject.setEnabled = value;
            },
            enumerable: true
        });
        
       Object.defineProperty(self, 'thumbOnColor', {
            get: function() {
                return self.nativeObject.thumbTintColor;
            },
            set: function(value) {
               self.nativeObject.thumbTintColor = value;
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
            },
            enumerable: true
         });
         
        var _onToggleChanged;
        Object.defineProperty(self, 'onToggleChanged', {
            get: function() {
                return _onToggleChanged;
            },
            set: function(value) {
                _onToggleChanged = value.bind(this);
                self.nativeObject.addJSTarget(_onToggleChanged,UIControlEvents.valueChanged);
            },
            enumerable: true
        });
                
        self.android = {};
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    
    }
);

module.exports = Switch;
