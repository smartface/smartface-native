/* globals requireClass, array */
const AndroidUnitConverter = require("../../../util/Android/unitconverter.js");
const AndroidConfig = require("../../../util/Android/androidconfig");

function DpToPixel(dp) {
    return AndroidUnitConverter.dpToPixel(dp);
}

function RippleEffect(view) {
    var _rippleEnabled = false,
        _rippleColor = null,
        _useForeground = false;

    Object.defineProperties(view.android, {
        'rippleEnabled': {
            get: function() {
                return _rippleEnabled;
            },
            set: function(value) {
                _rippleEnabled = value;
                if (this.rippleEnabled) {
                    view.nativeObject.setClickable(true);
                }
            },
            enumerable: true,
            configurable: true
        },
        'useForeground': {
            get: function() {
                return _useForeground;
            },
            set: function(value) {
                _useForeground = value;
            },
            enumerable: true,
            configurable: true
        },
        'rippleColor': {
            get: function() {
                return _rippleColor;
            },
            set: function(value) {
                _rippleColor = value;

                if (this.rippleEnabled && AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_LOLLIPOP) {
                    var states = array([array([], "int")]);
                    var colors = array([_rippleColor.nativeObject], 'int');

                    const NativeColorStateList = requireClass("android.content.res.ColorStateList");
                    const NativeRippleDrawable = requireClass("android.graphics.drawable.RippleDrawable");
                    var colorStateList = new NativeColorStateList(states, colors);

                    var mask = getRippleMask(DpToPixel(view.borderRadius));

                    if (_useForeground === true && AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_MARSHMALLOW) {
                        /*
                        Only supported for api level 23 and above
                        */
                        let currentBackground = view.nativeObject.getForeground();
                        let rippleDrawableForegorund = new NativeRippleDrawable(colorStateList, currentBackground, mask);
                        view.nativeObject.setForeground(rippleDrawableForegorund);
                    } else {
                        let currentBackground = view.nativeObject.getBackground();
                        let rippleDrawableBackgorund = new NativeRippleDrawable(colorStateList, currentBackground, mask);
                        view.nativeObject.setBackground(rippleDrawableBackgorund);
                    }
                }
            },
            enumerable: true,
            configurable: true
        }
    });

    view.android.updateRippleEffectIfNeeded = () => {
        (_rippleEnabled && _rippleColor) && (view.android.rippleColor = _rippleColor);
    };
}

// This method is needed to respect border radius of the view.
function getRippleMask(borderRadius) {
    const NativeRoundRectShape = requireClass("android.graphics.drawable.shapes.RoundRectShape");
    const NativeShapeDrawable = requireClass("android.graphics.drawable.ShapeDrawable");

    var outerRadii = [];
    outerRadii.length = 8;
    outerRadii.fill(borderRadius);

    var roundRectShape = new NativeRoundRectShape(array(outerRadii, "float"), null, null);
    var shapeDrawable = new NativeShapeDrawable(roundRectShape);

    return shapeDrawable;
}

module.exports = RippleEffect;