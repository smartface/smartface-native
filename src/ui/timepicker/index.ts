import { ConstructorOf } from '../../core/constructorof';
import { ITimePicker } from './timepicker';

const TimePicker: ConstructorOf<ITimePicker, Partial<ITimePicker>> = require(`./timepicker.${Device.deviceOS.toLowerCase()}`).default;
type TimePicker = ITimePicker;
export default TimePicker;
