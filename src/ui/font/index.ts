import { AbstractFont } from './font';

declare class FontImpl extends AbstractFont {
    get size(): number;
    sizeOfString(string: string, maxWidth: number): { width: number; height: number; };
}

const Font: typeof FontImpl = require(`./font.${Device.deviceOS.toLowerCase()}`).default;
type Font = FontImpl;
export default Font;
