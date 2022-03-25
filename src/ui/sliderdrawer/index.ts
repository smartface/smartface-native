import { AbstractSliderDrawer } from './sliderdrawer';

const SliderDrawer: typeof AbstractSliderDrawer = require(`./sliderdrawer.${Device.deviceOS.toLowerCase()}`).default;
type SliderDrawer = AbstractSliderDrawer;
export default SliderDrawer;
