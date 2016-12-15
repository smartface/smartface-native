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
    Object.defineProperty(this, 'alpha', {
        get: function() {
            return this.inner.getAlpha();
        },
        set: function(alpha) {
            this.inner.setAlpha(alpha);
        }
     });
    
    /**
     * Gets/sets background color of view. It allows setting background 
     * color with string or UI.Color properties.
     * 
     * @member {Color} backgroundColor Background color
     */ 
    Object.defineProperty(this, 'backgroundColor', {
        get: function() {
            return this.inner.getBackgroundColor();
        },
        set: function(backgroundColor) {
            this.inner.setBackgroundColor(android.graphics.Color.parseColor(backgroundColor));
        }
     });

    /**
     * Gets/sets height of view. Setting number (as pixel) and string 
     * (as percentage) is allowed.
     * 
     * @property {number} height Height of view
     */
    this.height = "0%";
    Object.defineProperty(this, 'height', {
        get: function() {
            return (this.inner.getHeight() != 0 ? this.inner.getHeight() : this.height);
        },
        set: function(height) {
            this.height = height;
            if(this.inner.getLayoutParams != null){
                // Needs global layout param setter. Layout params can be number or %
                // If we can work just pixels except LinearLayout this will enought for setting.
                // this.inner.getLayoutParams().height
            }
        }
     });
        
    /**
     * Gets/sets id of view. Should be unique number for all objects
     * inside project.
     * 
     * @member {number} id View identifier
     */
    this.id = android.view.View.generateViewId()
    Object.defineProperty(this, 'id', {
        get: function() {
            return this.inner.getId();
        },
        set: function(id) {
            this.inner.setId(id);
        }
     });
     

    /**
     * Gets/sets position X value of view. Setting number (as pixel) and string 
     * (as percentage) is allowed.
     * 
     * @property {number} left Position X value of view
     */
    this.left = "0%";
    Object.defineProperty(this, 'left', {
        get: function() {
            return (this.inner.getLeft() != 0 ? this.inner.getLeft() : this.left);
        },
        set: function(left) {
            this.left = left;
            if(this.inner.getLayoutParams != null){
                // Needs global layout param setter. Layout params can be number or %
            }
        }
     });

    /**
     * Gets/sets position Y value of view. Setting number (as pixel) and string 
     * (as percentage) is allowed.
     * 
     * @property {number} top Position Y value of view
     */
    this.top = "0%";
    Object.defineProperty(this, 'top', {
        get: function() {
            return (this.inner.getTop() != 0 ? this.inner.getTop() : this.top);
        },
        set: function(top) {
            this.top = top;
            if(this.inner.getLayoutParams != null){
                // Needs global layout param setter. Layout params can be number or %
            }
        }
     });

    /**
     * Gets/sets visibility of view. It is set to true as default.
     * 
     * @member {boolean} visible View visibility
     */
    this.visible = true;
    Object.defineProperty(this, 'visible', {
        get: function() {
            return this.inner.getVisibility() == android.view.View.VISIBLE;
        },
        set: function(visible) {
            if(visible)
                this.inner.setVisibility(android.view.View.VISIBLE);
            else
                this.inner.setVisibility(android.view.View.INVISIBLE);
        }
    });

    /**
     * Enables/disables touches to view. When set to false events
     * related to touches won't fire. It is set to true as default.
     * 
     * @member {boolean} touchEnabled Touch enable
     */
    Object.defineProperty(this, 'touchEnabled', {
        get: function() {
            return this.inner.getEnabled();
        },
        set: function(touchEnabled) {
            this.inner.setEnabled(touchEnabled);            
        }
     });


    /**
     * Gets/sets width of view. Setting number (as pixel) and string 
     * (as percentage) is allowed.
     * 
     * @property {number} width Width of view
     */
    this.width = "0%";
    Object.defineProperty(this, 'width', {
        get: function() {
            return (this.inner.getLayoutParams().width != 0 ? this.inner.getHeight() : this.width);
        },
        set: function(width) {
            this.width = width;
            if(this.inner.width != null){
                // Needs global layout param setter. Layout params can be number or %
                // If we can work just pixels except LinearLayout this will enought for setting.
                // this.inner.getLayoutParams().width
            }
            else{
                this.width = width;
            }
        }
     });

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
     * @param {Object} position Object describing position values
     * @param {Number} [position.width] Width value
     * @param {Number} [position.height] Height value
     * @param {Number} [position.left] Position X value
     * @param {Number} [position.top] Position Y value
     */
    this.setPosition = function(position){}

    /**
     * Gets/sets touch event for view. This event fires when touch started.
     * 
     * @event {function} onTouch Touch event
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