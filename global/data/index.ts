import { DataBase } from './data';

const Data: typeof DataBase = require(`./data.${Device.deviceOS.toLowerCase()}`).default;
type Data = DataBase;

export default Data;
