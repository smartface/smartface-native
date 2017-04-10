/**
 * @class UI.Color
 * @since 0.1
 * Color is used to color UI objects and its elements. A Color instance is created by
 * passing RGB-ARGB values or hexadecimal string. There are constant and predefined colors as well.
 *
 *     @example
 *     const Color = require('sf-core/ui/color');
 *     var myRedColor = Color.create(255, 0, 0);
 *     var myBlueColorWithAlpha = Color.create(100, 0, 0, 255);
 *     var myHEXColor = Color.create("#FFAACC");
 */
function Color () {}

// Constants
/**
 * @property {UI.Color} BLACK
 * @android
 * @ios
 * @since 0.1
 * @readonly
 * @static
 */
Color.BLACK = (red, green, blue);

/**
 * @property {UI.Color} BLUE
 * @android
 * @ios
 * @since 0.1
 * @readonly
 * @static
 */
Color.BLUE = (red, green, blue);

/**
 * @property {UI.Color} CYAN
 * @android
 * @ios
 * @readonly
 * @since 0.1
 * @static
 */
Color.CYAN = (red, green, blue);

/**
 * @property {UI.Color} DARKGRAY
 * @android
 * @ios
 * @since 0.1
 * @readonly
 * @static
 */
Color.DARKGRAY = (red, green, blue);

/**
 * @property {UI.Color} GRAY
 * @android
 * @ios
 * @readonly
 * @since 0.1
 * @static
 */
Color.GRAY = (red, green, blue);

/**
 * @property {UI.Color} GREEN
 * @android
 * @ios
 * @readonly
 * @since 0.1
 * @static
 */
Color.GREEN = (red, green, blue);

/**
 * @property {UI.Color} LIGHTGRAY
 * @android
 * @ios
 * @readonly
 * @since 0.1
 * @static
 */
Color.LIGHTGRAY = (red, green, blue);

/**
 * @property {UI.Color} MAGENTA
 * @android
 * @ios
 * @readonly
 * @since 0.1
 * @static
 */
Color.MAGENTA = (red, green, blue);

/**
 * @property {UI.Color} RED
 * @android
 * @ios
 * @readonly
 * @since 0.1
 * @static
 */
Color.RED = (red, green, blue);

/**
 * @property {UI.Color} TRANSPARENT
 * @android
 * @ios
 * @readonly
 * @since 0.1
 * @static
 */
Color.TRANSPARENT = (red, green, blue);

/**
 * @property {UI.Color} YELLOW
 * @android
 * @ios
 * @readonly
 * @since 0.1
 * @static
 */
Color.YELLOW = (red, green, blue);

/**
 * @property {UI.Color} WHITE
 * @android
 * @ios
 * @readonly
 * @since 0.1
 * @static
 */
Color.WHITE = (red, green, blue);

/**
 * Creates a new color with RGB-ARGB or hexadecimal parameters
 *
 *     @example
 *     const Color = require('sf-core/ui/color');
 *     var myARGBColor = Color.create(0, 0, 0, 255);
 *     var myRGBColor = Color.create(255, 255, 255);
 *     var myHexColor = Color.create("#ff0000");
 *
 * @param {Mixed} parameters RGB-ARGB sequence or Hexadecimal string
 * @return {UI.Color} A color instance.
 * @static
 * @method create
 * @android
 * @ios
 * @since 0.1
 */
Color.create = function(params){}

/**
 * @method createGradient
 * @android
 * @ios
 *
 * Creates a gradient color that can be assigned to view's backgroundColor. You
 * can specify start-end colors and direction of gradient.
 *
 * @param {Object} params
 * @param {UI.Color.GradientDirection} params.direction Direction of gradient
 * @param {UI.Color} params.startColor Start color of gradient
 * @param {UI.Color} params.endColor End color of gradient
 * @static
 * @since 0.1
 */
Color.createGradient = function(params) {}

// Methods
/**
 * Returns the red value of a color instance.
 *
 *     @example
 *     const Color = require('sf-core/ui/color');
 *     var myRGBColor = Color.create(99, 0, 0);
 *     var red = Color.red(myRGBColor);
 *     alert(red);
 *
 * @param {UI.Color} color A color instance.
 * @return {Number} An integer between 0-255.
 * @static
 * @method red
 * @android
 * @ios
 * @since 0.1
 */
Color.red = function(color){ return color.red };

/**
 * Returns the green value of a color instance.
 *
 *     @example
 *     const Color = require('sf-core/ui/color');
 *     var myRGBColor = Color.create(0, 171, 0);
 *     var green = Color.green(myRGBColor);
 *     alert(green);
 *
 * @param {UI.Color} color A color instance.
 * @return {Number} An integer between 0-255.
 * @static
 * @method green
 * @android
 * @ios
 * @since 0.1
 */
Color.green = function(color){ return color.green };

/**
 * Returns the blue value of a color instance.
 *
 *     @example
 *     const Color = require('sf-core/ui/color');
 *     var myRGBColor = Color.create(0, 0, 155);
 *     var blue = Color.blue(myRGBColor);
 *     alert(blue);
 *
 * @param {UI.Color} color A color instance.
 * @return {Number} An integer between 0-255.
 * @static
 * @method blue
 * @android
 * @ios
 * @since 0.1
 */
Color.blue = function(color){ return color.blue };

/**
 * Returns the alpha value of a color instance.
 *
 *     @example
 *     const Color = require('sf-core/ui/color');
 *     var myARGBColor = Color.create(42, 0, 0, 255);
 *     var alpha = Color.alpha(myARGBColor);
 *     console.log(alpha);
 *
 * @param {UI.Color} color A color instance.
 * @return {Number} An integer between 0-255.
 * @static
 * @method alpha
 * @android
 * @ios
 * @since 0.1
 */
Color.alpha = function(color){ return color.alpha };

/**
 * @enum UI.Color.GradientDirection
 *
 * This enumeration describes allowed direction types for gradient color.
 */
Color.GradientDirection = {};

Object.defineProperties(Color.GradientDirection, {
    /**
     * Indicates gradient color will start from top point with startColor and
     * will end at bottom point with endColor.
     *
     * @property {UI.Color.GradientDirection} [VERTICAL = 0]
     * @android
     * @ios
     * @static
     * @readonly
     * @since 0.1
     */
    'VERTICAL': {
        value: 0,
        writable: false
    },
    /**
     * Indicates gradient color will start from left point with startColor and
     * will end at right point with endColor.
     *
     * @property {UI.Color.GradientDirection} [HORIZONTAL = 1]
     * @android
     * @ios
     * @static
     * @readonly
     * @since 0.1
     */
    'HORIZONTAL': {
        value: 1,
        writable: false
    },
    /**
     * Indicates gradient color will start from top-left point with startColor and
     * will end at bottom-right point with endColor.
     *
     * @property {UI.Color.GradientDirection} [DIAGONAL_LEFT = 2]
     * @android
     * @ios
     * @static
     * @readonly
     * @since 0.1
     */
    'DIAGONAL_LEFT': {
        value: 2,
        writable: false
    },
    /**
     * Indicates gradient color will start from top-right point with startColor and
     * will end at bottom-left point with endColor.
     *
     * @property {UI.Color.GradientDirection} [DIAGONAL_RIGHT = 3]
     * @android
     * @ios
     * @static
     * @readonly
     * @since 0.1
     */
    'DIAGONAL_RIGHT': {
        value: 3,
        writable: false
    }
});

// export module
module.exports = Color;
