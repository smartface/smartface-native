import { ConstructorOf } from "@smartface/core";
import IFlexLayout from "./flexlayout";

const FlexLayout: ConstructorOf<IFlexLayout> = require(`./image.${Device.deviceOS.toLowerCase()}`)
.default;

export default FlexLayout;
