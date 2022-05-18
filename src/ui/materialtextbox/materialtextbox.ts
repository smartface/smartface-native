import { ITextBox, TextBoxAndroidProps, TextBoxiOSProps } from '../textbox/textbox';
import Font from '../font';
import Color from '../color';
import View from '../view';
import { MaterialTextBoxEvents } from './materialtextbox-events';
import { MobileOSProps } from '../../core/native-mobile-component';
import { ColorImpl } from '../color/color';
import TextBox from '../textbox';
export interface MaterialTextBoxiOSProps extends TextBoxiOSProps {
  /**
   * This property used to assign a view left of MaterialTextBox. The given view's width & height must be specified. This property does not work when multiline is true.
   *
   * @property {Object} leftLayout
   * @property {UI.View} leftLayout.view
   * @property {Number} leftLayout.width
   * @property {Number} leftLayout.height
   * @android
   * @ios
   * @since 3.2.1
   */
  leftLayout: {
    view: View;
    width: number;
    height?: number;
  };
  /**
   * This event is called when positioning leftLayout. This event can be called multiple times.
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
   * @deprecated
   * @ios
   * @since 4.3.0
   * @example
   * ```
   * import MaterialTextBox from '@smartface/native/ui/materialtextbox';
   *
   * const materialTextBox = new MaterialTextBox();
   * materialTextBox.on(MaterialTextBox.Events.LeftLayoutRectForBounds, (params) => {
   *  console.info('onLeftLayoutRectForBounds', params);
   * });
   * ```
   */
  onLeftLayoutRectForBounds: (bounds?: Object, defaultRect?: Object) => Object;
  /**
   * This event is called when positioning rightLayout. This event can be called multiple times.
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
   * @deprecated
   * @ios
   * @since 4.3.0
   * @example
   * ```
   * import MaterialTexBox from '@smartface/native/ui/materialtextbox';
   *
   * const materialTextBox = new MaterialTextBox();
   * materialTextBox.on(MaterialTextBox.Events.RightLayoutRectForBounds, (params) => {
   *  console.info('onRightLayoutRectForBounds', params);
   * });
   * ```
   */
  onRightLayoutRectForBounds: (bounds?: Object, defaultRect?: Object) => Object;
  /**
   * Gets/sets the rightLayoutLeftPadding of the MaterialTextBox.
   * @property {Number} rightLayoutLeftPadding
   * @ios
   * @since 4.3.0
   */
  rightLayoutLeftPadding: number;
  /**
   * Gets/sets the leftLayoutRightPadding of the MaterialTextBox.
   * @property {Number} leftLayoutRightPadding
   * @ios
   * @since 4.3.0
   */
  leftLayoutRightPadding: number;
  /**
   * Gets/sets the inlineHintFont of the MaterialTextBox. This property overrides the labelsFont property for characterRestriction.
   * @property {UI.Font} inlineHintFont
   * @ios
   * @since 4.3.0
   */
  inlineHintFont: Font;
  /**
   * Gets/sets the underlineLabelsFont of the MaterialTextBox. This property overrides the labelsFont property for error and characterRestriction font.
   * @property {UI.Font} underlineLabelsFont
   * @ios
   * @since 4.3.0
   */
  underlineLabelsFont: Font;
  /**
   * Gets/sets the clearButtonColor of the MaterialTextBox.
   * @property {UI.Color} clearButtonColor
   * @ios
   * @since 4.3.0
   */
  clearButtonColor: Color | null;
  /**
   * Gets/sets the lineHeight of the MaterialTextBox.
   * @property {Number} lineHeight
   * @ios
   * @since 3.1.2
   */
  lineHeight: number;
  /**
   * Gets/sets the selectedLineHeight of the MaterialTextBox.
   * @property {Number} selectedLineHeight
   * @ios
   * @since 3.1.2
   */
  selectedLineHeight: number;
  /**
   * Gets/sets the expandsOnOverflow of the MaterialTextBox.
   * @property {Boolean} expandsOnOverflow
   * @ios
   * @since 4.3.6
   */
  expandsOnOverflow: boolean;
}

