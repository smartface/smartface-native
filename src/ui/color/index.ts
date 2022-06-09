import { AbstractColor } from './color';

class ColorImpl extends AbstractColor {}
type Color = ColorImpl;
const Color: typeof ColorImpl = require(`./color.${Device.deviceOS.toLowerCase()}`).default;

export default Color;
