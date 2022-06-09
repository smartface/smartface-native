import { IView, ViewAndroidProps, ViewIOSProps } from '../view/view';
import Color from '../color';
import { Point2D } from '../../primitive/point2d';
import { RangeSliderEvents } from './rangeslider-events';
import { MobileOSProps } from '../../core/native-mobile-component';
import { IImage } from '../image/image';

export interface RangeSliderIOSProps extends ViewIOSProps {
  /**
   * The color of the shadow. Use {@link UI.RangeSlider#applyThumbViewChanges applyThumbViewChanges} after changes.
   *
   * @since 4.2.0
   * @property {UI.Color} [thumbShadowColor = UI.Color.GRAY]
   * @ios
   */
  thumbShadowColor: Color;
  /**
   * The value in this property must be in the range 0.0 (transparent) to 1.0 (opaque). Use {@link UI.RangeSlider#applyThumbViewChanges applyThumbViewChanges} after changes.
   *
   * @since 4.2.0
   * @property {Number} [thumbShadowOpacity = 0.25]
   * @ios
   */
  thumbShadowOpacity: number;
  /**
   * The blur radius (in points) used to render the shadow. Use {@link UI.RangeSlider#applyThumbViewChanges applyThumbViewChanges} after changes.
   *
   * @since 4.2.0
   * @property {Number} [thumbShadowRadius = 0.5]
   * @ios
   */
  thumbShadowRadius: number;
  /**
   * The offset (in points) of the shadow. Use {@link UI.RangeSlider#applyThumbViewChanges applyThumbViewChanges} after changes.
   *
   * @property {Object} [thumbShadowOffset = {x: 0.0,y: 4.0}]
   * @property {Number} thumbShadowOffset.x
   * @property {Number} thumbShadowOffset.y
   * @ios
   * @since 4.2.0
   */
  thumbShadowOffset: Point2D;
  /**
   * This property enables / disables haptic feedback when sliding over snap values.
   *
   * @since 4.1.5
   * @property {Boolean} [isHapticSnap = true]
   * @ios
   */
  isHapticSnap?: boolean;
  /**
   * Sets given image to thumb
   *
   * @since 4.1.5
   * @property {UI.Image} [thumbImage = undefined]
   * @ios
   */
  thumbImage?: IImage;
  /**
   * This property enables / disables the shadow under the image.
   *
   * @since 4.1.5
   * @property {Boolean} [showsThumbImageShadow = true]
   * @ios
   */
  showsThumbImageShadow?: boolean;
  /**
   * If you make any changes to ThumbView, you should call applyThumbViewChanges.
   *
   * @method applyThumbViewChanges
   * @ios
   */
  applyThumbViewChanges(): void;
}

export interface RangeSliderAndroidProps extends ViewAndroidProps {
  /**
   * Gets/Sets size of the thumbs.
   *
   * @since 4.1.5
   * @property {Number} thumbSize
   * @android
   */
  thumbSize: number;
  /**
   * Gets/Sets color of the thumbs.
   *
   * @since 4.1.5
   * @property {UI.Color} thumbColor
   * @android
   */
  thumbColor: Color;
  /**
   * Gets/Sets border color of the thumbs.
   *
   * @since 4.1.5
   * @property {UI.Color} thumbBorderColor
   * @android
   */
  thumbBorderColor: Color;
  /**
   * Gets/Sets weight of track line in RangeSlider.
   *
   * @since 4.1.5
   * @property {Number} outerTrackWeight
   * @android
   */
  outerTrackWeight?: number;
  /**
   * Gets/Sets border width of the thumbs.
   *
   * @since 4.1.5
   * @property {Number} thumbBorderWidth
   * @android
   */
  thumbBorderWidth: number;
}

export interface IRangeSlider<
  TEvent extends string = RangeSliderEvents,
  TProps extends MobileOSProps<RangeSliderIOSProps, RangeSliderAndroidProps> = MobileOSProps<RangeSliderIOSProps, RangeSliderAndroidProps>
> extends IView<TEvent | RangeSliderEvents, any, TProps> {
  /**
   * Gets/Sets color of the connecting line between the thumbs.
   *
   * @since 4.1.5
   * @property {UI.Color} trackColor
   * @android
   * @ios
   */
  trackColor: Color;
  /**
   * Gets/Sets color of the bar line in RangeSlider.
   *
   * @since 4.1.5
   * @property {UI.Color} outerTrackColor
   * @android
   * @ios
   */
  outerTrackColor: Color;
  /**
   * Gets/Sets weight of track line. In Android, outer track line won't change unless {@link UI.RangeSlider#outerTrackWeight outerTrackWeight} specified.
   *
   * @since 4.1.5
   * @property {Number} trackWeight
   * @android
   * @ios
   */
  trackWeight: number;
  /**
   * Specifies the slider as a range or single.
   *
   * @since 4.1.5
   * @property {Boolean} [rangeEnabled = true]
   * @ios
   * @android
   */
  rangeEnabled: boolean;
  /**
   * Gets/Sets thumbs value. Default values are differentiated in both OS.
   *
   * @since 4.1.5
   * @property {Number[]} value
   * @android
   * @ios
   */
  value: number[];
  /**
   * Gets/Sets minimum steps between range.
   *
   * @since 4.1.5
   * @property {Number} [snapStepSize = 1 ]
   * @android
   * @ios
   */
  snapStepSize: number;
  /**
   * Gets/Sets start value in RangeSlider
   *
   * @since 4.1.5
   * @property {Number} [minValue = 0]
   * @android
   * @ios
   */
  minValue: number;
  /**
   * Gets/Sets end value in RangeSlider
   *
   * @since 4.1.5
   * @property {Number} [maxValue = 5]
   * @android
   * @ios
   */
  maxValue: number;
  /**
   * Set the bar with rounded corners
   *
   * @since 4.1.5
   * @property {Boolean} [isTrackRounded = true]
   * @ios
   * @android
   */
  isTrackRounded: boolean;
  /**
   * This event is called when rangeslider value is changed
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
  onValueChange: (value: number[]) => void;

  on(eventName: 'valueChange', callback: (value: number[]) => void): () => void;
  on(eventName: RangeSliderEvents, callback: (...args: any[]) => void): () => void;

  off(eventName: 'valueChange', callback: (value: number[]) => void): void;
  off(eventName: RangeSliderEvents, callback: (...args: any[]) => void): void;

  emit(eventName: 'valueChange', value: number[]): void;
  emit(eventName: RangeSliderEvents, ...args: any[]): void;

  once(eventName: 'valueChange', callback: (value: number[]) => void): () => void;
  once(eventName: RangeSliderEvents, callback: (...args: any[]) => void): () => void;

  prependListener(eventName: 'valueChange', callback: (value: number[]) => void): void;
  prependListener(eventName: RangeSliderEvents, callback: (...args: any[]) => void): void;

  prependOnceListener(eventName: 'valueChange', callback: (value: number[]) => void): void;
  prependOnceListener(eventName: RangeSliderEvents, callback: (...args: any[]) => void): void;
}
