/**
 * @class UI.MaterialTextBox
 * @since 3.1.2
 * @extends UI.TextBox
 * MaterialTextBox is a UI which users can edit the text.
 * 
 *     @example
 *     const MaterialTextBox = require('@smartface/native/ui/materialtextbox');
 *     var materialtextbox = new MaterialTextBox({
 *         height : 50,
 *         hint : "Hint"
 *     });
 *     myPage.layout.addChild(materialtextbox);
 *
 */
function MaterialTextBox(params) {}
/**
 * This event is called when positioning rightLayout. This event can be called multiple times.
 *
 *     @example
 *     mtbTextbox.ios.onRightLayoutRectForBounds: function(bounds, defaultRect){
 *         defaultRect.x = defaultRect.x + 20;
 *         defaultRect.y = defaultRect.y - 20;
 *      return defaultRect;
 *     };
 *
 * @param {Object} bounds MaterialTextBox bounds.
 * @param {Number} bounds.x
 * @param {Number} bounds.y
 * @param {Number} bounds.width
 * @param {Number} bounds.height
 * @param {Object} defaultRect
 * @param {Number} defaultRect.x
 * @param {Number} defaultRect.y
 * @param {Number} defaultRect.width
 * @param {Number} defaultRect.height
 * @return {Object} Rect
 * @return {Number} return.x
 * @return {Number} return.y
 * @return {Number} return.width
 * @return {Number} return.height
 * @event onRightLayoutRectForBounds
 * @ios
 * @since 4.3.0
 */
MaterialTextBox.prototype.onRightLayoutRectForBounds = function(e) {};

/**
 * This event is called when positioning leftLayout. This event can be called multiple times.
 *
 *     @example
 *     mtbTextbox.ios.onLeftLayoutRectForBounds: function(bounds, defaultRect){
 *         defaultRect.x = defaultRect.x + 20;
 *         defaultRect.y = defaultRect.y - 20;
 *      return defaultRect;
 *     };
 *
 * @param {Object} bounds MaterialTextBox bounds.
 * @param {Number} bounds.x
 * @param {Number} bounds.y
 * @param {Number} bounds.width
 * @param {Number} bounds.height
 * @param {Object} defaultRect
 * @param {Number} defaultRect.x
 * @param {Number} defaultRect.y
 * @param {Number} defaultRect.width
 * @param {Number} defaultRect.height
 * @return {Object} Rect
 * @return {Number} return.x
 * @return {Number} return.y
 * @return {Number} return.width
 * @return {Number} return.height
 * @event onLeftLayoutRectForBounds
 * @ios
 * @since 4.3.0
 */
MaterialTextBox.prototype.onLeftLayoutRectForBounds = function(e) {};

/**
 * Gets/sets the rightLayoutLeftPadding of the MaterialTextBox.
 * @property {Number} rightLayoutLeftPadding
 * @ios
 * @since 4.3.0
 */
MaterialTextBox.prototype.rightLayoutLeftPadding;

/**
 * Gets/sets the leftLayoutRightPadding of the MaterialTextBox.
 * @property {Number} leftLayoutRightPadding
 * @ios
 * @since 4.3.0
 */
MaterialTextBox.prototype.leftLayoutRightPadding;

/**
 * Gets/sets the inlineHintFont of the MaterialTextBox. This property overrides the labelsFont property for characterRestriction.
 * @property {UI.Font} inlineHintFont
 * @ios
 * @since 4.3.0
 */
MaterialTextBox.prototype.inlineHintFont;

/**
 * Gets/sets the underlineLabelsFont of the MaterialTextBox. This property overrides the labelsFont property for error and characterRestriction font.
 * @property {UI.Font} underlineLabelsFont
 * @ios
 * @since 4.3.0
 */
MaterialTextBox.prototype.underlineLabelsFont;

/**
 * Gets/sets the clearButtonColor of the MaterialTextBox.
 * @property {UI.Color} clearButtonColor
 * @ios
 * @since 4.3.0
 */
MaterialTextBox.prototype.clearButtonColor;

/**
 * Gets/sets the lineCount of the MaterialTextBox. You can use this property when multiline is true.
 * @property {Number} [lineCount = 1]
 * @ios
 * @android
 * @readonly
 * @since 4.3.0
 */
MaterialTextBox.prototype.lineCount = 1;

