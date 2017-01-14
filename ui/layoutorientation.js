/**
 * @enum {Number} UI.LayoutOrientation
 * @static
 * @since 0.1
 *
 * LayoutOrientation is an enum. It defines orientation of layout, vertically or horizontally..
 *
 *     const LinearLayout = require('sf-core/ui/linearlayout');
 *     const LayoutOrientation = require('sf-core/ui/layoutorientation');
 *     var myLinearLayout = new LinearLayout({
 *         height: '100%',
 *         width: '100%'
 *         orientation: LayoutOrientation.VERTICAL
 *     });
 *
 */
var LayoutOrientation = { };

/**
 * @property {Number} VERTICAL
 * Stacks all child views vertically.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(LayoutOrientation, 'VERTICAL', {
  value: 0,
  writable: false
});

/**
 * @property {Number} HORIZONTAL
 * Stacks all child views horizontally.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(LayoutOrientation, 'HORIZONTAL', {
  value: 1,
  writable: false
});

module.exports = LayoutOrientation;