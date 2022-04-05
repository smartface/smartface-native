import { ConstructorOf } from '../../core/constructorof';
import { ILabel } from './label';

const Label: ConstructorOf<ILabel, Partial<ILabel>> = require(`./label.${Device.deviceOS.toLowerCase()}`).default;
type Label = ILabel;

export default Label;
