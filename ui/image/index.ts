import {ImageBase} from "./image";

const Image: typeof ImageBase = require(`./image.${Device.deviceOS.toLowerCase()}`)
.default;

export default Image;
