function Color () {}

Color.BLACK = UIColor.blackColor();
Color.BLUE = UIColor.blueColor();
Color.CYAN = UIColor.cyanColor();
Color.DARKGRAY = UIColor.darkGrayColor();
Color.GRAY = UIColor.grayColor();
Color.GREEN = UIColor.greenColor();
Color.LIGHTGRAY = UIColor.lightGrayColor();
Color.MAGENTA = UIColor.magentaColor();
Color.RED = UIColor.redColor();
Color.TRANSPARENT = UIColor.clearColor();
Color.YELLOW = UIColor.yellowColor();
Color.WHITE = UIColor.whiteColor();

Color.create = function(red, green, blue){
    return new UIColor(red/255,green/255,blue/255,1);
}

Color.create = function(red, green, blue, alpha){
    return new UIColor(red/255,green/255,blue/255,alpha);
}

Color.create = function(value){
    return UIColor.hexColor(value);
}

module.exports = Color;