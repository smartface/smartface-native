/**
 * @class UI.Color
 * @since 0.1
 * Color is used to color UI objects and its elements. A Color instance is created by
 * passing RGB-ARGB values or hexadecimal string. There are constant and predefined colors as well.
 *
 *     @example
 *      Color = require('nf-core/ui/color');
 *     var myRedColor = Color.create(255, 0, 0);
 *     var myBlueColorWithAlpha = Color.create(100, 0, 0, 255);
 *     var myHEXColor = Color.create("#FFAACC");
 */
function Color () {}

// Constants
/**
 * @property {UI.Color} BLACK
 * @since 0.1
 * @readonly
 * @static
 */
Color.BLACK = (red, green, blue);

/**
 * @property {UI.Color} BLUE 
 * @since 0.1
 * @readonly
 * @static
 */
Color.BLUE = (red, green, blue);

/**
 * @property {UI.Color} CYAN
 * @readonly
 * @since 0.1
 * @static
 */
Color.CYAN = (red, green, blue);

/**
 * @property {UI.Color} DARKGRAY 
 * @since 0.1
 * @readonly
 * @static
 */
Color.DARKGRAY = (red, green, blue);

/**
 * @property {UI.Color} GRAY 
 * @readonly
 * @since 0.1
 * @static
 */
Color.GRAY = (red, green, blue);

/**
 * @property {UI.Color} GREEN 
 * @readonly
 * @since 0.1
 * @static
 */
Color.GREEN = (red, green, blue);

/**
 * @property {UI.Color} LIGHTGRAY 
 * @readonly
 * @since 0.1
 * @static
 */
Color.LIGHTGRAY = (red, green, blue);

/**
 * @property {UI.Color} MAGENTA 
 * @readonly
 * @since 0.1
 * @static
 */
Color.MAGENTA = (red, green, blue);

/**
 * @property {UI.Color} RED 
 * @readonly
 * @since 0.1
 * @static
 */
Color.RED = (red, green, blue);

/**
 * @property {UI.Color} TRANSPARENT
 * @readonly 
 * @since 0.1
 * @static
 */
Color.TRANSPARENT = (red, green, blue);

/**
 * @property {UI.Color} YELLOW 
 * @readonly
 * @since 0.1
 * @static
 */
Color.YELLOW = (red, green, blue);

/**
 * @property {UI.Color} WHITE 
 * @readonly
 * @since 0.1
 * @static
 */
Color.WHITE = (red, green, blue);

// Constructor
/**
 * Creates a new color with RGB-ARGB or hexadecimal parameters
 * 
 *     @example
 *     const Color = require('nf-core/ui/color');
 *     var myARGBColor = Color.create(0, 0, 0, 255);
 *     var myRGBColor = Color.create(255, 255, 255);
 *     var myHexColor = Color.create("#ff0000");
 *
 * @param {...} parameters RGB-ARGB sequence or Hexadecimal string
 * @return {UI.Color} A color instance.
 * @static
 * @method create
 * @since 0.1
 */
Color.create = function(params){}

// Methods
/**
 * Returns the red value of a color instance.
 * 
 *     @example
 *     const Color = require('nf-core/ui/color');
 *     var myRGBColor = Color.create(99, 0, 0);
 *     var red = Color.red(myRGBColor);
 *     alert(red);
 * 
 * @param {UI.Color} color A color instance.
 * @return {Number} An integer between 0-255.
 * @static
 * @method red
 * @since 0.1
 */
Color.red = function(color){ return color.red };

/**
 * Returns the green value of a color instance.
 * 
 *     @example
 *     const Color = require('nf-core/ui/color');
 *     var myRGBColor = Color.create(0, 171, 0);
 *     var green = Color.green(myRGBColor);
 *     alert(green);
 * 
 * @param {UI.Color} color A color instance.
 * @return {Number} An integer between 0-255.
 * @static
 * @method green
 * @since 0.1
 */
Color.green = function(color){ return color.green };

/**
 * Returns the blue value of a color instance.
 *  
 *     @example
 *     const Color = require('nf-core/ui/color');
 *     var myRGBColor = Color.create(0, 0, 155);
 *     var blue = Color.blue(myRGBColor);
 *     alert(blue);
 * 
 * @param {UI.Color} color A color instance.
 * @return {Number} An integer between 0-255.
 * @static
 * @method blue
 * @since 0.1
 */
Color.blue = function(color){ return color.blue };

/**
 * Returns the alpha value of a color instance.
 *  
 *     @example
 *     const Color = require('nf-core/ui/color');
 *     var myARGBColor = Color.create(42, 0, 0, 255);
 *     var alpha = Color.alpha(myARGBColor);
 *     alert(alpha);
 * 
 * @param {UI.Color} color A color instance.
 * @return {Number} An integer between 0-255.
 * @static
 * @method alpha
 * @since 0.1
 */
Color.alpha = function(color){ return color.alpha };

// export module
module.exports = Color;