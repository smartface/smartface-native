import { ConstructorOf } from '../../core/constructorof';
import { ITextBox } from './textbox';

/**
 * @class UI.TextBox
 * @since 0.1
 * @extends UI.View
 * TextBox is a UI which users can edit the text.
 *
 *     @example
 *     import TextBox from '@smartface/native/ui/textbox';
 *     const myTextBox = new TextBox({
 *         left: 10, top: 10, width: 200, height: 65,
 *         hint: "Your hint text",
 *         borderWidth: 1
 *     });
 *     myPage.layout.addChild(myTextBox);
 *
 */
const TextBox: ConstructorOf<ITextBox, Partial<ITextBox>> = require(`./textbox.${Device.deviceOS.toLowerCase()}`).default;
type TextBox = ITextBox;

export default TextBox;
