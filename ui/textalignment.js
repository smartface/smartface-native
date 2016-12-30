
/**
* @class TextAlignment
* @since 0.1
* TextAlignment aligns the text of a label instance.
*
*     @example
*     const TextAlignment = require('sf-core/ui/textalignment');
*     var textAlignment = TextAlignment.TOPLEFT; 
*/
const TextAlignment = { }

// Constants
/**
* Gets the text alignment to the top left. 
* 
* @property {Number} TOPLEFT Align the text to the top left. 
* @since 0.1
* @static
*/
TextAlignment.TOPLEFT = 0; 

/**
* Gets the text alignment to the top center. 
* 
* @property {Number} TOPCENTER Align the text to the top center. 
* @since 0.1
* @static
*/
TextAlignment.TOPCENTER = 1;

/**
* Gets the text alignment to the top right. 
* 
* @property {Number} TOPRIGHT Align the text to the top right. 
* @since 0.1
* @static
*/
TextAlignment.TOPRIGHT = 2;

/**
* Gets the text alignment to the middle left. 
* 
* @property {Number} MIDLEFT Align the text to the middle left.
* @since 0.1
* @static
*/
TextAlignment.MIDLEFT = 3;

/**
* Gets the text alignment to the middle center. 
* 
* @property {Number} MIDCENTER Align the text to the middle center. 
* @since 0.1
* @static
*/
TextAlignment.MIDCENTER = 4;

/**
* Gets the text alignment to the middle right. 
* 
* @property {Number} MIDRIGHT Align the text to the middle right. 
* @since 0.1
* @static
*/
TextAlignment.MIDRIGHT = 5;

/**
* Gets the text alignment to the bottom left. 
* 
* @property {Number} BOTTOMLEFT Align the text to the bottom left. 
* @since 0.1
* @static
*/
TextAlignment.BOTTOMLEFT = 6;

/**
* Gets the text alignment to the bottom center. 
* 
* @property {Number} BOTTOMCENTER Align the text to the bottom center. 
* @since 0.1
* @static
*/
TextAlignment.BOTTOMCENTER = 7;

/**
* Gets the text alignment to the bottom right. 
* 
* @property {Number} BOTTOMRIGHT Align the text to the bottom right. 
* @since 0.1
* @static
*/
TextAlignment.BOTTOMRIGHT = 8;

module.exports = TextAlignment;