/*globals requireClass*/
const extend = require('js-base/core/extend');
const Label = require('../label');
const TextAlignment = require("../textalignment");
const TypeUtil = require("../../util/type");

const unitconverter = require('sf-core/util/Android/unitconverter');
const NativeBuild = requireClass("android.os.Build");
const NativeSpannableStringBuilder = requireClass("android.text.SpannableStringBuilder");
const NativeLineHeightSpan = requireClass("android.text.style.LineHeightSpan");
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

        let _attributedStringBuilder, _attributedStringArray = [],
            _onLinkClick = undefined,
            _onClick = undefined; //Deprecated : Please use self.onLinkClick
        let _letterSpacing = 0,
            _lineSpacing = 0,
            _scrollEnabled = true,
            _htmlText;

        Object.defineProperties(self, {
            'htmlText': {
                get: function() {
                    return _htmlText ? _htmlText : "";
                },
                set: function(htmlText) {
                    _htmlText = htmlText;
                    const NativeHtml = requireClass("android.text.Html");
                    var htmlTextNative = NativeHtml.fromHtml("" + htmlText);

                    enableScrollable(self.scrollEnabled);
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
                    if (multiline)
                        enableScrollable(self.scrollEnabled);
                    else
                        this.nativeObject.setMovementMethod(null);
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
                    enableScrollable(self.scrollEnabled);
                    this.nativeObject.setHighlightColor(0); //TRANSPARENT COLOR
                },
                enumerable: true
            },
            'getAttributeTextSize': {
                value: function(maxWidth) {
                    const SizeCalculator = require("../../util/Android/textviewsizecalculator.js");
                    if (_attributedStringBuilder)
                        return SizeCalculator.calculateStringSize({
                            text: self,
                            maxWidth: maxWidth
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
            },
            'scrollEnabled': {
                get: () => _scrollEnabled,
                set: (scrollEnabled) => {
                    _scrollEnabled = scrollEnabled;
                    enableScrollable(_scrollEnabled);
                }
            }
        });

        function enableScrollable(scrollEnabled) {
            if (scrollEnabled) {
                if (self.htmlText.length > 0 || self.attributedText.length > 0) {
                    const NativeLinkMovementMethod = requireClass("android.text.method.LinkMovementMethod");
                    self.nativeObject.setMovementMethod(NativeLinkMovementMethod.getInstance());
                }
                else {
                    const NativeScrollingMovementMethod = requireClass("android.text.method.ScrollingMovementMethod");
                    self.nativeObject.setMovementMethod(NativeScrollingMovementMethod.getInstance());
                }
            }
            else {
                self.nativeObject.setMovementMethod(null);
            }
        }


        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = TextView;
