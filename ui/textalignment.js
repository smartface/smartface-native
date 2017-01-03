
/**
 * @class UI.TextAlignment
 * @since 0.1
 * TextAlignment aligns the text of a label instance.
 *
 *     @example
 *     const TextAlignment = require('sf-core/ui/textalignment');
 *     var textAlignment = TextAlignment.MIDCENTER; 
 */
const TextAlignment = { }

// Constants
/**
 * Gets the text alignment to the top left. 
 * 
 * @property {Number} TOPLEFT  
 * @since 0.1
 * @static
 */
TextAlignment.TOPLEFT = 0; 

/**
 * Gets the text alignment to the top center. 
 * 
 * @property {Number} TOPCENTER 
 * @since 0.1
 * @static
 */
TextAlignment.TOPCENTER = 1;

/**
 * Gets the text alignment to the top right. 
 * 
 * @property {Number} TOPRIGHT 
 * @since 0.1
 * @static
 */
TextAlignment.TOPRIGHT = 2;

/**
 * Gets the text alignment to the middle left. 
 * 
 * @property {Number} MIDLEFT 
 * @since 0.1
 * @static
 */
TextAlignment.MIDLEFT = 3;

/**
 * Gets the text alignment to the middle center. 
 * 
 * @property {Number} MIDCENTER 
 * @since 0.1
 * @static
 */
TextAlignment.MIDCENTER = 4;

/**
 * Gets the text alignment to the middle right. 
 * 
 * @property {Number} MIDRIGHT  
 * @since 0.1
 * @static
 */
TextAlignment.MIDRIGHT = 5;

/**
 * Gets the text alignment to the bottom left. 
 * 
 * @property {Number} BOTTOMLEFT 
 * @since 0.1
 * @static
 */
TextAlignment.BOTTOMLEFT = 6;

/**
 * Gets the text alignment to the bottom center. 
 * 
 * @property {Number} BOTTOMCENTER 
 * @since 0.1
 * @static
 */
TextAlignment.BOTTOMCENTER = 7;

/**
 * Gets the text alignment to the bottom right. 
 * 
 * @property {Number} BOTTOMRIGHT 
 * @since 0.1
 * @static
 */
TextAlignment.BOTTOMRIGHT = 8;

module.exports = TextAlignment;