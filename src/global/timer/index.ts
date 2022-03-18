import { TimerBase } from './timer';

class Timerimpl extends TimerBase {}

const Timer: typeof Timerimpl = require(`./timer.${Device.deviceOS.toLowerCase()}`).default;
type Timer = Timerimpl;

export default Timer;
