import View, { AbstractView, IView } from '../view';
import Color from '../color';
import Image from '../image';
import { Point2D } from '../../primitive/point2d';
import { RangeSliderEvents } from './rangeslider-events';

export type RangeSliderIOSProps = View['ios'] &
  Partial<{
    thumbShadowColor: Color;
    thumbShadowOpacity: number;
    thumbShadowRadius: number;
    thumbShadowOffset: Point2D;
    showsThumbImageShadow?: boolean;
    applyThumbViewChanges: () => void;
  }>;

export type RangeSliderAndroidProps = View['android'] &
  Partial<{
    thumbSize: number;
    thumbColor: Color;
    thumbBorderColor: Color;
    thumbBorderWidth: number;
  }>;

export declare interface IRangeSlider<TEvent extends string = RangeSliderEvents, TIOS = RangeSliderIOSProps, TAND = RangeSliderAndroidProps>
  extends IView<TEvent | RangeSliderEvents, TIOS & RangeSliderIOSProps, TAND & RangeSliderAndroidProps> {
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

export declare class AbstractRangeSlider<TEvent extends string = RangeSliderEvents> extends AbstractView<TEvent, RangeSliderIOSProps, RangeSliderAndroidProps> implements IRangeSlider<TEvent> {
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

const RangeSlider: typeof AbstractRangeSlider = require(`./rangeslider.${Device.deviceOS.toLowerCase()}`).default;
type RangeSlider = AbstractRangeSlider;

export default RangeSlider;
