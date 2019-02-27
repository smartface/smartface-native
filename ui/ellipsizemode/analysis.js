/**
 * @enum {Number} UI.EllipsizeMode
 * @static
 * @readonly
 * @since 4.0.2
 *
 * EllipsizeMode is an enum. It defines how to text will be truncated.
 *
 *     @example
 *     const Color = require('sf-core/ui/color');
 *     const TextView = require('sf-core/ui/textview');
 *     const EllipsizeMode = require('sf-core/ui/ellipsizemode');
 *
 *     var myTextView = new TextView({
 *         hint: "hint",
 *         width: 100,
 *         backgroundColor: Color.create("#7fd0ff"),
 *         ellipsizeMode: EllipsizeMode.START
 *     });
 *
 *     myPage.layout.addChild(myTextView);
 *
 */
const EllipsizeMode = {};

/**
 * End of text fits in the container and the missing text at the beginning of the line is indicated by 
 * an ellipsis glyph. Such as "...smrtfc"
 * 
 * @property {Number} START
 * @android
 * @ios
 * @static
 * @readonly
 * @since 4.0.2
 */
EllipsizeMode.START = 0;

/**
 * End & start of text fits in the container and the missing middle of the text  is indicated by 
 * an ellipsis glyph. Such as "smrt...fc"
 * 
 * @property {Number} MIDDLE
 * @android
 * @ios
 * @static
 * @readonly
 * @since 4.0.2s
 */
EllipsizeMode.MIDDLE = 1;

/**
 * Start of text fits in the container and the missing end of the text  is indicated by 
 * an ellipsis glyph. Such as "smrtfc..."
 * 
 * @property {Number} END
 * @android
 * @ios
 * @static
 * @since 4.0.2
 * @readonly
 */
EllipsizeMode.END = 2;



/**
 * Turns off ellipsizing
 * 
 * @property {Number} NONE
 * @android
 * @ios
 * @static
 * @since 4.0.2
 * @readonly
 */
EllipsizeMode.NONE = 3;