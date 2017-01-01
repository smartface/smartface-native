const View = require('../view');
const Color = require("sf-core/ui/color");
const extend = require('js-base/core/extend');
const UIControlEvents = require("sf-core/util").UIControlEvents;

const SwitchButton = extend(View)(
    function (_super, params)  {
         _super(this);
        var self = this;

       self.nativeObject = new UISwitch();
       self.nativeObject.thumbTintColor = Color.LIGHTGRAY;
       self.nativeObject.onTintColor = Color.BLUE;
       
       var _thumbColor = Color.LIGHTGRAY;
       Object.defineProperty(self, 'thumbColor', {
            get: function() {
                return _thumbColor;
            },
            set: function(value) {
                _thumbColor = value;
                self.nativeObject.thumbTintColor = value;
            },
            enumerable: true
         });
         
       var _checkedColor = Color.BLUE;
       Object.defineProperty(self, 'checkedColor', {
            get: function() {
                return _checkedColor;
            },
            set: function(value) {
                _checkedColor = value;
                self.nativeObject.onTintColor = value;
            },
            enumerable: true
         });
        
       Object.defineProperty(self, 'checked', {
            get: function() {
                return self.nativeObject.isOn;
            },
            enumerable: true
         });
         
        var _onChanged;
        Object.defineProperty(self, 'onChanged', {
            get: function() {
                return _onChanged;
            },
            set: function(value) {
                _onChanged = value;
                self.nativeObject.addJSTarget(value,UIControlEvents.valueChanged);
            },
            enumerable: true
         });
         
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    
    }
);

module.exports = SwitchButton;
