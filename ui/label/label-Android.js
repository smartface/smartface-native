/*globals requireClass*/

const View = require('../view');
const Color = require("../color");
const TextAlignment = require("../textalignment");
const TypeUtil = require("../../util/type");
const AndroidUnitConverter = require("../../util/Android/unitconverter.js");
const AndroidConfig = require("../../util/Android/androidconfig.js");
const { COMPLEX_UNIT_DIP } = require("../../util/Android/typevalue.js");
const EllipsizeMode = require("../ellipsizemode");
const ViewGroup = require('../viewgroup');
const EventsList = require('./events');
const NativeTextView = requireClass("androidx.appcompat.widget.AppCompatTextView");
const NativeTextViewCompat = requireClass('androidx.core.widget.TextViewCompat');
const NativeColorStateList = requireClass("android.content.res.ColorStateList");
const NativeTextUtils = requireClass("android.text.TextUtils");

const TextAlignmentDic = {};
TextAlignmentDic[TextAlignment.MIDLEFT] = 16 | 3; // Gravity.CENTER_VERTICAL | Gravity.LEFT
TextAlignmentDic[TextAlignment.MIDCENTER] = 17; // Gravity.CENTER
TextAlignmentDic[TextAlignment.MIDRIGHT] = 16 | 5; // Gravity.CENTER_VERTICAL | Gravity.RIGHT

const NativeEllipsizeMode = {};
NativeEllipsizeMode[EllipsizeMode.START] = NativeTextUtils.TruncateAt.START;
NativeEllipsizeMode[EllipsizeMode.MIDDLE] = NativeTextUtils.TruncateAt.MIDDLE;
NativeEllipsizeMode[EllipsizeMode.END] = NativeTextUtils.TruncateAt.END;
NativeEllipsizeMode[EllipsizeMode.NONE] = null;


const activity = AndroidConfig.activity;
const INT_16_3 = 16 | 3;
const INT_17 = 17;
const MAX_VALUE = 2147483647;
const AUTO_SIZE_TEXT_TYPE_NONE = 0;

Label.Events = { ...ViewGroup.Events, ...EventsList };
Label.prototype = Object.create(View.prototype);
// const Label = extend(View)(
function Label(params) {
    var self = this;

    // Is Label Check
    if (!self.nativeObject) {
        self.nativeObject = new NativeTextView(activity);
        this._textAlignment = TextAlignment.MIDLEFT;
        // Gravity.CENTER_VERTICAL | Gravity.LEFT
        self.nativeObject.setGravity(INT_16_3);
        this.viewNativeDefaultTextAlignment = INT_16_3;
    }
    else {
        if (!this.skipDefaults) {
            this._textAlignment = TextAlignment.MIDCENTER;
            // Gravity.CENTER
            self.nativeObject.setGravity(INT_17);
            this.viewNativeDefaultTextAlignment = INT_17;
            // this.padding = 0;
        }
    }
    View.apply(this);

    this._adjustFontSizeToFit = false;
    this._minimumFontSize = 7;
    let _textDirection, _adjustableFontSizeStep = 1;
    Object.defineProperties(self.android, {
        'textDirection': {
            get: () => {
                if (_textDirection === undefined)
                    _textDirection = this.nativeObject.getTextDirection();
                return _textDirection;
            },
            set: (direction) => {
                _textDirection = direction;
                this.nativeObject.setTextDirection(direction);
            },
            enumerable: true
        },
        'adjustableFontSizeStep': {
            get: () => {
                return _adjustableFontSizeStep;
            },
            set: (value) => {
                _adjustableFontSizeStep = value;
                if (this.adjustFontSizeToFit)
                    this.setAutoSizeTextTypeUniformWithConfiguration();
            },
            enumerable: true
        }
    });

    this.setAutoSizeTextTypeUniformWithConfiguration = () => {
        let maximumTextSize = AndroidUnitConverter.pixelToDp(this.nativeObject.getTextSize());
        if(maximumTextSize <=  this.minimumFontSize)
            throw new Error(`Maximum auto-size text size (${maximumTextSize}) is less or equal to minimum auto-size text size (${this.minimumFontSize})`);
            
        NativeTextViewCompat.setAutoSizeTextTypeUniformWithConfiguration(this.nativeObject, this.minimumFontSize,
            maximumTextSize, this.android.adjustableFontSizeStep, COMPLEX_UNIT_DIP);
    }

    const EventFunctions = {
        [EventsList.InterceptTouchEvent] : function() {
            const handler = (e) => {
                this.emitter.emit(Events.InterceptTouchEvent);
            };
            _onInterceptTouchEvent = handler.bind(this);
        }
    }
    EventEmitterCreator(this, EventFunctions);

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}
Label.prototype.fontInitial = null;
Label.prototype._textAlignment = null;
Label.prototype.viewNativeDefaultTextAlignment = null;
Label.prototype._textColor = Color.BLACK;
Label.prototype.toString = function () {
    return 'Label';
};

