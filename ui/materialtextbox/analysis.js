/**
 * @class UI.MaterialTextBox
 * @since 3.1.1
 * @extends UI.TextBox
 * MaterialTextBox is a UI which users can edit the text.
 * 
 *     @example
 *     const MaterialTextBox = require('sf-core/ui/materialtextbox');
 *     var materialtextbox = new MaterialTextBox({
 *         height : 50,
 *         hint : "Hint",
 *         title : "Title"
 *     });
 *     myPage.layout.addChild(materialtextbox);
 *
 */
function MaterialTextBox(params){}

/**
 * Gets/sets the title of the MaterialTextBox.
 * @property {String} title
 * @android
 * @ios
 * @since 3.1.1
 */
MaterialTextBox.prototype.title;

/**
 * Gets/sets the titleFont of the MaterialTextBox.
 * @property {UI.Font} titleFont
 * @android
 * @ios
 * @since 3.1.1
 */
MaterialTextBox.prototype.titleFont;

/**
 * Gets/sets the titleColor of the MaterialTextBox.
 * @property {UI.Color} titleColor
 * @android
 * @ios
 * @since 3.1.1
 */
MaterialTextBox.prototype.titleColor;

/**
 * Gets/sets the selectedTitleColor of the MaterialTextBox.
 * @property {UI.Color} selectedTitleColor
 * @android
 * @ios
 * @since 3.1.1
 */
MaterialTextBox.prototype.selectedTitleColor;

/**
 * Gets/sets the lineColor of the MaterialTextBox.
 * @property {UI.Color} lineColor
 * @android
 * @ios
 * @since 3.1.1
 */
MaterialTextBox.prototype.lineColor;

/**
 * Gets/sets the errorColor of the MaterialTextBox.
 * @property {UI.Color} errorColor
 * @android
 * @ios
 * @since 3.1.1
 */
MaterialTextBox.prototype.errorColor;

/**
 * Gets/sets the errorMessage of the MaterialTextBox.
 * @property {String} errorMessage
 * @android
 * @ios
 * @since 3.1.1
 */
MaterialTextBox.prototype.errorMessage;

/**
 * Gets/sets the lineHeight of the MaterialTextBox.
 * @property {Number} lineHeight
 * @android
 * @ios
 * @since 3.1.1
 */
MaterialTextBox.prototype.lineHeight;

/**
 * Gets/sets the selectedLineHeight of the MaterialTextBox.
 * @property {Number} selectedLineHeight
 * @android
 * @ios
 * @since 3.1.1
 */
MaterialTextBox.prototype.selectedLineHeight;

/**
 * Gets/sets the selectedLineColor of the MaterialTextBox.
 * @property {UI.Color} selectedLineColor
 * @android
 * @ios
 * @since 3.1.1
 */
MaterialTextBox.prototype.selectedLineColor;

module.exports = MaterialTextBox;