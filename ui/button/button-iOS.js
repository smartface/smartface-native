const View = require("sf-core/ui/view");
const Color = require("sf-core/ui/color");
const Image = require("sf-core/ui/image");
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
        self.nativeObject.setTitleColor(Color.WHITE.nativeObject,ButtonState.normal);
        self.nativeObject.setBackgroundColor(Color.create("#00A1F1").nativeObject,ButtonState.normal);

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
                    self.nativeObject.setTitleColor(textColor.nativeObject,ButtonState.normal);
                }else{
                    if (typeof textColor.normal !== 'undefined') {
                        self.nativeObject.setTitleColor(textColor.normal.nativeObject,ButtonState.normal);
                    }
                    if (typeof textColor.disabled !== 'undefined') {
                        self.nativeObject.setTitleColor(textColor.disabled.nativeObject,ButtonState.disabled);
                    }
                    if (typeof textColor.selected !== 'undefined') {
                        self.nativeObject.setTitleColor(textColor.selected.nativeObject,ButtonState.selected);
                    }
                    if (typeof textColor.pressed !== 'undefined') {
                        self.nativeObject.setTitleColor(textColor.pressed.nativeObject,ButtonState.pressed);
                    }
                    if (typeof textColor.focused !== 'undefined') {
                        self.nativeObject.setTitleColor(textColor.focused.nativeObject,ButtonState.focused);
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
                     checkAndSetBackground(backgroundColorsInitial,ButtonState.normal);
                 }else{
                     if (typeof backgroundColorsInitial.normal !== 'undefined') {
                         checkAndSetBackground(backgroundColorsInitial.normal,ButtonState.normal);
                     }
                     if (typeof backgroundColorsInitial.disabled !== 'undefined') {
                         checkAndSetBackground(backgroundColorsInitial.disabled,ButtonState.disabled);
                     }
                     if (typeof backgroundColorsInitial.selected !== 'undefined') {
                         checkAndSetBackground(backgroundColorsInitial.selected,ButtonState.selected);
                     }
                     if (typeof backgroundColorsInitial.pressed !== 'undefined') {
                         checkAndSetBackground(backgroundColorsInitial.pressed,ButtonState.pressed);
                     }
                     if (typeof backgroundColorsInitial.focused !== 'undefined') {
                         checkAndSetBackground(backgroundColorsInitial.focused,ButtonState.focused);
                     }
                 }
            },
            enumerable: true
        });
        
        self.gradientColorObject = {};
        function checkAndSetBackground(background,state){
            if (background.nativeObject.constructor.name === "CAGradientLayer"){
                if(Object.keys(self.gradientColorObject).length == 0){
                    self.nativeObject.addFrameObserver();
                    self.nativeObject.frameObserveHandler = function(e){
                        if (self.nativeObject.frame.width === 0 || self.nativeObject.frame.height === 0){
                            return;
                        }
                        for(var state in self.gradientColorObject){
                            var color = self.gradientColorObject[state];
                            color.nativeObject.frame = e.frame;
                            var layerColor = color.nativeObject.layerToImage();
                            self.nativeObject.setBackgroundImage(layerColor,state);
                        }
                    } 
                }
                self.gradientColorObject[state] = background;
                if (self.nativeObject.frame.width === 0 || self.nativeObject.frame.height === 0){
                    return;
                }
                background.nativeObject.frame = self.nativeObject.frame;
                var layerColor = background.nativeObject.layerToImage();
                self.nativeObject.setBackgroundImage(layerColor,state);
            }else{
                if(Object.keys(self.gradientColorObject).length != 0 && self.gradientColorObject[state]){
                    delete self.gradientColorObject[state];
                    if (Object.keys(self.gradientColorObject).length == 0){
                        self.nativeObject.removeFrameObserver();
                    }
                }
                if (background instanceof Color) {
                    self.nativeObject.setBackgroundColor(background.nativeObject,state);
                }else if(background instanceof Image){
                    self.nativeObject.setBackgroundImage(background.nativeObject,state);
                }
                
            }
        }
        
        var backgroundImagesInitial = {};
        Object.defineProperty(this, 'backgroundImage', {
            get: function() {
                return backgroundImagesInitial;
            }, 
            set: function(bgImages) {
                backgroundImagesInitial = bgImages;

                if (bgImages.constructor.name !== "Object") {
                     checkAndSetBackground(backgroundImagesInitial,ButtonState.normal);
                }else{
                    if (backgroundImagesInitial.normal)
                      checkAndSetBackground(backgroundImagesInitial.normal,ButtonState.normal);
                    if (backgroundImagesInitial.disabled)
                      checkAndSetBackground(backgroundImagesInitial.disabled,ButtonState.disabled);
                    if (backgroundImagesInitial.selected)
                      checkAndSetBackground(backgroundImagesInitial.selected,ButtonState.selected);
                    if (backgroundImagesInitial.pressed)
                      checkAndSetBackground(backgroundImagesInitial.pressed,ButtonState.pressed);
                    if (backgroundImagesInitial.focused)
                      checkAndSetBackground(backgroundImagesInitial.focused,ButtonState.focused);
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