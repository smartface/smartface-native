/**
 * @class UI.TextAlignment
 * @since 0.1
 * TextAlignment aligns the text of an UI instance.
 *
 *     @example
 *     const TextAlignment = require('sf-core/ui/textalignment');
 *     const Label = require('sf-core/ui/label');
 *     var myLabel = new Label();
 *     myLabel.text = "Smartface";
 *     myLabel.textAlignment = TextAlignment.TOPRIGHT;
 */
function TextAlignment(){}

/**
 * Gets the text alignment to the top left.
 *
 * @property {Number} TOPLEFT
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
TextAlignment.TOPLEFT = 0;

/**
 * Gets the text alignment to the top center.
 *
 * @property {Number} TOPCENTER
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
TextAlignment.TOPCENTER = 1;

/**
 * Gets the text alignment to the top right.
 *
 * @property {Number} TOPRIGHT
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
TextAlignment.TOPRIGHT = 2;

/**
 * Gets the text alignment to the middle left.
 *
 * @property {Number} MIDLEFT
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
TextAlignment.MIDLEFT = 3;

/**
 * Gets the text alignment to the middle center.
 *
 * @property {Number} MIDCENTER
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
TextAlignment.MIDCENTER = 4;

/**
 * Gets the text alignment to the middle right.
 *
 * @property {Number} MIDRIGHT
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
TextAlignment.MIDRIGHT = 5;

/**
 * Gets the text alignment to the bottom left.
 *
 * @property {Number} BOTTOMLEFT
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
TextAlignment.BOTTOMLEFT = 6;

/**
 * Gets the text alignment to the bottom center.
 *
 * @property {Number} BOTTOMCENTER
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
TextAlignment.BOTTOMCENTER = 7;

/**
 * Gets the text alignment to the bottom right.
 *
 * @property {Number} BOTTOMRIGHT
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
TextAlignment.BOTTOMRIGHT = 8;

module.exports = Object.freeze(TextAlignment);
