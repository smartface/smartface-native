/**
 * @enum {Number} UI.KeyboardAppearance
 * @static
 * @since 0.1
 *
 * KeyboardAppearance is an enum. It defines keyboard appearance theme on iOS devices only.
 *
 *     @example
 *     const Color = require('sf-core/ui/color');
 *     const TextBox = require('sf-core/ui/textbox');
 *     const KeyboardAppearance = require('sf-core/ui/keyboardappearance');
 *
 *     var myTextBox = new TextBox({
 *         top: 50, left:50, width: 100, height: 80,
 *         hint: "your hint text",
 *         backgroundColor: Color.create("#67fcaa"),
 *         ios: {
 *             KeyboardAppearance: KeyboardAppearance.DARK
 *         }
 *     });
 *
 *     myPage.layout.addChild(myTextBox);
 *
 */
var KeyboardAppearance = { };

/**
 * @property {Number} DEFAULT
 * @ios
 * Default colored keyboard appearance. This constant corresponds to UI.KeyboardAppearance.LIGHT.
 * @static
 * @readonly
 * @since 0.1
 */
KeyboardAppearance.DEFAULT = 0;

/**
 * @property {Number} DARK
 * @ios
 * Dark colored keyboard appearance.
 * @static
 * @since 0.1
 * @readonly
 */
KeyboardAppearance.DARK = 1;

/**
 * @property {Number} LIGHT
 * @ios
 * Light colored keyboard appearance.
 * @static
 * @readonly
 * @since 0.1
 */
KeyboardAppearance.LIGHT = 2;

Object.freeze(KeyboardAppearance);

module.exports = KeyboardAppearance;