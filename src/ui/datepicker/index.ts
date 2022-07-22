import { IDatePicker } from './datepicker';

const DatePicker: ConstructorOf<IDatePicker, Partial<IDatePicker>> = require(`./datepicker.${Device.deviceOS.toLowerCase()}`).default;
type DatePicker = IDatePicker;
export default DatePicker;
