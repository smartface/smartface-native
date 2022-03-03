import TextBox, { ITextBox } from '../textbox';
import KeyboardType from '../keyboardtype';
import ActionKeyType from '../actionkeytype';
import { TextAreaEvents } from './textarea-events';
import { ConstructorOf } from '../../core/constructorof';

export type iOSProps = Partial<{
  /**
   * Get/set showScrollBar property
   *
   * @property {Boolean} [showScrollBar = false]
   * @ios
   * @since 1.1.10
   */
  showScrollBar: boolean;
}>;

export type AndroidProps = Partial<{
  /**
   * Gets/sets hint text that will be displayed when TextBox is empty.
   *
   * @property {String} [hint = ""]
   * @android
   * @since 1.1.10
   */
  hint: string;
}>;

export declare interface ITextArea<TEvent extends string = TextAreaEvents, TIOS = iOSProps, TAND = AndroidProps> extends ITextBox<TEvent | TextAreaEvents, TIOS & iOSProps, TAND & AndroidProps> {
  /**
   * Sets/Gets the bounce effect when scrolling.
   *
   * @property {Boolean} bounces
   * @ios
   * @since 3.2.1
   */
  bounces: boolean;
}

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
