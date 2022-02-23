import { AbstractFont } from './font';

const Font: typeof AbstractFont = require(`./font.${Device.deviceOS.toLowerCase()}`).default;
type Font = AbstractFont;
export default Font;
