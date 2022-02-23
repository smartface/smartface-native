import { IAccelerometer } from './accelerometer';

const Accelerometer: IAccelerometer = require(`./accelerometer.${Device.deviceOS.toLowerCase()}`).default;
type Accelerometer = IAccelerometer;

export default Accelerometer;
