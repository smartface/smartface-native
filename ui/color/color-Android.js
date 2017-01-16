const TypeUtil = require("sf-core/util/type");

const NativeColor = requireClass("android.graphics.Color");

function Color () {}

Color.BLACK = NativeColor.BLACK;
Color.BLUE = NativeColor.BLUE;
Color.CYAN = NativeColor.CYAN;
Color.DARKGRAY = NativeColor.DKGRAY;
Color.GRAY = NativeColor.GRAY;
Color.GREEN = NativeColor.GREEN;
Color.LIGHTGRAY = NativeColor.LTGRAY;
Color.MAGENTA = NativeColor.MAGENTA;
Color.RED = NativeColor.RED;
Color.TRANSPARENT = NativeColor.TRANSPARENT;
Color.YELLOW = NativeColor.YELLOW;
Color.WHITE = NativeColor.WHITE;

Color.create = function(param1, param2, param3, param4){
    if (arguments.length == 1) {
        if(!TypeUtil.isNumeric(param1)){
            return NativeColor.parseColor(param1);
        }
        else{
            return param1;
        }
    } 
    else if (arguments.length == 3) {
        return NativeColor.rgb(param1,param2,param3);
    } 
    else if (arguments.length == 4) {
        return NativeColor.argb(param1,param2,param3,param4);
    };
}

Color.red = function(color){ 
    var colorParam = color;
    if(!TypeUtil.isNumeric(color)){
        colorParam = NativeColor.parseColor(color);
    }
    return NativeColor.red(colorParam);
};

Color.green = function(color){ 
    var colorParam = color;
    if(!TypeUtil.isNumeric(color)){
        colorParam = NativeColor.parseColor(color);
    }
    return NativeColor.green(colorParam);
};

Color.blue = function(color){
    var colorParam = color;
    if(!TypeUtil.isNumeric(color)){
        colorParam = NativeColor.parseColor(color);
    }
    return NativeColor.blue(colorParam);
};

Color.alpha = function(color){
    var colorParam = color;
    if(!TypeUtil.isNumeric(color)){
        colorParam = NativeColor.parseColor(color);
    }
    return NativeColor.alpha(colorParam);
};

// export module
module.exports = Color;