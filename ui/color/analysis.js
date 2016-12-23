/**
* @class Color
* @since 0.1
* Color is a UI object to define methods for creating and converting color ints. 
* Each component ranges between 0..255 with 0 meaning no contribution for that component,
* and 255 meaning 100% contribution
*
*       @example
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
* Constant value for black color. 
* 
* @property {int} BLACK Constant integer value.
*/
Color.BLACK = (red, green, blue);

/**
* Constant value for blue color. 
* 
* @property {int} BLUE Constant integer value.
*/
Color.BLUE = (red, green, blue);

/**
* Constant value for cyan color.  
* 
* @property {int} CYAN Constant integer value.
*/
Color.CYAN = (red, green, blue);

/**
* Constant value for dark gray color.  
* 
* @property {int} DARKGRAY Constant integer value.
*/
Color.DARKGRAY = (red, green, blue);

/**
* Constant value for gray color.  
* 
* @property {int} GRAY Constant integer value.
*/
Color.GRAY = (red, green, blue);

/**
* Constant value for green color.  
* 
* @property {int} GREEN Constant integer value.
*/
Color.GREEN = (red, green, blue);

/**
* Constant value for light gray color.  
* 
* @property {int} LIGHTGRAY Constant integer value.
*/
Color.LIGHTGRAY = (red, green, blue);

/**
* Constant value for magenta color.  
* 
* @property {int} MAGENTA Constant integer value.
*/
Color.MAGENTA = (red, green, blue);

/**
* Constant value for red color. 
* 
* @property {int} RED Constant integer value.
*/
Color.RED = (red, green, blue);

/**
* Constant value for transparent color.  
* 
* @property {int} TRANSPARENT Constant integer value.
*/
Color.TRANSPARENT = (red, green, blue);

/**
* Constant value for yellow color.  
* 
* @property {int} YELLOW Constant integer value.
*/
Color.YELLOW = (red, green, blue);

/**
* Constant value for white color.  
* 
* @property {int} WHITE Constant integer value.
*/
Color.WHITE = (red, green, blue);

// Constructor
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
* Return the red component of a color object. 
* 
* @param {Color} color Representation of a color object
* @return {int} Return the red component of a color object.
* @static
* @method red
*/
Color.red = function(color){ return color.red };

/**
* Return the green component of a color object. 
* 
* @param {Color} color Representation of a color object
* @return {int} Return the green component of a color object.
* @static
* @method green
*/
Color.green = function(color){ return color.green };

/**
* Return the blue component of a color object. 
* 
* @param {Color} color Representation of a color object
* @return {int} Return the blue component of a color object.
* @static
* @method blue
*/
Color.blue = function(color){ return color.blue };

/**
* Return the alpha component of a color object. 
* 
* @param {Color} color Representation of a color object
* @return {int} Return the alpha component of a color object.
* @static
* @method alpha
*/
Color.alpha = function(color){ return color.alpha };

// export module
module.exports = Color;