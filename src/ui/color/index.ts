import { AbstractColor } from './color';

/**
 * Only to use type of export
 */
export declare class ColorImpl extends AbstractColor {
  red(): number;
  green(): number;
  blue(): number;
  alpha(): number;
}

type Color = ColorImpl;
const Color: typeof ColorImpl = require(`./color.${Device.deviceOS.toLowerCase()}`).default;

export default Color;
