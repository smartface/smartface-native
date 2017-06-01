/**
 * @class UI.TextArea
 * @since 1.1.10
 * @extends UI.TextBox
 * TextArea is a UI which users can edit the multiline text.
 *
 *     @example
 *     const TextArea = require('sf-core/ui/textarea');
 *     var myTextArea= new TextArea({
 *         left:10, top:10, width:200, height:65,
 *         borderWidth: 1
 *     });
 *     myPage.layout.addChild(myTextArea);
 *
 */
function TextArea(params){}


/**
 * Gets/sets hint text that will be displayed when TextBox is empty.
 *
 * @property {String} [hint = ""]
 * @android
 * @ios
 * @removed
 * @since 1.1.10
 */
TextArea.prototype.hint = "";

/**
 * Gets/sets hint text that will be displayed when TextBox is empty.
 *
 * @property {String} [hint = ""]
 * @android
 * @since 1.1.10
 */
TextArea.prototype.android.hint = "";

/**
 * Get/set scrollBarEnabled property
 *
 * @property {Boolean} [scrollBarEnabled = true]
 * @ios
 * @since 1.1.10
 */
TextArea.prototype.scrollBarEnabled = true;

/**
 * This property adjusts font size according to view's fixed width. If you set it true,
 * you should set minimum font size by changing the minimumFontSize property.
 * This property works only for iOS.
 *
 * @property {Boolean} [adjustFontSizeToFit = false]
 * @ios
 * @removed
 * @since 1.1.10
 */
TextArea.prototype.ios.adjustFontSizeToFit = false;

/**
 * Gets/sets minimum font size of TextBox.
 * This property works only for iOS.
 *
 * @property {Number} [minimumFontSize = 7]
 * @ios
 * @removed
 * @since 1.1.10
 */
TextArea.prototype.ios.minimumFontSize = 7;

/**
 * Gets/sets the visibility of clear button. If enabled, clear button will be shown
 * at right of the TextBox. This property works only for iOS only.
 *
 * @property {Boolean} [clearButtonEnabled = false]
 * @ios
 * @removed
 * @since 1.1.10
 */
TextArea.prototype.ios.clearButtonEnabled = false;

/**
 * Gets/sets the content of the TextBox is password or not.
 *
 * @property {Boolean} [isPassword = false]
 * @android
 * @ios
 * @removed
 * @since1.1.10
 */
TextArea.prototype.isPassword = false;

/**
 * Gets/sets keyboard type for TextBox.
 *
 * @property {UI.KeyboardType} [keyboardType = UI.KeyboardType.DEFAULT]
 * @android
 * @ios
 * @removed
 * @since 1.1.10
 */
TextArea.prototype.keyboardType = UI.KeyboardType.DEFAULT;

/**
 * Gets/sets action key type for TextBox.
 *
 * @property {UI.ActionKeyType} [actionKeyType = UI.ActionKeyType.DEFAULT]
 * @android
 * @ios
 * @removed
 * @since 1.1.10
 */
TextArea.prototype.actionKeyType = UI.ActionKeyType.DEFAULT;

/**
 * This event is called when user clicks action key on the keyboard.
 *
 * @param {Object} e Event arguments.
 * @param {UI.ActionKeyType} e.actionKeyType Pressed action key type.
 * @event onActionButtonPress
 * @android
 * @ios
 * @removed
 * @since 1.1.10
 */
TextArea.prototype.onActionButtonPress = function(e) {};

module.exports = TextArea;