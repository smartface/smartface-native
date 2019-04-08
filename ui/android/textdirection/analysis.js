/**
 * @enum {Number} UI.Android.TextDirection
 * @static
 * @readonly
 * @since 4.0.2
 *
 * These enums are indicates the direction of text.
 *
 */
const TextDirection = {};

/**
 * Text direction is forced to RTL.
 * 
 * @property {Number} RTL
 * @android
 * @static
 * @readonly
 * @since 4.0.2
 */
TextDirection.RTL = 4;

/**
 * Text direction is forced to LTR.
 * 
 * @property {Number} LTR
 * @android
 * @static
 * @readonly
 * @since 4.0.2
 */
TextDirection.LTR = 3;


/**
 * Text direction is coming from the system Locale.
 * 
 * @property {Number} LOCALE
 * @android
 * @static
 * @readonly
 * @since 4.0.2
 */
TextDirection.LOCALE = 5;


/**
 * Text direction is inherited through ViewGroup.
 * 
 * @property {Number} INHERIT
 * @android
 * @static
 * @readonly
 * @since 4.0.2
 */
TextDirection.INHERIT = 0;

/**
 * Text direction is using "first strong algorithm". The first strong directional character determines the paragraph direction. 
 * If there is no strong directional character, the paragraph direction is RTL.
 * 
 * @property {Number} FIRST_STRONG_RTL
 * @android
 * @static
 * @readonly
 * @since 4.0.2
 */
TextDirection.FIRST_STRONG_RTL = 7;

/**
 * Text direction is using "first strong algorithm". The first strong directional character determines the paragraph direction. 
 * If there is no strong directional character, the paragraph direction is LTR.
 * 
 * @property {Number} FIRST_STRONG_LTR
 * @android
 * @static
 * @readonly
 * @since 4.0.2
 */
TextDirection.FIRST_STRONG_LTR = 6;

/**
 * Text direction is using "first strong algorithm". The first strong directional character determines the paragraph direction. 
 * If there is no strong directional character, the paragraph direction is the view's resolved layout direction.
 * 
 * @property {Number} FIRST_STRONG
 * @android
 * @static
 * @readonly
 * @since 4.0.2
 */
TextDirection.FIRST_STRONG = 1;


/**
 * Text direction is using "any-RTL" algorithm. The paragraph direction is RTL if it contains any strong RTL character, 
 * otherwise it is LTR if it contains any strong LTR characters. If there are neither, the paragraph direction is the view's resolved layout direction.
 * 
 * @property {Number} ANY_RTL
 * @android
 * @static
 * @readonly
 * @since 4.0.2
 */
TextDirection.ANY_RTL = 2;

module.exports = TextDirection;