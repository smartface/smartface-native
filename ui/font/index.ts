import { AbstractFont } from './font';

const Font: typeof AbstractFont = require(`./font.${Device.deviceOS.toLowerCase()}`).default;
export default Font;
