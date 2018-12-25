/**
* @enum {Number} UI.iOS.ContentInsetAdjustment
* @aios
* @static
* @readonly
* @since 4.0.0
*
* Constants indicating how safe area insets are added to the adjusted content inset.
*
*/
const ContentInsetAdjustment = {};

/**
 * Automatically adjust the scroll view insets.
 * 
 * @property {Number} AUTOMATIC
 * @ios
 * @static
 * @readonly
 * @since 4.0.0
 */
ContentInsetAdjustment.AUTOMATIC = 0;

/**
 * Adjust the insets only in the scrollable directions.
 * 
 * @property {Number} SCROLLABLEAXES
 * @ios
 * @static
 * @readonly
 * @since 4.0.0
 */
ContentInsetAdjustment.SCROLLABLEAXES = 1;

/**
 * Do not adjust the scroll view insets.
 * 
 * @property {Number} NEVER
 * @ios
 * @static
 * @readonly
 * @since 4.0.0
 */
ContentInsetAdjustment.NEVER = 2;

/**
 * Always include the safe area insets in the content adjustment.
 * 
 * @property {Number} ALWAYS
 * @ios
 * @static
 * @readonly
 * @since 4.0.0
 */
ContentInsetAdjustment.ALWAYS = 3;

module.exports = ContentInsetAdjustment;