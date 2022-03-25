import { FlexLayoutBase } from './flexlayout';

const FlexLayout: typeof FlexLayoutBase = require(`./flexlayout.${Device.deviceOS.toLowerCase()}`).default;
type FlexLayout = FlexLayoutBase;
export default FlexLayout;
