import { ConstructorOf } from '../../core/constructorof';
import { IPicker } from './picker';

const Picker: ConstructorOf<IPicker, Partial<IPicker>> = require(`./picker.${Device.deviceOS.toLowerCase()}`).default;
type Picker = IPicker;
export default Picker;
