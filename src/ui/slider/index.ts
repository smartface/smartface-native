import { ConstructorOf } from '../../core/constructorof';
import { ISlider } from './slider';

const Slider: ConstructorOf<ISlider, Partial<ISlider>> = require(`./slider.${Device.deviceOS.toLowerCase()}`).default;
type Slider = ISlider;

export default Slider;
