import { SecureDataBase } from './securedata';

const SecureData: typeof SecureDataBase = require(`./securedata.${Device.deviceOS.toLowerCase()}`).default;
type SecureData = SecureDataBase;

export default SecureData;
