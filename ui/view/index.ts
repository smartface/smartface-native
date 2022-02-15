import { ConstructorOf } from "../../core/constructorof";
import { View } from "./view";

const View: ConstructorOf<View, Partial<View>> = require(`./view.${Device.deviceOS.toLowerCase()}`).default;

export default View;
