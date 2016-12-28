
/**
* @class TextAlignment
* @since 0.1
* TextAlignment aligns the text of a label instance.
*
*     @example
*     const TextAlignment = require('sf-core/ui/textaligment.js');
*     var textAligment = TextAlignment.TOPLEFT; 
*/
const TextAlignment = {// Constants
        /**
        * Constant value for top left alignment 
        * 
        * @property {Number} TOPLEFT Constant number value.
        */
        TOPLEFT: 0, 
        /**
        * Constant value for top center alignment 
        * 
        * @property {Number} TOPCENTER Constant number value.
        */
        TOPCENTER: 1,
        /**
        * Constant value for top right alignment 
        * 
        * @property {Number} TOPRIGHT Constant number value.
        */
        TOPRIGHT: 2,
        
        /**
        * Constant value for middle left alignment 
        * 
        * @property {Number} MIDLEFT Constant number value.
        */
        MIDLEFT: 3,
        /**
        * Constant value for top middle center alignment 
        * 
        * @property {Number} MIDCENTER Constant number value.
        */
        MIDCENTER: 4,
        /**
        * Constant value for top middle right alignment 
        * 
        * @property {Number} MIDRIGHT Constant number value.
        */
        MIDRIGHT: 5,
        
        /**
        * Constant value for bottom left alignment 
        * 
        * @property {Number} BOTTOMLEFT Constant number value.
        */
        BOTTOMLEFT: 6,
        /**
        * Constant value for bottom center alignment 
        * 
        * @property {Number} BOTTOMCENTER Constant number value.
        */
        BOTTOMCENTER: 7,
        /**
        * Constant value for bottom right alignment 
        * 
        * @property {Number} BOTTOMRIGHT Constant number value.
        */
        BOTTOMRIGHT: 8,
    }

module.exports = TextAlignment;