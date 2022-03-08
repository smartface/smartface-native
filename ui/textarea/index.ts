import TextBox, { ITextBox } from '../textbox';
import { TextAreaEvents } from './textarea-events';
import { ConstructorOf } from '../../core/constructorof';
import { MobileOSProps } from '../../core/native-mobile-component';

export type TextareaiOSProps = Partial<ITextBox['ios']> &
  Partial<{
    /**
     * Get/set showScrollBar property
     *
     * @property {Boolean} [showScrollBar = false]
     * @ios
     * @since 1.1.10
     */
    showScrollBar: boolean;
    clearButtonEnabled: boolean;
  }>;

export type TextareaAndroidProps = Partial<ITextBox['android']> &
  Partial<{
    /**
     * Gets/sets hint text that will be displayed when TextBox is empty.
     *
     * @property {String} [hint = ""]
     * @android
     * @since 1.1.10
     */
    hint: string;
  }>;

export declare interface ITextArea<TEvent extends string = TextAreaEvents, TProps extends MobileOSProps<TextareaiOSProps, TextareaAndroidProps> = MobileOSProps<TextareaiOSProps, TextareaAndroidProps>>
  extends ITextBox<TEvent | TextAreaEvents, TProps> {
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
