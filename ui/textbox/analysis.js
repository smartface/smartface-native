const View = require('../view');
const extend = require('js-base/core/extend');

/**
 * @class UI.TextBox
 * @since 0.1
 * @extends UI.View
 * TextBox is where users can type in via soft keyboard.
 *
 *     @example
 *     const TextBox = require('nf-core/ui/textbox');
 *     var myTextBox = new TextBox({
 *         left:10, top:10, width:200, height:65,
 *         hint: "hint",
 *         borderWidth: 1
 *     });
 *     myPage.layout.addChild(myTextBox);
 *
 */
const TextBox = extend(View)(
    function (_super, params) {
        _super(this);

        /**
         * Gets/sets font of the TextBox.
         * @property {UI.Font} [font = null]
         * @since 0.1
         */
        this.font = null;

        /**
         * Gets/sets text of the TextBox.
         * @property {String} [text = ""]
         * @since 0.1
         */
        this.text = "";

        /**
         * Gets/sets text alignment of the TextBox.
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
         * Gets/sets hint text displayed when TextBox is empty.
         * 
         * @property {String} [hint = ""]
         * @since 0.1
         */
        this.hint = "";

        /**
         * Gets/sets the color of the hint text. This property will work only for Android.
         *
         *     @example
         *     const Color = require('nf-core/ui/color');
         *     myTextBox.android.hintTextColor = Color.RED;
         *
         * @property {UI.Color} [hintTextColor = UI.Color.LIGHTGRAY]
         * @since 0.1
         */
        this.android.hintTextColor = UI.Color.LIGHTGRAY

        /**
         * Gets/sets adjustment status of TextBox.If enabled text size will be adjusted
         * by view's fixed width. If you set it true,
         * you should set minimum font size by changing the minimumFontSize property.
         * This property will work only for iOS.
         *
         *     @example
         *     myTextBox.ios.adjustFontSizeToFit = true;
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
         *     myTextBox.ios.adjustFontSizeToFit = true;
         *     myTextBox.ios.minimumFontSize = 15;
         *
         * @property {Number} [minimumFontSize = 7]
         * @since 0.1
         */
        this.ios.minimumFontSize = 7;

        /**
         * Gets/sets clear button state. If enabled, clear button will be shown
         * at right of the TextBox. This property will work for iOS only.
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
         *     const KeyboardAppearance = require('nf-core/ui/keyboardappearance');
         *     myTextBox.ios.keyboardAppearance = KeyboardAppearance.DARK;
         *
         * @property {UI.KeyboardAppearance} [keyboardAppearance = UI.KeyboardAppearance.DEFAULT]
         * @since 0.1
         */
        this.ios.keyboardAppearance = UI.KeyboardAppearance.DEFAULT;

        /**
         * Gets/sets the content of the TextBox is password or not.
         *
         * @property {Boolean} [isPassword = false]
         * @since 0.1
         */
        this.isPassword = false;

        /**
         * Gets/sets keyboard type for TextBox.
         *
         * @property {UI.KeyboardType} [keyboardType = UI.KeyboardType.DEFAULT]
         * @since 0.1
         */
        this.keyboardType = UI.KeyboardType.DEFAULT;

        /**
         * Gets/sets action key type for TextBox.
         *
         *     @example
         *     const ActionKeyType = require('nf-core/ui/actionkeytype');
         *     myTextBox.actionKeyType = ActionKeyType.NEXT;
         *
         * @property {UI.ActionKeyType} [actionKeyType = UI.ActionKeyType.DEFAULT]
         * @since 0.1
         */
        this.actionKeyType = UI.ActionKeyType.DEFAULT;

        /**
         * Shows keyboard.
         *
         * @method showKeyboard
         * @since 0.1
         */
        this.showKeyboard = function(){};

        /**
         * Hides keyboard.
         *
         * @method hideKeyboard
         * @since 0.1
         */
        this.hideKeyboard = function(){};

        // events
        /**
         * Gets/sets callback of text change events for TextBox. When user inserts or removes a character
         * to TextBox, this event will be fired.
         *
         *     @example
         *     myTextBox.onTextChanged: function(e) {
         *         console.log(e.insertedText);
         *     };
         *
         * @param {Object} e Event arguments.
         * @param {String} e.insertedText The text that inserted into TextBox.
         * @param {Number} e.location Index of inserted text.
         * @event onTextChanged
         * @since 0.1
         */
        this.onTextChanged = function(e) {};

        /**
         * Gets/sets editing begin event for TextBox. Triggered when user focused on 
         * the textbox by selecting it.
         *     @example
         *     myTextBox.onEditBegins = function() {
         *         console.log(Begin to type.);
         *     };
         *
         * @event onEditBegins
         * @since 0.1
         */
        this.onEditBegins = function() {};

        /**
         * Gets/sets editing end event for TextBox. Triggered when user finishes editing by clicking return key
         * or clicking outside of the TextBox, this event will be fired.
         *
         *     @example
         *     myTextBox.onEditEnds = function() {
         *         console.log(Typing Ended.);
         *     };
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
         *     myTextBox.onActionButtonPress = function(e) {
         *             alert('Action Button pressed');
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