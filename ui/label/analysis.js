const View = require('../view');
const extend = require('js-base/core/extend');
/**
 * @class UI.Label
 * @since 0.1
 * @extends UI.View
 * Label is a view that displays read-only text on the screen.
 *
 *     @example
 *     const Label = require('sf-core/ui/label');
 *     const Color = require('sf-core/ui/color');
 *     var myLabel = new Label({
 *         text: "This is my label",
 *         visible: true
 *     });
 *     myLabel.width = 200,
 *     myLabel.height = 50,
 *     myLabel.top = 10,
 *     myLabel.left = 20,
 *     myLabel.backgroundColor = Color.GRAY;
 */
function Label(params) {}

/**
 * Gets/sets background color of a view. It allows setting background
 * color with UI.Color instance.
 *
 * @property {UI.Color} [backgroundColor = UI.Color.TRANSPARENT]
 * @android
 * @ios
 * @since 0.1
 */
Label.prototype.backgroundColor = UI.Color.TRANSPARENT;

/**
 * Gets/sets HTML text value of Label. This property helps user showing HTML
 * texts on the screen.
 *
 *     @example
 *     // In this example 'This link' text inside Label will shown underlined.
 *     const Label = require('sf-core/ui/label');
 *     var myLabel = new Label();
 *     myLabel.htmlText = "<a href='http://www.smartface.io'>This link</a> will redirect you to Smartface website.";
 *
 * @property {String} [htmlText = ""]
 * @android
 * @ios
 * @since 0.1
 */
Label.prototype.htmlText = "";

/**
 * Gets/sets font of a Label. When set to null label uses system font.
 * It is set to null by default.
 *
 *     @example
 *     const Label = require('sf-core/ui/label');
 *     const Font = require('sf-core/ui/font')
 *     var myLabel = new Label({
 *         text: "This is my label",
 *         visible: true
 *     });
 *     myLabel.font = Font.create("Arial", 16, Font.BOLD);
 *
 * @property {UI.Font} [font = null]
 * @android
 * @ios
 * @since 0.1
 */
Label.prototype.font = null;

/**
 * Enables/disables multiple line property of a Label. If set to true
 * and the text is long enough, text will be shown in multiline.
 *
 * @property {Boolean} [multiline = false]
 * @android
 * @ios
 * @since 0.1
 */
Label.prototype.multiline = false;

/**
 * Enables/disables selectable status of the Label. If set to true
 * the text inside the Label will be selectable.
 *
 * @property {Boolean} [selectable = false]
 * @android
 * @ios
 * @since 1.1.8
 */
Label.prototype.selectable = false;

/**
 * Gets/sets text on Label.
 *
 * @property {String} [text = ""]
 * @android
 * @ios
 * @since 0.1
 */
Label.prototype.text = "";

/**
 * Gets/sets text alignment of a Label. UI.TextAlignment constants
 * can be used.
 *
 *     @example
 *     const Label = require('sf-core/ui/label');
 *     const TextAlignment = require('sf-core/ui/textalignment');
 *     var myLabel = new Label();
 *     myLabel.textAlignment = TextAlignment.MIDCENTER;
 *
 * @property {UI.TextAlignment} [textAlignment = UI.TextAlignment.MIDLEFT]
 * @android
 * @ios
 * @since 0.1
 */
Label.prototype.textAlignment = UI.TextAlignment.MIDLEFT;

/**
 * Gets/sets text color of Label.
 *
 * @property {UI.Color} [textColor = UI.Color.BLACK]
 * @android
 * @ios
 * @since 0.1
 */
Label.prototype.textColor = UI.Color.BLACK;

/**
 * Sets/gets visibiliy of scroll bar when text is too long.
 *
 * @property {Boolean} [showScrollBar = false]
 * @ios
 * @since 0.1
 */
Label.prototype.ios.showScrollBar = false;

/**
 * Enable/Disable scroll bar when text is too long. If this property is "false", text alignment mid and bottom doesn't work for label.
 *
 * @property {Boolean} [scrollEnabled = true]
 * @ios
 * @since 1.1.12
 */
Label.prototype.ios.scrollEnabled = true;

module.exports = Label;
