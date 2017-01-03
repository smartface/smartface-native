/** @enum {Number} UI.AlertView.AlertButtonType 
 * @since 0.1
 * AlertButtonType is an enum. It defines button types when they 
 * display on an alert window. There are three types of action button.
 * 
 *     @example
 *     const AlertButtonType = require('sf-core/ui/alertView').AlertButtonType;
 *     var myAlertButtonType = AlertButtonType.NEUTRAL;
 */
var AlertButtonType = { };

/**
 * @property {Number} POSITIVE
 * Accept the action and continue.
 * @static
 * @since 0.1
 */
AlertButtonType.POSITIVE = 0;

/**
 * @property {Number} NEUTRAL
 * @static
 * @since 0.1
 * Don't accept the action but don't cancel. 
 * It can be used with the action of "Ask me later".
 */
AlertButtonType.NEUTRAL = 1;

/**
 * @property {Number} NEGATIVE
 * @static
 * @since 0.1
 * Cancel the action.
 */
AlertButtonType.NEGATIVE = 2;

/**
 * @class UI.AlertView
 * @since 0.1
 *
 * Alert view class represents an alert box with a specified 
 * properties(message, title, onClick attributes etc.).
 * 
 *     @example
 *     const AlertView = require('sf-core/ui/alertView').AlertView;
 *     const AlertButtonType = require('sf-core/ui/alertView').AlertButtonType;
 *     var myAlertView = new AlertView();
 *     var params = {
 *         index: AlertButtonType.POSITIVE, 
 *         text: "Alert text", 
 *         onClick: function(){}
 *     };
 *     myAlertView.addButton(params);
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
     * Gets the alert view is active or not. isShowing is a read only property.
     * 
     * @property {boolean} isShowing 
     * @since 0.1
     * @readonly
     */
    this.isShowing = false; // read only

    /**
     * This method displays an alert box with specified properties.
     * 
     * @method show
     * @since 0.1
     */
    this.show = function() {};    
    
    /**
     * This method dismiss the alert view.
     * 
     * @method dismiss
     * @since 0.1
     */
    this.dismiss = function() {};
    
    /**
     * This method allows setting all alert view button values within one function call.
     * Using this method will be faster than setting all alert view button values (index,
     * text, onClick) separately.
     * 
     *     @example
     *     const AlertView = require('sf-core/ui/alertView').AlertView;
     *     const AlertButtonType = require('sf-core/ui/alertView').AlertButtonType;
     *     var myAlertView = new AlertView();
     *     var params = {
     *         index: AlertButtonType.POSITIVE, 
     *         text: "Alert text", 
     *         onClick: function(){}
     *     };
     *     myAlertView.addButton(params);
     * 
     * @param {Object} params Object describing alert view properties
     * @param {Number} [params.index] Index value
     * @param {String} [params.text] Alert view text 
     * @param {Function} [params.onClick] Perform action on click
     * @method addButton
     * @since 0.1
     */
    this.addButton = function(params) {};

    // events  
    /**
     * Gets/sets dismiss event for alert view. 
     * 
     * @event onDismiss
     * @since 0.1
     */
    this.onDismiss = function(AlertView) {};
}

module.exports = { AlertView: AlertView, AlertButtonType: AlertButtonType };