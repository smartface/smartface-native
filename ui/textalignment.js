
/**
 * @class UI.TextAlignment
 * @since 0.1
 * TextAlignment aligns the text of a label instance.
 *
 *     @example
 *     const TextAlignment = require('nf-core/ui/textalignment');
 *     const Label = require('nf-core/ui/label');
 *     var myLabel = new Label();
 *     myLabel.text = "Smartface";
 *     myLabel.textAlignment = TextAlignment.TOPRIGHT;
 */
const TextAlignment = { }

// Constants
/**
 * Gets the text alignment to the top left.
 *
 * @property {Number} TOPLEFT
 * @android
 * @ios
 * @since 0.1
 * @static
 */
TextAlignment.TOPLEFT = 0;

/**
 * Gets the text alignment to the top center.
 *
 * @property {Number} TOPCENTER
 * @android
 * @ios
 * @since 0.1
 * @static
 */
TextAlignment.TOPCENTER = 1;

/**
 * Gets the text alignment to the top right.
 *
 * @property {Number} TOPRIGHT
 * @android
 * @ios
 * @since 0.1
 * @static
 */
TextAlignment.TOPRIGHT = 2;

/**
 * Gets the text alignment to the middle left.
 *
 * @property {Number} MIDLEFT
 * @android
 * @ios
 * @since 0.1
 * @static
 */
TextAlignment.MIDLEFT = 3;

/**
 * Gets the text alignment to the middle center.
 *
 * @property {Number} MIDCENTER
 * @android
 * @ios
 * @since 0.1
 * @static
 */
TextAlignment.MIDCENTER = 4;

/**
 * Gets the text alignment to the middle right.
 *
 * @property {Number} MIDRIGHT
 * @android
 * @ios
 * @since 0.1
 * @static
 */
TextAlignment.MIDRIGHT = 5;

/**
 * Gets the text alignment to the bottom left.
 *
 * @property {Number} BOTTOMLEFT
 * @android
 * @ios
 * @since 0.1
 * @static
 */
TextAlignment.BOTTOMLEFT = 6;

/**
 * Gets the text alignment to the bottom center.
 *
 * @property {Number} BOTTOMCENTER
 * @android
 * @ios
 * @since 0.1
 * @static
 */
TextAlignment.BOTTOMCENTER = 7;

/**
 * Gets the text alignment to the bottom right.
 *
 * @property {Number} BOTTOMRIGHT
 * @android
 * @ios
 * @since 0.1
 * @static
 */
TextAlignment.BOTTOMRIGHT = 8;

module.exports = TextAlignment;
