/**
 * @enum {Number} UI.EllipsizeMode
 * @static
 * @readonly
 * @since 4.0.2
 *
 * EllipsizeMode is an enum. It defines how to text will be truncated.
 *
 *     @example
 *     import Color from '@smartface/native/ui/color';
 *     import TextView from '@smartface/native/ui/textview';
 *     import EllipsizeMode from '@smartface/native/ui/ellipsizemode';
 *
 *     const myTextView = new TextView({
 *         hint: "hint",
 *         width: 100,
 *         backgroundColor: Color.create("#7fd0ff"),
 *         ellipsizeMode: EllipsizeMode.START
 *     });
 *
 *     myPage.layout.addChild(myTextView);
 *
 */

enum EllipsizeMode {
  /**
   * End of text fits in the container and the missing text at the beginning of the line is indicated by
   * an ellipsis glyph. Such as "...smrtfc"
   * @android
   * @ios
   * @static
   * @readonly
   * @since 4.0.2
   */
  START = 'start',

  /**
   * End & start of text fits in the container and the missing middle of the text  is indicated by
   * an ellipsis glyph. Such as "smrt...fc"
   * @android
   * @ios
   * @static
   * @readonly
   * @since 4.0.2
   */
  MIDDLE = 'middle',

  /**
   * Start of text fits in the container and the missing end of the text  is indicated by
   * an ellipsis glyph. Such as "smrtfc..."
   * @android
   * @ios
   * @static
   * @since 4.0.2
   * @readonly
   */
  END = 'end',

  /**
   * Turns off ellipsizing
   * @android
   * @ios
   * @static
   * @since 4.0.2
   * @readonly
   */
  NONE = 'none',

  /**
   * Wrapping occurs at word boundaries, unless the word itself doesn’t fit on a single line. This mode may not work correctly when the maxLines value is 1.
   * @ios
   * @static
   * @since 4.0.2
   * @readonly
   */
  WORDWRAPPING = 'ios_wordwrapping',

  /**
   * Wrap at character boundaries. This mode may not work correctly when the maxLines value is 1.
   * @ios
   * @static
   * @since 4.0.2
   * @readonly
   */
  CHARWRAPPING = 'ios_charwrapping'
}

export default EllipsizeMode;
