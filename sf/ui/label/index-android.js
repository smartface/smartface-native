/**
 * @class Label
 *
 *
 * Label is a UI object to display a text on the screen. Label can contain only a single type font.
 *
 *
 *
 *     @example
 *     var Label = require('sf/ui/label');
 *     var myLabel = Label({
 *         text: "This is my label",
 *         visible: true
 *     });
 *     myLabel.backgroundColor = "#00FFFFFF";
 *
 *
 */
class Label {
    /**
     * Creates a Label instance with given options.
     * 
     * @constructor 
     * @param {Object} options
     *<strong>Style options</strong>
     */
    constructor(options) {
        /** 
         * Defines opacity of Label view. The value of this property is float number
         * between 0.0 and 1.0. 0 represents view is completely transparent and 1 
         * represents view is completely opaque.
         *
         * @example
         * var label = new Label();
         * label.alpha = 0.5;
         *
         * @property {number} alpha Alpha value of Label object
         */
        this.alpha = 1.0;
        
        Object.defineProperty(this, 'alpha', {
            get: function() {
                return 
            }
        })
        
        /**
         * Gets or sets HTML text value. This property helps user showing HTML
         * tagged texts in Label view.
         * 
         * @example
         * // In this example 'This link' text inside Label will shown blue and
         * // underlined
         * var label = new Label();
         * label.htmlText = "<a href='http://smartface.io'>This link</a> will redirect you to Smartface website.";
         * 
         * @property {string} htmlText HTML text to display in object
         */
        this.htmlText = "";
        
        /**
         * Gets or sets background color of label view. It allows setting background 
         * color with string or SF.UI.Color properties.
         * 
         * @example
         * var label = new Label();
         * label.backgroundColor = "#00FFFFFF";
         * 
         * @property {Color} backgroundColor Background color
         */ 
        this.backgroundColor = "#00FFFFFF";
        
        this.textColor = SF.Color.BLACK;
        
        this.multipleLine = true;
        this.id = 5421;
        this.text = "Text";
        this.textAlignment = SF.TextAlignment.CENTER;
        this.touchEnabled = true;
        this.visible = true;
        
        this.setPosition = function(positionObject){} // positionObject : {width: 3, height: 5, top: 7, left: 9}
        this.getPosition = function(){return  {width: 3, height: 5, top: 7, left: 9}; }
        this.onTouch = function(){ }
        this.onTouchEnded = function(){ }
        
        // Assign properties given in constructor
        if (props) {
            for (var prop in props) {
                this[prop] = props[prop];
            }
        }
    }

    get alpha() {
        return androidView.getAlpha();
    }

    set alpha(value) {
        androidView.setAlpha(value);
    }
}

module.exports = Label;