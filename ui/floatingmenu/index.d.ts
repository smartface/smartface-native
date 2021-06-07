import FloatingMenuItem from "./floatingMenuItem";
import Image from "../image";
import Color from "../color";

export = FloatingMenu;
declare class FloatingMenu extends NativeComponent {
  constructor(params?: any);
  yogaNode: any;
  nativeObject: any;
  items: FloatingMenuItem[];
  icon: Image;
  rotateEnabled: boolean;
  color:Color;
  visible: boolean;
  onClick: () => void;
  onMenuOpen: () => void;
  onMenuClose: () => void;
  open():void;
  close():void;
  static Item: FloatingMenuItem;
}
