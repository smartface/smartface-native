const TypeUtil               = require("sf-core/util/type");
const NativeColor            = requireClass("android.graphics.Color");
const NativeGradientDrawable = requireClass("android.graphics.drawable.GradientDrawable");

function Color (params) {
    this.isGradient = false;
    if(params) {
        var colors = [params.startColor, params.endColor];
        var index = 0;
        if(params.direction)
            index = params.direction;
        this.colors = colors;
        this.nativeObject = new NativeGradientDrawable(GradientDrawableDirection[index], colors);
        this.isGradient = true;
    }
}

Object.defineProperties(Color,{
    // properties
    'GradientDirection': {
        value: {},
        enumerable: true
    },
    'BLACK': {
        value: NativeColor.BLACK,
        enumerable: true
    },
    'BLUE': {
        value: NativeColor.BLUE,
        enumerable: true
    },
    'CYAN': {
        value: NativeColor.CYAN,
        enumerable: true
    },
    'DARKGRAY': {
        value: NativeColor.DKGRAY,
        enumerable: true
    },
    'GRAY': {
        value: NativeColor.GRAY,
        enumerable: true
    },
    'GREEN': {
        value: NativeColor.GREEN,
        enumerable: true
    },
    'LIGHTGRAY': {
        value: NativeColor.LTGRAY,
        enumerable: true
    },
    'MAGENTA': {
        value: NativeColor.MAGENTA,
        enumerable: true
    },
    'RED': {
        value: NativeColor.RED,
        enumerable: true
    },
    'TRANSPARENT': {
        value: NativeColor.TRANSPARENT,
        enumerable: true
    },
    'YELLOW': {
        value: NativeColor.YELLOW,
        enumerable: true
    },
    'WHITE': {
        value: NativeColor.WHITE,
        enumerable: true
    },
    // methods
    'createGradient': {
        value: function(e){
            return (new Color(e));
        },
        enumerable: true
    },
    'create': {
        value: function(param1, param2, param3, param4){
            if (arguments.length === 1) {
                if(!TypeUtil.isNumeric(param1)){
                    return NativeColor.parseColor(param1);
                }
                else{
                    return param1;
                }
            } 
            else if (arguments.length === 3) {
                return NativeColor.rgb(param1,param2,param3);
            } 
            else if (arguments.length === 4) {
                return NativeColor.argb(param1,param2,param3,param4);
            }
        },
        enumerable: true
    },
    'red': {
        value: function(color){ 
            var colorParam = color;
            if(!TypeUtil.isNumeric(color)){
                colorParam = NativeColor.parseColor(color);
            }
            return NativeColor.red(colorParam);
        },
        enumerable: true
    },
    'green': {
        value: function(color){ 
            var colorParam = color;
            if(!TypeUtil.isNumeric(color)){
                colorParam = NativeColor.parseColor(color);
            }
            return NativeColor.green(colorParam);
        },
        enumerable: true
    },
    'blue': {
        value: function(color){
            var colorParam = color;
            if(!TypeUtil.isNumeric(color)){
                colorParam = NativeColor.parseColor(color);
            }
            return NativeColor.blue(colorParam);
        },
        enumerable: true
    },
    'alpha': {
        value: function(color){
            var colorParam = color;
            if(!TypeUtil.isNumeric(color)){
                colorParam = NativeColor.parseColor(color);
            }
            return NativeColor.alpha(colorParam);
        },
        enumerable: true
    }
    
});

Object.defineProperties(Color.GradientDirection, {
    'VERTICAL': {
        value: 0,
        enumerable: true
    },
    'HORIZONTAL': {
        value: 1,
        enumerable: true
    },
    'DIAGONAL_LEFT': {
        value: 2,
        enumerable: true
    },
    'DIAGONAL_RIGHT': {
        value: 3,
        enumerable: true
    }
});

const GradientDrawableDirection = [
    NativeGradientDrawable.Orientation.TOP_BOTTOM,
    NativeGradientDrawable.Orientation.LEFT_RIGHT,
    NativeGradientDrawable.Orientation.TL_BR,
    NativeGradientDrawable.Orientation.TR_BL
];

module.exports = Color;