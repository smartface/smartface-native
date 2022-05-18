import { AbstractRSA } from './rsa';

const RSA: typeof AbstractRSA = require(`./rsa.${Device.deviceOS.toLowerCase()}`).default;
type RSA = AbstractRSA;

export default RSA;
