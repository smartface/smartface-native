import Color = require("../color");
import Font = require("../font");
import Image = require("../image");

declare class SwipeItem {
  constructor(params?: any);
  text: string;
  backgroundColor: Color;
  textColor: Color;
  icon: undefined | Image;
  font: Font;
  onPress: (params: { index: number }) => void;
  padding: number;
  threshold: number;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  borderBottomLeftRadius: number;
  borderBottomRightRadius: number;
  borderTopLeftRadius: number;
  borderTopRightRadius: number;
  isAutoHide: boolean;
  iconTextSpacing: number;
}

export = SwipeItem;