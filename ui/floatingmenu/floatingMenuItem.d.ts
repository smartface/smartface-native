import Color from "../color";
import Image from "../image";

export = FloatingMenuItem;
declare function FloatingMenuItem(params: any): void;
declare class FloatingMenuItem {
  title: string;
  titleColor: Color;
  icon: Image;
  color: Color;
  onClick: () => void;
}
