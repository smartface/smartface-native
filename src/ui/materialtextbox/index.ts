import { MaterialTextBoxImpl } from './materialtextbox';

const MaterialTexBox: typeof MaterialTextBoxImpl = require(`./materialtextbox.${Device.deviceOS.toLowerCase()}`).default;
type MaterialTexBox = MaterialTextBoxImpl;

export default MaterialTexBox;
