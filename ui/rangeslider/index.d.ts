import View from "../view";
import Color from "../color";
import Image from "../image";
import { Point2D } from "../../primitive/point2d";
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

export = RangeSlider;
