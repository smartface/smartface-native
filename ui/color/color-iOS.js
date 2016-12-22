/* globals */
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

Color.create = function (red, green, blue, alpha) {
  if (arguments.length == 1) {
     return UIColor.hexColor(red);
  } else if (arguments.length == 3) {
     return new UIColor(red/255,green/255,blue/255,1);
  } else if (arguments.length == 4) {
     return new UIColor(red/255,green/255,blue/255,alpha);
  }
}

Color.red = function(color){ 
    return color.components().red*255;
};

Color.green = function(color){ 
    return color.components().green*255;
};

Color.blue = function(color){ 
    return color.components().blue*255;
};

Color.alpha = function(color){ 
    return color.components().alpha;
};

module.exports = Color;