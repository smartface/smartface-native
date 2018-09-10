const TextBox = require('../textbox');
const extend = require('js-base/core/extend');
const Color = require('sf-core/ui/color');

const MaterialTextbox = extend(TextBox)(
    function(_super, params) {
        var self = this;

        if (!self.nativeObject) {
            self.nativeObject = new __SF_SMFMaterialTextField();
        }

        _super(this);
        
        // Object.defineProperty(self, 'titleColor', {
        //     get: function() {
        //         return new Color({color : self.nativeObject.titleColor});
        //     },
        //     set: function(value) {
        //         self.nativeObject.titleColor = value.nativeObject;
        //     },
        //     enumerable: true
        // });
        
        // var _hintFont;
        // Object.defineProperty(self, 'hintFont', {
        //     get: function() {
        //         return _hintFont;
        //     },
        //     set: function(value) {
        //         _hintFont = value;
        //         self.nativeObject.placeholderFont = _hint;
        //     },
        //     enumerable: true,configurable : true
        // });
        
        Object.defineProperty(self.ios, 'titleFont', {
            get: function() {
                return self.nativeObject.titleLabel.valueForKey("font");
            },
            set: function(value) {
                self.nativeObject.titleLabel.setValueForKey(value,"font");
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'selectedHintTextColor', {
            get: function() {
                return new Color({color : self.nativeObject.selectedTitleColor});
            },
            set: function(value) {
                self.nativeObject.selectedTitleColor = value.nativeObject;
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'lineColor', {
            get: function() {
                return {normal:self.ios.normallineColor, selected:self.ios.selectedLineColor};
            },
            set: function(value) {
                if (value.normal) {
                    self.ios.normallineColor = value.normal;
                }
                if (value.selected) {
                    self.ios.selectedLineColor = value.selected;
                }
            },
            enumerable: true
        });
        
        Object.defineProperty(self.ios, 'normallineColor', {
            get: function() {
                return new Color({color : self.nativeObject.lineColor});
            },
            set: function(value) {
                self.nativeObject.lineColor = value.nativeObject;
            },
            enumerable: true
        });
        
        Object.defineProperty(self.ios, 'selectedLineColor', {
            get: function() {
                return new Color({color : self.nativeObject.selectedLineColor});
            },
            set: function(value) {
                self.nativeObject.selectedLineColor = value.nativeObject;
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'errorColor', {
            get: function() {
                return new Color({color : self.nativeObject.errorColor});
            },
            set: function(value) {
                self.nativeObject.errorColor = value.nativeObject;
            },
            enumerable: true
        });
        
       Object.defineProperty(self, 'errorMessage', {
            get: function() {
                return self.nativeObject.errorMessage;
            },
            set: function(value) {
                self.nativeObject.errorMessage = value;
            },
            enumerable: true
        });
        
        Object.defineProperty(self.ios, 'lineHeight', {
            get: function() {
                return self.nativeObject.lineHeight;
            },
            set: function(value) {
                self.nativeObject.lineHeight = value;
            },
            enumerable: true
        });
        
        Object.defineProperty(self.ios, 'selectedLineHeight', {
            get: function() {
                return self.nativeObject.selectedLineHeight;
            },
            set: function(value) {
                self.nativeObject.selectedLineHeight = value;
            },
            enumerable: true
        });
        
        var _hintTextColor = Color.create(199,199,205);
        Object.defineProperty(self, 'hintTextColor', {
            get: function() {
                return _hintTextColor;
            },
            set: function(value) {
                _hintTextColor = value;
                self.nativeObject.placeholderColor = _hintTextColor.nativeObject;
                self.titleColor = value;
            },
            enumerable: true,configurable : true
        });
        
        var _hint;
        Object.defineProperty(self, 'hint', {
            get: function() {
                return _hint;
            },
            set: function(value) {
                _hint = value;
                self.nativeObject.placeholder = _hint;
            },
            enumerable: true,configurable : true
        });
        
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
        
        //Handle android specific properties
        self.android = {};
    }
);

module.exports = MaterialTextbox;
