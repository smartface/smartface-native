import { AbstractAES } from './aes';

const AES: typeof AbstractAES = require(`./aes.${Device.deviceOS.toLowerCase()}`).default;
type AES = AbstractAES;

export default AES;
