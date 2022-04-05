import { ITextBox, TextBoxAndroidProps, TextBoxiOSProps } from '../textbox/textbox';
import { TextAreaEvents } from './textarea-events';
import { MobileOSProps } from '../../core/native-mobile-component';

export type TextareaiOSProps = TextBoxiOSProps & {
  /**
   * Get/set showScrollBar property
   *
   * @property {Boolean} [showScrollBar = false]
   * @ios
   * @since 1.1.10
   */
  showScrollBar: boolean;
  clearButtonEnabled: boolean;
};

export type TextareaAndroidProps = TextBoxAndroidProps & {
  /**
   * Gets/sets hint text that will be displayed when TextBox is empty.
   *
   * @property {String} [hint = ""]
   * @android
   * @since 1.1.10
   */
  hint: string;
};

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
