const Color = require("../color");

/**
 * @class UI.Toast
 * @since 4.4.1
 * Toast component allows users to show messages to user for period of time.
 *
 *     @example
 *     const Toast = require('@smartface/native/ui/toast');
 *     var myToast = new Toast({
 *         message: "This is a toast message",
 *         duration: 5,
 *         backgroundColor: Color.Yellow
 *     });
 *     myToast.createAction("Action Title", () => {})
 *
 */
function Toast() { }

/**
 * Gets/sets the message for a snackbar
 * @property {String} 
 * @android
 * @ios
 * @since 4.4.1
 */
Toast.prototype.message = ""

/**
 * Gets/sets the background of snackbar message view.
 * 
 * @property {UI.Color} [backgroundColor = UI.Color.DARKGRAY]
 * @android
 * @ios
 * @since 4.4.1
 */
Toast.prototype.backgroundColor = Color.DARKGRAY

/**
 * Gets/sets the actionTextColor for a snackbar's action.
 * @property {UI.Color} [actionTextColor = UI.Color.WHITE]
 * @android
 * @ios
 * @since 4.4.1
 */
Toast.prototype.actionTextColor = Color.WHITE

/**
 * Gets/sets the messageTextColor of snackbar message text.
 * 
 * @property {UI.Color} [messageTextColor = UI.Color.WHITE]
 * @android
 * @ios
 * @since 4.4.1
 */
Toast.prototype.messageTextColor = Color.WHITE

/**
 * Gets/sets the bottom offset of snackbar message view from bottom.
 * 
 * @property {Number} [bottomOffset = 0]
 * @android
 * @ios
 * @since 4.4.1
 */
Toast.prototype.bottomOffset = 0

/**
 * Gets/sets how long it will stay on the screen.
 * @property {Number} [duration = Number]
 * @android
 * @ios
 * @since 4.4.1
 */
Toast.prototype.duration = 4

/**
 * Gets is there any toast message showing
 * @property {Bool} [isShowing = false]
 * @android
 * @ios
 * @since 4.4.1
 */
Toast.prototype.isShowing = false

/**
 * Add an action to snackbar.
 * 
 *     @example
 *     myToast.createAction("Action Title", () =>  {
 *         console.log("Action Pressed!");
 *     });
 * 
 * @method createAction
 * @param {String} actionTitle The value will be visible on action text.
 * @param {void} callbackFunction Assinged function will be called when user tap the action.
 * @android
 * @ios
 * @since 4.4.1
 */
Toast.prototype.createAction = function (parameter, callbackFunction) { }

/**
 * This function will be called after a snack dismiss from screen.
 * @param {function} callback function called when snackbar dismissed.
 * @method onDismissed
 * @android
 * @ios
 * @since 4.4.1
 */
Toast.prototype.onDismissed = function () { };

/**
 * This is method should be called when created snackbar wants to show.
 * 
 * @method show
 * @android
 * @ios
 * @since 4.4.1
 */
Toast.prototype.show = function () { }

/**
 * This is method should be called when created snackbar wants to dismiss.
 * 
 * @method dismiss
 * @android
 * @ios
 * @since 4.4.1
 */
Toast.prototype.dismiss = function () { }

module.exports = Toast;
