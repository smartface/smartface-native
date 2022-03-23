import { ConstructorOf } from '../../core/constructorof';
import { AttributedStringBase } from './attributedstring';

const AttributedString: ConstructorOf<AttributedStringBase, Partial<AttributedStringBase>> = require(`./attributedstring.${Device.deviceOS.toLowerCase()}`).default;
type AttributedString = AttributedStringBase;

export default AttributedString;
