import Color from '../../ui/color';

export enum StatusBarStyle {
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
  };
}

export class StatusBarImpl extends AbstractStatusBar {
  height: number;
  backgroundColor: Color;
  visible: boolean;
  style: StatusBarStyle;
}
