/**
 * @enum {Number} UI.ActionKeyType
 * @static
 * @readonly
 * @since 0.1
 *
 * ActionKeyType is an enum. It defines soft keyboard action key (return key) type.
 *
 *     @example
 *     const Color = require('nf-core/ui/color');
 *     const TextBox = require('nf-core/ui/textbox');
 *     const ActionKeyType = require('nf-core/ui/actionkeytype');
 *     
 *     var myTextBox = new TextBox({
 *         hint: "hint",
 *         width: "50%",
 *         backgroundColor: Color.create("#7fd0ff"),
 *         actionKeyType: ActionKeyType.DEFAULT
 *     });
 *     
 *     myPage.add(myTextBox);
 *
 */
var ActionKeyType = { };

/**
 * @property {Number} DEFAULT
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