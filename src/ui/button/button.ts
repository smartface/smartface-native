import Image from '../image';
import { ButtonEvents } from './button-events';
import { ILabel } from '../label/label';
import ViewState from '../shared/viewState';
import { MobileOSProps } from '../../core/native-mobile-component';

type MobileProps = MobileOSProps<ILabel['ios'], ILabel['android']>;
export declare interface IButton<TEvent extends string = ButtonEvents, TMobile extends MobileProps = MobileProps> extends ILabel<TEvent | ButtonEvents, TMobile> {
  /**
   * Enables/disables the Button. This will dim the button color. You can set the dim property on Button style.
   *
   *     @example
   *     import Button from '@smartface/native/ui/button';
   *     const myButton = new Button();
   *     myButton.enabled = false;
   *
   * @since 0.1
   * @android
   * @ios
   */
  enabled: boolean;
  /**
   * Gets/sets background image of a Button.
   *
   *     @example
   *     import Image from '@smartface/native/ui/image';
   *     import Button from '@smartface/native/ui/button';
   *     var myButton = new Button();
   *     myButton.backgroundImage = {
   *         normal: Image.createFromFile("images://normal.png"),
   *         disabled: Image.createFromFile("images://disabled.png"),
   *         pressed: Image.createFromFile("images://pressed.png"),
   *     };
   *     myButton.text = "First button text";
   *
   *     const myButton2 = new Button();
   *     myButton2.backgroundImage = Image.createFromFile("images://normal.png");
   *     myButton2.text = "Second button text";
   *
   * @since 0.1
   * @android
   * @ios
   */
  backgroundImage: ViewState<Image>;
  /**
   * @deprecated
   * @example
   * ````
   * import Button from '@smartface/native/ui/button';
   *
   * this.button1.on(Button.Events.Press, () => {
   *  console.info('Button pressed');
   * });
   * ````
   */
  onPress: () => void;
  /**
   * This only works for Android
   * @deprecated
   * @example
   * ````
   * import Button from '@smartface/native/ui/button';
   *
   * this.button1.on(Button.Events.LongPress, () => {
   *  console.info('Button long pressed');
   * });
   * ````
   */
  onLongPress: () => void;
}
