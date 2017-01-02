/** @enum {Number} UI.AlertView.AlertButtonType 
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
 */
AlertButtonType.POSITIVE = 0;

/**
 * @property {Number} NEUTRAL
 * Don't accept the action but don't cancel. 
 * It can be used with the action of "Ask me later".
 */
AlertButtonType.NEUTRAL = 1;

/**
 * @property {Number} NEGATIVE
 * Cancel the action.
 */
AlertButtonType.NEGATIVE = 2;

/**
 * @class UI.AlertView
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
     * @property {String} title Title inside alert view
     */
    this.title = "";
    
    /**
     * Gets/sets message inside alert view.
     * 
     * @property {String} message Message inside alert view
     */
    this.message = "";
     
    /**
     * Gets the alert view is active or not. isShowing is a read only property.
     * 
     * @property {boolean} isShowing Alert view visibility
     * @readonly
     */
    this.isShowing = false; // read only

    /**
     * This method displays an alert box with specified properties.
     * 
     * @method show
     */
    this.show = function() {};    
    
    /**
     * This method dismiss the alert view.
     * 
     * @method dismiss
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
     */
    this.addButton = function(params) {};

    // events  
    /**
     * Gets/sets dismiss event for alert view. 
     * 
     * @event onDismiss
     */
    this.onDismiss = function(AlertView) {};
}

module.exports = { AlertView: AlertView, AlertButtonType: AlertButtonType };