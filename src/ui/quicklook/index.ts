import { IQuickLook } from './quicklook';

const QuickLook: ConstructorOf<IQuickLook, Partial<IQuickLook>> = require(`./quicklook.${Device.deviceOS.toLowerCase()}`).default;
type QuickLook = IQuickLook;

export default QuickLook;
