const extend                        = require('js-base/core/extend');
const View                          = require('sf-core/ui/view');
const Color                         = require("sf-core/ui/color");
const TextAlignment                 = require("sf-core/ui/textalignment");
const TypeUtil                      = require("sf-core/util/type");
const AndroidUnitConverter          = require("sf-core/util/Android/unitconverter.js");

const TextAlignmentDic = {};
TextAlignmentDic[TextAlignment.TOPLEFT] = 48 | 3;// Gravity.TOP | Gravity.LEFT
TextAlignmentDic[TextAlignment.TOPCENTER] = 48 | 1; //Gravity.TOP | Gravity.CENTER_HORIZONTAL
TextAlignmentDic[TextAlignment.TOPRIGHT] = 48 | 5; //Gravity.TOP | Gravity.RIGHT
TextAlignmentDic[TextAlignment.MIDLEFT] = 16 | 3; // Gravity.CENTER_VERTICAL | Gravity.LEFT
TextAlignmentDic[TextAlignment.MIDCENTER] = 17; // Gravity.CENTER
TextAlignmentDic[TextAlignment.MIDRIGHT] = 16 | 5; // Gravity.CENTER_VERTICAL | Gravity.RIGHT
TextAlignmentDic[TextAlignment.BOTTOMLEFT] = 80 | 3; // Gravity.BOTTOM | Gravity.LEFT
TextAlignmentDic[TextAlignment.BOTTOMCENTER] = 80 | 1; // Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL
TextAlignmentDic[TextAlignment.BOTTOMRIGHT] = 80 | 5; // Gravity.BOTTOM | Gravity.RIGHT

