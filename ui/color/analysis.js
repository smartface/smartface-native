/**
* @class Color
* Color is a UI object to allow creating colors.Each component 
* ranges between 0..255.
*
*     @example
*     const Color = require('sf-core/ui/color');
*     var redValue = Color.RED;
*     var anotherColor = Color.create("#FFFFAACC");
*/
function Color () {}

// Constants
/**
* Constant value for black color. 
* 
* @property {Color} BLACK Constant color value.
*/
Color.BLACK = (red, green, blue);

/**
* Constant value for blue color. 
* 
* @property {Color} BLUE Constant color value.
*/
Color.BLUE = (red, green, blue);

/**
* Constant value for cyan color.  
* 
* @property {Color} CYAN Constant color value.
*/
Color.CYAN = (red, green, blue);

/**
* Constant value for dark gray color.  
* 
* @property {Color} DARKGRAY Constant color value.
*/
Color.DARKGRAY = (red, green, blue);

/**
* Constant value for gray color.  
* 
* @property {Color} GRAY Constant color value.
*/
Color.GRAY = (red, green, blue);

/**
* Constant value for green color.  
* 
* @property {Color} GREEN Constant color value.
*/
Color.GREEN = (red, green, blue);

/**
* Constant value for light gray color.  
* 
* @property {Color} LIGHTGRAY Constant color value.
*/
Color.LIGHTGRAY = (red, green, blue);

/**
* Constant value for magenta color.  
* 
* @property {Color} MAGENTA Constant color value.
*/
Color.MAGENTA = (red, green, blue);

/**
* Constant value for red color. 
* 
* @property {Color} RED Constant color value.
*/
Color.RED = (red, green, blue);

/**
* Constant value for transparent color.  
* 
* @property {Color} TRANSPARENT Constant color value.
*/
Color.TRANSPARENT = (red, green, blue);

/**
* Constant value for yellow color.  
* 
* @property {Color} YELLOW Constant color value.
*/
Color.YELLOW = (red, green, blue);

/**
* Constant value for white color.  
* 
* @property {Color} WHITE Constant color value.
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
* @param {Number} [params.alpha] Alpha component [0..255] of the color
* @param {Number} [params.red] Red component [0..255] of the color
* @param {Number} [params.green] Green component [0..255] of the color
* @param {Number} [params.blue] Blue component [0..255] of the color
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
* @return {Number} Return the red component of a color object.
* @static
* @method red
*/
Color.red = function(color){ return color.red };

/**
* Return the green component of a color object. 
* 
* @param {Color} color Representation of a color object
* @return {Number} Return the green component of a color object.
* @static
* @method green
*/
Color.green = function(color){ return color.green };

/**
* Return the blue component of a color object. 
* 
* @param {Color} color Representation of a color object
* @return {Number} Return the blue component of a color object.
* @static
* @method blue
*/
Color.blue = function(color){ return color.blue };

/**
* Return the alpha component of a color object. 
* 
* @param {Color} color Representation of a color object
* @return {Number} Return the alpha component of a color object.
* @static
* @method alpha
*/
Color.alpha = function(color){ return color.alpha };

// export module
module.exports = Color;