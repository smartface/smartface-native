import Color from '../../ui/color';

declare enum StatusBarStyle {
  DEFAULT,
  LIGHTCONTENT
}

declare type StatusBar = {
  height: number;
  backgroundColor: Color;
  visible: boolean;
  style: StatusBarStyle;
};

export default require(`./statusbar.${Device.deviceOS.toLowerCase()}`).default as StatusBar;
