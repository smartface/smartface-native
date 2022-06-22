import { IHttp } from './http';

const Http: ConstructorOf<IHttp, Partial<IHttp>> = require(`./http.${Device.deviceOS.toLowerCase()}`).default;
type Http = IHttp;

export default Http;
