import { AbstractSwitch } from './switch';

const Switch: typeof AbstractSwitch = require(`./switch.${Device.deviceOS.toLowerCase()}`).default;
type Switch = AbstractSwitch;

export default Switch;
