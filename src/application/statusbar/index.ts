import { StatusBarImpl } from './statusbar';

const StatusBar: StatusBarImpl = require(`./statusbar.${Device.deviceOS.toLowerCase()}`).default;
export default StatusBar;
