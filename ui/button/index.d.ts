import Label from '../label';
import Font from '../font';
import Color from '../color';
import TextAlignment from '../textalignment';
import Image from '../image';
import View from '../view';

declare enum ButtonEvents {
  Press = 'press',
  LongPress = 'longPress'
}
declare namespace Button {
  const Events: typeof ButtonEvents & typeof View.Events;
  type Events = typeof Events;
}

declare class Button<TEvents = ButtonEvents> extends View<TEvents> {
  constructor(parameters?: Partial<Button>);
  text: string;
  font: Font;
  textColor: Color;
  textAlignment: TextAlignment;
  enabled: boolean;
  backgroundImage: Image;
  backgroundColor: Color;
  flexGrow: number;

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

export = Button;
