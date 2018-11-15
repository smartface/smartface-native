/* globals requireClass, array */
const AndroidUnitConverter = require("../../../util/Android/unitconverter.js");

function DpToPixel(dp) { return AndroidUnitConverter.dpToPixel(dp); }

function RippleEffect (view) {
    var [_rippleEnabled, _rippleColor] = [false];
    Object.defineProperties(view.android, {
        'rippleEnabled': {
            get: function() {
                return _rippleEnabled;
            },
            set: function(value) {
                _rippleEnabled = value;
                if(this.rippleEnabled) {
                    view.nativeObject.setClickable(true);
                }
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
                
                if(this.rippleEnabled) {
                    var states = array([array([], "int")]);
                    var colors = array([_rippleColor.nativeObject], 'int');
            
                    const NativeColorStateList = requireClass("android.content.res.ColorStateList");
                    const NativeRippleDrawable = requireClass("android.graphics.drawable.RippleDrawable");
                    var colorStateList = new NativeColorStateList(states, colors);
                    
                    var currentBackground = view.nativeObject.getBackground();
                    var mask = getRippleMask(DpToPixel(view.borderRadius));
                    
                    var rippleDrawableBackgorund = new NativeRippleDrawable(colorStateList, currentBackground, mask);
                    view.nativeObject.setBackground(rippleDrawableBackgorund);
                }
            },
            enumerable: true,
            configurable: true
        }
    });
    
    view.android.updateRippleEffectIfNeeded = () => {
        _rippleEnabled && (view.android.rippleColor = _rippleColor);
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