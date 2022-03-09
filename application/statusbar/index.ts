import Color from '../../ui/color';

declare enum StatusBarStyle {
  DEFAULT,
  LIGHTCONTENT
}

declare class StatusBarBase {
  height: number;
  backgroundColor: Color;
  visible: boolean;
  style: StatusBarStyle;
}
const StatusBarClass: typeof StatusBarBase = require(`./statusbar.${Device.deviceOS.toLowerCase()}`).default;
export const Statusbar = new StatusBarClass();
export type Statusbar = StatusBarBase;
