import { ITextBox, TextBoxAndroidProps, TextBoxiOSProps } from '../textbox/textbox';
import { TextAreaEvents } from './textarea-events';
import { MobileOSProps } from '../../core/native-mobile-component';

export interface TextAreaiOSProps extends TextBoxiOSProps {
  /**
   * Get/set showScrollBar property
   *
   * @property {Boolean} [showScrollBar = false]
   * @ios
   * @since 1.1.10
   */
  showScrollBar: boolean;
  clearButtonEnabled: boolean;
  /**
   * Sets/Gets the bounce effect when scrolling.
   *
   * @property {Boolean} bounces
   * @ios
   * @since 3.2.1
   */
  bounces: boolean;
}

export interface TextAreaAndroidProps extends TextBoxAndroidProps {
  /**
   * Gets/sets hint text that will be displayed when TextBox is empty.
   *
   * @property {String} [hint = ""]
   * @android
   * @since 1.1.10
   */
  hint: string;
}

export interface ITextArea<TEvent extends string = TextAreaEvents, TProps extends MobileOSProps<TextAreaiOSProps, TextAreaAndroidProps> = MobileOSProps<TextAreaiOSProps, TextAreaAndroidProps>>
  extends ITextBox<TEvent | TextAreaEvents, TProps> {}
