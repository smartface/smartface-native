import { ActivityIndicatorBase } from './activityindicator';

const ActivityIndicator: typeof ActivityIndicatorBase = require(`./activityindicator.${Device.deviceOS.toLowerCase()}`).default;
type ActivityIndicator = ActivityIndicatorBase;

export default ActivityIndicator;
