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
     * @property {Number} alpha Alpha value of view
     */
    this.alpha = 1.0;
    
    /**
     * Gets/sets background color of view. It allows setting background 
     * color with string or UI.Color properties.
     * 
     * @property {Color} backgroundColor Background color
     */ 
    this.backgroundColor = "#FFFFFF";

    /**
     * Gets/sets height of view. Setting number (as pixel) and string 
     * (as percentage) is allowed.
     * 
     * @property {Number} height Height of view
     */
    this.height = "0%";
        
    /**
     * Gets/sets id of view. Should be unique number for all objects
     * inside project.
     * 
     * @property {Number} id View identifier
     */
    this.id = 5421;

    /**
     * Gets/sets position X value of view. Setting number (as pixel) and string 
     * (as percentage) is allowed.
     * 
     * @property {Number} left Position X value of view
     */
    this.left = "0%";

    /**
     * Gets/sets style of view. 
     * 
     * @property {Style} style Style of view
     */
    this.style = {};

    /**
     * Gets/sets position Y value of view. Setting number (as pixel) and string 
     * (as percentage) is allowed.
     * 
     * @property {Number} top Position Y value of view
     */
    this.top = "0%";

    /**
     * Gets/sets visibility of view. It is set to true as default.
     * 
     * @property {Boolean} visible View visibility
     */
    this.visible = true;

    /**
     * Enables/disables touches to view. When set to false events
     * related to touches won't fire. It is set to true as default.
     * 
     * @property {Boolean} touchEnabled Touch enable
     */
    this.touchEnabled = true;

    /**
     * Gets/sets width of view. Setting number (as pixel) and string 
     * (as percentage) is allowed.
     * 
     * @property {Number} width Width of view
     */
    this.width = "0%";

    /**
     * This method returns all position values in one object.
     * 
     * @return {Object} Object with properties:
     * @return {Number} return.width Width value
     * @return {Number} return.height Height value
     * @return {Number} return.left Position X value
     * @return {Number} return.top Position Y value
     */
    this.getPosition = function(){return  {width: 3, height: 5, top: 7, left: 9}; }

    /**
     * This method allows setting all position values within one function call.
     * Using this method will be faster than setting all position values (width,
     * height etc.) separately.
     * 
     *     @example
     *     const View = require('sf-core/ui/view');
     *     var myView = new View();
     *     var position = {
     *         width: 30%, 
     *         height: 50%, 
     *         top: 70%,
     *         left: 90%
     *     }
     *     myView.setPosition(position);
     * 
     * @param {Object} position Object describing position values
     * @param {Number} [position.width] Width value
     * @param {Number} [position.height] Height value
     * @param {Number} [position.left] Position X value
     * @param {Number} [position.top] Position Y value
     * @method setPosition
     */
    this.setPosition = function(position){}

    /**
     * Gets/sets touch event for view. This event fires when touch started.
     * 
     * @event onTouch
     */
    this.onTouch = function onTouch(){ }

    /**
     * Gets/sets touch ended event for view. This event fires when touch
     * finished.
     * 
     * @event onTouchEnded
     */
    this.onTouchEnded = function onTouchEnded(){ }
}

module.exports = View;