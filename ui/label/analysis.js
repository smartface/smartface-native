/**
 * @class Label
 *
 *
 * Label is a UI object to display a text on the screen. Label can contain only a single type font.
 *
 *
 *
 * @example
 * const Label = require('sf-core/ui/label');
 * var myLabel = new Label({
 *     text: "This is my label",
 *     visible: true
 * });
 * myLabel.backgroundColor = "#00FFFFFF";
 *
 *
 */
function Label (options) {
    /** 
     * Defines opacity of Label view. The value of this property is float number
     * between 0.0 and 1.0. 0 represents view is completely transparent and 1 
     * represents view is completely opaque.
     *
     * @example
     * var label = new Label();
     * label.alpha = 0.5;
     *
     * @member {number} alpha Alpha value of Label object
     */
    this.alpha = 1.0;

    /**
     * Gets/sets background color of label view. It allows setting background 
     * color with string or UI.Color properties.
     * 
     * @example
     * var label = new Label();
     * label.backgroundColor = "#00FFFFFF";
     * 
     * @member {Color} backgroundColor Background color
     */ 
    this.backgroundColor = "#00FFFFFF";
    
    /**
     * Gets/sets height of label view. Setting number (as pixel) and string 
     * (as percentage) is allowed.
     * 
     * @example
     * var label = new Label({
     *   height: "10%"
     * });
     * 
     * @property {number} height Height of view
     */
    this.height = "0%";

    /**
     * Gets/sets HTML text value. This property helps user showing HTML
     * tagged texts in Label view.
     * 
     * @example
     * // In this example 'This link' text inside Label will shown blue and
     * // underlined
     * var label = new Label();
     * label.htmlText = "<a href='http://smartface.io'>This link</a> will redirect you to Smartface website.";
     * 
     * @member {string} htmlText HTML text to display in object
     */
    this.htmlText = "";
    
    /**
     * Gets/sets id of label view. Should be unique number for all objects
     * inside project.
     * 
     * @member {number} id View identifier
     */
    this.id = 5421;

    /**
     * Gets/sets font of label view. When set to null label uses system font.
     * It is set to null by default.
     * 
     * @member {Font} font Font of label view.
     */
    this.font = null;

    /**
     * Gets/sets position X value of label view. Setting number (as pixel) and string 
     * (as percentage) is allowed.
     * 
     * @example
     * var label = new Label({
     *   left: "10%"
     * });
     * 
     * @property {number} left Position X value of view
     */
    this.left = "0%";

    /**
     * Gets/sets allowing multiple line for label view. If set to true
     * and text is too long to show in single line label shows text as 
     * multiline. 
     * 
     * @member {boolean} multipleLine Show multiple line in label 
     */
    this.multipleLine = true;

    /**
     * Gets/sets style of view. 
     * 
     * @member {Style} style Style of view
     */
    this.style = {};

    /**
     * Gets/sets text inside label view.
     * 
     * @member {string} text Text inside label
     */
    this.text = "Text";

    /**
     * Gets/sets text alignment of label view. UI.TextAlignment constants
     * can be used.
     * 
     * @example
     * var label = new Label();
     * label.textAlignment = UI.TextAlignment.CENTER;
     * 
     * @member {number} textAlignment Text alignment
     */
    this.textAlignment = SF.TextAlignment.CENTER;

    /**
     * Gets/sets text color of view.
     * 
     * @member {Color} textColor Text Color
     */
    this.textColor = "#00FFFFFF";

    /**
     * Gets/sets position Y value of label view. Setting number (as pixel) and string 
     * (as percentage) is allowed.
     * 
     * @example
     * var label = new Label({
     *   top: "10%"
     * });
     * 
     * @property {number} top Position Y value of view
     */
    this.top = "0%";

    /**
     * Enables/disables touches to label view. When set to false events
     * related to touches won't fire. It is set to true as default.
     * 
     * @member {boolean} touchEnabled Touch enable
     */
    this.touchEnabled = true;

    /**
     * Gets/sets visibility of view. It is set to true as default.
     * 
     * @member {boolean} visible View visibility
     */
    this.visible = true;

    /**
     * Gets/sets width of label view. Setting number (as pixel) and string 
     * (as percentage) is allowed.
     * 
     * @example
     * var label = new Label({
     *   width: "10%"
     * });
     * 
     * @property {number} width Width of view
     */
    this.width = "0%";

    /**
     * Gets/sets touch event for label view. This event fires when touch started.
     * 
     * @event Label#onTouch - Touch event
     */
    this.onTouch = function(){ }

    /**
     * Gets/sets touch ended event for label view. This event fires when touch
     * finished.
     * 
     * @event {function} onTouchEnded Touch ended event
     */
    this.onTouchEnded = function(){ }
    
    this.setPosition = function(positionObject){}
    this.getPosition = function(){return  {width: 3, height: 5, top: 7, left: 9}; }
    
    // Assign properties given in constructor
    if (props) {
        for (var prop in props) {
            this[prop] = props[prop];
        }
    }
}

module.exports = Label;