export interface MaterialTextBoxAndroidProps extends TextBoxAndroidProps {
  /**
   * Gets/sets the textBoxMaxHeight of the MaterialTextBox.This property is necessary because it has same reason with textBoxHeight property.
   *
   * @property {Number} textBoxMaxHeight
   * @android
   * @since 3.1.2
   * @deprecated 3.2.1 TextBox grows as its wrapper
   */
  textBoxMaxHeight: number;
  /**
   * Gets/sets the enableErrorMessage of the MaterialTextBox. To change error dynamically, you should set this property at the creation moment.
   *
   * @property {Boolean} enableErrorMessage
   * @android
   * @since 3.1.2
   */
  enableErrorMessage: boolean;
  /**
   * Gets/sets the enableCharacterRestriction of the MaterialTextBox. To change counter dynamically at runtime, you should set this property at the creation moment.
   *
   * @property {Boolean} enableCharacterRestriction
   * @android
   * @since 3.1.2
   */
  enableCharacterRestriction: boolean;
  /**
   * Gets/sets the textBoxHeight of the MaterialTextBox. This property is necessary because of the textbox does not grow its height with wrapper container(MaterialTextBox actually is a wrapper of views in Android).
   *
   * @property {Number} textBoxHeight
   * @android
   * @since 3.1.2
   * @deprecated 3.2.1 TextBox grows as its wrapper
   */
  textBoxHeight: number;
  /**
   * Gets/sets the maxLines of the MaterialTextBox.
   * Setting this value overrides previous maximum height configurations.
   *
   * @property {Number} maxLines
   * @android
   * @since 4.3.6
   */
  maxLines: number;
}

/**
 * @class UI.MaterialTextBox
 * @since 3.1.2
 * @extends UI.TextBox
 * MaterialTextBox is a UI which users can edit the text.
 *
 *     @example
 *     import MaterialTextBox from '@smartface/native/ui/materialtextbox';
 *     const materialtextbox = new MaterialTextBox({
 *         height : 50,
 *         hint : "Hint"
 *     });
 *     myPage.layout.addChild(materialtextbox);
 *
 */
export interface IMaterialTextBox<
  TEvent extends string = MaterialTextBoxEvents,
  TProps extends MobileOSProps<MaterialTextBoxiOSProps, MaterialTextBoxAndroidProps> = MobileOSProps<MaterialTextBoxiOSProps, MaterialTextBoxAndroidProps>
> extends ITextBox<TEvent | MaterialTextBoxEvents, TProps> {
  /**
   * Gets/sets the lineCount of the MaterialTextBox. You can use this property when multiline is true.
   * @property {Number} [lineCount = 1]
   * @ios
   * @android
   * @since 4.3.0
   */
  lineCount: number;
  /**
   * Gets/sets the multiline of the MaterialTextBox. You should set this property at constructor method.
   * @property {Boolean} [multiline = false]
   * @ios
   * @android
   * @since 4.3.0
   */
  multiline: boolean;
  /**
   * Gets/sets the selectedHintTextColor of the MaterialTextBox.
   * @property {UI.Color} selectedHintTextColor
   * @ios
   * @android
   * @since 3.1.2
   */
  selectedHintTextColor: Color | null;
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
  rightLayout: {
    view: View | null;
    width: number;
    height?: number;
  };
  /**
   * Gets/sets the lineColor of the MaterialTextBox. In Android, if error message appears then line color cannot be changed.
   * @property {Object} [lineColor = {}]
   * @property {UI.Color} lineColor.normal
   * @property {UI.Color} lineColor.selected
   * @android
   * @ios
   * @since 3.1.2
   */
  lineColor: {
    normal: Color | null;
    selected: Color | null;
  };
  /**
   * Gets/sets the errorColor of the MaterialTextBox. In Android, hint text color does not changed as iOS.
   * @property {UI.Color} errorColor
   * @android
   * @ios
   * @since 3.1.2
   */
  errorColor: Color | null;
  /**
   * Gets/sets the errorMessage of the MaterialTextBox.
   * @property {String} errorMessage
   * @android
   * @ios
   * @since 3.1.2
   */
  errorMessage: string;
  /**
   * Gets/sets the characterRestriction of the MaterialTextBox.
   * @property {Number} characterRestriction
   * @android
   * @ios
   * @since 3.1.2
   */
  characterRestriction: number | undefined;
  /**
   * Gets/sets the characterRestrictionColor of the MaterialTextBox.
   * @property {UI.Color} characterRestrictionColor
   * @android
   * @ios
   * @since 3.1.2
   */
  characterRestrictionColor: Color | null;
  /**
   * Gets/sets the labelsFont of the MaterialTextBox. In Android, sets the font to hint and any other labels (such as error and counter labels) but size of font does not take into account except for hint text size.
   * Before using this property you should enable counter, error and give hint text. For iOS, this property overrides the underlineLabelsFont property for error and characterRestriction font.
   *
   * @property {UI.Font} labelsFont
   * @android
   * @ios
   * @since 3.1.3
   */
  labelsFont: Font;
  /**
   * Gets/sets font of a Label.
   * In Android, to make hint text size as your given text size assign the font property in constructor.
   *
   *     @example
   *     import Label from '@smartface/native/ui/label';
   *     import Font from '@smartface/native/ui/font';
   *     const myLabel = new Label({
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
  font: Font;
}
