import { IColor } from '../../ui/color/color';

export enum StatusBarStyle {
  DEFAULT,
  LIGHTCONTENT
}

export abstract class AbstractStatusBar {
  abstract height: number;
  abstract backgroundColor: IColor;
  abstract visible: boolean;
  abstract style: StatusBarStyle;
  android: {
    color?: IColor;
    transparent?: boolean;
  };
}

export class StatusBarImpl extends AbstractStatusBar {
  height: number;
  backgroundColor: IColor;
  visible: boolean;
  style: StatusBarStyle;
}
