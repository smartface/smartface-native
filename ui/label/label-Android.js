const extend                        = require('js-base/core/extend');
const View                          = require('sf-core/ui/view');
const Color                         = require("sf-core/ui/color");
const TextAlignment                 = require("sf-core/ui/textalignment");
const TypeUtil                      = require("sf-core/util/type");
const AndroidUnitConverter          = require("sf-core/util/Android/unitconverter.js");
const AndroidConfig                 = require("sf-core/util/Android/androidconfig.js");

const NativeTextView = requireClass("android.widget.TextView");
const NativeColorStateList = requireClass("android.content.res.ColorStateList");

const TextAlignmentDic = {};
TextAlignmentDic[TextAlignment.TOPLEFT] = int(48 | 3);// Gravity.TOP | Gravity.LEFT
TextAlignmentDic[TextAlignment.TOPCENTER] = int(48 | 1); //Gravity.TOP | Gravity.CENTER_HORIZONTAL
TextAlignmentDic[TextAlignment.TOPRIGHT] = int(48 | 5); //Gravity.TOP | Gravity.RIGHT
TextAlignmentDic[TextAlignment.MIDLEFT] = int(16 | 3); // Gravity.CENTER_VERTICAL | Gravity.LEFT
TextAlignmentDic[TextAlignment.MIDCENTER] = int(17); // Gravity.CENTER
TextAlignmentDic[TextAlignment.MIDRIGHT] = int(16 | 5); // Gravity.CENTER_VERTICAL | Gravity.RIGHT
TextAlignmentDic[TextAlignment.BOTTOMLEFT] = int(80 | 3); // Gravity.BOTTOM | Gravity.LEFT
TextAlignmentDic[TextAlignment.BOTTOMCENTER] = int(80 | 1); // Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL
TextAlignmentDic[TextAlignment.BOTTOMRIGHT] = int(80 | 5); // Gravity.BOTTOM | Gravity.RIGHT

const activity = AndroidConfig.activity;
const INT_16_3 = int(16 | 3);
const INT_17 = int(17);

