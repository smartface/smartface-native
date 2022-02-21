import { AbstractFont } from './font';

const Font: typeof AbstractFont = require(`./view.${Device.deviceOS.toLowerCase()}`).default;
export default Font;
