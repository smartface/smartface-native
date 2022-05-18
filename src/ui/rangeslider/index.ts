import { AbstractRangeSlider } from './rangeslider';

const RangeSlider: typeof AbstractRangeSlider = require(`./rangeslider.${Device.deviceOS.toLowerCase()}`).default;
type RangeSlider = AbstractRangeSlider;

export default RangeSlider;
