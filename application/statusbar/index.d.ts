import Color from "sf-core/ui/color";
import StatusbarStyle from "sf-core/ui/statusbarstyle";

declare type StatusBar = {
  height: number;
  backgroundColor: Color;
  visible: boolean;
  style: StatusbarStyle;
}

export =  StatusBar;
