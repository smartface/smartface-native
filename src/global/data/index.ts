import { IData } from './data';

const Data: IData = require(`./data.${Device.deviceOS.toLowerCase()}`).default;
type Data = IData;

export default Data;
