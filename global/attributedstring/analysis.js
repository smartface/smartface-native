/**
 * @class AttributedString
 * @since 3.0.0
 * A string that has associated attributes for portions of its text.
 * 
 *     @example
 *     const AttributedString = require("@smartface/native/ui/attributedstring");
 *     var attributeString = new AttributedString();
 *     attributeString.string = " Third";
 *     attributeString.link = "Third Link";
 *     attributeString.backgroundColor = Color.RED;
 *     attributeString.underline = true;
 *     attributeString.font = Font.create("Times New Roman",30,Font.NORMAL);
 *     attributeString.ios.underlineColor = Color.YELLOW;
 */
function AttributedString(params) {}

/**
 * Gets/sets string on AttributedString.
 *
 * @property {String} [string = ""]
 * @android
 * @ios
 * @since 3.0.0
 */
AttributedString.prototype.string = "";

/**
 * Gets/sets font on AttributedString.
 *
 * @property {UI.Font} [font = null]
 * @android
 * @ios
 * @since 3.0.0
 */
AttributedString.prototype.font = null;

/**
 * Gets/sets foregroundColor on AttributedString.
 *
 * @property {UI.Color} foregroundColor
 * @android
 * @ios
 * @since 3.0.0
 */
AttributedString.prototype.foregroundColor = Color.BLACK;

/**
 * Gets/sets underline on AttributedString.
 *
 * @property {boolean} [underline = false]
 * @android
 * @ios
 * @since 3.0.0
 */
AttributedString.prototype.underline = false;

/**
 * Gets/sets strikethrough on AttributedString.
 *
 * @property {boolean} [strikethrough = false]
 * @android
 * @ios
 * @since 3.2.1
 */
AttributedString.prototype.strikethrough = false;

/**
 * Gets/sets underlineColor on AttributedString.
 *
 * @property {UI.Color} underlineColor
 * @ios
 * @since 3.0.0
 */
AttributedString.prototype.underlineColor = Color.WHITE;

/**
 * Gets/sets strikethroughColor on AttributedString.
 *
 * @property {UI.Color} strikethroughColor
 * @ios
 * @since 3.2.1
 */
AttributedString.prototype.strikethroughColor = Color.WHITE;

/**
 * Gets/sets backgroundColor on AttributedString.
 *
 * @property {UI.Color} backgroundColor
 * @android
 * @ios
 * @since 3.0.0
 */
AttributedString.prototype.backgroundColor = Color.WHITE;

/**
 * Gets/sets link on AttributedString. If you want handle label click method, must set link string.
 *
 * @property {String} link
 * @android
 * @ios
 * @since 3.0.0
 */
AttributedString.prototype.link = undefined;

module.exports = AttributedString;