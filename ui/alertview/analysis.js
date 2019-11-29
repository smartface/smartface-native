const Android = {};

/**
 * @enum {Number} UI.AlertView.ButtonType
 * @since 0.1
 * @deprecated 1.1.10 Use {@link UI.AlertView.Android.ButtonType} instead.
 *
 * ButtonType is used to indicate the behaviors of buttons in UI.AlertView.
 * You can specify a button have negative, positive or neutral user experience.
 * According to operating system button appearance or positions may change.
 *
 *     @example
 *     const AlertView = require('sf-core/ui/alertview');
 *
 *     var myAlertView = new AlertView({
 *         title: "Alert Title",
 *         message: "Alert Message"
 *     });
 *     myAlertView.addButton({
 *         index: AlertView.ButtonType.NEUTRAL,
 *         text: "Ignore",
 *     });
 *     myAlertView.addButton({
 *         index: AlertView.ButtonType.NEGATIVE,
 *         text: "Cancel"
 *     });
 *     myAlertView.addButton({
 *         index: AlertView.ButtonType.POSITIVE,
 *         text: "Okay"
 *     });
 *
 *     myAlertView.show();
 */
var ButtonType = {};

/**
 * @property {Number} POSITIVE
 * @android
 * @static
 * @readonly
 * @since 0.1
 */
ButtonType.POSITIVE = 0;

/**
 * @property {Number} NEUTRAL
 * @android
 * @static
 * @readonly
 * @since 0.1
 */
ButtonType.NEUTRAL = 1;

/**
 * @property {Number} NEGATIVE
 * @android
 * @static
 * @readonly
 * @since 0.1
 */
ButtonType.NEGATIVE = 2;

/**
 * @enum {Number} UI.AlertView.Android.ButtonType
 * @since 0.1
 *
 * ButtonType is used to indicate the behaviors of buttons in UI.AlertView.
 * You can specify a button have negative, positive or neutral user experience.
 * According to operating system button appearance or positions may change.
 *
 *     @example
 *     const AlertView = require('sf-core/ui/alertview');
 *
 *     var myAlertView = new AlertView({
 *         title: "Alert Title",
 *         message: "Alert Message"
 *     });
 *     myAlertView.addButton({
 *         type: AlertView.Android.ButtonType.NEUTRAL,
 *         text: "Ignore",
 *     });
 *     myAlertView.addButton({
 *         type: AlertView.Android.ButtonType.NEGATIVE,
 *         text: "Cancel"
 *     });
 *     myAlertView.addButton({
 *         type: AlertView.Android.ButtonType.POSITIVE,
 *         text: "Okay"
 *     });
 *
 *     myAlertView.show();
 */
Android.ButtonType = {};

/**
 * @property {Number} POSITIVE
 * @android
 * @static
 * @readonly
 * @since 0.1
 */
Android.ButtonType.POSITIVE = 0;

/**
 * @property {Number} NEUTRAL
 * @android
 * @static
 * @readonly
 * @since 0.1
 */
Android.ButtonType.NEUTRAL = 1;

/**
 * @property {Number} NEGATIVE
 * @android
 * @static
 * @readonly
 * @since 0.1
 */
Android.ButtonType.NEGATIVE = 2;

/**
 * @class UI.AlertView
 * @since 0.1
 *
 * AlertView is an alert box with buttons having custom behaviors. You can
 * use AlertView for informing user or asking for confirmations. AlertView
 * has buttons with callbacks that you can take action for each of them separately.
 *
 *     @example
 *     const AlertView = require('sf-core/ui/alertview');
 *
 *     var myAlertView = new AlertView({
 *         title: "Alert Title",
 *         message: "Alert Message"
 *     });
 *     myAlertView.addButton({
 *         type: AlertView.Android.ButtonType.NEGATIVE,
 *         text: "Cancel"
 *     });
 *     myAlertView.addButton({
 *         type: AlertView.Android.ButtonType.POSITIVE,
 *         text: "Okay",
 *         onClick: function() {
 *             console.log("Okay clicked.");
 *         }
 *     });
 *
 *     myAlertView.show();
 */
function AlertView() {}

/**
 * Gets/sets title of AlertView.
 *
 * @property {String} title
 * @android
 * @ios
 * @since 0.1
 */
AlertView.prototype.title = "";

