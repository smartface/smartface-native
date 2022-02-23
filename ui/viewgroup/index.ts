import { AbstractViewGroup } from './viewgroup';

const ViewGroup: typeof AbstractViewGroup = require(`./viewgroup.${Device.deviceOS.toLowerCase()}`).default;
type ViewGroup = AbstractViewGroup;
export default ViewGroup;
