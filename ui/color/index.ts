import { AbstractColor } from './color';

const Color: typeof AbstractColor = require(`./color.${Device.deviceOS.toLowerCase()}`).default;

export default Color;
