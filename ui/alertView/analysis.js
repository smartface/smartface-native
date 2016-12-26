var AlertButton = {
    POSITIVE: 0,
    NEUTRAL: 1,
    NEGATIVE: 2,
};

/**
 * @class AlertView
 *
 * Alert view class represents an alert box with a specified 
 * properties(message, title, onClick attributes etc.).
 *
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
     *     const AlertView = require('sf-core/ui/alertView');
     *     var myAlertView = new AlertView();
     *     var params = {
     *         index: AlertButton.POSITIVE, 
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

module.exports = AlertView;
module.exports = AlertButton;