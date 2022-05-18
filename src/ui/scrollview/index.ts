import { AbstractScrollView } from './scrollview';

const ScrollView: typeof AbstractScrollView = require(`./scrollview.${Device.deviceOS.toLowerCase()}`).default;
type ScrollView = AbstractScrollView;
export default ScrollView;
