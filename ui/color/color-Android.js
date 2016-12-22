const TypeUtil = require("sf-core/util/type");

function Color () {}

Color.BLACK = 0xFF000000;
Color.BLUE = 0xFF0000FF;
Color.CYAN = 0xFF00FFFF;
Color.DARKGRAY = 0xFF444444;
Color.GRAY = 0xFF888888;
Color.GREEN = 0xFF00FF00;
Color.LIGHTGRAY = 0xFFCCCCCC;
Color.MAGENTA = 0xFFFF00FF;
Color.RED = 0xFFFF0000;
Color.TRANSPARENT = 0;
Color.YELLOW = 0xFFFFFF00;
Color.WHITE = 0xFFFFFFFF;

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