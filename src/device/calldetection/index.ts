import { ICallDetection } from './calldetection';

const CallDetection: ICallDetection = require(`./calldetection.${Device.deviceOS.toLowerCase()}`).default;
type CallDetection = ICallDetection;

export default CallDetection;
