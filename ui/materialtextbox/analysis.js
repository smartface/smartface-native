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
 * Gets/sets the selectedHintTextColor of the MaterialTextBox.
 * @property {UI.Color} selectedHintTextColor
 * @android
 * @ios
 * @since 3.1.1
 */
MaterialTextBox.prototype.selectedHintTextColor;

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

/**
 * Gets/sets the characterRestriction of the MaterialTextBox.
 * @property {Number} characterRestriction
 * @android
 * @since 3.1.1
 */
MaterialTextBox.prototype.characterRestriction;


/**
 * Gets/sets the labelsFont of the MaterialTextBox. Set the font to hint and any other labels (such as error and counter labels).
 * Given font size will not be taken in account. 
 * 
 * @property {UI.Font} labelsFont
 * @android
 * @since 3.1.1
 */
MaterialTextBox.prototype.labelsFont;

module.exports = MaterialTextBox;