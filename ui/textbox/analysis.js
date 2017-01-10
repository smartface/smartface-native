const Label = require('../label');
const extend = require('js-base/core/extend');

/** @enum {Number} UI.Textbox.KeyboardType
 s* @static
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
 * @readonly
 * @since 0.1
 */
KeyboardType.DEFAULT = 0;

/**
 * @property {Number} DATE
 * Date specific keyboard appearance
 * @static
 * @readonly
 * @since 0.1
 */
KeyboardType.DATE = 1;

/**
 * @property {Number} NEGATIVE
 * Numeric specific keyboard appearance
 * @static
 * @readonly
 * @since 0.1
 */
KeyboardType.NUMBER = 2;

/**
 * @property {Number} DECIMAL
 * Decimal specific keyboard appearance
 * @static
 * @since 0.1
 * @readonly
 */
KeyboardType.DECIMAL = 3;

/**
 * @property {Number} EMAILADDRESS
 * Email address specific keyboard appearance
 * @static
 * @since 0.1
 * @readonly
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
         * Gets/sets the color of the hint text. This property will work only for Android.
         *
         *     @example
         *     const TextBox = require('sf-core/ui/textbox').TextBox;
         *     const Color = require('sf-core/ui/color')
         *     var myTextBox = new TextBox({
         *         hint: "Smartface TextBox",
         *         android: {
         *             hintTextColor: Color.RED
         *         }
         *     });
         *
         * @property {Color} hintTextColor
         * @since 0.1
         */
        this.android.hintTextColor = Color.LIGHTGRAY;

        /**
         * Gets/sets adjustment status of TextBox. If enabled text size will be adjusted by
         * view's width and height. It must be greater than minimumFontSize.
         * This property will work only for iOS.
         *
         *     @example
         *     const TextBox = require('sf-core/ui/textbox').TextBox;
         *     var myTextBox = new TextBox({
         *         hint: "Smartface TextBox",
         *         ios: {
         *             adjustFontSizeToFit: true
         *         }
         *     });
         *
         * @property {Boolean} adjustFontSizeToFit
         * @since 0.1
         */
        this.ios.adjustFontSizeToFit = false;

        /**
         * Gets/sets minimum font size of TextBox.
         * This property will work only for iOS.
         *
         *     @example
         *     const TextBox = require('sf-core/ui/textbox').TextBox;
         *     var myTextBox = new TextBox({
         *         hint: "Smartface TextBox",
         *         ios: {
         *             adjustFontSizeToFit: true,
         *             minimumFontSize:15
         *         }
         *     });
         *
         * @property {Number} minimumFontSize
         * @since 0.1
         */
        this.ios.minimumFontSize = 7;


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


        /**
         * This method shows keyboard manually.
         *
         * @method showKeyboard
         * @since 0.1
         */
        this.showKeyboard = function(){};

        // events
        /**
         * Gets/sets text change event for TextBox. When user insert or delete character
         * to the TextBox, this event will fire.
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
        this.onTextChanged = function() {};

        /**
         * Gets/sets on begin editing event for TextBox. When user starts to insert or delete character
         * to the TextBox this event will fire.
         *
         *     @example
         *     const TextBox = require('sf-core/ui/textbox').TextBox;
         *     const Label = require('sf-core/ui/label');
         *     var myLabel = new Label();
         *     var myTextBox = new TextBox({
         *         hint: "Smartface TextBox Password",
         *         onBeginEditing: function(){
         *             myLabel.text = myTextBox.text;
         *         }
         *     });
         *
         * @event onBeginEditing
         * @since 0.1
         */
        this.onBeginEditing = function() {};

        /**
         * Gets/sets on end editing event for TextBox. When user finishes editing,
         * the TextBox this event will fire.
         *
         *     @example
         *     const TextBox = require('sf-core/ui/textbox').TextBox;
         *     const Label = require('sf-core/ui/label');
         *     var myLabel = new Label();
         *     var myTextBox = new TextBox({
         *         hint: "Smartface TextBox Password",
         *         onBeginEditing: function(){
         *             myLabel.text = myTextBox.text;
         *         }
         *     });
         *
         * @event onEndEditing
         * @since 0.1
         */
        this.onEndEditing = function() {};

        /**
         * Gets/sets on focus event for TextBox. When user clicks to the TextBox and when,
         * TextBox gains focus this event will fire.
         *
         *     @example
         *     const TextBox = require('sf-core/ui/textbox').TextBox;
         *     const Label = require('sf-core/ui/label');
         *     var myLabel = new Label();
         *     var myTextBox = new TextBox({
         *         hint: "Smartface TextBox Password",
         *         onFocus: function(){
         *             myLabel.text = "TextBox focused.";
         *         }
         *     });
         *
         * @event onFocus
         * @since 0.1
         */
        this.onFocus = function() {};
    }
);

module.exports = { TextBox: TextBox, KeyboardType: KeyboardType };