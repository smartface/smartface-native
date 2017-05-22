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
 * @property {String} [LEFT = 'left']
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
ScrollViewEdge.LEFT = 'left';

/**
 * @property {String} [TOP = 'top']
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
ScrollViewEdge.TOP = 'top';

/**
 * @property {String} [RIGHT = 'right']
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
ScrollViewEdge.RIGHT = 'right';

/**
 * @property {String} [BOTTOM = 'bottom']
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
ScrollViewEdge.BOTTOM = 'bottom';

module.exports = ScrollViewEdge;