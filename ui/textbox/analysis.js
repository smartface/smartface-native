/**
 * @class UI.TextBox
 * @since 0.1
 * @extends UI.View
 * TextBox is a UI which users can edit the text.
 *
 *     @example
 *     const TextBox = require('sf-core/ui/textbox');
 *     var myTextBox = new TextBox({
 *         left:10, top:10, width:200, height:65,
 *         hint: "Your hint text",
 *         borderWidth: 1
 *     });
 *     myPage.layout.addChild(myTextBox);
 *
 */
function TextBox(params){}

/**
 * Gets/sets the font of the TextBox.
 * @property {UI.Font} [font = null]
 * @android
 * @ios
 * @since 0.1
 */
TextBox.prototype.font = null;

/**
 * Gets/sets the text of the TextBox.
 * @property {String} [text = ""]
 * @android
 * @ios
 * @since 0.1
 */
TextBox.prototype.text = "";

/**
 * Gets/sets automatically capitalization of the TextBox.
 * @property {UI.TextBox.AutoCapitalize} [autoCapitalize = UI.TextBox.AutoCapitalize.NONE]
 * @android
 * @ios
 * @since 2.8
 */
TextBox.prototype.autoCapitalize = "";

/**
 * Gets/sets the text alignment of the TextBox.
 * @property {UI.TextAlignment} [textAlignment = UI.TextAlignment.MIDLEFT]
 * @android
 * @ios
 * @since 0.1
 */
TextBox.prototype.textAlignment = UI.TextAlignment.MIDLEFT;

/**
 * Gets/sets the text color of TextBox.
 *
 * @property {UI.Color} [textColor = UI.Color.BLACK]
 * @android
 * @ios
 * @since 0.1
 */
TextBox.prototype.textColor = UI.Color.BLACK;

/**
 * Gets/sets the cursor position of TextBox.
 * 
 * @property {Object} cursorPosition
 * @property {Number} cursorPosition.start
 * @property {Number} cursorPosition.end
 * @android
 * @ios
 * @since 2.0.8
 */
TextBox.prototype.cursorPosition = {start: 0, end: 0};

/**
 * Gets/sets hint text that will be displayed when TextBox is empty.
 *
 * @property {String} [hint = ""]
 * @android
 * @ios
 * @since 0.1
 */
TextBox.prototype.hint = "";

/**
 * Gets/sets the color of the hint text. This property works only for Android.
 *
 * @property {UI.Color} [hintTextColor = UI.Color.LIGHTGRAY]
 * @android
 * @since 0.1
 */
TextBox.prototype.android.hintTextColor = UI.Color.LIGHTGRAY;


/**
 * Set an input filter to constrain the text length to the specified number.  This property works only for Android.
 *
 * @property {Number} [maxLength = 0]
 * @android
 * @since 0.1
 */
TextBox.prototype.android.maxLength = 0;

/**
 * This property adjusts font size according to view's fixed width. If you set it true,
 * you should set minimum font size by changing the minimumFontSize property.
 * This property works only for iOS.
 *
 * @property {Boolean} [adjustFontSizeToFit = false]
 * @ios
 * @since 0.1
 */
TextBox.prototype.ios.adjustFontSizeToFit = false;

/**
 * Gets/sets minimum font size of TextBox.
 * This property works only for iOS.
 *
 * @property {Number} [minimumFontSize = 7]
 * @ios
 * @since 0.1
 */
TextBox.prototype.ios.minimumFontSize = 7;

/**
 * Gets/sets the visibility of clear button. If enabled, clear button will be shown
 * at right of the TextBox. This property works only for iOS only.
 *
 * @property {Boolean} [clearButtonEnabled = false]
 * @ios
 * @since 0.1
 */
TextBox.prototype.ios.clearButtonEnabled = false;

/**
 * Gets/sets the appearance style of the keyboard that is associated with the TextBox.
 * This property works only for iOS.
 *
 * @property {UI.KeyboardAppearance} [keyboardAppearance = UI.KeyboardAppearance.DEFAULT]
 * @ios
 * @since 0.1
 */
TextBox.prototype.ios.keyboardAppearance = UI.KeyboardAppearance.DEFAULT;

/**
 * Gets/sets the content of the TextBox is password or not.
 *
 * @property {Boolean} [isPassword = false]
 * @android
 * @ios
 * @since 0.1
 */
TextBox.prototype.isPassword = false;

/**
 * Gets/sets keyboard type for TextBox.
 *
 * @property {UI.KeyboardType} [keyboardType = UI.KeyboardType.DEFAULT]
 * @android
 * @ios
 * @since 0.1
 */
TextBox.prototype.keyboardType = UI.KeyboardType.DEFAULT;

/**
 * Gets/sets action key type for TextBox.
 *
 * @property {UI.ActionKeyType} [actionKeyType = UI.ActionKeyType.DEFAULT]
 * @android
 * @ios
 * @since 0.1
 */
TextBox.prototype.actionKeyType = UI.ActionKeyType.DEFAULT;

/**
 * This function shows keyboard.
 *
 * @method showKeyboard
 * @android
 * @ios
 * @since 0.1     
 * @deprecated 1.1.8 Use {@link UI.TextBox#requestFocus} instead.
 */
TextBox.prototype.showKeyboard = function(){};

/**
 * This function hides keyboard.
 *
 * @method hideKeyboard
 * @android
 * @ios
 * @since 0.1
 * @deprecated 1.1.8 Use {@link UI.TextBox#removeFocus} instead.
 */
TextBox.prototype.hideKeyboard = function(){};

/**
 * This function gives focus to the TextBox. When the TextBox gained focus, keyboard will appear.
 *
 * @method requestFocus
 * @android
 * @ios
 * @since 1.1.8
 */
TextBox.prototype.requestFocus = function(){};

/**
 * This function removes focus from the TextBox. When the TextBox lost its focus, keyboard will disappear.
 *
 * @method removeFocus
 * @android
 * @ios
 * @since 1.1.8
 */
TextBox.prototype.removeFocus = function(){};

/**
 * This event is called when user inserts or removes a character from TextBox.
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
 * @android
 * @ios
 * @since 0.1
 */
TextBox.prototype.onTextChanged = function(e) {};

/**
 * This event is called when user focus on the textbox by selecting it.
 *
 * @event onEditBegins
 * @android
 * @ios
 * @since 0.1
 */
TextBox.prototype.onEditBegins = function() {};

/**
 * This event is called when user finishes editing by clicking return key
 * or clicking outside of the TextBox.
 *
 * @event onEditEnds
 * @android
 * @ios
 * @since 0.1
 */
TextBox.prototype.onEditEnds = function() {};

/**
 * This event is called when user clicks action key on the keyboard.
 *
 * @param {Object} e Event arguments.
 * @param {UI.ActionKeyType} e.actionKeyType Pressed action key type.
 * @event onActionButtonPress
 * @android
 * @ios
 * @since 0.1
 */
TextBox.prototype.onActionButtonPress = function(e) {};

module.exports = TextBox;