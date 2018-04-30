/*globals requireClass*/
const extend = require('js-base/core/extend');
const Label = require('../label');
const TextAlignment = require("../textalignment");
const TypeUtil = require("../../util/type");

const unitconverter = require('sf-core/util/Android/unitconverter');
const NativeBuild = requireClass("android.os.Build");
const NativeColor = requireClass("android.graphics.Color");
const NativeLinkMovementMethod = requireClass("android.text.method.LinkMovementMethod");
const NativeSpannableStringBuilder = requireClass("android.text.SpannableStringBuilder");
const NativeBackgroundColorSpan = requireClass("android.text.style.BackgroundColorSpan");
const NativeClickableSpan = requireClass("android.text.style.ClickableSpan");
const NativeForegroundColorSpan = requireClass("android.text.style.ForegroundColorSpan");
const NativeAbsoluteSizeSpan = requireClass("android.text.style.AbsoluteSizeSpan");
const NativeUnderlineSpan = requireClass("android.text.style.UnderlineSpan");
const NativeTypefaceSpan = requireClass("android.text.style.TypefaceSpan");
const NativeLineHeightSpan = requireClass("android.text.style.LineHeightSpan");
const NativeTypeface = requireClass("android.graphics.Typeface");
var SPAN_EXCLUSIVE_EXCLUSIVE = 33;

const TextAlignmentDic = {};
TextAlignmentDic[TextAlignment.TOPLEFT] = 48 | 3; // Gravity.TOP | Gravity.LEFT
TextAlignmentDic[TextAlignment.TOPCENTER] = 48 | 1; //Gravity.TOP | Gravity.CENTER_HORIZONTAL
TextAlignmentDic[TextAlignment.TOPRIGHT] = 48 | 5; //Gravity.TOP | Gravity.RIGHT
TextAlignmentDic[TextAlignment.MIDLEFT] = 16 | 3; // Gravity.CENTER_VERTICAL | Gravity.LEFT
TextAlignmentDic[TextAlignment.MIDCENTER] = 17; // Gravity.CENTER
TextAlignmentDic[TextAlignment.MIDRIGHT] = 16 | 5; // Gravity.CENTER_VERTICAL | Gravity.RIGHT
TextAlignmentDic[TextAlignment.BOTTOMLEFT] = 80 | 3; // Gravity.BOTTOM | Gravity.LEFT
TextAlignmentDic[TextAlignment.BOTTOMCENTER] = 80 | 1; // Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL
TextAlignmentDic[TextAlignment.BOTTOMRIGHT] = 80 | 5; // Gravity.BOTTOM | Gravity.RIGHT

