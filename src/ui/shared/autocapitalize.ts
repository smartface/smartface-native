/**
 * @enum {Number} UI.TextBox.AutoCapitalize
 *
 * Automatically capitalize certain characters.
 * @static
 * @since 2.8
 *
 */
enum AutoCapitalize {
  /**
   * @property {Number} NONE
   * Don't auto capitalize anything.
   * @ios
   * @android
   * @static
   * @readonly
   * @since 2.8
   */
  NONE,

  /**
   * @property {Number} WORDS
   * Capitalize the first character of each word.
   * @ios
   * @android
   * @static
   * @readonly
   * @since 2.8
   */
  WORDS,

  /**
   * @property {Number} SENTENCES
   * Capitalize the first character of each sentence.
   *
   * @ios
   * @android
   * @static
   * @readonly
   * @since 2.8
   */
  SENTENCES,

  /**
   * @property {Number} CHARACTERS
   * Capitalize all characters.
   * @ios
   * @android
   * @static
   * @readonly
   * @since 2.8
   */
  CHARACTERS
}

/**
 * @enum {Number} UI.TextBox.AutoCapitalize
 *
 * Automatically capitalize certain characters.
 * @static
 * @since 2.8
 *
 */
export default AutoCapitalize;
