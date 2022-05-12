import FlexLayout from '../flexlayout';
import { AbstractDialog, DialogStyle } from './dialog';
declare class DialogImpl extends AbstractDialog {
  setShowListener(): void;
  get layout(): FlexLayout;
  hide(): void;
  show(): void;
  get android(): Partial<{ themeStyle: DialogStyle; isTransparent: boolean; cancelable: boolean }>;
}

const Dialog: typeof DialogImpl = require(`./dialog.${Device.deviceOS.toLowerCase()}`).default;

type Dialog = DialogImpl;
export default Dialog;
