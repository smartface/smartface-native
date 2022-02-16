import { ConstructorOf } from "core/constructorof";
import { ViewGroup } from "./viewgroup";

const ViewGroup: ConstructorOf<ViewGroup, Partial<ViewGroup>> = require(`./view.${Device.deviceOS.toLowerCase()}`).default;

export default ViewGroup;
