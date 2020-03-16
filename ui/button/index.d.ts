import Label = require("../label");
import Font = require("../font");
import Color = require("../color");
import TextAlignment = require("../textalignment");
import Image = require("../image");
import { IButton } from "./ibutton";
import View = require("../view");

declare class Button extends View  implements IButton {
  constructor(parameters?: Optional<IButton>);
  text: string;
  font: Font;
  textColor: Color;
  textAlignment: TextAlignment;
  enabled: boolean;
  backgroundImage: Image;
  backgroundColor: Color;
  onPress: () => void;
  onLongPress: () => void;
}

export = Button;
