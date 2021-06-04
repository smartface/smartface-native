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
  public readonly ios: {
    isAutoHide: boolean;
    padding: number;
    iconTextSpacing: number;
  }
  public readonly android: {
    borderBottomLeftRadius: number;
    borderBottomRightRadius: number;
    borderTopLeftRadius: number;
    borderTopRightRadius: number;
    paddingTop: number;
    paddingBottom: number;
    paddingLeft: number;
    paddingRight: number;
    threshold: number;
  }
}

export = SwipeItem;