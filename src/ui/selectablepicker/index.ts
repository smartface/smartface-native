import { ConstructorOf } from '../../core/constructorof';
import { ISelectablePicker } from './selectablepicker';

const SelectablePicker: ConstructorOf<ISelectablePicker, Partial<ISelectablePicker>> = require(`./selectablepicker.${Device.deviceOS.toLowerCase()}`).default;
type SelectablePicker = ISelectablePicker;
export default SelectablePicker;
