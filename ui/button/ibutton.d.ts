import Font from "../font";
import Color from "../color";
import TextAlignment from "../textalignment";
import Image from "../image";
declare interface IButton {
  text: string;
  font: Font;
  textColor: Color;
  textAlignment: TextAlignment;
  enabled: boolean;
  backgroundImage: Image;
  backgroundColor: Color;
  flexGrow: number,
  onPress: () => void;
  onLongPress: () => void;
}
