import { IDialog } from './dialog';

const Dialog: ConstructorOf<IDialog, Partial<IDialog>> = require(`./dialog.${Device.deviceOS.toLowerCase()}`).default;

type Dialog = IDialog;
export default Dialog;
