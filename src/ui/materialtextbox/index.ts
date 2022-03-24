import { ColorImpl } from '../color';
import Font from '../font';
import TextBox from '../textbox';
import { IMaterialTextBox } from './materialtextbox';

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
export declare class MaterialTextBoxImpl extends TextBox implements IMaterialTextBox {
  constructor(params?: Partial<IMaterialTextBox>);
  lineCount: number;
  multiline: boolean;
  selectedHintTextColor: ColorImpl | null;
  rightLayout: IMaterialTextBox['rightLayout'];
  lineColor: IMaterialTextBox['lineColor'];
  errorColor: ColorImpl | null;
  errorMessage: string;
  characterRestriction: number | undefined;
  characterRestrictionColor: ColorImpl | null;
  labelsFont: Font;
}
const MaterialTexBox: typeof MaterialTextBoxImpl = require(`./materialtextbox.${Device.deviceOS.toLowerCase()}`).default;
type MaterialTexBox = MaterialTextBoxImpl;

export default MaterialTexBox;
