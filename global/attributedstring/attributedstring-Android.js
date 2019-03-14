/* globals requireClass */
const Font = require('sf-core/ui/font');
const Color = require('sf-core/ui/color');

const SPAN_EXCLUSIVE_EXCLUSIVE = 33;

const AttributedString = function(params) {
    var self = this;

    self.ios = {};
    self.android = {};

    var _string = "";
    Object.defineProperty(self, 'string', {
        get: function() {
            return _string;
        },
        set: function(value) {
            _string = value;
        },
        enumerable: true
    });

    var _font = Font.create(Font.DEFAULT, 14, Font.NORMAL);
    Object.defineProperty(self, 'font', {
        get: function() {
            return _font;
        },
        set: function(value) {
            _font = value;
        },
        enumerable: true
    });

    var _foregroundColor = Color.BLACK;
    Object.defineProperty(self, 'foregroundColor', {
        get: function() {
            return _foregroundColor;
        },
        set: function(value) {
            _foregroundColor = value;
        },
        enumerable: true
    });

    var _underline = false;
    Object.defineProperty(self, 'underline', {
        get: function() {
            return _underline;
        },
        set: function(value) {
            _underline = value;
        },
        enumerable: true
    });

    var _strikethrough = false;
    Object.defineProperty(self, 'strikethrough', {
        get: function() {
            return _strikethrough;
        },
        set: function(value) {
            _strikethrough = value;
        },
        enumerable: true
    });


    var _backgroundColor = Color.TRANSPARENT;
    Object.defineProperty(self, 'backgroundColor', {
        get: function() {
            return _backgroundColor;
        },
        set: function(value) {
            _backgroundColor = value;
        },
        enumerable: true
    });

    var _link = undefined;
    Object.defineProperty(self, 'link', {
        get: function() {
            return _link;
        },
        set: function(value) {
            _link = value;
        },
        enumerable: true
    });

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

AttributedString.prototype.setSpan = function(stringBuilder) {
    const self = this;
    stringBuilder.append(this.string);
    var start = stringBuilder.length() - this.string.length;
    var end = stringBuilder.length();

    if (this.link !== undefined) {
        var clickableSpanOverrideMethods = {
            onClick: function() {
                self.textView.onClick && self.textView.onClick(self.link);
                self.textView.onLinkClick && self.textView.onLinkClick(self.link);
            },
            updateDrawState: function(ds) {
                ds.setUnderlineText(self.underline);
            }
        };

        const SFClickableSpan = requireClass("io.smartface.android.sfcore.ui.textview.SFClickableSpan");
        let clickSpan = new SFClickableSpan(clickableSpanOverrideMethods);
        stringBuilder.setSpan(clickSpan, start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
    }

    if (this.strikethrough) {
        const NativeStrikethroughSpan = requireClass("android.text.style.StrikethroughSpan");
        let _strikethroughSpan = new NativeStrikethroughSpan();
        stringBuilder.setSpan(_strikethroughSpan, start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
    }

    if (this.foregroundColor) {
        const NativeForegroundColorSpan = requireClass("android.text.style.ForegroundColorSpan");
        stringBuilder.setSpan(new NativeForegroundColorSpan(this.foregroundColor.nativeObject), start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
    }
    if (this.backgroundColor) {
        const NativeBackgroundColorSpan = requireClass("android.text.style.BackgroundColorSpan");
        stringBuilder.setSpan(new NativeBackgroundColorSpan(this.backgroundColor.nativeObject), start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
    }
    if (this.font) {
        const NativeAbsoluteSizeSpan = requireClass("android.text.style.AbsoluteSizeSpan");
        const SFTypefaceSpan = requireClass("io.smartface.android.sfcore.ui.textview.SFTypefaceSpan");

        let _typeSpan = new SFTypefaceSpan("SF", this.font.nativeObject);
        stringBuilder.setSpan(_typeSpan, start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
        stringBuilder.setSpan(new NativeAbsoluteSizeSpan(this.font.size, true), start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
    }

    if (this.underline === true) {
        const NativeUnderlineSpan = requireClass("android.text.style.UnderlineSpan");
        stringBuilder.setSpan(new NativeUnderlineSpan(), start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
    }
};

module.exports = AttributedString;
