import { HardwareBase } from './hardware';

const Hardware: typeof HardwareBase = require(`./hardware.${Device.deviceOS.toLowerCase()}`).default;
type Hardware = HardwareBase;

export default Hardware;
