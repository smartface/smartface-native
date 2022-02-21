import { AbstactColor } from './color';

const Color: typeof AbstactColor = require(`./color.${Device.deviceOS.toLowerCase()}`).default;

export default Color;
