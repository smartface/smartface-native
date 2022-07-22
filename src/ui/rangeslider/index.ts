import { IRangeSlider } from './rangeslider';

const RangeSlider: ConstructorOf<IRangeSlider, Partial<IRangeSlider>> = require(`./rangeslider.${Device.deviceOS.toLowerCase()}`).default;
type RangeSlider = IRangeSlider;

export default RangeSlider;
