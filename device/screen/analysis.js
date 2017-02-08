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
 * @android
 * @ios
 * @property {Device.Screen.OrientationType} orientation
 * @readonly
 * @static
 * @since 0.1
 */
Screen.orientation;

/**
 *
 * TODO: type definition
 * @android
 * @ios
 * @property {Boolean} touchSupported 
 * @readonly
 * @static
 * @since 0.1
 */
Screen.touchSupported;

/**
 *
 * TODO: type definition
 * @android
 * @ios
 * @property {Number} dpi 
 * @readonly
 * @static
 * @since 0.1
 */
Screen.dpi;

/**
 *
 * TODO: type definition
 * @android
 * @ios
 * @property {Number} height 
 * @readonly
 * @static
 * @since 0.1
 */
Screen.height;

/**
 *
 * TODO: type definition
 * @android
 * @ios
 * @property {Number} width 
 * @readonly
 * @static
 * @since 0.1
 */
Screen.width;

/**
 *
 * TODO: type definition
 * @ios
 * @property {Boolean} touchForceAvaliable
 * @readonly
 * @static
 * @since 0.1
 */
Screen.ios.touchForceAvaliable;

/**
 * TODO: type definition
 * @android
 * @ios
 * @method capture
 * @return {UI.Image} captured image.
 * @since 0.1
 */
Screen.capture = function() {};

module.exports = Screen;