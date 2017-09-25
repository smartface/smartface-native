/**
 * @enum {Number} UI.ActionKeyType
 * @static
 * @readonly
 * @since 0.1
 *
 * ActionKeyType is an enum. It defines soft keyboard action key (return key) type.
 *
 *     @example
 *     const Color = require('sf-core/ui/color');
 *     const TextBox = require('sf-core/ui/textbox');
 *     const ActionKeyType = require('sf-core/ui/actionkeytype');
 *
 *     var myTextBox = new TextBox({
 *         hint: "hint",
 *         width: 100,
 *         backgroundColor: Color.create("#7fd0ff"),
 *         actionKeyType: ActionKeyType.DEFAULT
 *     });
 *
 *     myPage.layout.addChild(myTextBox);
 *
 */
const ActionKeyType = { };

/**
 * @property {Number} DEFAULT
 * @android
 * @ios
 * Done action for soft keyboard.
 * @static
 * @readonly
 * @since 0.1
 */
ActionKeyType.DEFAULT = 0;

/**
 * @property {Number} NEXT
 * @android
 * @ios
 * Next action for soft keyboard.
 * @static
 * @readonly
 * @since 0.1
 */
ActionKeyType.NEXT = 1;

/**
 * @property {Number} GO
 * @android
 * @ios
 * Go action for soft keyboard.
 * @static
 * @since 0.1
 * @readonly
 */
ActionKeyType.GO = 2;

/**
 * @property {Number} SEARCH
 * @android
 * @ios
 * Search action for soft keyboard.
 * @static
 * @since 0.1
 * @readonly
 */
ActionKeyType.SEARCH = 3;

/**
 * @property {Number} SEND
 * @android
 * @ios
 * Send action for soft keyboard.
 * @static
 * @since 0.1
 * @readonly
 */
ActionKeyType.SEND = 4;

Object.freeze(ActionKeyType);

module.exports = ActionKeyType;