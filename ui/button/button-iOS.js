const View = require("sf-core/ui/view");
const Color = require("sf-core/ui/color");
const StateList = require("sf-core/util/statelist");
const extend = require('js-base/core/extend');

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
                
                var horizantal;
                 if (value % 3 == 0) {
                    horizantal = 1;
                }else if (value % 3 == 1){
                    horizantal = 0;
                }else{
                    horizantal = 2;
                }
                
                self.nativeObject.contentVerticalAlignment = vertical;
                self.nativeObject.contentHorizontalAlignment = horizantal;
            },
            enumerable: true
        });
    
        var textColorsInitial = new StateList(
            Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK
        );
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
        
        var backgroundColorsInitial = new StateList(
            Color.TRANSPARENT, Color.TRANSPARENT, Color.TRANSPARENT, Color.TRANSPARENT, Color.TRANSPARENT
        );
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
        
        var backgroundImagesInitial = new StateList(
            "", "", "", "", ""
        );
        Object.defineProperty(this, 'backgroundImages', {
            get: function() {
                return backgroundImagesInitial;
            }, 
            set: function(bgImages) {
                backgroundImagesInitial = bgImages;

                self.nativeObject.setBackgroundImage(backgroundImagesInitial.normal,ButtonState.normal);
                self.nativeObject.setBackgroundImage(backgroundImagesInitial.disabled,ButtonState.disabled);
                self.nativeObject.setBackgroundImage(backgroundImagesInitial.selected,ButtonState.selected);
                self.nativeObject.setBackgroundImage(backgroundImagesInitial.pressed,ButtonState.pressed);
                self.nativeObject.setBackgroundImage(backgroundImagesInitial.focused,ButtonState.focused);
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