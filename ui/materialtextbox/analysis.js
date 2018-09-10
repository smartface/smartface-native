/**
 * @class UI.MaterialTextBox
 * @since 3.1.2
 * @extends UI.TextBox
 * MaterialTextBox is a UI which users can edit the text.
 * 
 *     @example
 *     const MaterialTextBox = require('sf-core/ui/materialtextbox');
 *     var materialtextbox = new MaterialTextBox({
 *         height : 50,
 *         hint : "Hint"
 *     });
 *     myPage.layout.addChild(materialtextbox);
 *
 */
function MaterialTextBox(params){}

/**
 * Gets/sets the titleFont of the MaterialTextBox. Error label and animated hint label are the same on iOS so this property make changes on both.
 * @property {UI.Font} titleFont
 * @ios
 * @since 3.1.2
 */
MaterialTextBox.prototype.titleFont;

/**
 * Gets/sets the selectedHintTextColor of the MaterialTextBox.
 * @property {UI.Color} selectedHintTextColor
 * @ios
 * @since 3.1.2
 */
MaterialTextBox.prototype.selectedHintTextColor;

/**
 * Gets/sets the lineColor of the MaterialTextBox. In Android, if error message appears then line color cannot be changed. 
 * @property {Object} [lineColor = {}]
 * @property {UI.Color} lineColor.normal
 * @property {UI.Color} lineColor.selected
 * @android
 * @ios
 * @since 3.1.2
 */
MaterialTextBox.prototype.lineColor;

/**
 * Gets/sets the errorColor of the MaterialTextBox. In Android, underline color will also be same as error color. 
 * @property {UI.Color} errorColor
 * @android
 * @ios
 * @since 3.1.2
 */
MaterialTextBox.prototype.errorColor;

/**
 * Gets/sets the errorMessage of the MaterialTextBox.
 * @property {String} errorMessage
 * @android
 * @ios
 * @since 3.1.2
 */
MaterialTextBox.prototype.errorMessage;

/**
 * Gets/sets the lineHeight of the MaterialTextBox.
 * @property {Number} lineHeight
 * @ios
 * @since 3.1.2
 */
MaterialTextBox.prototype.lineHeight;

/**
 * Gets/sets the selectedLineHeight of the MaterialTextBox.
 * @property {Number} selectedLineHeight
 * @ios
 * @since 3.1.2
 */
MaterialTextBox.prototype.selectedLineHeight;

/**
 * Gets/sets the selectedLineColor of the MaterialTextBox.
 * @property {UI.Color} selectedLineColor
 * @android
 * @ios
 * @since 3.1.2
 */
MaterialTextBox.prototype.selectedLineColor;

/**
 * Gets/sets the characterRestriction of the MaterialTextBox.
 * @property {Number} characterRestriction
 * @android
 * @since 3.1.2
 */
MaterialTextBox.prototype.characterRestriction;

/**
 * Gets/sets the characterRestrictionColor of the MaterialTextBox.
 * @property {Number} characterRestriction
 * @android
 * @since 3.1.2
 */
MaterialTextBox.prototype.characterRestrictionColor;


/**
 * Gets/sets the labelsFont of the MaterialTextBox. Set the font to hint and any other labels (such as error and counter labels).
 * Given font size will not be taken in account. 
 * 
 * @property {UI.Font} labelsFont
 * @android
 * @since 3.1.2
 */
MaterialTextBox.prototype.labelsFont;

module.exports = MaterialTextBox;