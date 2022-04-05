import { ColorImpl } from './color';

type Color = ColorImpl;
const Color: typeof ColorImpl = require(`./color.${Device.deviceOS.toLowerCase()}`).default;

export default Color;
