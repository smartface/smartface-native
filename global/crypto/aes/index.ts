import { AESBase } from "./aes";

const AES: typeof AESBase = require(`./aes.${Device.deviceOS.toLowerCase()}`)
.default;

export default AES;