import { BaseData } from './data';

const Data: typeof BaseData = require(`./data.${Device.deviceOS.toLowerCase()}`).default;
type Data = BaseData;

export default Data;
