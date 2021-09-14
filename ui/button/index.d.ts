import Label from "../label";
import Font from "../font";
import Color from "../color";
import TextAlignment from "../textalignment";
import Image from "../image";
import { IButton } from "./ibutton";
import View from "../view";
import IButtonEvents from "./events";

declare class Button extends View  implements IButton {
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
  static Events: IButtonEvents
}

export = Button;
