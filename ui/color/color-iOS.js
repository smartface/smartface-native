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

Color.create = function (alpha, red, green, blue) {
  if (arguments.length == 1) {
     return UIColor.hexColor(alpha);
  } else if (arguments.length == 3) {
     return new UIColor(alpha/255,red/255,green/255,255/255);
  } else if (arguments.length == 4) {
     return new UIColor(red/255,green/255,blue/255,alpha/255);
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
    return Math.round(color.components().alpha*255);
};

Color.createGradient = function(params){
    if (params.direction == 0){ //topToBottom
        return CAGradientLayer.createGradient(params.startColor, params.endColor, {x: 0, y: 0}, {x: 0, y: 1});
    }else if (params.direction == 1){ //leftToRight
        return CAGradientLayer.createGradient(params.startColor, params.endColor, {x: 0, y: 0}, {x: 1, y: 0});
    }
    else if (params.direction == 2){ //topLeftToRightBottom
        return CAGradientLayer.createGradient(params.startColor, params.endColor, {x: 0, y: 0}, {x: 1, y: 1});
    }else{ //topRightToLeftBottom
        return CAGradientLayer.createGradient(params.startColor, params.endColor, {x: 1, y: 0}, {x: 0, y: 1});
    }
}

module.exports = Color;