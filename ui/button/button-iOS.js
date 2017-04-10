const View = require("sf-core/ui/view");
const Color = require("sf-core/ui/color");
const extend = require('js-base/core/extend');
const UIControlEvents = require("sf-core/util").UIControlEvents;

const ButtonState = {
    normal: 0,
    disabled: 1,
    selected: 2,
    pressed: 3,
    focused: 4 // #available(iOS 9.0, *)
};

const Button = extend(View)(
     function (_super, params) {
        var self = this;
        
        if(!self.nativeObject){
            self.nativeObject = new __SF_UIButton(); 
        }
          
        _super(this);
        
        //defaults
        self.nativeObject.setTitleColor(Color.WHITE,ButtonState.normal);
        self.nativeObject.setBackgroundColor(Color.create("#00A1F1"),ButtonState.normal);

        Object.defineProperty(self, 'enabled', {
            get: function() {
                return self.nativeObject.setEnabled;
            },
            set: function(value) {
                self.nativeObject.setEnabled = value;
            },
            enumerable: true
        });
        
        var _text;
        Object.defineProperty(self, 'text', {
            get: function() {
                return _text;
            },
            set: function(value) {
                _text = value;
                self.nativeObject.setTitle(value,ButtonState.normal);
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'textAlignment', {
            get: function() {
                return self.nativeObject.textAlignmentNumber;
            },
            set: function(value) {
                var vertical;
                if (parseInt(value / 3) === 0) {
                    vertical = 1;
                }else if (parseInt(value / 3) === 1){
                    vertical = 0;
                }else{
                    vertical = 2;
                }
                
                var horizontal;
                 if (value % 3 === 0) {
                    horizontal = 1;
                }else if (value % 3 === 1){
                    horizontal = 0;
                }else{
                    horizontal = 2;
                }
                
                self.nativeObject.contentVerticalAlignment = vertical;
                self.nativeObject.contentHorizontalAlignment = horizontal;
            },
            enumerable: true
        });
    
        var textColorsInitial = {
    		normal: Color.BLACK,
            disabled: Color.BLACK,
            selected: Color.BLACK,
            pressed: Color.BLACK,
            focused: Color.BLACK
    	};
    	
        Object.defineProperty(this, 'textColor', {
            get: function() {
                return textColorsInitial;
            }, 
            set: function(textColor) {
                textColorsInitial = textColor;
                if (textColor.constructor.name !== "Object") {
                    self.nativeObject.setTitleColor(textColor,ButtonState.normal);
                }else{
                    if (typeof textColor.normal !== 'undefined') {
                        self.nativeObject.setTitleColor(textColor.normal,ButtonState.normal);
                    }
                    if (typeof textColor.disabled !== 'undefined') {
                        self.nativeObject.setTitleColor(textColor.disabled,ButtonState.disabled);
                    }
                    if (typeof textColor.selected !== 'undefined') {
                        self.nativeObject.setTitleColor(textColor.selected,ButtonState.selected);
                    }
                    if (typeof textColor.pressed !== 'undefined') {
                        self.nativeObject.setTitleColor(textColor.pressed,ButtonState.pressed);
                    }
                    if (typeof textColor.focused !== 'undefined') {
                        self.nativeObject.setTitleColor(textColor.focused,ButtonState.focused);
                    }
                    
                } 
            },
            enumerable: true
        });
        
        var backgroundColorsInitial = {
    		normal: Color.TRANSPARENT,
            disabled: Color.TRANSPARENT,
            selected: Color.TRANSPARENT,
            pressed: Color.TRANSPARENT,
            focused: Color.TRANSPARENT
    	};
    	
        Object.defineProperty(this, 'backgroundColor', {
            get: function() {
                return backgroundColorsInitial;
            }, 
            set: function(bgColors) {
                backgroundColorsInitial = bgColors;
                 if (bgColors.constructor.name !== "Object") {
                     self.nativeObject.setBackgroundColor(backgroundColorsInitial,ButtonState.normal);
                 }else{
                     if (typeof backgroundColorsInitial.normal !== 'undefined') {
                        self.nativeObject.setBackgroundColor(backgroundColorsInitial.normal,ButtonState.normal);
                     }
                     if (typeof backgroundColorsInitial.disabled !== 'undefined') {
                         self.nativeObject.setBackgroundColor(backgroundColorsInitial.disabled,ButtonState.disabled);
                     }
                     if (typeof backgroundColorsInitial.selected !== 'undefined') {
                         self.nativeObject.setBackgroundColor(backgroundColorsInitial.selected,ButtonState.selected);
                     }
                     if (typeof backgroundColorsInitial.pressed !== 'undefined') {
                          self.nativeObject.setBackgroundColor(backgroundColorsInitial.pressed,ButtonState.pressed);
                     }
                     if (typeof backgroundColorsInitial.focused !== 'undefined') {
                          self.nativeObject.setBackgroundColor(backgroundColorsInitial.focused,ButtonState.focused);
                     }
                    
                 }
            },
            enumerable: true
        });
        
        var backgroundImagesInitial = {};
        Object.defineProperty(this, 'backgroundImage', {
            get: function() {
                return backgroundImagesInitial;
            }, 
            set: function(bgImages) {
                backgroundImagesInitial = bgImages;

                if (bgImages.constructor.name !== "Object") {
                     self.nativeObject.setBackgroundImage(backgroundImagesInitial.nativeObject,ButtonState.normal);
                }else{
                    if (backgroundImagesInitial.normal)
                      self.nativeObject.setBackgroundImage(backgroundImagesInitial.normal.nativeObject,ButtonState.normal);
                    if (backgroundImagesInitial.disabled)
                      self.nativeObject.setBackgroundImage(backgroundImagesInitial.disabled.nativeObject,ButtonState.disabled);
                    if (backgroundImagesInitial.selected)
                      self.nativeObject.setBackgroundImage(backgroundImagesInitial.selected.nativeObject,ButtonState.selected);
                    if (backgroundImagesInitial.pressed)
                      self.nativeObject.setBackgroundImage(backgroundImagesInitial.pressed.nativeObject,ButtonState.pressed);
                    if (backgroundImagesInitial.focused)
                      self.nativeObject.setBackgroundImage(backgroundImagesInitial.focused.nativeObject,ButtonState.focused);
                }
            },
            enumerable: true
        });
        
        var _onPressFunc;
        Object.defineProperty(self, 'onPress', {
            get: function() {
                return _onPressFunc;
            },
            set: function(value) {
                _onPressFunc = value;
                self.nativeObject.addJSTarget(value.bind(self),UIControlEvents.touchUpInside);
            },
            enumerable: true
         });
        
        Object.defineProperty(self, 'font', {
            get:function() {
                
                return self.nativeObject.titleLabel.font;
            },
            set:function(value) {
                self.nativeObject.titleLabel.font = value;
            },
            enumerable: true
         });
    
         // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
});
     
module.exports = Button;