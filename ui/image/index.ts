import {ImageBase} from "./image";

const Image: typeof ImageBase = require(`./image.${Device.deviceOS.toLowerCase()}`).default;
type Image = ImageBase;

export default Image;
