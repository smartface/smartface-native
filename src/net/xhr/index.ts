import { ConstructorOf } from '../../core/constructorof';
import { IXHR } from './xhr';

const XHR: ConstructorOf<IXHR, Partial<IXHR>> = require(`./xhr.${Device.deviceOS.toLowerCase()}`).default;
type XHR = IXHR;

export default XHR;