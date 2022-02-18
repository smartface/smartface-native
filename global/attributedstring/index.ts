import { AttributedStringBase } from './attributedstring';

const AttributedString: typeof AttributedStringBase = require(`./attributedstring.${Device.deviceOS.toLowerCase()}`).default;

export default AttributedString;
