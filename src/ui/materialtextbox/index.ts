import { IMaterialTextBox } from './materialtextbox';
import { ConstructorOf } from '../../core/constructorof';

const MaterialTexBox: ConstructorOf<IMaterialTextBox, Partial<IMaterialTextBox>> = require(`./materialtextbox.${Device.deviceOS.toLowerCase()}`).default;
type MaterialTexBox = IMaterialTextBox;

export default MaterialTexBox;
