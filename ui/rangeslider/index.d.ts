import View = require("../view");
import Color = require("../color");
import Image = require("../image");
import { Point2D } from "sf-core/primitive/point2d";

export = RangeSlider;
declare interface RangeSliderParams {
  android?: {
    thumbSize?: number;
    thumbColor?: Color;
    thumbBorderColor?: Color;
    thumbBorderWidth?: number;
  }
  ios: {
      thumbShadowColor?: Color;
      thumbShadowOpacity?: number;
      thumbShadowRadius?: number;
      thumbShadowOffset?: Point2D;
      applyThumbViewChanges: () => void;
  }
  trackColor?: Color;
  outerTrackColor?: Color;
  outerTrackWeight?: number;
  trackWeight?: number;
  rangeEnabled?: boolean;
  value?: number[];
  snapStepSize?: number;
  minValue?: number;
  maxValue?: number;
  thumbImage?: Image;
  isHapticSnap?: boolean;
  showsThumbImageShadow?: boolean;
  isTrackRounded?: boolean;
  onValueChange?: (value: number[]) => void;
}
declare class RangeSlider extends View implements RangeSliderParams {
  android: {
    thumbSize?: number;
    thumbColor?: Color;
    thumbBorderColor?: Color;
    thumbBorderWidth?: number;
  } & View['android'];
  ios: {
      thumbShadowColor?: Color;
      thumbShadowOpacity?: number;
      thumbShadowRadius?: number;
      thumbShadowOffset?: Point2D;
      applyThumbViewChanges: () => void;
  } & View['ios'];
  trackColor?: Color;  outerTrackColor?: Color;
  outerTrackWeight?: number;
  trackWeight?: number;
  rangeEnabled?: boolean;
  value?: number[];
  snapStepSize?: number;
  minValue?: number;
  maxValue?: number;
  thumbImage?: Image;
  isHapticSnap?: boolean;
  showsThumbImageShadow?: boolean;
  isTrackRounded?: boolean;
  onValueChange?: (value: number[]) => void;
}