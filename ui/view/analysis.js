/**
 * @class View
 *
 * View class represents a rectangular area drawable to user interface. This class
 * is base of all UI classes.
 *
 */
function View(params) {
    /** 
     * Defines opacity of view. The value of this property is float number
     * between 0.0 and 1.0. 0 represents view is completely transparent and 1 
     * represents view is completely opaque.
     *
     * @member {number} alpha Alpha value of view
     */
    this.alpha = 1.0;
    
    /**
     * Gets/sets background color of view. It allows setting background 
     * color with string or UI.Color properties.
     * 
     * @member {Color} backgroundColor Background color
     */ 
    this.backgroundColor = "#FFFFFF";

    /**
     * Gets/sets height of view. Setting number (as pixel) and string 
     * (as percentage) is allowed.
     * 
     * @property {number} height Height of view
     */
    this.height = "0%";
        
    /**
     * Gets/sets id of view. Should be unique number for all objects
     * inside project.
     * 
     * @member {number} id View identifier
     */
    this.id = 5421;

    /**
     * Gets/sets position X value of view. Setting number (as pixel) and string 
     * (as percentage) is allowed.
     * 
     * @property {number} left Position X value of view
     */
    this.left = "0%";

    /**
     * Gets/sets position Y value of view. Setting number (as pixel) and string 
     * (as percentage) is allowed.
     * 
     * @property {number} top Position Y value of view
     */
    this.top = "0%";

    /**
     * Gets/sets visibility of view. It is set to true as default.
     * 
     * @member {boolean} visible View visibility
     */
    this.visible = true;

    /**
     * Enables/disables touches to view. When set to false events
     * related to touches won't fire. It is set to true as default.
     * 
     * @member {boolean} touchEnabled Touch enable
     */
    this.touchEnabled = true;

    /**
     * Gets/sets width of view. Setting number (as pixel) and string 
     * (as percentage) is allowed.
     * 
     * @property {number} width Width of view
     */
    this.width = "0%";

    /**
     * Gets/sets touch event for view. This event fires when touch started.
     * 
     * @event {function} onTouch - Touch event
     */
    this.onTouch = function(){ }

    /**
     * Gets/sets touch ended event for view. This event fires when touch
     * finished.
     * 
     * @event {function} onTouchEnded Touch ended event
     */
    this.onTouchEnded = function(){ }
}

module.exports = View;