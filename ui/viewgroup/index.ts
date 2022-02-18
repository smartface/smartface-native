import { AbstractViewGroup } from "./viewgroup";

const ViewGroup: typeof AbstractViewGroup = require(`./view.${Device.deviceOS.toLowerCase()}`).default;
const v = new ViewGroup()
export default ViewGroup;
