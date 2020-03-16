import Font = require("../font");
import Color = require("../color");
import TextAlignment = require("../textalignment");
import Image = require("../image");
declare interface IButton {
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
