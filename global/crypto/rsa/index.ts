import { RSABase } from './rsa';

const RSA: typeof RSABase = require(`./rsa.${Device.deviceOS.toLowerCase()}`).default;
type RSA = RSABase;

export default RSA;