const Label = extend(View)(
    function (_super, params) {
        var self = this;
        var _textAlignment;
        var viewNativeDefaultTextAlignment;
        var activity = Android.getActivity();
        var fontInitial;
        var _textColor = Color.BLACK;
        
        // Is Label Check
        if(!self.nativeObject){
            const NativeTextView = requireClass("android.widget.TextView");
            self.nativeObject = new NativeTextView(activity);
            _textAlignment = TextAlignment.MIDLEFT;
            // Gravity.CENTER_VERTICAL | Gravity.LEFT
            self.nativeObject.setGravity(16 | 3);
            viewNativeDefaultTextAlignment = 16 | 3;
            
        }
        else{
            if(!this.isNotSetDefaults){
                _textAlignment = TextAlignment.MIDCENTER;
                // Gravity.CENTER
                self.nativeObject.setGravity(17);
                viewNativeDefaultTextAlignment = 17;
                this.padding = 0;
            }
        }
        
        _super(this);

        Object.defineProperties(this, {
            'htmlText': {
                get: function() {
                    var text = self.nativeObject.getText();
                    if(text){
                        const NativeHtml = requireClass("android.text.Html");
                        var htmlText = NativeHtml.toHtml(text);
                        return htmlText.toString();
                    }
                    else{
                        return "";
                    }
                    
                }, 
                set: function(htmlText) {
                    const NativeHtml = requireClass("android.text.Html");
                    var htmlTextNative = NativeHtml.fromHtml("" + htmlText);
                    self.nativeObject.setText(htmlTextNative);
                },
                enumerable: true
            },
            'font': {
                get: function() {
                    return fontInitial;
                },
                set: function(font) {
                    if(font){
                        fontInitial = font;
                        self.nativeObject.setTypeface(font.nativeObject);
                        if(font.size && TypeUtil.isNumeric(font.size))
                           self.nativeObject.setTextSize(font.size);
                        }
                },
                enumerable: true
            },
            'multiline': {
                get: function() {
                    return self.nativeObject.getLineCount() !== 1;
                },
                set: function(multiline) {
                    self.nativeObject.setSingleLine(!multiline);
                    // Integer.MAX_VALUE
                    // const NativeInteger = requireClass("java.lang.Integer");
                    self.nativeObject.setMaxLines (multiline ? 1000 : 1);
                    if(multiline){
                        const NativeScrollingMovementMethod = requireClass("android.text.method.ScrollingMovementMethod");
                        var movementMethod = new NativeScrollingMovementMethod();
                        self.nativeObject.setMovementMethod(movementMethod);
                    }
                    else{
                        self.nativeObject.setMovementMethod(null);
                    }
                },
                enumerable: true
            },
            'selectable': {
                get: function() {
                    return self.nativeObject.isTextSelectable();
                },
                set: function(value) {
                    if(TypeUtil.isBoolean(value)){
                        self.nativeObject.setTextIsSelectable(value);
                    }
                },
                enumerable: true
            },
            'text': {
                get: function() {
                    return self.nativeObject.getText();
                },
                set: function(text) {
                    self.nativeObject.setText("" + text);
                },
                enumerable: true,
                configurable: true
            },
            'textAlignment': {
                get: function() {
                    return _textAlignment;
                },
                set: function(textAlignment) {
                    if(textAlignment in TextAlignmentDic){
                        _textAlignment = textAlignment;
                    }
                    else{
                        _textAlignment = viewNativeDefaultTextAlignment;
                    }
                    self.nativeObject.setGravity(TextAlignmentDic[_textAlignment]);
                },
                enumerable: true
            },
            'textColor': {
                get: function() {
                    return _textColor;
                },
                set: function(textColor) {
                    if(TypeUtil.isNumeric(textColor.nativeObject)) {
                        _textColor = textColor;
                        self.nativeObject.setTextColor(textColor.nativeObject);
                    }
                    else if(TypeUtil.isObject(textColor)) {
                        _textColor = textColor;
                        var textColorStateListDrawable = createColorStateList(textColor);
                        self.nativeObject.setTextColor(textColorStateListDrawable);
                    }
                },
                enumerable: true
            },
            'padding': {
                get: function() {
                    return self.paddingLeft;
                },
                set: function(padding) {
                    self.nativeObject.setPadding(AndroidUnitConverter.dpToPixel(padding),
                                                AndroidUnitConverter.dpToPixel(padding),
                                                AndroidUnitConverter.dpToPixel(padding),
                                                AndroidUnitConverter.dpToPixel(padding));
                },
                enumerable: true
            },
            'paddingLeft': {
                get: function() {
                    return AndroidUnitConverter.pixelToDp(self.nativeObject.getPaddingLeft());
                },
                set: function(paddingLeft) {
                    var paddingBottom = self.paddingBottom;
                    var paddingRight = self.paddingRight;
                    var paddingTop = self.paddingTop;
                    self.nativeObject.setPadding(AndroidUnitConverter.dpToPixel(paddingLeft),
                                                AndroidUnitConverter.dpToPixel(paddingTop),
                                                AndroidUnitConverter.dpToPixel(paddingRight),
                                                AndroidUnitConverter.dpToPixel(paddingBottom));
                },
                enumerable: true
            },
            'paddingRight': {
                get: function() {
                    return AndroidUnitConverter.pixelToDp(self.nativeObject.getPaddingRight());
                },
                set: function(paddingRight) {
                    var paddingLeft = self.paddingLeft;
                    var paddingBottom = self.paddingBottom;
                    var paddingTop = self.paddingTop;
                    self.nativeObject.setPadding(AndroidUnitConverter.dpToPixel(paddingLeft),
                                                AndroidUnitConverter.dpToPixel(paddingTop),
                                                AndroidUnitConverter.dpToPixel(paddingRight),
                                                AndroidUnitConverter.dpToPixel(paddingBottom));
                },
                enumerable: true
            },
            'paddingTop': {
                get: function() {
                    return AndroidUnitConverter.pixelToDp(self.nativeObject.getPaddingTop());
                },
                set: function(paddingTop) {
                    var paddingLeft = self.paddingLeft;
                    var paddingRight = self.paddingRight;
                    var paddingBottom = self.paddingBottom;
                    self.nativeObject.setPadding(AndroidUnitConverter.dpToPixel(paddingLeft),
                                                AndroidUnitConverter.dpToPixel(paddingTop),
                                                AndroidUnitConverter.dpToPixel(paddingRight),
                                                AndroidUnitConverter.dpToPixel(paddingBottom));
                },
                enumerable: true
            },
            'paddingBottom': {
                get: function() {
                    return AndroidUnitConverter.pixelToDp(self.nativeObject.getPaddingBottom());
                },
                set: function(paddingBottom) {
                    var paddingLeft = self.paddingLeft;
                    var paddingRight = self.paddingRight;
                    var paddingTop = self.paddingTop;
                    self.nativeObject.setPadding(AndroidUnitConverter.dpToPixel(paddingLeft),
                                                AndroidUnitConverter.dpToPixel(paddingTop),
                                                AndroidUnitConverter.dpToPixel(paddingRight),
                                                AndroidUnitConverter.dpToPixel(paddingBottom));
                },
                enumerable: true
            },
            'toString': {
                value: function(){
                    return 'Label';
                },
                enumerable: true, 
                configurable: true
            }
        });
        
        // Handling iOS-specific properties
        this.ios = {};
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

function createColorStateList(textColors) {
    const NativeColorStateList = requireClass("android.content.res.ColorStateList");
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
    return (new NativeColorStateList (statesSet, colorsSets));
}

module.exports = Label;