const Label = extend(View)(
    function (_super, params) {
        var self = this;
        
        // Is Label Check
        if(!self.nativeObject){
            self.nativeObject = new NativeTextView(activity);
            this._textAlignment = TextAlignment.MIDLEFT;
            // Gravity.CENTER_VERTICAL | Gravity.LEFT
            self.nativeObject.setGravity(INT_16_3);
            this.viewNativeDefaultTextAlignment = INT_16_3;
            
        }
        else{
            if(!this.isNotSetDefaults){
                this._textAlignment = TextAlignment.MIDCENTER;
                // Gravity.CENTER
                self.nativeObject.setGravity(INT_17);
                this.viewNativeDefaultTextAlignment = INT_17;
                // this.padding = 0;
            }
        }
        
        _super(this);
        
        // Handling iOS-specific properties
        this.ios = {};
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    },
    function(labelPrototype) {
        labelPrototype.fontInitial = null;
        labelPrototype._textAlignment = null;
        labelPrototype.viewNativeDefaultTextAlignment = null;
        labelPrototype._textColor = Color.BLACK;
        labelPrototype.toString = function() {
            return 'Label';
        };
        
        Object.defineProperties(labelPrototype, {
            'htmlText': {
                get: function() {
                    var text = this.nativeObject.getText();
                    if(text){
                        const NativeHtml = requireClass("android.text.Html");
                        var htmlText = NativeHtml.toHtml(text);
                        return string(htmlText.toString());
                    }
                    else{
                        return "";
                    }
                    
                }, 
                set: function(htmlText) {
                    const NativeHtml = requireClass("android.text.Html");
                    var htmlTextNative = NativeHtml.fromHtml(string("" + htmlText));
                    this.nativeObject.setText(htmlTextNative);
                },
                enumerable: true
            },
            'font': {
                get: function() {
                    return this.fontInitial;
                },
                set: function(font) {
                    if(font){
                        this.fontInitial = font;
                        this.nativeObject.setTypeface(font.nativeObject);
                        if(font.size && TypeUtil.isNumeric(font.size))
                          this.nativeObject.setTextSize(int(font.size));
                        }
                },
                enumerable: true
            },
            'multiline': {
                get: function() {
                    return int(this.nativeObject.getLineCount()) !== 1;
                },
                set: function(multiline) {
                    this.nativeObject.setSingleLine(bool(!multiline));
                    // Integer.MAX_VALUE
                    // const NativeInteger = requireClass("java.lang.Integer");
                    this.nativeObject.setMaxLines (int(multiline ? 1000 : 1));
                    if(multiline){
                        const NativeScrollingMovementMethod = requireClass("android.text.method.ScrollingMovementMethod");
                        var movementMethod = new NativeScrollingMovementMethod();
                        this.nativeObject.setMovementMethod(movementMethod);
                    }
                    else{
                        this.nativeObject.setMovementMethod(null);
                    }
                },
                enumerable: true
            },
            'selectable': {
                get: function() {
                    return bool(this.nativeObject.isTextSelectable());
                },
                set: function(value) {
                    if(TypeUtil.isBoolean(value)){
                        this.nativeObject.setTextIsSelectable(bool(value));
                    }
                },
                enumerable: true
            },
            'text': {
                get: function() {
                    return string(this.nativeObject.getText());
                },
                set: function(text) {
                    this.nativeObject.setText(string("" + text));
                },
                enumerable: true,
                configurable: true
            },
            'textAlignment': {
                get: function() {
                    return this._textAlignment;
                },
                set: function(textAlignment) {
                    if(textAlignment in TextAlignmentDic){
                        this._textAlignment = textAlignment;
                    }
                    else{
                        this._textAlignment = this.viewNativeDefaultTextAlignment;
                    }
                    this.nativeObject.setGravity(TextAlignmentDic[this._textAlignment]);
                },
                enumerable: true
            },
            'textColor': {
                get: function() {
                    return this._textColor;
                },
                set: function(textColor) {
                    if(textColor.nativeObject) {
                        this._textColor = textColor;
                        this.nativeObject.setTextColor(textColor.nativeObject);
                    }
                    else if(TypeUtil.isObject(textColor)) {
                        this._textColor = textColor;
                        var textColorStateListDrawable = createColorStateList(textColor);
                        this.nativeObject.setTextColor(textColorStateListDrawable);
                    }
                },
                enumerable: true
            },
            'padding': {
                get: function() {
                    return this.paddingLeft;
                },
                set: function(padding) {
                    this.nativeObject.setPadding(int(AndroidUnitConverter.dpToPixel(padding)),
                                                int(AndroidUnitConverter.dpToPixel(padding)),
                                                int(AndroidUnitConverter.dpToPixel(padding)),
                                                int(AndroidUnitConverter.dpToPixel(padding)));
                },
                enumerable: true
            },
            'paddingLeft': {
                get: function() {
                    return AndroidUnitConverter.pixelToDp(int(this.nativeObject.getPaddingLeft()));
                },
                set: function(paddingLeft) {
                    var paddingBottom = this.paddingBottom;
                    var paddingRight = this.paddingRight;
                    var paddingTop = this.paddingTop;
                    this.nativeObject.setPadding(int(AndroidUnitConverter.dpToPixel(paddingLeft)),
                                                int(AndroidUnitConverter.dpToPixel(paddingTop)),
                                                int(AndroidUnitConverter.dpToPixel(paddingRight)),
                                                int(AndroidUnitConverter.dpToPixel(paddingBottom)));
                },
                enumerable: true
            },
            'paddingRight': {
                get: function() {
                    return AndroidUnitConverter.pixelToDp(int(this.nativeObject.getPaddingRight()));
                },
                set: function(paddingRight) {
                    var paddingLeft = this.paddingLeft;
                    var paddingBottom = this.paddingBottom;
                    var paddingTop = this.paddingTop;
                    this.nativeObject.setPadding(int(AndroidUnitConverter.dpToPixel(paddingLeft)),
                                                int(AndroidUnitConverter.dpToPixel(paddingTop)),
                                                int(AndroidUnitConverter.dpToPixel(paddingRight)),
                                                int(AndroidUnitConverter.dpToPixel(paddingBottom)));
                },
                enumerable: true
            },
            'paddingTop': {
                get: function() {
                    return AndroidUnitConverter.pixelToDp(int(this.nativeObject.getPaddingTop()));
                },
                set: function(paddingTop) {
                    var paddingLeft = this.paddingLeft;
                    var paddingRight = this.paddingRight;
                    var paddingBottom = this.paddingBottom;
                    this.nativeObject.setPadding(int(AndroidUnitConverter.dpToPixel(paddingLeft)),
                                                int(AndroidUnitConverter.dpToPixel(paddingTop)),
                                                int(AndroidUnitConverter.dpToPixel(paddingRight)),
                                                int(AndroidUnitConverter.dpToPixel(paddingBottom)));
                },
                enumerable: true
            },
            'paddingBottom': {
                get: function() {
                    return AndroidUnitConverter.pixelToDp(int(this.nativeObject.getPaddingBottom()));
                },
                set: function(paddingBottom) {
                    var paddingLeft = this.paddingLeft;
                    var paddingRight = this.paddingRight;
                    var paddingTop = this.paddingTop;
                    this.nativeObject.setPadding(int(AndroidUnitConverter.dpToPixel(paddingLeft)),
                                                int(AndroidUnitConverter.dpToPixel(paddingTop)),
                                                int(AndroidUnitConverter.dpToPixel(paddingRight)),
                                                int(AndroidUnitConverter.dpToPixel(paddingBottom)));
                },
                enumerable: true
            }
        });
    }
);

function createColorStateList(textColors) {
    var statesSet = [];
    var colorsSets = [];
    if(textColors.normal){
        statesSet.push(View.State.STATE_NORMAL);
        colorsSets.push(textColors.normal);
    }
    if(textColors.disabled){
        statesSet.push(View.State.STATE_DISABLED);
        colorsSets.push(textColors.disabled);
    }
    if(textColors.selected){
        statesSet.push(View.State.STATE_SELECTED);
        colorsSets.push(textColors.selected);
    }
    if(textColors.pressed){
        statesSet.push(View.State.STATE_PRESSED);
        colorsSets.push(textColors.pressed);
    }
    if(textColors.focused){
        statesSet.push(View.State.STATE_FOCUSED);
        colorsSets.push(textColors.focused);
    }
    return (new NativeColorStateList (array(statesSet), array(colorsSets)));
}

module.exports = Label;