/**
 * Gets/sets the multiline of the MaterialTextBox. You should set this property at constructor method.
 * @property {Boolean} [multiline = false]
 * @ios
 * @android
 * @readonly
 * @since 4.3.0
 */
MaterialTextBox.prototype.multiline = false;

/**
 * Gets/sets the selectedHintTextColor of the MaterialTextBox.
 * @property {UI.Color} selectedHintTextColor
 * @ios
 * @android
 * @since 3.1.2
 */
MaterialTextBox.prototype.selectedHintTextColor;

/**
 * This property used to assign a view right of MaterialTextBox. The given view's width & height must be specified.
 * 
 * @property {Object} rightLayout
 * @property {UI.View} rightLayout.view
 * @property {Number} rightLayout.width
 * @property {Number} rightLayout.height
 * @android
 * @ios
 * @since 3.2.1
 */
MaterialTextBox.prototype.rightLayout;

/**
 * This property used to assign a view left of MaterialTextBox. The given view's width & height must be specified. This property does not work when multiline is true.
 * 
 * @property {Object} leftLayout
 * @property {UI.View} leftLayout.view
 * @property {Number} leftLayout.width
 * @property {Number} leftLayout.height
 * @ios
 * @since 4.3.0
 */
MaterialTextBox.prototype.leftLayout;

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
 * Gets/sets the errorColor of the MaterialTextBox. In Android, hint text color does not changed as iOS. 
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
 * Gets/sets the max value of display at the character counter.
 * @property {Number} characterRestriction
 * @android
 * @ios
 * @since 4.3.0
 */
MaterialTextBox.prototype.characterRestriction;

/**
 * Gets/sets the characterRestrictionColor of the MaterialTextBox.
 * @property {Number} characterRestrictionColor
 * @android
 * @ios
 * @since 4.3.0
 */
MaterialTextBox.prototype.characterRestrictionColor;


/**
 * Gets/sets the labelsFont of the MaterialTextBox. In Android, sets the font to hint and any other labels (such as error and counter labels) but size of font does not take into account except for hint text size.
 * Before using this property you should enable counter, error and give hint text. For iOS, this property overrides the underlineLabelsFont property for error and characterRestriction font.
 * 
 * @property {UI.Font} labelsFont
 * @android
 * @ios
 * @since 3.1.3
 */
MaterialTextBox.prototype.labelsFont;


/**
 * Gets/sets the enableErrorMessage of the MaterialTextBox. To change error dynamically, you should set this property at the creation moment.
 * 
 * @property {Boolean} enableErrorMessage
 * @android
 * @since 3.1.2
 */
MaterialTextBox.prototype.enableErrorMessage;


/**
 * Gets/sets the enableCharacterRestriction of the MaterialTextBox. To change counter dynamically at runtime, you should set this property at the creation moment.
 * 
 * @property {Boolean} enableCharacterRestriction
 * @android
 * @ios
 * @since 4.3.0
 */
MaterialTextBox.prototype.enableCharacterRestriction;


/**
 * Gets/sets the textBoxHeight of the MaterialTextBox. This property is necessary because of the textbox does not grow its height with wrapper container(MaterialTextBox actually is a wrapper of views in Android). 
 * 
 * @property {Number} textBoxHeight
 * @android
 * @since 3.1.2
 * @deprecated 3.2.1 TextBox grows as its wrapper
 */
MaterialTextBox.prototype.textBoxHeight;


/**
 * Gets/sets font of a Label.
 * In Android, to make hint text size as your given text size assign the font property in constructor.
 *
 *     @example
 *     const Label = require('@smartface/native/ui/label');
 *     const Font = require('@smartface/native/ui/font')
 *     var myLabel = new Label({
 *         text: "This is my label",
 *         visible: true
 *     });
 *     myLabel.font = Font.create("Arial", 16, Font.BOLD);
 *
 * @property {UI.Font} font
 * @android
 * @ios
 * @since 0.1
 */
MaterialTextBox.prototype.font;

/**
 * Gets/sets the textBoxMaxHeight of the MaterialTextBox.This property is necessary because it has same reason with textBoxHeight property.
 * 
 * @property {Number} textBoxMaxHeight
 * @android
 * @since 3.1.2
 * @deprecated 3.2.1 TextBox grows as its wrapper
 */
MaterialTextBox.prototype.textBoxMaxHeight;

module.exports = MaterialTextBox;