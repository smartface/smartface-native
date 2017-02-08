const View = require('../view');
const extend = require('js-base/core/extend');

/**
 * @class UI.Button
 * @extends UI.View
 * @since 0.1
 *
 * Button class represents a clickable object to user interface.  
 * A button instance consists of text or an icon(or both of them).
 * 
 *     @example
 *     const Color = require('nf-core/ui/color');
 *     const Button = require('nf-core/ui/button');
 *     var myButton = new Button({
 *         width: 100,
 *         height: 80,
 *         backgroundColor: {
 *             normal: Color.BLUE,
 *             pressed: Color.CYAN
 *         },
 *         text: "Click Me!",
 *         onPress: function() {
 *             console.log("Button pressed");
 *         }
 *     });
 * 
 */
const Button = extend(View)(
    function (_super, params) {
        _super(this);
        /**
         * Gets/sets text of button view.
         * 
         * @property {String} [text = ""]  
         * @since 0.1
         */
        this.text = "";

         /**
         * Gets/sets font of button view. When set to null button uses system font.
         * It is set to null by default.
         * 
         *     @example 
         *     const Button = require('nf-core/ui/button');
         *     var myButton = new Button({
         *         text: "Click me!"
         *     });
         *     const Font = require('nf-core/ui/font');
         *     myButton.font = Font.create("Arial", 16, Font.BOLD);   
         * 
         * @property {UI.Font} [font = null]   
         * @since 0.1
         */
        this.font = null;
        
        /**
         * Gets/sets text color of button. Assign a color or a mapping from states to colors.
         * 
         * @property {UI.Color} [textColor = UI.Color.BLACK] 
         * @since 0.1
         */
        this.textColor = UI.Color.BLACK;

        /**
         * Gets/sets text alignment of button. TextAlignment constants
         * can be used.
         * 
         *     @example
         *     const Button = require('nf-core/ui/button');
         *     const TextAlignment = require('nf-core/ui/textalignment');
         *     var myButton = new Button();
         *     myButton.textAlignment = TextAlignment.MIDCENTER;  
         * @since 0.1        
         * @property {Number} textAlignment  
         */
        textAlignment = TextAlignment.MIDCENTER;
        
        /**
         * Gets/sets background image. Assign an image or a mapping from states to images.
         * 
         *     @example
         *     const Image = require('nf-core/ui/image');
         *     const Button = require('nf-core/ui/button');
         *     var myButton = new Button();
         *     myButton.backgroundImage = {
         *         normal: Image.createFromFile("assets://normal.png"),
         *         disabled: Image.createFromFile("assets://disabled.png"),
         *         pressed: Image.createFromFile("assets://pressed.png"),
         *     };   
         *     myButton.text = "First button text";
         * 
         *     var myButton2 = new Button();
         *     myButton2.backgroundImage = Image.createFromFile("assets://normal.png");
         *     myButton2.text = "Second button text";
         *
         * @since 0.1
         * @property {Object} backgroundImage
         */
        this.backgroundImage = {          
            normal: "", 
            disabled: "", 
            selected: "", 
            pressed: "", 
            focused: ""
        };

        /**
         * Gets/sets press event callback for button.
         * 
         * @since 0.1
         * @event onPress
         */
        this.onPress = function onPress(){ }

        /**
         * Gets/sets long press event callback for button.
         * 
         * @since 0.1
         * @event onLongPress
         */
        this.onLongPress = function onLongPress(){ }
    }
);

module.exports = Button;