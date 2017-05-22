/**
* @enum UI.ScrollView.Edge
* @static
* @readonly
* @since 0.1
*
* Indicates where to scroll.
*
*/
const ScrollViewEdge = {};

/**
 * Indicates left edge of the ScrollView
 * 
 * @property {String} [LEFT = 'left']
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
ScrollViewEdge.LEFT = 'left';

/**
 * Indicates top edge of the ScrollView
 * 
 * @property {String} [TOP = 'top']
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
ScrollViewEdge.TOP = 'top';

/**
 * Indicates right edge of the ScrollView
 * 
 * @property {String} [RIGHT = 'right']
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
ScrollViewEdge.RIGHT = 'right';

/**
 * Indicates bottom edge of the ScrollView
 * 
 * @property {String} [BOTTOM = 'bottom']
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
ScrollViewEdge.BOTTOM = 'bottom';

module.exports = ScrollViewEdge;