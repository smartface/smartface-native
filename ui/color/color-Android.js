const TypeUtil = require("sf-core/util/type");

function Color () {}

Color.BLACK = android.graphics.Color.BLACK;
Color.BLUE = android.graphics.Color.BLUE;
Color.CYAN = android.graphics.Color.CYAN;
Color.DARKGRAY = android.graphics.Color.DKGRAY;
Color.GRAY = android.graphics.Color.GRAY;
Color.GREEN = android.graphics.Color.GREEN;
Color.LIGHTGRAY = android.graphics.Color.LTGRAY;
Color.MAGENTA = android.graphics.Color.MAGENTA;
Color.RED = android.graphics.Color.RED;
Color.TRANSPARENT = android.graphics.Color.TRANSPARENT;
Color.YELLOW = android.graphics.Color.YELLOW;
Color.WHITE = android.graphics.Color.WHITE;

Color.create = function(param1, param2, param3, param4){
    if (arguments.length == 1) {
        if(!TypeUtil.isNumeric(param1)){
            return android.graphics.Color.parseColor(param1);
        }
        else{
            return param1;
        }
    } 
    else if (arguments.length == 3) {
        return android.graphics.Color.rgb(param1,param2,param3);
    } 
    else if (arguments.length == 4) {
        return android.graphics.Color.argb(param1,param2,param3,param4);
    };
}

Color.red = function(color){ 
    var colorParam = color;
    if(!TypeUtil.isNumeric(color)){
        colorParam = android.graphics.Color.parseColor(color);
    }
    return android.graphics.Color.red(colorParam);
};

Color.green = function(color){ 
    var colorParam = color;
    if(!TypeUtil.isNumeric(color)){
        colorParam = android.graphics.Color.parseColor(color);
    }
    return android.graphics.Color.green(colorParam);
};

Color.blue = function(color){
    var colorParam = color;
    if(!TypeUtil.isNumeric(color)){
        colorParam = android.graphics.Color.parseColor(color);
    }
    return android.graphics.Color.blue(colorParam);
};

Color.alpha = function(color){
    var colorParam = color;
    if(!TypeUtil.isNumeric(color)){
        colorParam = android.graphics.Color.parseColor(color);
    }
    return android.graphics.Color.alpha(colorParam);
};

// export module
module.exports = Color;