/**
 * @class Label
 *
 *
 * Label is a UI object to display a text on the screen. Label can contain only a single type font.
 *
 * @example
 * const Label = require('sf-core/ui/label');
 * var myLabel = new Label({
 *     text: "This is my label",
 *     visible: true
 * });
 * myLabel.backgroundColor = "#00FFFFFF";
 */
function Label (options) {
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
     * Gets/sets font of label view. When set to null label uses system font.
     * It is set to null by default.
     * 
     * @member {Font} font Font of label view.
     */
    this.font = null;

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