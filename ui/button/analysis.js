const View = require('../view');
const extend = require('js-base/core/extend');

/**
 * @class UI.Button
 * @extends UI.View
 * @since 0.1
 *
 * Button represents a clickable object on the screen.
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
         * @android
         * @ios
         * @since 0.1
         */
        this.text = "";

         /**
         * Gets/sets font of a Button. When set to null button uses system font.
         * It is set to null by default.
         *
         *     @example
         *     const Button = require('nf-core/ui/button');
         *     const Font = require('nf-core/ui/font');
         *     var myButton = new Button({
         *         text: "Click me!"
         *     });
         *     myButton.font = Font.create("Arial", 16, Font.BOLD);
         *
         * @property {UI.Font} [font = null]
         * @android
         * @ios
         * @since 0.1
         */
        this.font = null;

        /**
         * Gets/sets text color of a Button.
         *
         * @property {UI.Color} [textColor = UI.Color.BLACK]
         * @android
         * @ios
         * @since 0.1
         */
        this.textColor = UI.Color.BLACK;

        /**
         * Gets/sets text alignment of a Button. TextAlignment constants
         * can be used.
         *
         *     @example
         *     const Button = require('nf-core/ui/button');
         *     const TextAlignment = require('nf-core/ui/textalignment');
         *     var myButton = new Button();
         *     myButton.textAlignment = TextAlignment.MIDCENTER;
         * 
         * @since 0.1
         * @property {Number} textAlignment
         * @android
         * @ios
         */
        this.textAlignment = UI.TextAlignment.MIDCENTER;
        
        /**
         * Enables/disables the Button.
         *
         *     @example
         *     const Button = require('nf-core/ui/button');
         *     var myButton = new Button();
         *     myButton.enabled = false;
         *
         * @since 0.1
         * @property {Boolean} [enabled = true]
         * @android
         * @ios
         */
        this.enabled = true;

        /**
         * Gets/sets background imageof a Button.
         *
         *     @example
         *     const Image = require('nf-core/ui/image');
         *     const Button = require('nf-core/ui/button');
         *     var myButton = new Button();
         *     myButton.backgroundImage = {
         *         normal: Image.createFromFile("images://normal.png"),
         *         disabled: Image.createFromFile("images://disabled.png"),
         *         pressed: Image.createFromFile("images://pressed.png"),
         *     };
         *     myButton.text = "First button text";
         *
         *     var myButton2 = new Button();
         *     myButton2.backgroundImage = Image.createFromFile("images://normal.png");
         *     myButton2.text = "Second button text";
         *
         * @since 0.1
         * @property {Object} [backgroundImage = {}]
         * @property {UI.Image} backgroundImage.normal
         * @property {UI.Image} backgroundImage.disabled
         * @property {UI.Image} backgroundImage.selected
         * @property {UI.Image} backgroundImage.pressed
         * @property {UI.Image} backgroundImage.focused
         * @android
         * @ios
         */
        this.backgroundImage = {};

        /**
         * Gets/sets press event callback for a Button.
         *
         * @since 0.1
         * @event onPress
         * @android
         * @ios
         */
        this.onPress = function onPress(){ }

        /**
         * Gets/sets long press event callback for a Button. This property only
         * works for Android devices.
         *
         * @since 0.1
         * @event onLongPress
         * @android
         */
        this.onLongPress = function onLongPress(){ }
    }
);

module.exports = Button;
