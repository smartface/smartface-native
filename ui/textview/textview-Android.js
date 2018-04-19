/*globals requireClass*/
const extend = require('js-base/core/extend');
const View = require('../view');
const Color = require("../color");
const TextAlignment = require("../textalignment");
const TypeUtil = require("../../util/type");
const AndroidUnitConverter = require("../../util/Android/unitconverter.js");
const AndroidConfig = require("../../util/Android/androidconfig.js");

const NativeTextView = requireClass("android.widget.TextView");
const NativeColorStateList = requireClass("android.content.res.ColorStateList");

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

const activity = AndroidConfig.activity;
const INT_16_3 = 16 | 3;
const INT_17 = 17;
var self;
const TextView = extend(View)(
    function(_super, params) {
        self = this;
        this.myBuilder = new NativeSpannableStringBuilder();
        // Is Label Check
        if (!self.nativeObject) {
            self.nativeObject = new NativeTextView(activity);
            this._textAlignment = TextAlignment.MIDLEFT;
            // Gravity.CENTER_VERTICAL | Gravity.LEFT
            self.nativeObject.setGravity(INT_16_3);
            this.viewNativeDefaultTextAlignment = INT_16_3;

        }
        else {
            if (!this.isNotSetDefaults) {
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

        
        var _spanArray = [];
        var _onClick = undefined;
        var _letterSpacing = 0;
        var _lineSpacing = 0;
        labelPrototype.toString = function() {
            return 'Label';
        };

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
            'font': {
                get: function() {
                    return this.fontInitial;
                },
                set: function(font) {
                    if (font) {
                        this.fontInitial = font;
                        this.nativeObject.setTypeface(font.nativeObject);
                        if (font.size && TypeUtil.isNumeric(font.size))
                            this.nativeObject.setTextSize(font.size);
                    }
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
                    this.nativeObject.setMaxLines(multiline ? 1000 : 1);
                    if (multiline) {
                        const NativeScrollingMovementMethod = requireClass("android.text.method.ScrollingMovementMethod");
                        var movementMethod = new NativeScrollingMovementMethod();
                        this.nativeObject.setMovementMethod(movementMethod);
                    }
                    else {
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
            'text': {
                get: function() {
                    return this.nativeObject.getText().toString();
                },
                set: function(text) {
                    this.nativeObject.setText("" + text);
                },
                enumerable: true,
                configurable: true
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
            },
            'textColor': {
                get: function() {
                    return this._textColor;
                },
                set: function(textColor) {
                    if (textColor.nativeObject) {
                        this._textColor = textColor;
                        this.nativeObject.setTextColor(textColor.nativeObject);
                    }
                    else if (TypeUtil.isObject(textColor)) {
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
                    this.nativeObject.setPadding(AndroidUnitConverter.dpToPixel(padding),
                        AndroidUnitConverter.dpToPixel(padding),
                        AndroidUnitConverter.dpToPixel(padding),
                        AndroidUnitConverter.dpToPixel(padding));
                },
                enumerable: true
            },
            'paddingLeft': {
                get: function() {
                    return AndroidUnitConverter.pixelToDp(this.nativeObject.getPaddingLeft());
                },
                set: function(paddingLeft) {
                    var paddingBottom = this.paddingBottom;
                    var paddingRight = this.paddingRight;
                    var paddingTop = this.paddingTop;
                    this.nativeObject.setPadding(AndroidUnitConverter.dpToPixel(paddingLeft),
                        AndroidUnitConverter.dpToPixel(paddingTop),
                        AndroidUnitConverter.dpToPixel(paddingRight),
                        AndroidUnitConverter.dpToPixel(paddingBottom));
                },
                enumerable: true
            },
            'paddingRight': {
                get: function() {
                    return AndroidUnitConverter.pixelToDp(this.nativeObject.getPaddingRight());
                },
                set: function(paddingRight) {
                    var paddingLeft = this.paddingLeft;
                    var paddingBottom = this.paddingBottom;
                    var paddingTop = this.paddingTop;
                    this.nativeObject.setPadding(AndroidUnitConverter.dpToPixel(paddingLeft),
                        AndroidUnitConverter.dpToPixel(paddingTop),
                        AndroidUnitConverter.dpToPixel(paddingRight),
                        AndroidUnitConverter.dpToPixel(paddingBottom));
                },
                enumerable: true
            },
            'paddingTop': {
                get: function() {
                    return AndroidUnitConverter.pixelToDp(this.nativeObject.getPaddingTop());
                },
                set: function(paddingTop) {
                    var paddingLeft = this.paddingLeft;
                    var paddingRight = this.paddingRight;
                    var paddingBottom = this.paddingBottom;
                    this.nativeObject.setPadding(AndroidUnitConverter.dpToPixel(paddingLeft),
                        AndroidUnitConverter.dpToPixel(paddingTop),
                        AndroidUnitConverter.dpToPixel(paddingRight),
                        AndroidUnitConverter.dpToPixel(paddingBottom));
                },
                enumerable: true
            },
            'paddingBottom': {
                get: function() {
                    return AndroidUnitConverter.pixelToDp(this.nativeObject.getPaddingBottom());
                },
                set: function(paddingBottom) {
                    var paddingLeft = this.paddingLeft;
                    var paddingRight = this.paddingRight;
                    var paddingTop = this.paddingTop;
                    this.nativeObject.setPadding(AndroidUnitConverter.dpToPixel(paddingLeft),
                        AndroidUnitConverter.dpToPixel(paddingTop),
                        AndroidUnitConverter.dpToPixel(paddingRight),
                        AndroidUnitConverter.dpToPixel(paddingBottom));
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

function createColorStateList(textColors) {
    var statesSet = [];
    var colorsSets = [];
    if (textColors.normal) {
        statesSet.push(View.State.STATE_NORMAL);
        colorsSets.push(textColors.normal.nativeObject);
    }
    if (textColors.disabled) {
        statesSet.push(View.State.STATE_DISABLED);
        colorsSets.push(textColors.disabled.nativeObject);
    }
    if (textColors.selected) {
        statesSet.push(View.State.STATE_SELECTED);
        colorsSets.push(textColors.selected.nativeObject);
    }
    if (textColors.pressed) {
        statesSet.push(View.State.STATE_PRESSED);
        colorsSets.push(textColors.pressed.nativeObject);
    }
    if (textColors.focused) {
        statesSet.push(View.State.STATE_FOCUSED);
        colorsSets.push(textColors.focused.nativeObject);
    }
    return (new NativeColorStateList(array(statesSet), array(colorsSets, "int")));
}

module.exports = TextView;
