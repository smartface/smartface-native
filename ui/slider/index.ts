import Color from '../color';
import Image from '../image';
import { AbstractView, IView } from '../view';
import { SliderEvents } from './slider-events';

export declare interface ISlider<TEvent extends string = SliderEvents, TIOS = {}, TAND = {}> extends IView<TEvent | SliderEvents, TIOS, TAND> {
  skipDefaults: boolean;
  /**
   * Gets/sets color of the thumb.
   *
   *     @example
   *     const Slider = require('@smartface/native/ui/slider');
   *     var Color = require('@smartface/native/ui/color');
   *     var mySlider = new Slider();
   *     mySlider.thumbColor = Color.GRAY;
   *
   * @property {UI.Color} [thumbColor = UI.Color.GRAY]
   * @android
   * @ios
   * @since 0.1
   */
  thumbColor: Color;
  /**
   * Gets/sets image of the thumb.
   *
   *     @example
   *     const Slider = require('@smartface/native/ui/slider');
   *     var mySlider = new Slider();
   *     mySlider.thumbImage = Image.createFromFile("images://smartface.png");
   *
   * @property {UI.Image} thumbImage
   * @android
   * @ios
   * @since 0.1
   */
  thumbImage: Image;
  /**
   * Gets/sets color of the thumb's minimum track color.
   *
   *     @example
   *     const Slider = require('@smartface/native/ui/slider');
   *     var Color = require('@smartface/native/ui/color');
   *     var mySlider = new Slider();
   *     mySlider.minTrackColor = Color.BLUE;
   *
   * @property {UI.Color} [minTrackColor = UI.Color.DARKGRAY]
   * @android
   * @ios
   * @since 0.1
   */
  minTrackColor: Color;
  /**
   * Gets/sets color of the thumb's maximum track color.
   *
   *     @example
   *     const Slider = require('@smartface/native/ui/slider');
   *     var Color = require('@smartface/native/ui/color');
   *     var mySlider = new Slider();
   *     mySlider.maxTrackColor = Color.GREEN;
   *
   * @property {UI.Color} [maxTrackColor = UI.Color.GREEN]
   * @android
   * @ios
   * @since 0.1
   */
  maxTrackColor: Color;
  /**
   * Gets/sets value of the slider. This value should be less or equals to maxValue,
   * greater or equals to minValue.
   *
   *     @example
   *     const Slider = require('@smartface/native/ui/slider');
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
   *     const Slider = require('@smartface/native/ui/slider');
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
   *     const Slider = require('@smartface/native/ui/slider');
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
   *     const Slider = require('@smartface/native/ui/slider');
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
   * ````
   * import Slider from '@smartface/native/ui/slider';
   *
   * const slider = new Slider();
   * slider.on(Slider.Events.ValueChange, () => {
   *  console.info('valueChange');
   * });
   * ````
   */
  onValueChange: (value: number) => void;
}

export declare class AbstractSlider<TEvent extends string = SliderEvents> extends AbstractView<TEvent | SliderEvents, any, ISlider> implements ISlider<TEvent> {
  constructor(params: Partial<ISlider>);
  skipDefaults: boolean;
  thumbColor: Color;
  thumbImage: Image;
  minTrackColor: Color;
  maxTrackColor: Color;
  value: number;
  minValue: number;
  maxValue: number;
  enabled: boolean;
  onValueChange: () => void;
}

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
const Slider: typeof AbstractSlider = require(`./slider.${Device.deviceOS.toLowerCase()}`).default;
type Slider = AbstractSlider;

export default Slider;
