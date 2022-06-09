import { IHardware } from './hardware';

const Hardware: IHardware = require(`./hardware.${Device.deviceOS.toLowerCase()}`).default;

export default Hardware;
