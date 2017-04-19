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
Object.defineProperty(TextAlignment, 'TOPLEFT', {
  value: 0,
  writable: false
});

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
Object.defineProperty(TextAlignment, 'TOPCENTER', {
  value: 1,
  writable: false
});

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
Object.defineProperty(TextAlignment, 'TOPRIGHT', {
  value: 2,
  writable: false
});

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
Object.defineProperty(TextAlignment, 'MIDLEFT', {
  value: 3,
  writable: false
});

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
Object.defineProperty(TextAlignment, 'MIDCENTER', {
  value: 4,
  writable: false
});

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
Object.defineProperty(TextAlignment, 'MIDRIGHT', {
  value: 5,
  writable: false
});

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
Object.defineProperty(TextAlignment, 'BOTTOMLEFT', {
  value: 6,
  writable: false
});

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
Object.defineProperty(TextAlignment, 'BOTTOMCENTER', {
  value: 7,
  writable: false
});

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
Object.defineProperty(TextAlignment, 'BOTTOMRIGHT', {
  value: 8,
  writable: false
});

module.exports = TextAlignment;
