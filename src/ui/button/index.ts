import { ConstructorOf } from '../../core/constructorof';
import { IButton } from './button';

const Button: ConstructorOf<IButton, Partial<IButton>> = require(`./button.${Device.deviceOS.toLowerCase()}`).default;
type Button = IButton;

export default Button;
