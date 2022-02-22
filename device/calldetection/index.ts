import { CallDetectionBase } from './calldetection';

const CallDetection: typeof CallDetectionBase = require(`./calldetection.${Device.deviceOS.toLowerCase()}`).default;
type CallDetection = CallDetectionBase;

export default CallDetection;
