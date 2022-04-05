import { MobileOSProps } from '../../core/native-mobile-component';
import Color from '../color';
import IImage from '../image';
import { AbstractView, IView } from '../view/view';
import { SwitchEvents } from './switch-events';

export type SwitchAndroidProps = IView['android'] & {
  /**
   * Gets/sets color of the thumb when Switch is OFF.
   * It is set to gray by default.
   * thumbOffColor deprecated 1.1.8 use android.thumbOffColor instead.
   *
   * @property {UI.Color} thumbOffColor
   * @android
   * @since 1.1.8
   */
  thumbOffColor?: Color;
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
   * @since 0.1
   */
  toggleOffColor: Color;
};

type SwitchIOSProps = IView['ios'];

export declare interface ISwitch<TEvent extends string = SwitchEvents, TProps extends MobileOSProps<SwitchIOSProps, SwitchAndroidProps> = MobileOSProps<SwitchIOSProps, SwitchAndroidProps>>
  extends IView<TEvent | SwitchEvents, any, TProps> {
  /**
   * Enables/disables the Switch.
   *
   *     @example
   *     import Switch from '@smartface/native/ui/switch';
   *     var mySwitch = new Switch();
   *     mySwitch.enabled = false;
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
  thumbOnColor: Color;

  /**
   * Gets/sets color of the thumb when Switch is OFF.
   * It is set to gray by default.
   *
   * @property {UI.Color} thumbOffColor
   * @android
   * @since 0.1
   */
  thumbOffColor: Color;

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
  toggleOnColor: Color;

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
   * ````
   * import Switch from '@smartface/native/ui/switch';
   *
   * const switch = new Switch();
   * switch.on(Switch.Events.ToggleChanged, (params) => {
   *  console.info('onToggleChanged', params);
   * });
   * ````
   */
  onToggleChanged: (toggle: boolean) => void;
}

export declare class AbstractSwitch<TEvent extends string = SwitchEvents> extends AbstractView<TEvent, any, ISwitch> implements ISwitch<TEvent> {
  get enabled(): boolean;
  set enabled(value: boolean);

  get thumbOnColor(): Color;
  set thumbOnColor(value: Color);

  get thumbOffColor(): Color;
  set thumbOffColor(value: Color);

  get toggle(): boolean;
  set toggle(value: boolean);

  get toggleOnColor(): Color;
  set toggleOnColor(value: Color);

  get onToggleChanged(): (toggle: boolean) => void;
  set onToggleChanged(value: (toggle: boolean) => void);
}
