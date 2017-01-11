const View = require('../view');
const extend = require('js-base/core/extend');

/**
 * @class UI.TextBox
 * @since 0.1
 * @extends UI.Label
 * TextBox is a UI object to get input from user.
 *
 *     @example
 *     const TextBox = require('sf-core/ui/textbox');
 *     const KeyboardType = require('sf-core/ui/keyboardtype');
 *     const Color = require('sf-core/ui/color');
 *     var myTextBox = new TextBox({
 *         width: "80%",
 *         height: "20%",
 *         top: "10%",
 *         left: "20%",
 *         textColor: Color.GRAY,
 *         hint: "Smartface TextBox",
 *         keyboardType: KeyboardType.NUMERIC
 *     });
 *
 */
const TextBox = extend(View)(
    function (_super, params) {
        _super(this);

        /**
         * Gets/sets font of the TextBox. When set to null label uses system font.
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
        this.textAlignment = TextAlignment.MIDLEFT;

        /**
         * Gets/sets text color of view.
         *
         * @property {Color} textColor
         * @since 0.1
         */
        this.textColor = "#000000";

        /**
         * Gets/sets hint text hint that is displayed when the text of the TextBox is empty.
         * 
         *     @example
         *     const TextBox = require('sf-core/ui/textbox');
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
         *     const TextBox = require('sf-core/ui/textbox');
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
         *     const TextBox = require('sf-core/ui/textbox');
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
         *     const TextBox = require('sf-core/ui/textbox');
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
         * right at the TextBox. This property will work only for iOS.
         * 
         *     @example 
         *     const TextBox = require('sf-core/ui/textbox');
         *     var myTextBox = new TextBox({
         *         hint: "Smartface TextBox",
         *         clearButtonEnabled: true
         *     });
         *
         * @property {Boolean} clearButtonEnabled
         * @since 0.1
         */
        this.ios.clearButtonEnabled = false;

        /**
         * Gets/sets the content of the TextBox is password or not.
         *
         *     @example
         *     const TextBox = require('sf-core/ui/textbox');
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
         *     const TextBox = require('sf-core/ui/textbox');
         *     const KeyboardType = require('sf-core/ui/keyboardtype');
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

        /**
         * This method hides keyboard manually.
         *
         * @method hideKeyboard
         * @since 0.1
         */
        this.hideKeyboard = function(){};

        // events
        /**
         * Gets/sets text change event for TextBox. When user insert or delete character
         * to the TextBox, this event will fire.
         *
         *     @example
         *     const TextBox = require('sf-core/ui/textbox');
         *     const Label = require('sf-core/ui/label');
         *     var myLabel = new Label();
         *     var myTextBox = new TextBox({
         *         hint: "Smartface TextBox Password",
         *         onTextChanged: function(newText){
         *             myLabel.text = newText;
         *         }
         *     });
         *
         * @param insertedText The text that inserted into TextBox.
         * @param location Index of inserted text.
         * @event onTextChanged
         * @since 0.1
         */
        this.onTextChanged = function(insertedText, location) {};

        /**
         * Gets/sets on begin editing event for TextBox. When user starts to insert or delete character
         * to the TextBox this event will fire.
         *
         *     @example
         *     const TextBox = require('sf-core/ui/textbox');
         *     const Label = require('sf-core/ui/label');
         *     var myLabel = new Label();
         *     var myTextBox = new TextBox({
         *         hint: "Smartface TextBox Password",
         *         onBeginEditing: function(){
         *             myLabel.text = myTextBox.text;
         *         }
         *     });
         *
         * @event onEditBegins
         * @since 0.1
         */
        this.onEditBegins = function() {};

        /**
         * Gets/sets editing end event for TextBox. When user finishes editing by clicking return key
         * or clicking outside of the TextBox, this event will fire.
         *
         *     @example
         *     const TextBox = require('sf-core/ui/textbox');
         *     const Label = require('sf-core/ui/label');
         *     var myLabel = new Label();
         *     var myTextBox = new TextBox({
         *         hint: "Smartface TextBox Password",
         *         onEditEnds: function(){
         *             myLabel.text = myTextBox.text;
         *         }
         *     });
         *
         * @event onEditEnds
         * @since 0.1
         */
        this.onEditEnds = function() {};

        /**
         * Gets/sets on return key press event for TextBox. When user clicks return key on the keyboard
         * this event will be fired.
         *
         *     @example
         *     const TextBox = require('sf-core/ui/textbox');
         *     var myTextBox = new TextBox({
         *         hint: "Smartface TextBox Password",
         *         onReturnKey: function(){
         *             alert('onReturnKey pressed');
         *         }
         *     });
         *
         * @event onReturnKey
         * @since 0.1
         */
        this.onReturnKey = function() {};
    }
);

module.exports = TextBox;