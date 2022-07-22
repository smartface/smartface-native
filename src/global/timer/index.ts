import { ITimer } from './timer';

const Timer: ITimer = require(`./timer.${Device.deviceOS.toLowerCase()}`).default;

export default Timer;
