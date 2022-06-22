import { IPermission } from './permission';

const Permission: IPermission = require(`./permission.${Device.deviceOS.toLowerCase()}`).default;
export default Permission;
