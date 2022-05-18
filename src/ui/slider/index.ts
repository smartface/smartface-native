import { AbstractSlider } from './slider';

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
