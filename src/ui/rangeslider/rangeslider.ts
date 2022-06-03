import { AbstractView, IView, ViewAndroidProps, ViewIOSProps } from '../view/view';
import Color from '../color';
import { Point2D } from '../../primitive/point2d';
import { RangeSliderEvents } from './rangeslider-events';
import { MobileOSProps } from '../../core/native-mobile-component';
import { IImage } from '../image/image';

export interface RangeSliderIOSProps extends ViewIOSProps {
  thumbShadowColor: Color;
  thumbShadowOpacity: number;
  thumbShadowRadius: number;
  thumbShadowOffset: Point2D;
  isHapticSnap?: boolean;
  thumbImage?: IImage;
  showsThumbImageShadow?: boolean;
  applyThumbViewChanges: () => void;
}

export interface RangeSliderAndroidProps extends ViewAndroidProps {
  thumbSize: number;
  thumbColor: Color;
  thumbBorderColor: Color;
  outerTrackWeight?: number;
  thumbBorderWidth: number;
}

export interface IRangeSlider<
  TEvent extends string = RangeSliderEvents,
  TProps extends MobileOSProps<RangeSliderIOSProps, RangeSliderAndroidProps> = MobileOSProps<RangeSliderIOSProps, RangeSliderAndroidProps>
> extends IView<TEvent | RangeSliderEvents, any, TProps> {
  trackColor?: Color;
  outerTrackColor?: Color;
  trackWeight?: number;
  rangeEnabled?: boolean;
  value?: number[];
  snapStepSize?: number;
  minValue?: number;
  maxValue?: number;
  isTrackRounded?: boolean;
  /**
   * @deprecated
   * @example
   * ```
   * import RangeSlider from '@smartface/native/ui/rangeslider';
   *
   * const rangeSlider = new RangeSlider();
   * rangeSlider.on(RangeSlider.Events.ValueChange, params => {
   *  console.info('onValueChange', params);
   * });
   * ```
   */
  onValueChange?: (value: number[]) => void;
}

export declare class AbstractRangeSlider<TEvent extends string = RangeSliderEvents> extends AbstractView<TEvent | RangeSliderEvents, any, IRangeSlider> implements IRangeSlider<TEvent> {
  constructor(props?: Partial<IRangeSlider>);
  trackColor?: Color;
  outerTrackColor?: Color;
  outerTrackWeight?: number;
  trackWeight?: number;
  rangeEnabled?: boolean;
  value?: number[];
  snapStepSize?: number;
  minValue?: number;
  maxValue?: number;
  thumbImage?: IImage;
  isHapticSnap?: boolean;
  isTrackRounded?: boolean;
  /**
   * @deprecated
   * @example
   * ```
   * import RangeSlider from '@smartface/native/ui/rangeslider';
   *
   * const rangeSlider = new RangeSlider();
   * rangeSlider.on(RangeSlider.Events.ValueChange, params => {
   *  console.info('onValueChange', params);
   * });
   * ```
   */
  onValueChange?: (value: number[]) => void;
}
