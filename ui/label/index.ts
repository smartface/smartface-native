import { AbstractLabel } from './label';

const Label: typeof AbstractLabel = require(`./color.${Device.deviceOS.toLowerCase()}`).default;
type Label = AbstractLabel;

export default Label;
