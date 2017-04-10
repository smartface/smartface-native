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
var ActionKeyType = { };

/**
 * @property {Number} DEFAULT
 * @android
 * @ios
 * Done action for soft keyboard.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ActionKeyType, 'DEFAULT', {
  value: 0,
  writable: false
});

/**
 * @property {Number} NEXT
 * @android
 * @ios
 * Next action for soft keyboard.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ActionKeyType, 'NEXT', {
  value: 1,
  writable: false
});

/**
 * @property {Number} GO
 * @android
 * @ios
 * Go action for soft keyboard.
 * @static
 * @since 0.1
 * @readonly
 */
Object.defineProperty(ActionKeyType, 'GO', {
  value: 2,
  writable: false
});

/**
 * @property {Number} SEARCH
 * @android
 * @ios
 * Search action for soft keyboard.
 * @static
 * @since 0.1
 * @readonly
 */
Object.defineProperty(ActionKeyType, 'SEARCH', {
  value: 3,
  writable: false
});

/**
 * @property {Number} SEND
 * @android
 * @ios
 * Send action for soft keyboard.
 * @static
 * @since 0.1
 * @readonly
 */
Object.defineProperty(ActionKeyType, 'SEND', {
  value: 4,
  writable: false
});

module.exports = ActionKeyType;
