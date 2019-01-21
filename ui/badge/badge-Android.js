const Color = require("sf-core/ui/color");
const Font = require("sf-core/ui/font");
/*globals requireClass*/
const AndroidUnitConverter = require("../../util/Android/unitconverter.js");
const AndroidConfig = require("../../util/Android/androidconfig");
const NativeTextView = requireClass("android.widget.TextView");
const TypeUtil = require("../../util/type");
const View = require('../view');

const NativeGradientDrawable = requireClass("android.graphics.drawable.GradientDrawable");
const NativeColorStateList = requireClass("android.content.res.ColorStateList");

function Badge(params) {
    const self = this;
    const activity = AndroidConfig.activity;
    const ALIGN_END = 19;
    const CENTER = 17;

    const TextViewContentPadding = {
        start: AndroidUnitConverter.dpToPixel(5),
        top: AndroidUnitConverter.dpToPixel(1),
        end: AndroidUnitConverter.dpToPixel(5),
        bottom: AndroidUnitConverter.dpToPixel(1)
    };

    let _borderRadius = AndroidUnitConverter.dpToPixel(10);
    let _borderWidth = AndroidUnitConverter.dpToPixel(2);

    self.nativeObject = new NativeTextView(activity);
    self.nativeObject.setGravity(CENTER);
    self.nativeObject.setPaddingRelative(TextViewContentPadding.start, TextViewContentPadding.top, TextViewContentPadding.end, TextViewContentPadding.bottom);

    let nativeGradientDrawable = new NativeGradientDrawable();
    nativeGradientDrawable.setCornerRadius(_borderRadius);

    let _borderColor = Color.WHITE,
        _badgeVisible = false,
        _badgeText, _badgeBackgroundColor,
        _badgeTextColor, _badgeFont;
    Object.defineProperties(self, {
        'visible': {
            get: function() {
                return _badgeVisible;
            },
            set: function(visible) {
                _badgeVisible = visible;
                if (visible) {
                    self.nativeObject.setVisibility(0);
                }
                else {
                    self.nativeObject.setVisibility(4);
                }
            },
            enumerable: true
        },
        'text': {
            get: function() {
                return _badgeText;
            },
            set: function(text) {
                _badgeText = text;
                if (self.nativeObject) {
                    self.nativeObject.setText("" + text);
                }
            },
            enumerable: true
        },
        'backgroundColor': {
            get: function() {
                return _badgeBackgroundColor;
            },
            set: function(color) {
                _badgeBackgroundColor = color;
                if (self.nativeObject && color) {
                    nativeGradientDrawable.setColor(color.nativeObject);
                }
                else if (self.nativeObject) {
                    nativeGradientDrawable.mutate(); //Makes mutable, applied to fix unexpected behavior
                    nativeGradientDrawable.setStroke(_borderWidth, _borderColor.nativeObject);
                }
                self.nativeObject.setBackground(nativeGradientDrawable);
            },
            enumerable: true
        },
        'textColor': {
            get: function() {
                return _badgeTextColor;
            },
            set: function(color) {
                _badgeTextColor = color;
                if (self.nativeObject && color) {
                    if (color.nativeObject) {
                        self.nativeObject.setTextColor(color.nativeObject);
                    }
                    else if (TypeUtil.isObject(color)) {
                        var textColorStateListDrawable = createColorStateList(color);
                        this.nativeObject.setTextColor(textColorStateListDrawable);
                    }
                }
            },
            enumerable: true
        },
        'font': {
            get: function() {
                return _badgeFont;
            },
            set: function(font) {
                _badgeFont = font;
                if (self.nativeObject && font) {
                    self.nativeObject.setTypeface(font.nativeObject);
                    if (font.size && TypeUtil.isNumeric(font.size)) {
                        self.nativeObject.setTextSize(font.size);
                    }
                }
            },
            enumerable: true
        },
        'borderWidth': {
            get: function() {
                return _borderWidth;
            },
            set: function(borderWidth) {
                if (typeof borderWidth !== 'number')
                    return;

                _borderWidth = AndroidUnitConverter.dpToPixel(borderWidth);
                self.backgroundColor = null; //re-set Drawable
            },
            enumerable: true
        },
        'borderColor': {
            get: function() {
                return _borderColor;
            },
            set: function(borderColor) {
                if (!(borderColor instanceof Color))
                    return;

                _borderColor = borderColor;
                self.backgroundColor = null; //re-set Drawable
            },
            enumerable: true
        },
        'move': {
            value: function(x, y) {
                self.nativeObject.setTranslationX(AndroidUnitConverter.dpToPixel(x));
                self.nativeObject.setTranslationY(AndroidUnitConverter.dpToPixel(y));
            }
        }
    });

    if (self.nativeObject) {
        //sets default values
        if (!self.backgroundColor)
            self.backgroundColor = Color.RED;
        if (!self.font)
            self.font = Font.create("Arial", 11, Font.NORMAL);
        if (!self.textColor)
            self.textColor = Color.WHITE;
        self.visible = false;
    }

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

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}
module.exports = Badge;
