import { ConstructorOf } from '../../core/constructorof';
import { IEventEmitter } from '../../core/eventemitter';
import { INativeComponent } from '../../core/inative-component';
import Color from '../color';
import { ToastEvents } from './toast-events';

/**
 * @since 4.4.1
 * Toast provide brief messages about app processes at the bottom of the screen.
 *
 *     @example
 *     import Toast from '@smartface/native/ui/toast';
 *     const myToastMessage = new Toast({
 *         message: "This is a toast message",
 *         actionTextColor: Color.YELLOW,
 *         bottomOffset: 200,
 *         duration: 5
 *     });
 *     myToastMessage.createAction("Action Title", () => {console.log("Action Pressed!")})
 *     myToastMessage.show();
 *
 */
export interface IToast<TEvent extends string = ToastEvents> extends INativeComponent, IEventEmitter<TEvent | ToastEvents> {
  /**
   * Gets/sets the message of toast.
   * @android
   * @ios
   * @since 4.4.1
   */
  set message(value: string);
  get message(): string;
  /**
   * Gets/sets the background of toast message view.
   * @android
   * @ios
   * @since 4.4.1
   */
  set backgroundColor(value: Color);
  get backgroundColor(): Color;
  /**
   * Gets/sets the actionTextColor of toast action text.
   * @android
   * @ios
   * @since 4.4.1
   */
  set actionTextColor(value: Color);
  get actionTextColor(): Color;
  /**
   * Gets/sets the messageTextColor of toast message text.
   * @android
   * @ios
   * @since 4.4.1
   */
  set messageTextColor(value: Color);
  get messageTextColor(): Color;
  /**
   * Gets/sets the bottom offset of toast message view from bottom.
   * @android
   * @ios
   * @since 4.4.1
   */
  set bottomOffset(value: number);
  get bottomOffset(): number;

  /**
   * Gets/sets how long it will stay on the screen. Value can bet set between 1 - 10 as integer
   * @android
   * @ios
   * @since 4.4.1
   */
  set duration(value: number);
  get duration(): number;

  /**
   * Gets status of the toast. Returns true if the toast is currently displayed on the screen.
   * @android
   * @ios
   * @since 4.4.1
   */
  get isShowing(): boolean;

  /**
   * Add an action to toast.
   * @param {String} title of action.
   * @android
   * @ios
   * @since 4.4.1
   */
  createAction(title: string, callback: () => void): void;
  /**
   * This function called when displayed toast dismissed.
   * @param {void} callback function called when toast dismissed.
   * @android
   * @ios
   * @since 4.4.1
   */
  onDismissed: (callback: void) => void;
  /**
   *  This method shows the toast on the screen.
   * @android
   * @ios
   * @since 4.4.1
   */
  show(): void;
  /**
   * Dismisses the Toast, isShowing property set to false after this operation.
   * @android
   * @ios
   * @since 4.4.1
   */
  dismiss(): void;
}

const Toast: ConstructorOf<IToast, Partial<IToast>> = require(`./toast.${Device.deviceOS.toLowerCase()}`).default;
type Toast = IToast;
export default Toast;
