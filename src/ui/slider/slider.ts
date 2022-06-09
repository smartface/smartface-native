import { IColor } from '../color/color';
import { IImage } from '../image/image';
import { IView } from '../view/view';
import { SliderEvents } from './slider-events';

/**
 * @class UI.Slider
 * @since 0.1
 * @extends UI.View
 *
 * Slider can be used to select a value from a range of values by moving the slider thumb along the track.
 *
 *     @example
 *     import Color from '@smartface/native/ui/color';
 *     import Slider from '@smartface/native/ui/slider';
 *     const mySlider = new Slider({
 *         width: 200,
 *         maxValue: 100,
 *         minValue: 0,
 *         value: 40,
 *         minTrackColor: Color.RED,
 *         thumbColor: Color.BLUE,
 *         onValueChange: () => {
 *             console.log("Slider's value: " + mySlider.value);
 *         }
 *     });
 *
 */
export interface ISlider<TEvent extends string = SliderEvents> extends IView<TEvent | SliderEvents> {
  /**
   * A private variable which is passed to the constructor whether to assign the default values or not.
   * You shouldn't need this.
   * @private
   */
  skipDefaults: boolean;
  /**
   * Gets/sets color of the thumb.
   *
   *     @example
   *     import Slider from '@smartface/native/ui/slider';
   *     import Color from '@smartface/native/ui/color';
   *     var mySlider = new Slider();
   *     mySlider.thumbColor = Color.GRAY;
   *
   * @property {UI.Color} [thumbColor = UI.Color.GRAY]
   * @android
   * @ios
   * @since 0.1
   */
  thumbColor: IColor;
  /**
   * Gets/sets image of the thumb.
   *
   *     @example
   *     import Slider from '@smartface/native/ui/slider';
   *     var mySlider = new Slider();
   *     mySlider.thumbImage = Image.createFromFile("images://smartface.png");
   *
   * @property {UI.Image} thumbImage
   * @android
   * @ios
   * @since 0.1
   */
  thumbImage: IImage;
  /**
   * Gets/sets color of the thumb's minimum track color.
   *
   * @example
   * import Slider from '@smartface/native/ui/slider';
   * import Color from '@smartface/native/ui/color';
   * const mySlider = new Slider();
   * mySlider.minTrackColor = Color.BLUE;
   *
   * @property {UI.Color} [minTrackColor = UI.Color.DARKGRAY]
   * @android
   * @ios
   * @since 0.1
   */
  minTrackColor: IColor;
  /**
   * Gets/sets color of the thumb's maximum track color.
   *
   *     @example
   *     import Slider from '@smartface/native/ui/slider';
   *     import Color from '@smartface/native/ui/color';
   *     var mySlider = new Slider();
   *     mySlider.maxTrackColor = Color.GREEN;
   *
   * @property {UI.Color} [maxTrackColor = UI.Color.GREEN]
   * @android
   * @ios
   * @since 0.1
   */
  maxTrackColor: IColor;
  /**
   * Gets/sets value of the slider. This value should be less or equals to maxValue,
   * greater or equals to minValue.
   *
   *     @example
   *     import Slider from '@smartface/native/ui/slider';
   *     var mySlider = new Slider();
   *     mySlider.value = 30;
   *
   * @property {Number} [value = 0]
   * @android
   * @ios
   * @since 0.1
   */
  value: number;
  /**
   * Gets/sets minimum value of the slider.
   *
   *     @example
   *     import Slider from '@smartface/native/ui/slider';
   *     var mySlider = new Slider();
   *     mySlider.minValue = 0;
   *
   * @property {Number} [minValue = 0]
   * @android
   * @ios
   * @since 0.1
   */
  minValue: number;
  /**
   * Gets/sets maximum value of the slider.
   *
   *     @example
   *     import Slider from '@smartface/native/ui/slider';
   *     var mySlider = new Slider();
   *     mySlider.maxValue = 100;
   *
   * @property {Number} [maxValue = 100]
   * @android
   * @ios
   * @since 0.1
   */
  maxValue: number;
  /**
   * Enables/disables the slider.
   *
   * @since 1.1.8
   * @property {Boolean} [enabled = true]
   * @android
   * @ios
   */
  enabled: boolean;
  /**
   * This event is called when slider value changes.
   *
   *     @example
   *     import Slider from '@smartface/native/ui/slider';
   *     var mySlider = new Slider();
   *     mySlider.onValueChange = valueChanged;
   *     mySlider.value = 40;
   *
   *     function valueChanged() {
   *         console.log("New value is: " + mySlider.value);
   *     }
   *
   * @event onValueChange
   * @android
   * @ios
   * @since 0.1
   * @deprecated
   * @example
   * ```
   * import Slider from '@smartface/native/ui/slider';
   *
   * const slider = new Slider();
   * slider.on(Slider.Events.ValueChange, () => {
   *  console.info('valueChange');
   * });
   * ```
   */
  onValueChange: (value: number) => void;
}
