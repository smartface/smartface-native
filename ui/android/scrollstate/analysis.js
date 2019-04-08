/**
 * @enum {Number} UI.Android.ScrollState
 * @static
 * @readonly
 * @since 3.1.2
 *
 * Indicates the scroll state for GridView, ListView and ScrollView. 
 *
 */
const ScrollState = {};

/**
 * This state indicates that is currently being dragged by outside input such as user touch input.
 * 
 * @property {Number} DRAGGING
 * @android
 * @static
 * @readonly
 * @since 3.1.2
 */
ScrollState.DRAGGING = 1;

/**
 * This state indicates that is not currently scrolling.
 * 
 * @property {Number} IDLE
 * @android
 * @static
 * @readonly
 * @since 3.1.2
 */
ScrollState.IDLE = 0;

/**
 * This state indicates that is currently animating to a final position while not under outside control.
 * 
 * @property {Number} SETTLING
 * @android
 * @static
 * @readonly
 * @since 3.1.2
 */
ScrollState.SETTLING = 2;

module.exports = ScrollState;