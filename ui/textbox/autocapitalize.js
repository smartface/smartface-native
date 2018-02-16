
/**
 * @enum {Number} UI.TextBox.AutoCapitalize
 *
 * Automatically capitalize certain characters.
 * @static
 * @since 2.8
 *
 */
var AutoCapitalize = {};

/**
 * @property {Number} NONE
 * Don't auto capitalize anything.
 * @ios
 * @android
 * @static
 * @readonly
 * @since 2.8
 */
AutoCapitalize.NONE = 0;

/**
 * @property {Number} WORDS
 * Capitalize the first character of each word.
 * @ios
 * @android
 * @static
 * @readonly
 * @since 2.8
 */
AutoCapitalize.WORDS = 1;

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
AutoCapitalize.SENTENCES = 2;

/**
 * @property {Number} CHARACTERS
 * Capitalize all characters.
 * @ios
 * @android
 * @static
 * @readonly
 * @since 2.8
 */
AutoCapitalize.CHARACTERS = 3;

Object.freeze(AutoCapitalize);

module.exports = AutoCapitalize;