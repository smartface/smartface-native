function View(params) {
    var self = this;
    
    Object.defineProperty(self, 'alpha', {
        get: function() {
            return self.nativeObject.alpha;
        },
        set: function(value) {
            self.nativeObject.alpha = value;
        }
    });
    
    Object.defineProperty(self, 'backgroundColor', {
        get: function() {
            return self.nativeObject.backgroundColor;
        },
        set: function(value) {
            self.nativeObject.backgroundColor = value;
        }
    });

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
     * Gets/sets position Y value of view. Setting number (as pixel) and string 
     * (as percentage) is allowed.
     * 
     * @property {Number} top Position Y value of view
     */
    this.top = "0%";

    Object.defineProperty(self, 'visible', {
        get: function() {
            return self.nativeObject.visible;
        },
        set: function(value) {
            self.nativeObject.visible = value;
        }
    });

    Object.defineProperty(self, 'touchEnabled', {
        get: function() {
            return self.nativeObject.touchEnabled;
        },
        set: function(value) {
            self.nativeObject.touchEnabled = value;
        }
    });

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
     * @param {Object} position Object describing position values
     * @param {Number} [position.width] Width value
     * @param {Number} [position.height] Height value
     * @param {Number} [position.left] Position X value
     * @param {Number} [position.top] Position Y value
     * @method setPosition
     */
    this.setPosition = function(position){}

    Object.defineProperty(self, 'onTouch', {
        get: function() {
            return self.nativeObject.onTouch;
        },
        set: function(value) {
            self.nativeObject.onTouch = value;
        }
    });

    Object.defineProperty(self, 'onTouchEnded', {
        get: function() {
            return self.nativeObject.onTouchEnded;
        },
        set: function(value) {
            self.nativeObject.onTouchEnded = value;
        }
    });
}

module.exports = View;