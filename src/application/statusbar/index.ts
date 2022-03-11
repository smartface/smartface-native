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

export class StatusBar extends AbstractStatusBar{
  height: number;
  backgroundColor: Color;
  visible: boolean;
  style: StatusBarStyle;
}

const StatusBarClass: typeof StatusBar = require(`./statusbar.${Device.deviceOS.toLowerCase()}`).default;
export const StatusBarInstance = new StatusBarClass();