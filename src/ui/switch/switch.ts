import { MobileOSProps } from '../../core/native-mobile-component';
import { IColor } from '../color/color';
import { IImage } from '../image/image';
import { IView, ViewAndroidProps, ViewIOSProps } from '../view/view';
import { SwitchEvents } from './switch-events';

export interface SwitchAndroidProps extends ViewAndroidProps {
  /**
   * Gets/sets color of the thumb when Switch is OFF.
   * It is set to gray by default.
   * thumbOffColor deprecated 1.1.8 use android.thumbOffColor instead.
   *
   * @property {UI.Color} thumbOffColor
   * @android
   * @deprecated
   * @since 1.1.8
   */
  thumbOffColor?: IColor;
  /**
   * Gets/sets the toggle image of the switch. This property should be used before assigning colors.
   *
   * @property {UI.Color | String} toggleImage
   * @android
   * @since 3.2.1
   */

  toggleImage: IImage | string;
  /**
   * Gets/sets the thumb image of the switch. This property should be used before assigning colors.
   *
   * @property {UI.Color | String} thumbImage
   * @android
   * @since 3.2.1
   */
  thumbImage: IImage | string;
  /**
   * Gets/sets the background of the switch when it is OFF.  It is set to gray
   * by default. This property works only for Android.
   *
   *     @example
   *     import Switch from '@smartface/native/ui/switch';
   *     import Color from '@smartface/native/ui/color';
   *     var mySwitch = new Switch();
   *     mySwitch.android.toggleOffColor = Color.DARKGRAY;
   *
   * @property {UI.Color} toggleOffColor
   * @android
   * @deprecated
   * @since 0.1
   */
  toggleOffColor: IColor;
}

export interface ISwitch<TEvent extends string = SwitchEvents, TProps extends MobileOSProps<ViewIOSProps, SwitchAndroidProps> = MobileOSProps<ViewIOSProps, SwitchAndroidProps>>
  extends IView<TEvent | SwitchEvents, any, TProps> {
  /**
   * Enables/disables the Switch.
   *
   * @example
   * import Switch from '@smartface/native/ui/switch';
   * var mySwitch = new Switch();
   * mySwitch.enabled = false;
   *
   * @since 1.1.8
   * @property {Boolean} [enabled = true]
   * @android
   * @ios
   */
  enabled: boolean;

  /**
   * Gets/sets color of the thumb when Switch is ON. If this is set on iOS, the switch grip will lose its drop shadow.
   * The default of this property is green on Android and null on iOS. For iOS, If you want to use default of this property, you should set null.
   *
   * @property {UI.Color} thumbOnColor
   * @android
   * @ios
   * @since 0.1
   */
  thumbOnColor: IColor;

  /**
   * Gets/sets color of the thumb when Switch is OFF.
   * It is set to gray by default.
   *
   * @property {UI.Color} thumbOffColor
   * @android
   * @ios
   * @since 5.0.1
   */
  thumbOffColor: IColor;

  /**
   * Gets/sets toggle value of Switch. When Switch is ON,
   * the value of this property will be true. It is set to false by default.
   *
   * @property {Boolean} toggle
   * @android
   * @ios
   * @since 0.1
   */
  toggle: boolean;

  /**
   * Gets/sets the background of the switch when it is ON.
   * The default of this property is gray on Android and green on iOS.
   *
   * @property {UI.Color} toggleOnColor
   * @android
   * @ios
   * @since 0.1
   */
  toggleOnColor: IColor;

  /**
   * This event is called when the state of switch changes from ON to OFF or vice versa.
   *
   * @event onToggleChanged
   * @param {Boolean} state
   * @deprecated
   * @android
   * @ios
   * @since 0.1
   * @example
   * ```
   * import Switch from '@smartface/native/ui/switch';
   *
   * const switch = new Switch();
   * switch.on(Switch.Events.ToggleChanged, (params) => {
   *  console.info('onToggleChanged', params);
   * });
   * ```
   */
  onToggleChanged: (toggle: boolean) => void;
  /**
   * Gets/sets the background of the switch when it is OFF.  It is set to gray
   * by default. This property works only for Android.
   *
   *     @example
   *     import Switch from '@smartface/native/ui/switch';
   *     import Color from '@smartface/native/ui/color';
   *     var mySwitch = new Switch();
   *     mySwitch.toggleOffColor = Color.DARKGRAY;
   *
   * @property {UI.Color} toggleOffColor
   * @android
   * @ios
   * @since 5.0.1
   */
    
  toggleOffColor: IColor;

  on(eventName: 'toggleChanged', callback: (isChecked: boolean) => void): () => void;
  on(eventName: SwitchEvents, callback: (...args: any[]) => void): () => void;

  off(eventName: 'toggleChanged', callback: (isChecked: boolean) => void): void;
  off(eventName: SwitchEvents, callback: (...args: any[]) => void): void;

  emit(eventName: 'toggleChanged', isChecked: boolean): void;
  emit(eventName: SwitchEvents, ...args: any[]): void;

  once(eventName: 'toggleChanged', callback: (isChecked: boolean) => void): () => void;
  once(eventName: SwitchEvents, callback: (...args: any[]) => void): () => void;

  prependListener(eventName: 'toggleChanged', callback: (isChecked: boolean) => void): void;
  prependListener(eventName: SwitchEvents, callback: (...args: any[]) => void): void;

  prependOnceListener(eventName: 'toggleChanged', callback: (isChecked: boolean) => void): void;
  prependOnceListener(eventName: SwitchEvents, callback: (...args: any[]) => void): void;
}
