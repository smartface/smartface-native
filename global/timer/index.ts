import { TimerBase } from "./timer";

const Timer: typeof TimerBase = require(`./timer.${Device.deviceOS.toLowerCase()}`)
.default;

export default Timer;
