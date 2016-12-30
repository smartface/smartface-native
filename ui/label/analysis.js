const View = require('../view');
const extend = require('js-base/core/extend');
/**
 * @class Label
 * @since 0.1
 * @extends View
 * Label is a UI object to display a text on the screen. Label can contain only a single type font.
 *
 *     @example
 *     const Label = require('sf-core/ui/label');
 *     var myLabel = new Label({
 *         text: "This is my label",
 *         visible: true
 *     });
 *     myLabel.backgroundColor = Color.create("#00FFFFFF");
 */
const Label = extend(View)(
    function (_super, params) {
        _super(this);

        /**
         * Gets/sets HTML text value. This property helps user showing HTML
         * tagged texts in Label view.
         * 
         *     @example
         *     // In this example 'This link' text inside Label will shown blue and
         *     // underlined
         *     var label = new Label();
         *     label.htmlText = "<a href='http://smartface.io'>This link</a> will redirect you to Smartface website.";
         * 
         * @property {String} htmlText HTML text to display in object
         */
        this.htmlText = "";

        /**
         * Gets/sets font of label view. When set to null label uses system font.
         * It is set to null by default.
         * 
         * @property {Font} font Font of label view.
         * 
         *     @example 
         *     const Label = require('sf-core/ui/label');
         *     var myLabel = new Label({
         *         text: "This is my label",
         *         visible: true
         *     });
         *     const Font = require('sf-core/ui/font');
         *     myLabel.font = Font.create("Arial", 16, Font.BOLD);     
         */
        this.font = null;

        /**
         * Gets/sets allowing multiple line for label view. If set to true
         * and text is too long to show in single line label shows text as 
         * multiline. 
         * 
         * @property {Boolean} multipleLine Show multiple line in label 
         */
        this.multipleLine = true;

        /**
         * Gets/sets text inside label view.
         * 
         * @property {String} text Text inside label
         */
        this.text = "Text";

        /**
         * Gets/sets text alignment of label view. UI.TextAlignment constants
         * can be used.
         *  
         * @property {Number} textAlignment Text alignment
         * 
         *     @example
         *     var label = new Label();
         *     label.textAlignment = TextAlignment.CENTER;   
         */
        textAlignment = TextAlignment.MIDLEFT;

        /**
         * Gets/sets text color of view.
         * 
         * @property {Color} textColor Text Color
         */
        this.textColor = "#000000";

        /**
         * Sets/gets showing scroll bar when text doesn't fit to label view.
         * 
         * @property {Boolean} showScrollBar
         */
        this.showScrollBar = true;
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = Label;