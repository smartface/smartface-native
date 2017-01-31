/**
 * @class Device.Screen
 * @since 0.1
 * 
 * TODO: type definition
 */
function Screen() {}

/**
 *
 * TODO: type definition
 * @property {Device.Screen.OrientationType} orientation
 * @readonly
 * @static
 * @since 0.1
 */
Screen.orientation;

/**
 *
 * TODO: type definition
 * @property {Boolean} touchSupported 
 * @readonly
 * @static
 * @since 0.1
 */
Screen.touchSupported;

/**
 *
 * TODO: type definition
 * @property {Number} dpi 
 * @readonly
 * @static
 * @since 0.1
 */
Screen.dpi;

/**
 *
 * TODO: type definition
 * @property {Number} height 
 * @readonly
 * @static
 * @since 0.1
 */
Screen.height;

/**
 *
 * TODO: type definition
 * @property {Number} width 
 * @readonly
 * @static
 * @since 0.1
 */
Screen.width;

/**
 *
 * TODO: type definition
 * @property {Number} touchX 
 * @readonly
 * @static
 * @since 0.1
 */
Screen.touchX;

/**
 *
 * TODO: type definition
 * @property {Number} touchY 
 * @readonly
 * @static
 * @since 0.1
 */
Screen.touchY;

/**
 *
 * TODO: type definition
 * @property {Boolean} touchForceAvaliable
 * @readonly
 * @static
 * @since 0.1
 */
Screen.touchForceAvaliable;

/**
 * TODO: type definition
 * @method capture
 * @return {UI.Image} captured image.
 * @since 0.1
 */
Screen.capture = function() {};

module.exports = Screen;