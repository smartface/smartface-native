import { NotificationsBase } from './notifications';

const Notifications: typeof NotificationsBase = require(`./notifications.${Device.deviceOS.toLowerCase()}`).default;
type Notifications = NotificationsBase;

export default Notifications;
