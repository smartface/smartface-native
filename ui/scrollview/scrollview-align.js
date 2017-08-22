/**
* @enum UI.ScrollView.Align
* @static
* @readonly
* @since 0.1
*
* Indicates the alignment of the scroll. ScrollViewAlign specifies 
* the scroll direction of the ScrollView.
*
*/
const ScrollViewAlign = {};

/**
 * Horizontal alignment for ScrollView
 * 
 * @property {String} [HORIZONTAL = 'horizontal']
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
ScrollViewAlign.HORIZONTAL = 'horizontal';

/**
 * Vertical alignment for ScrollView
 * 
 * @property {String} [VERTICAL = 'vertical']
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
ScrollViewAlign.VERTICAL = 'vertical';

module.exports = ScrollViewAlign;