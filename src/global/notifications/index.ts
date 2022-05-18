import { NotificationsBase } from './notifications';

const Notifications: NotificationsBase = require(`./notifications.${Device.deviceOS.toLowerCase()}`).default;
type Notifications = NotificationsBase;

export default Notifications;
