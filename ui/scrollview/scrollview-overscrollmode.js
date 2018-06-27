/**
* @enum UI.ScrollView.OverScrollMode
* @static
* @readonly
 * @since 3.0.2
*
* Indicates the over-scroll mode for this search view. 
*
*/
const OverScrollMode = {};

/**
 * Always allow a user to over-scroll this scroll view.
 * 
 * @property {String} [HORIZONTAL = 'horizontal']
 * @android
 * @ios
 * @static
 * @readonly
 * @since 3.0.2
 */
OverScrollMode.ALWAYS = 0;

/**
 * Allow a user to over-scroll this scroll view only if the content is large enough to meaningfully scroll.
 * 
 * @android
 * @ios
 * @static
 * @readonly
 * @since 3.0.2
 */
OverScrollMode.AUTO = 1;

/**
 * Never allow a user to over-scroll this scroll view.
 * 
 * @property {String} [VERTICAL = 'vertical']
 * @android
 * @ios
 * @static
 * @readonly
 * @since 3.0.2
 */
OverScrollMode.NEWER = 2;

module.exports = OverScrollMode;