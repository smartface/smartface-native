import View from '../view';
import Color from '../color';
import Image from '../image';
import { Point2D } from '../../primitive/point2d';

declare enum RangeSliderEvents {
  ValueChange = 'valueChange'
}
declare namespace RangeSlider {
  const Events: typeof RangeSliderEvents & typeof View.Events;
  type Events = typeof Events;
}

declare interface RangeSliderParams {
  android?: Partial<{
    thumbSize: number;
    thumbColor: Color;
    thumbBorderColor: Color;
    thumbBorderWidth: number;
  }>;
  ios: Partial<{
    thumbShadowColor: Color;
    thumbShadowOpacity: number;
    thumbShadowRadius: number;
    thumbShadowOffset: Point2D;
    applyThumbViewChanges: () => void;
  }>;
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
  /**
   * @deprecated
   * @example
   * ````
   * import RangeSlider from '@smartface/native/ui/rangeslider';
   *
   * const rangeSlider = new RangeSlider();
   * rangeSlider.on(RangeSlider.Events.ValueChange, params => {
   *  console.info('onValueChange', params);
   * });
   * ````
   */
  onValueChange?: (value: number[]) => void;
}
declare class RangeSlider extends View<RangeSliderEvents> implements RangeSliderParams {
  constructor(params?: Partial<RangeSlider>);
  android: Partial<{
    thumbSize: number;
    thumbColor: Color;
    thumbBorderColor: Color;
    thumbBorderWidth: number;
  }> &
    View['android'];
  ios: Partial<{
    thumbShadowColor: Color;
    thumbShadowOpacity: number;
    thumbShadowRadius: number;
    thumbShadowOffset: Point2D;
    applyThumbViewChanges: () => void;
  }> &
    View['ios'];
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
  /**
   * @deprecated
   * @example
   * ````
   * import RangeSlider from '@smartface/native/ui/rangeslider';
   *
   * const rangeSlider = new RangeSlider();
   * rangeSlider.on(RangeSlider.Events.ValueChange, params => {
   *  console.info('onValueChange', params);
   * });
   * ````
   */
  onValueChange?: (value: number[]) => void;
}

export = RangeSlider;
