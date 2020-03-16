import Color = require("../color");
import Image = require("../image");

export = FloatingMenuItem;
declare function FloatingMenuItem(params: any): void;
declare class FloatingMenuItem {
  title: string;
  titleColor: Color;
  icon: Image;
  color: Color;
  onClick: () => void;
}
