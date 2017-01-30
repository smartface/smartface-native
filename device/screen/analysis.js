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
 * @property {Boolean} touchSupported 
 * @readonly
 * @static
 * @since 0.1
 */
Screen.touchSupported = false;

/**
 *
 * TODO: type definition
 * @property {Number} dpi 
 * @readonly
 * @static
 * @since 0.1
 */
Screen.dpi = -1;

/**
 *
 * TODO: type definition
 * @property {Number} height 
 * @readonly
 * @static
 * @since 0.1
 */
Screen.height = -1;

/**
 *
 * TODO: type definition
 * @property {Number} width 
 * @readonly
 * @static
 * @since 0.1
 */
Screen.width = -1;

/**
 *
 * TODO: type definition
 * @property {Number} touchX 
 * @readonly
 * @static
 * @since 0.1
 */
Screen.touchX = -1;

/**
 *
 * TODO: type definition
 * @property {Number} touchY 
 * @readonly
 * @static
 * @since 0.1
 */
Screen.touchY = -1;

/**
 * TODO: type definition
 * @method capture
 * @return {UI.Image} captured image.
 * @since 0.1
 */
Screen.capture = function() {};

module.exports = Screen;