import { ISwitch } from './switch';
import { ConstructorOf } from '../../core/constructorof';

const Switch: ConstructorOf<ISwitch, Partial<ISwitch>> = require(`./switch.${Device.deviceOS.toLowerCase()}`).default;
type Switch = ISwitch;

export default Switch;
