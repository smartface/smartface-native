import { ConstructorOf } from '../../core/constructorof';
import ISecureData, { AbstractSecureData } from './securedata';

const SecureData: ConstructorOf<ISecureData, { key: string; ios?: { service?: any } }> = require(`./securedata.${Device.deviceOS.toLowerCase()}`).default;
type SecureData = ISecureData;

export default SecureData;
