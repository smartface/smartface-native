import { ConstructorOf } from '../../core/constructorof';
import ISecureData from './securedata';

const SecureData: ConstructorOf<ISecureData, Partial<ISecureData>> = require(`./securedata.${Device.deviceOS.toLowerCase()}`).default;
type SecureData = ISecureData;

export default SecureData;
