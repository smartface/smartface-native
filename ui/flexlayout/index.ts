import { ConstructorOf } from "core/constructorof";
import IFlexLayout from "./flexlayout";
import { FlexLayoutEvents } from "./flexlayout-events";

const FlexLayout: ConstructorOf<IFlexLayout> = require(`./image.${Device.deviceOS.toLowerCase()}`)
.default;

export default FlexLayout;
