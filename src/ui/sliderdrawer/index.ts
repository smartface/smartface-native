import { ISliderDrawer } from './sliderdrawer';

const SliderDrawer: ConstructorOf<ISliderDrawer, Partial<ISliderDrawer>> = require(`./sliderdrawer.${Device.deviceOS.toLowerCase()}`).default;
type SliderDrawer = ISliderDrawer;
export default SliderDrawer;
