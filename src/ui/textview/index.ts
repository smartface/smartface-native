import { ConstructorOf } from '../../core/constructorof';
import { ITextView } from './textview';

const TextView: ConstructorOf<ITextView, Partial<ITextView>> = require(`./textview.${Device.deviceOS.toLowerCase()}`).default;
type TextView = ITextView;
export default TextView;