const INT_16_3 = 16 | 3;
const INT_17 = 17;
var self;
const TextView = extend(Label)(
    function(_super, params) {
        self = this;
        _super(this);
        
        this.myBuilder = new NativeSpannableStringBuilder();
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    },
    function(labelPrototype) {
        
        var _spanArray = [];
        var _onClick = undefined;
        var _letterSpacing = 0;
        var _lineSpacing = 0;
        
        Object.defineProperties(labelPrototype, {
            'htmlText': {
                get: function() {
                    var text = this.nativeObject.getText();
                    if (text) {
                        const NativeHtml = requireClass("android.text.Html");
                        var htmlText = NativeHtml.toHtml(text);
                        return htmlText.toString();
                    }
                    else {
                        return "";
                    }

                },
                set: function(htmlText) {
                    const NativeHtml = requireClass("android.text.Html");
                    var htmlTextNative = NativeHtml.fromHtml("" + htmlText);
                    this.nativeObject.setText(htmlTextNative);
                },
                enumerable: true
            },
            'multiline': {
                get: function() {
                    return this.nativeObject.getMaxLines() !== 1;
                },
                set: function(multiline) {
                    this.nativeObject.setSingleLine(!multiline);
                    // Integer.MAX_VALUE
                    // const NativeInteger = requireClass("java.lang.Integer");
                    this.nativeObject.setMaxLines (multiline ? 1000 : 1);
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
                    return this.nativeObject.isTextSelectable();
                },
                set: function(value) {
                    if (TypeUtil.isBoolean(value)) {
                        this.nativeObject.setTextIsSelectable(value);
                    }
                },
                enumerable: true
            },
            'attributedText': {
                get: function() {
                    return _spanArray;
                },
                set: function(values) {
                    _spanArray = values;
                    self.myBuilder.clear();
                    for (var i = 0; i < _spanArray.length; i++) {
                        createSpannyText(_spanArray[i]);
                    }

                    lineSpacing();
                    this.nativeObject.setText(self.myBuilder);
                    this.nativeObject.setSingleLine(false);
                    this.nativeObject.setMovementMethod(NativeLinkMovementMethod.getInstance());
                    this.nativeObject.setHighlightColor(NativeColor.TRANSPARENT);
                },
                enumerable: true,
                configurable: true
            },
            'onClick': {
                get: function() {
                    return _onClick;
                },
                set: function(value) {
                    _onClick = value;
                },
                enumerable: true,
                configurable: true
            },
            'letterSpacing': {
                get: function() {
                    return _letterSpacing;
                },
                set: function(value) {
                    _letterSpacing = value;
                    if (NativeBuild.VERSION.SDK_INT >= 21) {
                        this.nativeObject.setLetterSpacing(value);

                    }
                },
                enumerable: true,
                configurable: true
            },
            'lineSpacing': {
                get: function() {
                    return _lineSpacing;
                },
                set: function(value) {
                    _lineSpacing = value;
                },
                enumerable: true,
                configurable: true
            },
            'textAlignment': {
                get: function() {
                    return this._textAlignment;
                },
                set: function(textAlignment) {
                    if (textAlignment in TextAlignmentDic) {
                        this._textAlignment = textAlignment;
                    }
                    else {
                        this._textAlignment = this.viewNativeDefaultTextAlignment;
                    }
                    this.nativeObject.setGravity(TextAlignmentDic[this._textAlignment]);
                },
                enumerable: true
            }
        });

        function lineSpacing() {
            var lineSpan = NativeLineHeightSpan.implement({
                chooseHeight: function(text, start, end, spanstartv, v, fm) {
                    fm.bottom += unitconverter.dpToPixel(_lineSpacing);
                    fm.descent += unitconverter.dpToPixel(_lineSpacing);
                }
            });
            self.myBuilder.setSpan(lineSpan, 0, self.myBuilder.length(), SPAN_EXCLUSIVE_EXCLUSIVE);
        }

        function createSpannyText(value) {
            self.myBuilder.append(value.string);
            var start = self.myBuilder.length() - value.string.length;
            var end = self.myBuilder.length();
            // Link 
            // --------------------------------------------------------------------------------
            if (value.link !== undefined) {
                var clickableSpanOverrideMethods = {
                    onClick: function(view) {
                        self.onClick(value.link);
                    },
                    updateDrawState: function(ds) {
                        ds.setUnderlineText(value.underline);
                    }
                };
                var clickSpan = NativeClickableSpan.extend("NativeClickableSpan", clickableSpanOverrideMethods, null);
                self.myBuilder.setSpan(clickSpan, start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
            }
            // Foreground Color 
            // --------------------------------------------------------------------------------
            self.myBuilder.setSpan(new NativeForegroundColorSpan(value.foregroundColor.nativeObject), start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
            // Background Color 
            // --------------------------------------------------------------------------------
            self.myBuilder.setSpan(new NativeBackgroundColorSpan(value.backgroundColor.nativeObject), start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
            // Font
            // --------------------------------------------------------------------------------
            var newType = value.font.nativeObject;
            var typeSpanOverrideMethods = {
                updateDrawState: function(ds) {
                    applyCustomTypeFace(ds, newType);
                },
                updateMeasureState: function(paint) {
                    applyCustomTypeFace(paint, newType);
                }
            };
            var typeSpan = NativeTypefaceSpan.extend("NativeTypefaceSpan", typeSpanOverrideMethods, ["SF"]);
            self.myBuilder.setSpan(typeSpan, start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
            // Size
            // --------------------------------------------------------------------------------
            self.myBuilder.setSpan(new NativeAbsoluteSizeSpan(value.font.size, true), start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
            // Underline 
            // --------------------------------------------------------------------------------
            if (value.underline === true) {
                self.myBuilder.setSpan(new NativeUnderlineSpan(), start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
            }
        }

        function applyCustomTypeFace(paint, tf) {
            var oldStyle;
            var old = paint.getTypeface();
            if (old == null) {
                oldStyle = 0;
            }
            else {
                oldStyle = old.getStyle();
            }
            var fake = oldStyle & ~tf.getStyle();
            if ((fake & NativeTypeface.BOLD) != 0) {
                paint.setFakeBoldText(true);
            }
            if ((fake & NativeTypeface.ITALIC) != 0) {
                paint.setTextSkewX(-0.25);
            }
            paint.setTypeface(tf);
        }
    }
);

module.exports = TextView;