/**
 * Gets/sets message of AlertView.
 *
 * @property {String} message
 * @android
 * @ios
 * @since 0.1
 */
AlertView.prototype.message = "";

AlertView.prototype.android = {};
/**
 * Gets/sets whether the alert view is cancelable or not when touched outside.
 *
 * @property {Boolean} cancellable
 * @android
 * @since 0.1
 */
AlertView.prototype.android.cancellable = true;

/**
 * Gets showing status of AlertView. It is set to true if AlertView is
 * currently displayed on screen, false otherwise.
 *
 * @property {boolean} isShowing
 * @android
 * @ios
 * @since 0.1
 * @readonly
 */
AlertView.prototype.isShowing = false; // read only

/**
 * Dismisses the AlertView, isShowing property set to false after this
 * operation.
 *
 * @method dismiss
 * @android
 * @ios
 * @since 0.1
 */
AlertView.prototype.dismiss = function() {};

/**
 * Returns object which contains text of added TextBox
 *
 * @property {Object[]} textBoxes
 * @property {String} textBoxes.text Text of added TextBox
 * @android
 * @ios
 * @since 4.1.1
 * @readonly
 */
AlertView.prototype.textBoxes = [];

/**
 * Allows you to add button to AlertView. You can add maximum 3 buttons
 * on Android platform, on iOS there is no limitation.
 *
 *     @example
 *     myAlertView.addButton({
 *         type: AlertView.Android.ButtonType.POSITIVE,
 *         text: "Okay",
 *         onClick: function() {
 *             console.log("Okay clicked.");
 *         }
 *     });
 *
 * @param {Object} params Object describing button properties
 * @param {UI.AlertView.ButtonType} params.index [DEPRECATED since 1.1.10. Use 'type' instead] Button type, it is set to
 *                                      UI.AlertView.ButtonType.NEUTRAL as default
 * @param {UI.AlertView.Android.ButtonType} params.type Button type, it is set to
 *                                      UI.AlertView.Android.ButtonType.NEUTRAL as default
 * @param {String} params.text Button text. It's letter case behaves differently on the platforms.
 * @param {Function} [params.onClick] Callback for button click action
 * @method addButton
 * @android
 * @ios
 * @since 0.1
 */
AlertView.prototype.addButton = function(params) {};


/**
 * Allows to add TextBox to AlertView. In iOS, maximum two textbox can be added. It is not applied to Android but 2 textboxes recommended.
 *
 *     @example
 *     myAlertView.addTextBox({
 *          text: "Hello!",
 *          hint: "Hint!",
 *          isPassword: false,
 *          android: {
 *              viewSpacings: { left: 50, right: 50 }
 *          }
 *     });
 *
 * @param {Object} params Object describing TextBox's properties
 * @param {String} params.text Sets the text of the TextBox.
 * @param {String} params.hint Sets hint text that will be displayed when TextBox is empty.
 * @param {Boolean} params.isPassword If it is true, content will be hidden
 * @param {Object} params.android Android specific properties
 * @param {Object} params.android.width Width of view
 * @param {Object} params.android.height Height of view
 * @param {Object} params.android.viewSpacings Extra space to appearence of view
 * @param {Number} params.android.viewSpacings.left Extra space to appear to the left of view
 * @param {Number} params.android.viewSpacings.right Extra space to appear to the right of view
 * @param {Number} params.android.viewSpacings.top Extra space to appear to the top of view
 * @param {Number} params.android.viewSpacings.bottom Extra space to appear to the bottom of view
 * @method addTextBox
 * @android
 * @ios
 * @since 4.1.2
 */
AlertView.prototype.addTextBox = function(params) {};


/**
 * Gets/sets dismiss callback function.
 *
 *     @example
 *     myAlertView.onDismiss = function(alertView) {
 *         console.log("Dismissed alert view with title: " + alertView.title);
 *     };
 *
 * @event onDismiss
 * @android
 * @ios
 * @param {UI.AlertView} alertView Dismissed AlertView object
 * @since 0.1
 */
AlertView.prototype.onDismiss = function(alertView) {};

/**
 * Shows AlertView on the screen with specified properties, isShowing property
 * set to true after this operation.
 *
 * @method show
 * @android
 * @ios
 * @since 0.1
 */
AlertView.prototype.show = function() {};

AlertView.ButtonType = Object.freeze(ButtonType);

module.exports = AlertView;