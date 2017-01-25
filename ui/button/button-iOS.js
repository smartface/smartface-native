const View = require("nf-core/ui/view");
const Color = require("nf-core/ui/color");
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
    
        var textColorsInitial = {
    		normal: Color.BLACK,
            disabled: Color.BLACK,
            selected: Color.BLACK,
            pressed: Color.BLACK,
            focused: Color.BLACK
    	}
    	
        Object.defineProperty(this, 'textColor', {
            get: function() {
                return textColorsInitial;
            }, 
            set: function(textColor) {
                textColorsInitial = textColor;
                if (textColor.constructor.name != "Object") {
                    self.nativeObject.setTitleColor(textColor,ButtonState.normal);
                }else{
                    self.nativeObject.setTitleColor(textColor.normal,ButtonState.normal);
                    self.nativeObject.setTitleColor(textColor.disabled,ButtonState.disabled);
                    self.nativeObject.setTitleColor(textColor.selected,ButtonState.selected);
                    self.nativeObject.setTitleColor(textColor.pressed,ButtonState.pressed);
                    self.nativeObject.setTitleColor(textColor.focused,ButtonState.focused);
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
                 if (bgColors.constructor.name != "Object") {
                     self.nativeObject.setBackgroundColor(backgroundColorsInitial,ButtonState.normal);
                 }else{
                    self.nativeObject.setBackgroundColor(backgroundColorsInitial.normal,ButtonState.normal);
                    self.nativeObject.setBackgroundColor(backgroundColorsInitial.disabled,ButtonState.disabled);
                    self.nativeObject.setBackgroundColor(backgroundColorsInitial.selected,ButtonState.selected);
                    self.nativeObject.setBackgroundColor(backgroundColorsInitial.pressed,ButtonState.pressed);
                    self.nativeObject.setBackgroundColor(backgroundColorsInitial.focused,ButtonState.focused);
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

                if (bgImages.constructor.name != "Object") {
                     self.nativeObject.setBackgroundImage(backgroundImagesInitial,ButtonState.normal);
                }else{
                    if (backgroundImagesInitial.normal)
                      self.nativeObject.setBackgroundImage(backgroundImagesInitial.normal,ButtonState.normal);
                    if (backgroundImagesInitial.disabled)
                      self.nativeObject.setBackgroundImage(backgroundImagesInitial.disabled,ButtonState.disabled);
                    if (backgroundImagesInitial.selected)
                      self.nativeObject.setBackgroundImage(backgroundImagesInitial.selected,ButtonState.selected);
                    if (backgroundImagesInitial.pressed)
                      self.nativeObject.setBackgroundImage(backgroundImagesInitial.pressed,ButtonState.pressed);
                    if (backgroundImagesInitial.focused)
                      self.nativeObject.setBackgroundImage(backgroundImagesInitial.focused,ButtonState.focused);
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