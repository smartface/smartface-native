/**
 * @enum {Number} UI.ActionKeyType
 * @static
 * @since 0.1
 *
 * ActionKeyType is an enum. It defines soft keyboard action key (return key) type.
 *
 *     @example
 *     const TextBox = require('sf-core/ui/textbox');
 *     const ActionKeyType = require('sf-core/ui/actionkeytype');
 *     var myTextBox = new TextBox({
 *         hint: "Smartface TextBox",
 *         actionKeyType: ActionKeyType.DEFAULT
 *     });
 *
 */
var ActionKeyType = { };

/**
 * @property {Number} DEFAULT
 * Default colored keyboard appearance. This constant corresponds to the done action.
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