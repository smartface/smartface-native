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
 *     const Color = require('sf-core/ui/color');
 *     const Button = require('sf-core/ui/button');
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
function Button (params) {}

/**
 * Gets/sets text of button view.
 *
 * @property {String} [text = ""]
 * @android
 * @ios
 * @since 0.1
 */
Button.prototype.text = "";

/**
 * Gets/sets font of a Button. When set to null button uses system font.
 * It is set to null by default.
 *
 *     @example
 *     const Button = require('sf-core/ui/button');
 *     const Font = require('sf-core/ui/font');
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
Button.prototype.font = null;

/**
 * Gets/sets text color of a Button.
 *
 * @property {UI.Color} [textColor = UI.Color.BLACK]
 * @android
 * @ios
 * @since 0.1
 */
Button.prototype.textColor = UI.Color.BLACK;

/**
 * Gets/sets text alignment of a Button. TextAlignment constants
 * can be used.
 *
 *     @example
 *     const Button = require('sf-core/ui/button');
 *     const TextAlignment = require('sf-core/ui/textalignment');
 *     var myButton = new Button();
 *     myButton.textAlignment = TextAlignment.MIDCENTER;
 * 
 * @since 0.1
 * @property {Number} textAlignment
 * @android
 * @ios
 */
Button.prototype.textAlignment = UI.TextAlignment.MIDCENTER;

/**
 * Enables/disables the Button.
 *
 *     @example
 *     const Button = require('sf-core/ui/button');
 *     var myButton = new Button();
 *     myButton.enabled = false;
 *
 * @since 0.1
 * @property {Boolean} [enabled = true]
 * @android
 * @ios
 */
Button.prototype.enabled = true;

/**
 * Gets/sets background image of a Button.
 *
 *     @example
 *     const Image = require('sf-core/ui/image');
 *     const Button = require('sf-core/ui/button');
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
Button.prototype.backgroundImage = {};

/**
 * Gets/sets background color of a Button. You can assign a color or 
 * an object that contains colors depending on the state of the button.
 *
 *     @example
 *     const Button = require('sf-core/ui/button');
 *     const Color = require('sf-core/ui/color');
 *     var myButton = new Button();
 * 
 *     // background color of the button
 *     myButton.backgroundColor = Color.GREEN;
 * 
 *     // colors depending on the state of the button
 *     myButton.backgroundColor = {
 *         normal: Color.RED,
 *         disabled: Color.GRAY,
 *         pressed: Color.BLUE,
 *     };
 * 
 * @since 0.1
 * @property {Object} [backgroundColor = {}]
 * @property {UI.Color} backgroundColor.normal
 * @property {UI.Color} backgroundColor.disabled
 * @property {UI.Color} backgroundColor.selected
 * @property {UI.Color} backgroundColor.pressed
 * @property {UI.Color} backgroundColor.focused
 * @android
 * @ios
 */
Button.prototype.backgroundColor = {};

/**
 * Gets/sets press event callback for a Button.
 * If you set button's onTouch() or onTouchEnded() events, onPress() event does not work on Android.
 *
 * @since 0.1
 * @event onPress
 * @android
 * @ios
 */
Button.prototype.onPress = function onPress(){}

/**
 * Gets/sets long press event callback for a Button. This property only
 * works for Android devices.
 *
 * @since 0.1
 * @event onLongPress
 * @android
 */
Button.prototype.onLongPress = function onLongPress(){}

module.exports = Button;
