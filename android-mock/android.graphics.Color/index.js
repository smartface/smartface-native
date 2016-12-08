module.exports = Color;

function Color(props){
    
}

Color.BLACK       = 0xFF000000;
Color.DKGRAY      = 0xFF444444;
Color.GRAY        = 0xFF888888;
Color.LTGRAY      = 0xFFCCCCCC;
Color.WHITE       = 0xFFFFFFFF;
Color.RED         = 0xFFFF0000;
Color.GREEN       = 0xFF00FF00;
Color.BLUE        = 0xFF0000FF;
Color.YELLOW      = 0xFFFFFF00;
Color.CYAN        = 0xFF00FFFF;
Color.MAGENTA     = 0xFFFF00FF;
Color.TRANSPARENT = 0;

Color.parseColor = function(color){
    if(color.startsWith("0x") || color.startsWith("#")){
        return parseInt(color);
    }
    else {
        return this.sColorNameMap[color];
    }
}

Color.sColorNameMap = {
    "black"     : Color.BLACK,
    "darkgray"  : Color.DKGRAY,
    "gray"      : Color.GRAY,
    "lightgray" : Color.LTGRAY,
    "white"     : Color.WHITE,
    "red"       : Color.RED,
    "green"     : Color.GREEN,
    "blue"      : Color.BLUE,
    "yellow"    : Color.YELLOW,
    "cyan"      : Color.CYAN,
    "magenta"   : Color.MAGENTA,
    "aqua"      : 0xFF00FFFF,
    "fuchsia"   : 0xFFFF00F,
    "darkgrey"  : Color.DKGRAY,
    "grey"      : Color.GRAY,
    "lightgrey" : Color.LTGRAY,
    "lime"      : 0xFF00FF00,
    "maroon"    : 0xFF800000,
    "navy"      : 0xFF000080,
    "olive"     : 0xFF808000,
    "purple"    : 0xFF800080,
    "silver"    : 0xFFC0C0C0,
    "teal"      : 0xFF00808
}