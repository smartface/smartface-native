/**
 * @enum {Number} UI.LayoutAlignment
 * @static
 * @since 0.1
 *
 * LayoutAlignment is an enum. It defines alignment of layout.
 *
 *     const LinearLayout = require('sf-core/ui/linearlayout');
 *     const LayoutAlignment = require('sf-core/ui/layoutaligment');
 *     var myLinearLayout = new LinearLayout({
 *         height: '100%',
 *         width: '100%'
 *         aligment: LayoutAlignment.LEFT
 *     });
 *
 */
var LayoutAlignment = { };

/**
 * @property {Number} LEFT
 * Aligns layout content to left.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(LayoutAlignment, 'LEFT', {
  value: 0,
  writable: false
});

/**
 * @property {Number} RIGHT
 * Aligns layout content to right.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(LayoutAlignment, 'RIGHT', {
  value: 1,
  writable: false
});

/**
 * @property {Number} CENTER
 * Aligns layout content to center.
 * @static
 * @since 0.1
 * @readonly
 */
Object.defineProperty(LayoutAlignment, 'CENTER', {
  value: 2,
  writable: false
});

/**
 * @property {Number} FILL
 * Makes layout contents fill to layout based on layout orientation. 
 * This LayoutAlignment will work only for iOS.
 * @static
 * @since 0.1
 * @readonly
 */
Object.defineProperty(LayoutAlignment.ios, 'FILL', {
  value: 3,
  writable: false
});

module.exports = LayoutAlignment;