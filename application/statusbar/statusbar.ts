import Color from '../../ui/color';

declare enum StatusBarStyle {
  DEFAULT,
  LIGHTCONTENT
}

declare class StatusBar {
  height: number;
  backgroundColor: Color;
  visible: boolean;
  style: StatusBarStyle;
}

export default StatusBar;
