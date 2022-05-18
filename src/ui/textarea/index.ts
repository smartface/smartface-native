import { ConstructorOf } from '../../core/constructorof';
import { ITextArea } from './textarea';

/**
 * @class UI.TextArea
 * @since 1.1.10
 * @extends UI.TextBox
 * TextArea is a UI which users can edit the multiline text.
 *
 *     @example
 *     import TextArea from '@smartface/native/ui/textarea';
 *     const myTextArea= new TextArea({
 *         left:10, top:10, width:200, height:200,
 *         borderWidth: 1
 *     });
 *     myPage.layout.addChild(myTextArea);
 *
 */
const TextArea: ConstructorOf<ITextArea, Partial<ITextArea>> = require(`./textarea.${Device.deviceOS.toLowerCase()}`).default;
type TextArea = ITextArea;

export default TextArea;
