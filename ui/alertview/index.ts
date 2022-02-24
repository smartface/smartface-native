import { AbstractAlertView } from './alertview';

const AlertView: typeof AbstractAlertView = require(`./alertview.${Device.deviceOS.toLowerCase()}`).default;
type AlertView = AbstractAlertView;
export default AlertView;
