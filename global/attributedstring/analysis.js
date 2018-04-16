/**
 * @class AttributedString.
 *
 *     @example
 *     const AttributedString = require('sf-extension-extendedlabel/attributedstring');
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
 */
AttributedString.prototype.string = "";

/**
 * Gets/sets font on AttributedString.
 *
 * @property {UI.Font} [font = null]
 * @android
 * @ios
 */
AttributedString.prototype.font = null;

/**
 * Gets/sets foregroundColor on AttributedString.
 *
 * @property {UI.Color} foregroundColor
 * @android
 * @ios
 */
AttributedString.prototype.foregroundColor = Color.BLACK;

/**
 * Gets/sets underline on AttributedString.
 *
 * @property {boolean} [underline = false]
 * @android
 * @ios
 */
AttributedString.prototype.underline = false;

/**
 * Gets/sets underlineColor on AttributedString.
 *
 * @property {UI.Color} underlineColor
 * @ios
 */
AttributedString.prototype.underlineColor = Color.WHITE;


/**
 * Gets/sets backgroundColor on AttributedString.
 *
 * @property {UI.Color} backgroundColor
 * @android
 * @ios
 */
AttributedString.prototype.backgroundColor = Color.WHITE;

/**
 * Gets/sets link on AttributedString. If you want handle label click method, must set link string.
 *
 * @property {String} link
 * @android
 * @ios
 */
AttributedString.prototype.link = undefined;

module.exports = AttributedString;