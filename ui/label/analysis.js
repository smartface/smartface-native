const View = require('../view');
const extend = require('js-base/core/extend');
/**
 * @class UI.Label
 * @since 0.1
 * @extends UI.View
 * Label is a UI object to display a text on the screen. Label can contain only a single type font.
 *
 *     @example
 *     const Label = require('sf-core/ui/label');
 *     var myLabel = new Label({
 *         text: "This is my label",
 *         visible: true
 *     });
 *     myLabel.setPosition({
 *         width: "80%", 
 *         height: "20%", 
 *         top: "10%",
 *         left: "20%"
 *     });
 *     const Color = require('sf-core/ui/color');
 *     myLabel.backgroundColor = Color.GRAY;
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
         *     const Label = require('sf-core/ui/label');
         *     var myLabel = new Label();
         *     myLabel.htmlText = "<a href='http://smartface.io'>This link</a> will redirect you to Smartface website.";
         * 
         * @property {String} htmlText 
         * @since 0.1
         */
        this.htmlText = "";

        /**
         * Gets/sets font of label view. When set to null label uses system font.
         * It is set to null by default.
         * 
         *     @example 
         *     const Label = require('sf-core/ui/label');
         *     var myLabel = new Label({
         *         text: "This is my label",
         *         visible: true
         *     });
         *     const Font = require('sf-core/ui/font');
         *     myLabel.font = Font.create("Arial", 16, Font.BOLD);   
         * 
         * @property {Font} font   
         * @since 0.1
         */
        this.font = null;

        /**
         * Gets/sets allowing multiple line for label view. If set to true
         * and text is too long to show in single line label shows text as 
         * multiline. 
         * 
         * @property {Boolean} multiLine
         * @since 0.1
         */
        this.multiLine = true;

        /**
         * Gets/sets text inside label view.
         * 
         * @property {String} text 
         * @since 0.1
         */
        this.text = "Text";

        /**
         * Gets/sets text alignment of label view. UI.TextAlignment constants
         * can be used.  
         * 
         *     @example
         *     const Label = require('sf-core/ui/label');
         *     var myLabel = new Label();
         *     const TextAlignment = require('sf-core/ui/textalignment');
         *     myLabel.textAlignment = TextAlignment.MIDCENTER;  
         * 
         * @property {Number} textAlignment  
         * @since 0.1
         */
        textAlignment = TextAlignment.MIDLEFT;

        /**
         * Gets/sets text color of view.
         * 
         * @property {Color} textColor 
         * @since 0.1
         */
        this.textColor = "#000000";

        /**
         * Sets/gets showing scroll bar when text doesn't fit to label view.
         * 
         * @property {Boolean} showScrollBar
         * @since 0.1
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