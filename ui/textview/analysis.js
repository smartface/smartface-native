const View = require('../view');
const extend = require('js-base/core/extend');
/**
 * @class UI.TextView
 * @since 0.1
 * @extends UI.View
 * TextView is a view that displays read-only text on the screen.
 *
 *     @example
 *     const TextView = require('sf-core/ui/textview');
 *     const Color = require('sf-core/ui/color');
 *     var myTextview = new TextView({
 *         text: "This is my textview",
 *         visible: true
 *     });
 *     myTextview.width = 200,
 *     myTextview.height = 50,
 *     myTextview.top = 10,
 *     myTextview.left = 20,
 *     myTextview.backgroundColor = Color.GRAY;
 */
function TextView(params) {}

/**
 * Gets/sets background color of a view. It allows setting background
 * color with UI.Color instance.
 *
 * @property {UI.Color} [backgroundColor = UI.Color.TRANSPARENT]
 * @android
 * @ios
 * @since 0.1
 */
TextView.prototype.backgroundColor = UI.Color.TRANSPARENT;

/**
 * Gets/sets HTML text value of TextView. This property helps user showing HTML
 * texts on the screen.
 *
 *     @example
 *     // In this example 'This link' text inside TextView will shown underlined.
 *     const TextView = require('sf-core/ui/textview');
 *     var myTextView = new TextView();
 *     myTextView.htmlText = "<a href='http://www.smartface.io'>This link</a> will redirect you to Smartface website.";
 *
 * @property {String} [htmlText = ""]
 * @android
 * @ios
 * @since 0.1
 */
TextView.prototype.htmlText = "";

/**
 * Gets/sets font of a TextView. When set to null textview uses system font.
 * It is set to null by default.
 *
 *     @example
 *     const TextView = require('sf-core/ui/textview');
 *     const Font = require('sf-core/ui/font')
 *     var myTextview = new TextView({
 *         text: "This is my textview",
 *         visible: true
 *     });
 *     myTextview.font = Font.create("Arial", 16, Font.BOLD);
 *
 * @property {UI.Font} [font = null]
 * @android
 * @ios
 * @since 0.1
 */
TextView.prototype.font = null;

/**
 * Enables/disables multiple line property of a TextView. If set to true
 * and the text is long enough, text will be shown in multiline.
 *
 * @property {Boolean} [multiline = false]
 * @android
 * @ios
 * @since 0.1
 */
TextView.prototype.multiline = false;

/**
 * Enables/disables selectable status of the TextView. If set to true
 * the text inside the TextView will be selectable.
 *
 * @property {Boolean} [selectable = false]
 * @android
 * @ios
 * @since 1.1.8
 */
TextView.prototype.selectable = false;

/**
 * Gets/sets text on TextView.
 *
 * @property {String} [text = ""]
 * @android
 * @ios
 * @since 0.1
 */
TextView.prototype.text = "";

/**
 * Gets/sets text alignment of a TextView. UI.TextAlignment constants
 * can be used.
 *
 *     @example
 *     const TextView = require('sf-core/ui/textview');
 *     const TextAlignment = require('sf-core/ui/textalignment');
 *     var myTextView = new TextView();
 *     myTextView.textAlignment = TextAlignment.MIDCENTER;
 *
 * @property {UI.TextAlignment} [textAlignment = UI.TextAlignment.MIDLEFT]
 * @android
 * @ios
 * @since 0.1
 */
TextView.prototype.textAlignment = UI.TextAlignment.MIDLEFT;

/**
 * Gets/sets text color of TextView.
 *
 * @property {UI.Color} [textColor = UI.Color.BLACK]
 * @android
 * @ios
 * @since 0.1
 */
TextView.prototype.textColor = UI.Color.BLACK;

/**
 * Sets/gets visibiliy of scroll bar when text is too long.
 *
 * @property {Boolean} [showScrollBar = false]
 * @ios
 * @since 0.1
 */
TextView.prototype.ios.showScrollBar = false;

/**
 * Enable/Disable scroll bar when text is too long. If this property is "false", text alignment mid and bottom doesn't work for textview.
 *
 * @property {Boolean} [scrollEnabled = true]
 * @ios
 * @since 1.1.12
 */
TextView.prototype.ios.scrollEnabled = true;

module.exports = TextView;
