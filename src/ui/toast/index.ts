import { ConstructorOf } from '../../core/constructorof';
import { IToast } from './toast';

const Toast: ConstructorOf<IToast, Partial<IToast>> = require(`./toast.${Device.deviceOS.toLowerCase()}`).default;
type Toast = IToast;
export default Toast;
