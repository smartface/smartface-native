/**
 * @enum {Number} UI.AlertView.ButtonType
 * @since 0.1
 *
 * ButtonType is used to indicate the behaviors of buttons in UI.AlertView.
 * You can specify a button have negative, positive or neutral user experience.
 * According to operating system button appearance or positions may change.
 *
 *     @example
 *     const AlertView = require('nf-core/ui/alertview');
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
var ButtonType = { };

/**
 * @property {Number} POSITIVE
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
ButtonType.POSITIVE = 0;

/**
 * @property {Number} NEUTRAL
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
ButtonType.NEUTRAL = 1;

/**
 * @property {Number} NEGATIVE
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
ButtonType.NEGATIVE = 2;

/**
 * @class UI.AlertView
 * @since 0.1
 *
 * AlertView is an alert box with buttons having custom behaviors. You can
 * use AlertView for informing user or asking for confirmations. AlertView
 * has buttons with callbacks that you can take action for each of them separately.
 *
 *     @example
 *     const AlertView = require('nf-core/ui/alertview');
 *
 *     var myAlertView = new AlertView({
 *         title: "Alert Title",
 *         message: "Alert Message"
 *     });
 *     myAlertView.addButton({
 *         index: AlertView.ButtonType.NEGATIVE,
 *         text: "Cancel"
 *     });
 *     myAlertView.addButton({
 *         index: AlertView.ButtonType.POSITIVE,
 *         text: "Okay",
 *         onClick: function() {
 *             console.log("Okay clicked.");
 *         }
 *     });
 *
 *     myAlertView.show();
 */
function AlertView () {

    /**
     * Gets/sets title of AlertView.
     *
     * @property {String} title
     * @android
     * @ios
     * @since 0.1
     */
    this.title = "";

    /**
     * Gets/sets message of AlertView.
     *
     * @property {String} message
     * @android
     * @ios
     * @since 0.1
     */
    this.message = "";
    
    this.android = {};
    /**
     * Gets/sets whether the alert view is cancelable or not when touched outside.
     *
     * @property {Boolean} cancellable
     * @android
     * @since 0.1
     */
    this.android.cancellable = true;

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
    this.isShowing = false; // read only

    /**
     * Shows AlertView on the screen with specified properties, isShowing property
     * set to true after this operation.
     *
     * @method show
     * @android
     * @ios
     * @since 0.1
     */
    this.show = function() {};

    /**
     * Dismisses the AlertView, isShowing property set to false after this
     * operation.
     *
     * @method dismiss
     * @android
     * @ios
     * @since 0.1
     */
    this.dismiss = function() {};

    /**
     * Allows you to add button to AlertView. You can add maximum 3 buttons
     * on Android platform, on iOS there is no limitation.
     *
     *     @example
     *     myAlertView.addButton({
     *         index: AlertView.ButtonType.POSITIVE,
     *         text: "Okay",
     *         onClick: function() {
     *             console.log("Okay clicked.");
     *         }
     *     });
     *
     * @param {Object} params Object describing button properties
     * @param {UI.AlertView.ButtonType} params.index Button type, it is set to
     *                                      UI.AlertView.ButtonType.NEUTRAL as default
     * @param {String} params.text Button text
     * @param {Function} [params.onClick] Callback for button click action
     * @method addButton
     * @android
     * @ios
     * @since 0.1
     */
    this.addButton = function(params) {};

    // events
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
    this.onDismiss = function(alertView) {};
}

Object.defineProperty(AlertView, 'ButtonType', {
    value: ButtonType,
    writable: false,
    enumerable: true
});

module.exports = AlertView;
