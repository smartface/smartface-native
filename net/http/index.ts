import { HttpBase } from './http';

const Http: typeof HttpBase = require(`./http.${Device.deviceOS.toLowerCase()}`).default;
type Http = HttpBase;

export default Http;
