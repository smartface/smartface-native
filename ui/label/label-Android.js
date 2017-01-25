const View = require('../view');
const Color = require("sf-core/ui/color");
const TextAlignment = require("sf-core/ui/textalignment");
const TypeUtil = require("sf-core/util/type");
const State = require("sf-core/ui/state");
const extend = require('js-base/core/extend');

const NativeScrollView = requireClass("android.widget.ScrollView");
const NativeTextView = requireClass("android.widget.TextView");
const NativeViewGroup = requireClass("android.view.ViewGroup");
const NativeHtml = requireClass("android.text.Html");
const NativeColor = requireClass("android.graphics.Color");
const NativeR = requireClass("android.R");
const NativeColorStateList = requireClass("android.content.res.ColorStateList");

const DEFAULT_COLOR = Color.BLACK;
        
const Label = extend(View)(
    function (_super, params) {
        var self = this;
        var textAlignmentInitial;
        var viewNativeDefaultTextAlignment;
        // Is Label Check
        if(!self.nativeObject){
            self.nativeObject = new NativeScrollView(Android.getActivity());
            self.nativeInner = new NativeTextView(Android.getActivity());

            // ViewGroup.LayoutParams.MATCH_PARENT = -1
            var innerlayoutParams = new NativeViewGroup.LayoutParams(-1, -1);
            self.nativeInner.setLayoutParams(innerlayoutParams);
            self.nativeObject.addView(self.nativeInner);
            self.nativeObject.setSmoothScrollingEnabled(true);
            self.nativeObject.setHorizontalScrollBarEnabled(false);
            self.nativeObject.setVerticalScrollBarEnabled(false);
            self.nativeObject.setFillViewport(true);
            
            textAlignmentInitial = TextAlignment.MIDLEFT;
            // Gravity.CENTER_VERTICAL | Gravity.LEFT
            (self.nativeInner ? self.nativeInner : self.nativeObject).setGravity(16 | 3);
            viewNativeDefaultTextAlignment = 16 | 3;
            
        }
        else{
            textAlignmentInitial = TextAlignment.MIDCENTER;
            // Gravity.CENTER
            (self.nativeInner ? self.nativeInner : self.nativeObject).setGravity(17);
            viewNativeDefaultTextAlignment = 17;
        }
        _super(this);

        Object.defineProperty(this, 'htmlText', {
            get: function() {
                var text = (self.nativeInner ? self.nativeInner : self.nativeObject).getText();
                if(text){
                    var htmlText = NativeHtml.toHtml(text);
                    return htmlText.toString();
                }
                else{
                    return "";
                }
                
            }, 
            set: function(htmlText) {
                var htmlTextNative = NativeHtml.fromHtml(htmlText);
                (self.nativeInner ? self.nativeInner : self.nativeObject).setText(htmlTextNative);
            },
            enumerable: true
        });

        var fontInitial;
        Object.defineProperty(this, 'font', {
            get: function() {
                return fontInitial;
            },
            set: function(font) {
                if(font){
                    fontInitial = font;
                    var nativeObject = self.nativeInner ? self.nativeInner : self.nativeObject;
                    if(font.nativeObject)
                        nativeObject.setTypeface(font.nativeObject);
                    if(font.size && TypeUtil.isNumeric(font.size))
                       nativeObject.setTextSize(font.size) ;
                    }
            },
            enumerable: true
        });

        Object.defineProperty(this, 'multiline', {
            get: function() {
                return (self.nativeInner ? self.nativeInner.getLineCount() : self.nativeObject.getLineCount() )!= 1;
            },
            set: function(multiline) {
                (self.nativeInner ? self.nativeInner : self.nativeObject).setSingleLine(!multiline);
            },
            enumerable: true
        });

        // @todo property returns CharSquence object not string. Caused by issue AND-2508
        Object.defineProperty(this, 'text', {
            get: function() {
                return (self.nativeInner ? self.nativeInner : self.nativeObject).getText();
            },
            set: function(text) {
                var nativeObject = self.nativeInner ? self.nativeInner : self.nativeObject;
                nativeObject.setText(text);
                // @todo this will cause performance issues in feature. Must be replaced.
                nativeObject.requestLayout();
            },
            enumerable: true
        });
        
        
        Object.defineProperty(this, 'textAlignment', {
            get: function() {
                return textAlignmentInitial;
            },
            set: function(textAlignment) {
                textAlignmentInitial = textAlignment;
                var alignment = viewNativeDefaultTextAlignment;
                switch(textAlignment){
                    case TextAlignment.TOPLEFT:
                        // Gravity.TOP | Gravity.LEFT
                        alignment = 48 | 3;
                        break;
                    case TextAlignment.TOPCENTER:
                        // Gravity.TOP | Gravity.CENTER_HORIZONTAL
                        alignment = 48 | 1;
                        break;
                    case TextAlignment.TOPRIGHT:
                        // Gravity.TOP | Gravity.RIGHT
                        alignment = 48 | 5;
                        break;
                    case TextAlignment.MIDLEFT:
                        // Gravity.CENTER_VERTICAL | Gravity.LEFT
                        alignment = 16 | 3;
                        break;
                    case TextAlignment.MIDCENTER:
                        // Gravity.CENTER
                        alignment = 17;
                        break;
                    case TextAlignment.MIDRIGHT:
                        // Gravity.CENTER_VERTICAL | Gravity.RIGHT
                        alignment = 16 | 5;
                        break;
                    case TextAlignment.BOTTOMLEFT:
                        // Gravity.BOTTOM | Gravity.LEFT
                        alignment = 80 | 3;
                        break;
                    case TextAlignment.BOTTOMCENTER:
                        // Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL
                        alignment = 80 | 1;
                        break;
                    case TextAlignment.BOTTOMRIGHT:
                        // Gravity.BOTTOM | Gravity.RIGHT
                        alignment = 80 | 5;
                        break;                   
                }
                (self.nativeInner ? self.nativeInner : self.nativeObject).setGravity(alignment);
            },
            enumerable: true
        });

        Object.defineProperty(this, 'textColor', {
            get: function() {
                var nativeObject = (self.nativeInner ? self.nativeInner : self.nativeObject);
                if(typeof(self.textColor) === "number") {
                    return nativeObject.getCurrentTextColor();
                }
                return createObjectFromColorStateList(nativeObject.getTextColors());
            },
            set: function(textColor) {
                var nativeObject = (self.nativeInner ? self.nativeInner : self.nativeObject);
                console.log("typeof(textColor) === number " + (typeof(textColor) === "number"));
                if(typeof(textColor) === "number") {
                    nativeObject.setTextColor(textColor);
                }
                else {
                    console.log("textColor is a state list.");
                    var textColorStateListDrawable = createColorStateList(textColor);
                    (self.nativeInner ? self.nativeInner : self.nativeObject).setTextColor(textColorStateListDrawable);
                }
            },
            enumerable: true
        });

        Object.defineProperty(this, 'showScrollBar', {
            get: function() {
                return self.nativeObject.isVerticalScrollBarEnabled();
            },
            set: function(showScrollBar) {
                self.nativeObject.setVerticalScrollBarEnabled(showScrollBar);
            },
            enumerable: true
        });
        
        function createObjectFromColorStateList(textColors) {
            var colors = {};
            console.log("Normal " + textColors.getColorForState(State.STATE_NORMAL, DEFAULT_COLOR));
            colors.normal = textColors.getColorForState(State.STATE_NORMAL, DEFAULT_COLOR);
            console.log("Disabled " + textColors.getColorForState(State.STATE_DISABLED, DEFAULT_COLOR));
            colors.disabled = textColors.getColorForState(State.STATE_DISABLED, DEFAULT_COLOR);
            console.log("Selected " + textColors.getColorForState(State.STATE_SELECTED, DEFAULT_COLOR));
            colors.selected = textColors.getColorForState(State.STATE_SELECTED, DEFAULT_COLOR);
            console.log("Pressed " + textColors.getColorForState(State.STATE_PRESSED, DEFAULT_COLOR));
            colors.pressed = textColors.getColorForState(State.STATE_PRESSED, DEFAULT_COLOR);
            console.log("Focused " + textColors.getColorForState(State.STATE_FOCUSED, DEFAULT_COLOR));
            colors.focused = textColors.getColorForState(State.STATE_FOCUSED, DEFAULT_COLOR);
            return colors;
            // int [] normal = {
            //         android.R.attr.State.STATE_enabled,
            //         -android.R.attr.State.STATE_pressed,
            //         -android.R.attr.State.STATE_selected
            // };
            // Log.i("ColorStateList", "" + thelist.getColorForState(normal, Color.CYAN));
        }
        
        function createColorStateList(textColors) {
            var statesSet = [];
            var colorsSets = [];
            if(textColors.normal){
                statesSet.push(State.STATE_NORMAL);
                colorsSets.push(textColors.normal);
            }
            if(textColors.disabled){
                statesSet.push(State.STATE_DISABLED);
                colorsSets.push(textColors.disabled);
            }
            if(textColors.selected){
                statesSet.push(State.STATE_SELECTED);
                colorsSets.push(textColors.selected);
            }
            if(textColors.pressed){
                statesSet.push(State.STATE_PRESSED);
                colorsSets.push(textColors.pressed);
            }
            if(textColors.focused){
                statesSet.push(State.STATE_FOCUSED);
                colorsSets.push(textColors.focused);
            }
            return (new NativeColorStateList (statesSet, colorsSets));
        }
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = Label;