const View = require("sf-core/ui/view");
const Color = require("sf-core/ui/color");
const StateList = require("sf-core/util/statelist");
const extend = require('js-base/core/extend');
const UIControlEvents = require("sf-core/util").UIControlEvents;

const ButtonState = {
        normal: 0,
        disabled: 1,
        selected: 2,
        pressed: 3,
        focused: 4 // #available(iOS 9.0, *)
    }

const Button = extend(View)(
     function (_super, params) {
        _super(this);
        var self = this;
        self.nativeObject = new SMFUIButton();
        
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
        
        var backgroundImagesInitial = new StateList({          
            normal: "", 
            disabled: "", 
            selected: "", 
            pressed: "", 
            focused: ""
        });
        Object.defineProperty(this, 'backgroundImages', {
            get: function() {
                return backgroundImagesInitial;
            }, 
            set: function(bgImages) {
                backgroundImagesInitial = bgImages;
                
                self.nativeObject.setBackgroundImage(new UIImage(backgroundImagesInitial.normal),ButtonState.normal);
                self.nativeObject.setBackgroundImage(new UIImage(backgroundImagesInitial.disabled),ButtonState.disabled);
                self.nativeObject.setBackgroundImage(new UIImage(backgroundImagesInitial.selected),ButtonState.selected);
                self.nativeObject.setBackgroundImage(new UIImage(backgroundImagesInitial.pressed),ButtonState.pressed);
                self.nativeObject.setBackgroundImage(new UIImage(backgroundImagesInitial.focused),ButtonState.focused);
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
                self.nativeObject.addJSTarget(value,UIControlEvents.touchUpInside);
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