const extend = require('js-base/core/extend');

/**
* @class Color
* Color is a UI object to define methods for creating and converting color ints. 
* Each component ranges between 0..255 with 0 meaning no contribution for that component,
* and 255 meaning 100% contribution
*
*      @example
*      const Color = require('sf-core/ui/color');
*      var myColor = new Color({
*          red: 0,
*          green: 0,
*          blue: 255,
*      });
*      var redValue = myColor.red();
*/
function Color () {}

// Constants
/**
* Constant value for black color 
* 
* @property {int} BLACK Constant integer value.
*/
Color.BLACK = (red, green, blue);

/**
* Constant value for blue color 
* 
* @property {int} BLUE Constant integer value.
*/
Color.BLUE = (red, green, blue);

/**
* Constant value for cyan color 
* 
* @property {int} CYAN Constant integer value.
*/
Color.CYAN = (red, green, blue);

/**
* Constant value for dark gray color 
* 
* @property {int} DARKGRAY Constant integer value.
*/
Color.DARKGRAY = (red, green, blue);

/**
* Constant value for gray color 
* 
* @property {int} GRAY Constant integer value.
*/
Color.GRAY = (red, green, blue);

/**
* Constant value for green color 
* 
* @property {int} GREEN Constant integer value.
*/
Color.GREEN = (red, green, blue);

/**
* Constant value for light gray color 
* 
* @property {int} LIGHTGRAY Constant integer value.
*/
Color.LIGHTGRAY = (red, green, blue);

/**
* Constant value for magenta color 
* 
* @property {int} MAGENTA Constant integer value.
*/
Color.MAGENTA = (red, green, blue);

/**
* Constant value for red color 
* 
* @property {int} RED Constant integer value.
*/
Color.RED = (red, green, blue);

/**
* Constant value for transparent color 
* 
* @property {int} TRANSPARENT Constant integer value.
*/
Color.TRANSPARENT = (red, green, blue);

/**
* Constant value for yellow color 
* 
* @property {int} YELLOW Constant integer value.
*/
Color.YELLOW = (red, green, blue);

/**
* Constant value for white color 
* 
* @property {int} WHITE Constant integer value.
*/
Color.WHITE = (red, green, blue);

// Constructors
/**
* Create a new color with the specified red, green, blue and alpha values.
* 
* @param {hex} value Red component [0..255] of the color  // TODO hex or string ?
* @static
* @constructor 
*/
Color.create = function(value){}

/**
* Create a new color with the specified red, green, blue and alpha values.
* 
*      @example
*      const Color = require('sf-core/ui/color');
*      var ARGBColor = Color.create(0, 0, 0, 255);
*      var RGBColor = Color.create(255, 255, 255);
*      var HexColor = Color.create("#ff0000");
*
* @param {Object} params Object describing color values
* @param {String} [params.hex] Hexadecimal value of the color
* @param {int} [params.alpha] Alpha component [0..255] of the color
* @param {int} [params.red] Red component [0..255] of the color
* @param {int} [params.green] Green component [0..255] of the color
* @param {int} [params.blue] Blue component [0..255] of the color
* @static
* @constructor
*
*/
Color.create = function(params){}

// Methods
/**
* Return the red component of a color int. 
* 
* @param {Color} colorValue Red component [0..255] of the color
* @return {int} Return the red component of a color int.
* @static
* @method red
*/
Color.red = function(colorValue){ return colorValue.red };

/**
* Return the green component of a color int. 
* 
* @param {Color} colorValue Green component [0..255] of the color
* @return {int} Return the green component of a color int.
* @static
* @method green
*/
Color.green = function(colorValue){ return colorValue.green };

/**
* Return the blue component of a color int. 
* 
* @param {Color} colorValue Blue component [0..255] of the color
* @return {int} Return the blue component of a color int.
* @static
* @method blue
*/
Color.blue = function(colorValue){ return colorValue.blue };

/**
* Return the alpha component of a color int. 
* 
* @param {Color} colorValue Alpha component [0..255] of the color
* @return {int} Return the alpha component of a color int.
* @static
* @method alpha
*/
Color.alpha = function(colorValue){ return colorValue.alpha };

// export module
module.exports = Color;