Object.defineProperties(Label.prototype, {
    'font': {
        get: function () {
            const Font = require("../font");
            let nativeTypeface = this.nativeObject.getTypeface();
            let textSize = AndroidUnitConverter.pixelToDp(this.nativeObject.getTextSize());
            return new Font({
                "nativeObject": nativeTypeface,
                "size": textSize
            });
        },
        set: function (font) {
            if (font) {
                this.fontInitial = font;
                this.nativeObject.setTypeface(font.nativeObject);
                if (font.size && TypeUtil.isNumeric(font.size))
                    this.nativeObject.setTextSize(COMPLEX_UNIT_DIP, font.size);
            }
        },
        enumerable: true
    },
    'multiline': {
        get: function () {
            return this.nativeObject.getMaxLines() !== 1;
        },
        set: function (multiline) {
            this.nativeObject.setSingleLine(!multiline);
        },
        enumerable: true
    },
    'maxLines': {
        get: function () {
            let mMaxLines = this.nativeObject.getMaxLines();
            return (mMaxLines === MAX_VALUE ? 0 : mMaxLines);
        },
        set: function (value) {
            if (value === 0)
                this.nativeObject.setMaxLines(MAX_VALUE);
            else
                this.nativeObject.setMaxLines(value);
        },
        enumerable: true
    },
    'ellipsizeMode': {
        get: function () {
            return this._ellipsizeMode;
        },
        set: function (ellipsizeModeEnum) {
            this._ellipsizeMode = ellipsizeModeEnum;
            this.nativeObject.setEllipsize(NativeEllipsizeMode[ellipsizeModeEnum]);
        },
        enumerable: true,
        configurable: true
    },
    'text': {
        get: function () {
            return this.nativeObject.getText().toString();
        },
        set: function (text) {
            this.nativeObject.setText("" + text);
        },
        enumerable: true,
        configurable: true
    },
    'textAlignment': {
        get: function () {
            return this._textAlignment;
        },
        set: function (textAlignment) {
            if (textAlignment === TextAlignment.MIDLEFT || textAlignment === TextAlignment.MIDCENTER || textAlignment === TextAlignment.MIDRIGHT) {
                this._textAlignment = textAlignment;
                this.nativeObject.setGravity(TextAlignmentDic[this._textAlignment]);
            }
            else {
                throw new Error("Label textAlignment property only supports UI.TextAlignment.MIDLEFT, UI.TextAlignment.MIDCENTER, UI.TextAlignment.MIDRIGHT.");
            }
        },
        enumerable: true
    },
    'textColor': {
        get: function () {
            return this._textColor;
        },
        set: function (textColor) {
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
    'adjustFontSizeToFit': {
        get: function () {
            return this._adjustFontSizeToFit;
        },
        set: function (value) {
            this._adjustFontSizeToFit = value;
            if (value)
                this.setAutoSizeTextTypeUniformWithConfiguration()
            else
                NativeTextViewCompat.setAutoSizeTextTypeWithDefaults(this.nativeObject, AUTO_SIZE_TEXT_TYPE_NONE)

        },
        enumerable: true
    },
    'minimumFontSize': {
        get: function () {
            return this._minimumFontSize;
        },
        set: function (value) {
            this._minimumFontSize = value;
            if (this.adjustFontSizeToFit)
                this.setAutoSizeTextTypeUniformWithConfiguration()
        },
        enumerable: true
    },
    'padding': {
        get: function () {
            return this.paddingLeft;
        },
        set: function (padding) {
            this.nativeObject.setPaddingRelative(AndroidUnitConverter.dpToPixel(padding),
                AndroidUnitConverter.dpToPixel(padding),
                AndroidUnitConverter.dpToPixel(padding),
                AndroidUnitConverter.dpToPixel(padding));
        },
        enumerable: true
    },
    'paddingLeft': {
        get: function () {
            return AndroidUnitConverter.pixelToDp(this.nativeObject.getPaddingLeft());
        },
        set: function (paddingLeft) {
            var paddingBottom = this.paddingBottom;
            var paddingRight = this.paddingRight;
            var paddingTop = this.paddingTop;
            this.nativeObject.setPaddingRelative(AndroidUnitConverter.dpToPixel(paddingLeft),
                AndroidUnitConverter.dpToPixel(paddingTop),
                AndroidUnitConverter.dpToPixel(paddingRight),
                AndroidUnitConverter.dpToPixel(paddingBottom));
        },
        enumerable: true
    },
    'paddingRight': {
        get: function () {
            return AndroidUnitConverter.pixelToDp(this.nativeObject.getPaddingRight());
        },
        set: function (paddingRight) {
            var paddingLeft = this.paddingLeft;
            var paddingBottom = this.paddingBottom;
            var paddingTop = this.paddingTop;
            this.nativeObject.setPaddingRelative(AndroidUnitConverter.dpToPixel(paddingLeft),
                AndroidUnitConverter.dpToPixel(paddingTop),
                AndroidUnitConverter.dpToPixel(paddingRight),
                AndroidUnitConverter.dpToPixel(paddingBottom));
        },
        enumerable: true
    },
    'paddingTop': {
        get: function () {
            return AndroidUnitConverter.pixelToDp(this.nativeObject.getPaddingTop());
        },
        set: function (paddingTop) {
            var paddingLeft = this.paddingLeft;
            var paddingRight = this.paddingRight;
            var paddingBottom = this.paddingBottom;
            this.nativeObject.setPaddingRelative(AndroidUnitConverter.dpToPixel(paddingLeft),
                AndroidUnitConverter.dpToPixel(paddingTop),
                AndroidUnitConverter.dpToPixel(paddingRight),
                AndroidUnitConverter.dpToPixel(paddingBottom));
        },
        enumerable: true
    },
    'paddingBottom': {
        get: function () {
            return AndroidUnitConverter.pixelToDp(this.nativeObject.getPaddingBottom());
        },
        set: function (paddingBottom) {
            var paddingLeft = this.paddingLeft;
            var paddingRight = this.paddingRight;
            var paddingTop = this.paddingTop;
            this.nativeObject.setPaddingRelative(AndroidUnitConverter.dpToPixel(paddingLeft),
                AndroidUnitConverter.dpToPixel(paddingTop),
                AndroidUnitConverter.dpToPixel(paddingRight),
                AndroidUnitConverter.dpToPixel(paddingBottom));
        },
        enumerable: true
    }
});

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

module.exports = Label;