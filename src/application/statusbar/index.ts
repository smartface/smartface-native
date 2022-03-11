import Color from '../../ui/color';

enum StatusBarStyle {
  DEFAULT,
  LIGHTCONTENT
}

export abstract class AbstractStatusBar {
  abstract height: number;
  abstract backgroundColor: Color;
  abstract visible: boolean;
  abstract style: StatusBarStyle;
  android: {
    color?: Color;
    transparent?: boolean;
  }
}

class StatusBarImpl extends AbstractStatusBar{
  height: number;
  backgroundColor: Color;
  visible: boolean;
  style: StatusBarStyle;
}

const StatusBarClass: typeof StatusBarImpl = require(`./statusbar.${Device.deviceOS.toLowerCase()}`).default;
export type StatusBar = StatusBarImpl;
export const StatusBar: StatusBar = new StatusBarClass();