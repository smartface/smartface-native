import { AbstractDialog } from './dialog';

const Dialog: typeof AbstractDialog = require(`./dialog.${Device.deviceOS.toLowerCase()}`).default;
export default Dialog;
