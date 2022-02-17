import { AbstractFlexLayout } from "./flexlayout";

const FlexLayout: typeof AbstractFlexLayout = require(`./image.${Device.deviceOS.toLowerCase()}`)
.default;

export default FlexLayout;
