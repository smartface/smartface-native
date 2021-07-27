/**
 * @enum {Number} UI.EllipsizeMode
 * @static
 * @readonly
 * @since 4.0.2
 *
 * EllipsizeMode is an enum. It defines how to text will be truncated.
 *
 *     @example
 *     const Color = require('@smartface/native/ui/color');
 *     const TextView = require('@smartface/native/ui/textview');
 *     const EllipsizeMode = require('@smartface/native/ui/ellipsizemode');
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
EllipsizeMode.START;

/**
 * End & start of text fits in the container and the missing middle of the text  is indicated by 
 * an ellipsis glyph. Such as "smrt...fc"
 * 
 * @property {Number} MIDDLE
 * @android
 * @ios
 * @static
 * @readonly
 * @since 4.0.2
 */
EllipsizeMode.MIDDLE;

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
EllipsizeMode.END;

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
EllipsizeMode.NONE;

/**
 * Wrapping occurs at word boundaries, unless the word itself doesn’t fit on a single line. This mode may not work correctly when the maxLines value is 1.
 * 
 * @property {Number} WORDWRAPPING
 * @ios
 * @static
 * @since 4.0.2
 * @readonly
 */
EllipsizeMode.WORDWRAPPING;

/**
 * Wrap at character boundaries. This mode may not work correctly when the maxLines value is 1.
 * 
 * @property {Number} CHARWRAPPING
 * @ios
 * @static
 * @since 4.0.2
 * @readonly
 */
EllipsizeMode.CHARWRAPPING;