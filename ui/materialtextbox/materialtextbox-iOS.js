const TextBox = require('../textbox');
const extend = require('js-base/core/extend');
const Color = require('sf-core/ui/color');
const FlexLayout = require('sf-core/ui/flexlayout');

const MaterialTextbox = extend(TextBox)(
    function(_super, params) {
        var self = this;

        if (!self.nativeObject) {
            self.nativeObject = new __SF_SMFMaterialTextField();
        }

        _super(this);
        
        var _rightLayout = undefined;
        var _rightLayoutMain;
        Object.defineProperty(self, 'rightLayout', {
            get: function() {
                return _rightLayout;
            },
            set: function(object) {
                _rightLayout = object;
                if (object === undefined) {
                    self.nativeObject.setValueForKey(undefined, "rightView");
                    self.nativeObject.setValueForKey(0, "rightViewMode");
                    return;
                }
                
                if (!_rightLayoutMain) {
                    var flexMain = new FlexLayout();
                    flexMain.nativeObject.yoga.isEnabled = false; // Bug : IOS-2714
                    var flexContent = new FlexLayout();
                    flexMain.nativeObject.frame = { x: 0, y: 0, width: object.width ? object.width : 30, height: 0 };
                    flexMain.nativeObject.addFrameObserver();
                    flexMain.nativeObject.frameObserveHandler = function(e) {
                        flexContent.top = 0;
                        flexContent.left = 0;
                        flexContent.width = e.frame.width;
                        flexContent.height = e.frame.height;
                        flexContent.applyLayout();
                    };
                    flexMain.addChild(flexContent);
                    flexMain.content = flexContent;
                    _rightLayoutMain = flexMain;
                }else{
                    var childs = _rightLayoutMain.content.getChildList();
                    for (var i in childs) {
                        _rightLayoutMain.content.removeChild(childs[i]);
                    }
                }
                
                _rightLayoutMain.content.addChild(object.view);
                self.nativeObject.setValueForKey(3, "rightViewMode");
                self.nativeObject.setValueForKey(_rightLayoutMain.nativeObject,"rightView");
            },
            enumerable: true
        });
        
        Object.defineProperty(self.ios, 'titleColor', {
            get: function() {
                return new Color({color : self.nativeObject.titleColor});
            },
            set: function(value) {
                self.nativeObject.titleColor = value.nativeObject;
            },
            enumerable: true
        });
        
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
        
        Object.defineProperty(self.ios, 'titleFont', {// Deprecated : use labelsFont
            get: function() {
                return self.nativeObject.titleLabel.valueForKey("font");
            },
            set: function(value) {
                self.nativeObject.titleLabel.setValueForKey(value,"font");
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'labelsFont', {// Deprecated : use labelsFont
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
                self.ios.titleColor = value;
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
