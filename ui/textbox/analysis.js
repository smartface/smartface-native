const View = require('../view');
const extend = require('js-base/core/extend');

/**
 * @class UI.TextBox
 * @since 0.1
 * @extends UI.View
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
         * Gets/sets font of the TextBox.
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
         * @property {UI.Font} [font = null]
         * @since 0.1
         */
        this.font = null;

        /**
         * Gets/sets text of the TextBox.
         *
         * @property {String} [text = ""]
         * @since 0.1
         */
        this.text = "";

        /**
         * Gets/sets text alignment of the TextBox.
         *
         *     @example
         *     const Label = require('sf-core/ui/label');
         *     var myLabel = new Label();
         *     const TextAlignment = require('sf-core/ui/textalignment');
         *     myLabel.textAlignment = TextAlignment.MIDCENTER;
         *
         * @property {UI.TextAlignment} [textAlignment = UI.TextAlignment.MIDLEFT]
         * @since 0.1
         */
        this.textAlignment = UI.TextAlignment.MIDLEFT;

        /**
         * Gets/sets text color of view.
         *
         * @property {UI.Color} [textColor = UI.Color.BLACK]
         * @since 0.1
         */
        this.textColor = UI.Color.BLACK;

        /**
         * Gets/sets hint text hint that is displayed when the text of the TextBox is empty.
         * 
         *     @example
         *     const TextBox = require('sf-core/ui/textbox');
         *     var myTextBox = new TextBox({
         *         hint: "Smartface TextBox"
         *     });
         * 
         * @property {String} [hint = ""]
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
         * @property {UI.Color} [hintTextColor = UI.Color.LIGHTGRAY]
         * @since 0.1
         */
        this.android.hintTextColor = UI.Color.LIGHTGRAY

        /**
         * iOS specific properties.
         *
         * @property {Object} ios
         * @since 0.1
         */
        this.android = {};

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
         * @property {Boolean} [adjustFontSizeToFit = false]
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
         * @property {Number} [minimumFontSize = 7]
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
         * @property {Boolean} [clearButtonEnabled = false]
         * @since 0.1
         */
        this.ios.clearButtonEnabled = false;

        /**
         * Gets/sets the appearance style of the keyboard that is associated with the TextBox.
         * This property will work only for iOS.
         *
         *     @example
         *     const TextBox = require('sf-core/ui/textbox');
         *     const KeyboardAppearance = require('sf-core/ui/keyboardappearance');
         *     var myTextBox = new TextBox({
         *         hint: "Smartface TextBox",
         *         KeyboardAppearance: KeyboardAppearance.DARK
         *     });
         *
         * @property {UI.KeyboardAppearance} [keyboardAppearance = UI.KeyboardAppearance.DEFAULT]
         * @since 0.1
         */
        this.ios.keyboardAppearance = UI.KeyboardAppearance.DEFAULT;

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
         * @property {Boolean} [isPassword = false]
         * @since 0.1
         */
        this.isPassword = false;

        /**
         * Gets/sets keyboard type for TextBox.
         *
         *     @example
         *     const TextBox = require('sf-core/ui/textbox');
         *     const KeyboardType = require('sf-core/ui/keyboardtype');
         *     var myTextBox = new TextBox({
         *         hint: "Smartface TextBox Password",
         *         keyboardType: KeyboardType.NUMERIC
         *     });
         *
         * @property {UI.KeyboardType} [keyboardType = UI.KeyboardType.DEFAULT]
         * @since 0.1
         */
        this.keyboardType = UI.KeyboardType.DEFAULT;

        /**
         * Gets/sets action key type for TextBox.
         *
         *     @example
         *     const TextBox = require('sf-core/ui/textbox');
         *     const ActionKeyType = require('sf-core/ui/actionkeytype');
         *     var myTextBox = new TextBox({
         *         hint: "Smartface TextBox Password",
         *         actionKeyType: ActionKeyType.NEXT
         *     });
         *
         * @property {UI.ActionKeyType} [actionKeyType = UI.ActionKeyType.DEFAULT]
         * @since 0.1
         */
        this.actionKeyType = UI.ActionKeyType.DEFAULT;

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
         * @param {Object} e Event arguments.
         * @param {String} e.insertedText The text that inserted into TextBox.
         * @param {Number} e.location Index of inserted text.
         * @event onTextChanged
         * @since 0.1
         */
        this.onTextChanged = function(e) {};

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
         * Gets/sets on action key press event for TextBox. When user clicks action key on the keyboard
         * this event will be fired.
         *
         *     @example
         *     const TextBox = require('sf-core/ui/textbox');
         *     const ActionKeyType = require('sf-core/ui/actionkeytype');
         *     var myTextBox = new TextBox({
         *         hint: "Smartface TextBox Password",
         *         actionKeyType: ActionKeyType.NEXT,
         *         onActionButtonPress: function(e){
         *             alert('Action Button pressed');
         *         }
         *     });
         *
         * @param {Object} e Event arguments.
         * @param {UI.ActionKeyType} e.actionKeyType Pressed action key type.
         * @event onActionButtonPress
         * @since 0.1
         */
        this.onActionButtonPress = function(e) {};
    }
);

module.exports = TextBox;