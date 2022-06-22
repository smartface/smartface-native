import { ITextBox, TextBoxAndroidProps, TextBoxiOSProps } from '../textbox/textbox';
import { TextAreaEvents } from './textarea-events';
import { MobileOSProps } from '../../core/native-mobile-component';
import ActionKeyType from '../shared/android/actionkeytype';

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
  extends ITextBox<TEvent | TextAreaEvents, TProps> {
    on(eventName: 'actionButtonPress', callback: (e?: { actionKeyType: ActionKeyType }) => void): () => void;
    on(eventName: 'clearButtonPress', callback: () => void): () => void;
    on(eventName: 'editBegins', callback: () => void): () => void;
    on(eventName: 'editEnds', callback: () => void): () => void;
    on(eventName: 'textChanged', callback: (e?: { insertedText: string; location: number }) => void): () => void;
    on(eventName: TextAreaEvents, callback: (...args: any[]) => void): () => void;
  
    off(eventName: 'actionButtonPress', callback: (e?: { actionKeyType: ActionKeyType }) => void): void;
    off(eventName: 'clearButtonPress', callback: () => void): void;
    off(eventName: 'editBegins', callback: () => void): void;
    off(eventName: 'editEnds', callback: () => void): void;
    off(eventName: 'textChanged', callback: (e?: { insertedText: string; location: number }) => void): void;
    off(eventName: TextAreaEvents, callback: (...args: any[]) => void): void;
  
    emit(eventName: 'actionButtonPress', e?: { actionKeyType: ActionKeyType }): void;
    emit(eventName: 'clearButtonPress', ): void;
    emit(eventName: 'editBegins', ): void;
    emit(eventName: 'editEnds', ): void;
    emit(eventName: 'textChanged', e?: { insertedText: string; location: number }): void;
    emit(eventName: TextAreaEvents, ...args: any[]): void;
  
    once(eventName: 'actionButtonPress', callback: (e?: { actionKeyType: ActionKeyType }) => void): () => void;
    once(eventName: 'clearButtonPress', callback: () => void): () => void;
    once(eventName: 'editBegins', callback: () => void): () => void;
    once(eventName: 'editEnds', callback: () => void): () => void;
    once(eventName: 'textChanged', callback: (e?: { insertedText: string; location: number }) => void): () => void;
    once(eventName: TextAreaEvents, callback: (...args: any[]) => void): () => void;
  
    prependListener(eventName: 'actionButtonPress', callback: (e?: { actionKeyType: ActionKeyType }) => void): void;
    prependListener(eventName: 'clearButtonPress', callback: () => void): void;
    prependListener(eventName: 'editBegins', callback: () => void): void;
    prependListener(eventName: 'editEnds', callback: () => void): void;
    prependListener(eventName: 'textChanged', callback: (e?: { insertedText: string; location: number }) => void): void;
    prependListener(eventName: TextAreaEvents, callback: (...args: any[]) => void): void;
  
    prependOnceListener(eventName: 'actionButtonPress', callback: (e?: { actionKeyType: ActionKeyType }) => void): void;
    prependOnceListener(eventName: 'clearButtonPress', callback: () => void): void;
    prependOnceListener(eventName: 'editBegins', callback: () => void): void;
    prependOnceListener(eventName: 'editEnds', callback: () => void): void;
    prependOnceListener(eventName: 'textChanged', callback: (e?: { insertedText: string; location: number }) => void): void;
    prependOnceListener(eventName: TextAreaEvents, callback: (...args: any[]) => void): void;
  }
