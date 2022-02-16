import { FlexLayoutBase } from "./flexlayout";

const FlexLayout: typeof FlexLayoutBase = require(`./image.${Device.deviceOS.toLowerCase()}`)
.default;

export default FlexLayout;
