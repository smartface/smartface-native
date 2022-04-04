import { ConstructorOf } from '../../../core/constructorof';
import { IPin } from './pin';

const Pin: ConstructorOf<IPin, Partial<IPin>> = require(`./pin.${Device.deviceOS.toLowerCase()}`).default;
type Pin = IPin;
export default Pin;
