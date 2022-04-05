import { DatePickerImpl } from './datepicker';

const DatePicker: typeof DatePickerImpl = require(`./datepicker.${Device.deviceOS.toLowerCase()}`).default;
type DatePicker = DatePickerImpl;
export default DatePicker;
