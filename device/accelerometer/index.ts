import { AccelerometerBase } from './accelerometer';

const Accelerometer: typeof AccelerometerBase = require(`./accelerometer.${Device.deviceOS.toLowerCase()}`).default;
type Accelerometer = AccelerometerBase;

export default Accelerometer;
