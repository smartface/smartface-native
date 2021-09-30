import Label from "../label";
import Font from "../font";
import Color from "../color";
import TextAlignment from "../textalignment";
import Image from "../image";
import { IButton } from "./ibutton";
import View from "../view";
import { Events } from "../viewgroup";

declare enum ButtonEvents {
  Press = 'press',
  LongPress = 'longPress'
}
declare namespace Button {
  const Events: typeof ButtonEvents & typeof View.Events
  type Events = typeof Events
}


declare class Button extends View<ButtonEvents> {
  constructor(parameters?: Optional<IButton>);
  text: string;
  font: Font;
  textColor: Color;
  textAlignment: TextAlignment;
  enabled: boolean;
  backgroundImage: Image;
  backgroundColor: Color;
  flexGrow: number;
  onPress: () => void;
  onLongPress: () => void;
}

export = Button;
