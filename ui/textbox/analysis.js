const Label = require('../label');
const extend = require('js-base/core/extend');

/** @enum {Number} UI.Textbox.KeyboardType
 * @since 0.1
 * KeyboardType is an enum. It defines keyboard appearance when user focused
 * to the TextBox.
 *
 *     @example
 *     const KeyboardType = require('sf-core/ui/textbox').KeyboardType;
 *     var myKeyboardType = KeyboardType.DEFAULT;
 */
var KeyboardType = { };

/**
 * @property {Number} DEFAULT
 * Default keyboard appearance.
 * @static
 * @since 0.1
 */
KeyboardType.DEFAULT = 0;

/**
 * @property {Number} DATE
 * @static
 * @since 0.1
 * Date specific keyboard appearance
 */
KeyboardType.DATE = 1;

/**
 * @property {Number} NEGATIVE
 * @static
 * @since 0.1
 * Numeric specific keyboard appearance
 */
KeyboardType.NUMBER = 2;

/**
 * @property {Number} DECIMAL
 * @static
 * @since 0.1
 * Decimal specific keyboard appearance
 */
KeyboardType.DECIMAL = 3;

/**
 * @property {Number} EMAILADDRESS
 * @static
 * @since 0.1
 * Email address specific keyboard appearance
 */
KeyboardType.EMAILADDRESS = 4;


/**
 * @class UI.TextBox
 * @since 0.1
 * @extends UI.Label
 * TextBox is a UI object to get input from user.
 *
 *     @example
 *     const TextBox = require('sf-core/ui/textbox').TextBox;
 *     const KeyboardType = require('sf-core/ui/textbox').KeyboardType;
 *     var myTextBox = new TextBox({
 *         hint: "Smartface TextBox",
 *         keyboardType: KeyboardType.NUMERIC
 *     });
 *     myTextBox.setPosition({
 *         width: "80%", 
 *         height: "20%", 
 *         top: "10%",
 *         left: "20%"
 *     });
 *     const Color = require('sf-core/ui/color');
 *     myTextBox.textColor = Color.GRAY;
 *
 */
const TextBox = extend(Label)(
    function (_super, params) {
        _super(this);

        /**
         * Gets/sets hint text hint that is displayed when the text of the TextBox is empty.
         * 
         *     @example
         *     const TextBox = require('sf-core/ui/textbox').TextBox;
         *     var myTextBox = new TextBox({
         *         hint: "Smartface TextBox"
         *     });
         * 
         * @property {String} hint
         * @since 0.1
         */
        this.hint = "";

        /**
         * Gets/sets the color of the hint text.
         *
         *     @example
         *     const TextBox = require('sf-core/ui/textbox').TextBox;
         *     const Color = require('sf-core/ui/color')
         *     var myTextBox = new TextBox({
         *         hint: "Smartface TextBox",
         *         hintTextColor: Color.RED
         *     });
         *
         * @property {Color} hintTextColor
         * @since 0.1
         */
        this.hintTextColor = Color.GRAY;

        /**
         * Gets/sets clear button state. If enabled, clear button will be shown
         * right at the TextBox. It is set to false by default.
         * 
         *     @example 
         *     const TextBox = require('sf-core/ui/textbox').TextBox;
         *     var myTextBox = new TextBox({
         *         hint: "Smartface TextBox",
         *         clearButtonEnabled: true
         *     });
         *
         * @property {Boolean} clearButtonEnabled
         * @since 0.1
         */
        this.clearButtonEnabled = false;

        /**
         * Gets/sets the content of the TextBox is password or not.
         *
         *     @example
         *     const TextBox = require('sf-core/ui/textbox').TextBox;
         *     var myTextBox = new TextBox({
         *         hint: "Smartface TextBox Password",
         *         isPassword: true
         *     });
         *
         * @property {Boolean} isPassword
         * @since 0.1
         */
        this.isPassword = false;

        /**
         * Gets/sets text inside label view.
         *
         *     @example
         *     const TextBox = require('sf-core/ui/textbox').TextBox;
         *     const KeyboardType = require('sf-core/ui/textbox').KeyboardType;
         *     var myTextBox = new TextBox({
         *         hint: "Smartface TextBox Password",
         *         keyboardType: KeyboardType.NUMERIC
         *     });
         *
         * @property {KeyboardType} keyboardType
         * @since 0.1
         */
        this.keyboardType = KeyboardType.DEFAULT;

        // events
        /**
         * Gets/sets text change event for textbox.
         *
         *     @example
         *     const TextBox = require('sf-core/ui/textbox').TextBox;
         *     const Label = require('sf-core/ui/label');
         *     var myLabel = new Label();
         *     var myTextBox = new TextBox({
         *         hint: "Smartface TextBox Password",
         *         onTextChanged: function(newText){
         *             myLabel.text = newText;
         *         }
         *     });
         *
         * @event onTextChanged
         * @since 0.1
         */
        this.onTextChanged = function(newText) {};
    }
);

module.exports = { TextBox: TextBox, KeyboardType: KeyboardType };