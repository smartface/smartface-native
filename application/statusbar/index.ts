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

export const StatusBar: typeof StatusBarBase = require(`./statusbar.${Device.deviceOS.toLowerCase()}`).default;
export type StatusBar = StatusBarBase;
