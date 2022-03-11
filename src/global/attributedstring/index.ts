import { ConstructorOf } from "../../core/constructorof";
import { IAttributedString } from "./attributedstring";

const AttributedString: ConstructorOf<IAttributedString, Partial<IAttributedString>> = require(`./attributedstring.${Device.deviceOS.toLowerCase()}`).default;
type AttributedString = IAttributedString;

export default AttributedString;
