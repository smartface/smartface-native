import Color = require("sf-core/ui/color");
import StatusbarStyle = require("sf-core/ui/statusbarstyle");

declare type StatusBar = {
  height: number;
  backgroundColor: Color;
  visible: boolean;
  style: StatusbarStyle;
}

export =  StatusBar;
