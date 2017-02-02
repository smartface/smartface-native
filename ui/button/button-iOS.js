const View = require("nf-core/ui/view");
const Color = require("nf-core/ui/color");
const StateList = require("nf-core/util/statelist");
const extend = require('js-base/core/extend');
const UIControlEvents = require("nf-core/util").UIControlEvents;

const ButtonState = {
        normal: 0,
        disabled: 1,
        selected: 2,
        pressed: 3,
        focused: 4 // #available(iOS 9.0, *)
    }

const Button = extend(View)(
     function (_super, params) {
        var self = this;
        
        if(!self.nativeObject){
            self.nativeObject = new SMFUIButton(); 
        }
          
        _super(this);
        
        self.nativeObject.setTitleColor(Color.BLACK,ButtonState.normal);

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
        
        var _textAligment = 4;
        Object.defineProperty(self, 'textAlignment', {
            get: function() {
                return self.nativeObject.textAlignmentNumber;
            },
            set: function(value) {
                _textAligment = value;
                
                var vertical;
                if (parseInt(value / 3) == 0) {
                    vertical = 1;
                }else if (parseInt(value / 3) == 1){
                    vertical = 0;
                }else{
                    vertical = 2;
                }
                
                var horizontal;
                 if (value % 3 == 0) {
                    horizontal = 1;
                }else if (value % 3 == 1){
                    horizontal = 0;
                }else{
                    horizontal = 2;
                }
                
                self.nativeObject.contentVerticalAlignment = vertical;
                self.nativeObject.contentHorizontalAlignment = horizontal;
            },
            enumerable: true
        });
    
        var textColorsInitial = new StateList({
    		normal: Color.BLACK,
            disabled: Color.BLACK,
            selected: Color.BLACK,
            pressed: Color.BLACK,
            focused: Color.BLACK
    	});
        Object.defineProperty(this, 'textColors', {
            get: function() {
                return textColorsInitial;
            }, 
            set: function(textColors) {
                textColorsInitial = textColors;

                self.nativeObject.setTitleColor(textColorsInitial.normal,ButtonState.normal);
                self.nativeObject.setTitleColor(textColorsInitial.disabled,ButtonState.disabled);
                self.nativeObject.setTitleColor(textColorsInitial.selected,ButtonState.selected);
                self.nativeObject.setTitleColor(textColorsInitial.pressed,ButtonState.pressed);
                self.nativeObject.setTitleColor(textColorsInitial.focused,ButtonState.focused);
                
            },
            enumerable: true
        });
        
        var backgroundColorsInitial = new StateList({
    		normal: Color.TRANSPARENT,
            disabled: Color.TRANSPARENT,
            selected: Color.TRANSPARENT,
            pressed: Color.TRANSPARENT,
            focused: Color.TRANSPARENT
    	});
        Object.defineProperty(this, 'backgroundColors', {
            get: function() {
                return backgroundColorsInitial;
            }, 
            set: function(bgColors) {
                backgroundColorsInitial = bgColors;

                self.nativeObject.setBackgroundColor(backgroundColorsInitial.normal,ButtonState.normal);
                self.nativeObject.setBackgroundColor(backgroundColorsInitial.disabled,ButtonState.disabled);
                self.nativeObject.setBackgroundColor(backgroundColorsInitial.selected,ButtonState.selected);
                self.nativeObject.setBackgroundColor(backgroundColorsInitial.pressed,ButtonState.pressed);
                self.nativeObject.setBackgroundColor(backgroundColorsInitial.focused,ButtonState.focused);
            },
            enumerable: true
        });
        
        var backgroundImagesInitial = new StateList({});
        Object.defineProperty(this, 'backgroundImages', {
            get: function() {
                return backgroundImagesInitial;
            }, 
            set: function(bgImages) {
                backgroundImagesInitial = bgImages;
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
         
         var _textColor = Color.BLACK;
        Object.defineProperty(self, 'textColor', {
            get: function() {
                return _textColor;
            },
            set: function(value) {
                _textColor = value;
                self.nativeObject.setTitleColor(value,ButtonState.normal);
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