import { AbstractColor } from './color';

const Color: typeof AbstractColor = require(`./color.${Device.deviceOS.toLowerCase()}`).default;
type Color = AbstractColor;

export default Color;
