import { TimerBase } from './timer';

const Timer: typeof TimerBase = require(`./timer.${Device.deviceOS.toLowerCase()}`).default;
type Timer = TimerBase;

export default Timer;
