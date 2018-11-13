/*globals requireClass*/
const extend = require('js-base/core/extend');
const Label = require('../label');
const TextAlignment = require("../textalignment");
const TypeUtil = require("../../util/type");

const unitconverter = require('sf-core/util/Android/unitconverter');
const NativeBuild = requireClass("android.os.Build");
const NativeSpannableStringBuilder = requireClass("android.text.SpannableStringBuilder");
const NativeLineHeightSpan = requireClass("android.text.style.LineHeightSpan");
const NativeTypeface = requireClass("android.graphics.Typeface");
const NativeLinkMovementMethod = requireClass("android.text.method.LinkMovementMethod");
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
const TextView = extend(Label)(
    function(_super, params) {
        _super(this);

        var self = this;

        var _attributedStringBuilder;
        var _attributedStringArray = [];
        var _onLinkClick = undefined;
        var _onClick = undefined; //Deprecated : Please use self.onLinkClick
        var _letterSpacing = 0;
        var _lineSpacing = 0;
        var isMovementMethodAssigned = false;
        Object.defineProperties(self, {
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
                    if (!isMovementMethodAssigned) {
                        isMovementMethodAssigned = true;
                        this.nativeObject.setMovementMethod(NativeLinkMovementMethod.getInstance());
                    }
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
            'attributedText': {
                get: function() {
                    return _attributedStringArray;
                },
                set: function(values) {
                    _attributedStringArray = values;
                    if (_attributedStringBuilder)
                        _attributedStringBuilder.clear();
                    else
                        _attributedStringBuilder = new NativeSpannableStringBuilder();

                    //Sets the spans according to given properties
                    _attributedStringArray.forEach(attributedString => {
                        attributedString.textView = self;
                        attributedString.setSpan(_attributedStringBuilder);
                    });

                    //Sets the given line space
                    this.lineSpacing = _lineSpacing;
                    this.nativeObject.setText(_attributedStringBuilder);
                    this.nativeObject.setSingleLine(false);
                    if (!isMovementMethodAssigned) {
                        isMovementMethodAssigned = true;
                        this.nativeObject.setMovementMethod(NativeLinkMovementMethod.getInstance());
                    }
                    this.nativeObject.setHighlightColor(0); //TRANSPARENT COLOR
                },
                enumerable: true
            },
            'getAttributeTextSize': {
                value: function(maxWidth) {
                    const SizeCalculator = require("../../util/Android/textviewsizecalculator.js");
                    if (_attributedStringBuilder)
                        return SizeCalculator.calculateStringSize({
                            text: _attributedStringBuilder,
                            maxWidth: maxWidth,
                            letterSpacing: self.letterSpacing
                        });
                    else return null;
                },
                enumerable: true
            },
            'onLinkClick': {
                get: function() {
                    return _onLinkClick;
                },
                set: function(value) {
                    _onLinkClick = value;
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

                    if (!_attributedStringBuilder)
                        return;

                    let lineSpan = NativeLineHeightSpan.implement({
                        chooseHeight: function(text, start, end, spanstartv, v, fm) {
                            fm.ascent -= unitconverter.dpToPixel(_lineSpacing);
                            fm.descent += unitconverter.dpToPixel(_lineSpacing);
                        }
                    });
                    _attributedStringBuilder.setSpan(lineSpan, 0, _attributedStringBuilder.length(), SPAN_EXCLUSIVE_EXCLUSIVE);
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
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = TextView;
