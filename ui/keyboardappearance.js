/**
 * @enum {Number} UI.KeyboardAppearance
 * @static
 * @since 0.1
 *
 * KeyboardAppearance is an enum. It defines keyboard appearance theme.
 * KeyboardAppearance works only for iOS
 *
 *     const TextBox = require('sf-core/ui/textbox');
 *     const KeyboardAppearance = require('sf-core/ui/keyboardappearance');
 *     var myTextBox = new TextBox({
 *         hint: "Smartface TextBox",
 *         KeyboardAppearance: KeyboardAppearance.DARK
 *     });
 *
 */
var KeyboardAppearance = { };

/**
 * @property {Number} DEFAULT
 * Default colored keyboard appearance.
 * @static
 * @readonly
 * @since 0.1
 */
KeyboardAppearance.DEFAULT = 0;

/**
 * @property {Number} LIGHT
 * Light colored keyboard appearance.
 * @static
 * @readonly
 * @since 0.1
 */
KeyboardAppearance.LIGHT = 1;

/**
 * @property {Number} DARK
 * Dark colored keyboard appearance.
 * @static
 * @since 0.1
 * @readonly
 */
KeyboardAppearance.DARK = 2;