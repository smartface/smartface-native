import FloatingMenuItem = require("./floatingMenuItem");
import Image = require("../image");
import Color = require("../color");

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
