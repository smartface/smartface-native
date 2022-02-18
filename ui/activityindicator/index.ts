import { AbstractActivityIndicator } from './activityindicator';

const ActivityIndicator: typeof AbstractActivityIndicator = require(`./activityindicator.${Device.deviceOS.toLowerCase()}`).default;

export default ActivityIndicator;
