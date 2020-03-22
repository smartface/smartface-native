import View = require("../view");
import Button = require(".");
import { IButton } from "./IButton";
declare class ButtonIOS extends View implements IButton {
  constructor(params?: any);
  text: string;
  font: import("../font");
  textColor: import("../color");
  textAlignment: import("../textalignment");
  enabled: boolean;
  backgroundImage: any;
  backgroundColor: import("../color");
  onPress: () => void;
  onLongPress: () => void;
}

export = ButtonIOS;
