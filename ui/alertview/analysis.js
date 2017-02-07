/** 
 * @enum {Number} UI.AlertView.ButtonType 
 * @since 0.1
 * 
 * ButtonType is used to indicate the behaviors of buttons in a UI.AlertView visually.
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
 * @static
 * @readonly
 * @since 0.1
 */
ButtonType.POSITIVE = 0;

/**
 * @property {Number} NEUTRAL
 * @static
 * @readonly
 * @since 0.1
 */
ButtonType.NEUTRAL = 1;

/**
 * @property {Number} NEGATIVE
 * @static
 * @readonly
 * @since 0.1
 */
ButtonType.NEGATIVE = 2;

/**
 * @class UI.AlertView
 * @since 0.1
 *
 * AlertView is an alert box with buttons having custom behaviors.
 * 
 *     @example
 *     const AlertView = require('nf-core/ui/alertview').AlertView;
 *     const AlertButtonType = require('nf-core/ui/alertview').AlertButtonType;
 *    
 *     var myAlertView = new AlertView({
 *         title: "Alert Title",
 *         message: "Alert Message"
 *     });
 *     myAlertView.addButton({
 *         index: AlertButtonType.NEGATIVE, 
 *         text: "Cancel"
 *     });
 *     myAlertView.addButton({
 *         index: AlertButtonType.POSITIVE, 
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
     * Gets/sets title inside alert view.
     * 
     * @property {String} title 
     * @since 0.1
     */
    this.title = "";
    
    /**
     * Gets/sets message inside alert view.
     * 
     * @property {String} message 
     * @since 0.1
     */
    this.message = "";
     
    /**
     * Read-Only property indicating if the alert view is visible or not.
     * 
     * @property {boolean} isShowing 
     * @since 0.1
     * @readonly
     */
    this.isShowing = false; // read only

    /**
     * Makes the alert view visible.
     * 
     * @method show
     * @since 0.1
     */
    this.show = function() {};    
    
    /**
     * Dismisses the alert view.
     * 
     * @method dismiss
     * @since 0.1
     */
    this.dismiss = function() {};
    
    /**
     * Allows you to set all alert view button values within one function call.
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
     * @param {Object} params Object describing alert view properties
     * @param {UI.AlertView.ButtonType} [params.index] Alert view button type
     * @param {String} [params.text] Alert view text 
     * @param {Function} [params.onClick] Perform action on click
     * @method addButton
     * @since 0.1
     */
    this.addButton = function(params) {};

    // events  
    /**
     * Gets/sets dismiss callback function. 
     * 
     *     @example
     *     myAlertView.onDismiss = function() {
     *         console.log("dismissed.");
     *     };
     * 
     * @event onDismiss
     * @since 0.1
     */
    this.onDismiss = function() {};
}

Object.defineProperty(AlertView, 'ButtonType', {
    value: ButtonType,
    writable: false,
    enumerable: true
});

module.exports = AlertView;