import Color from '../../ui/color';
import StatusbarStyle from '../../ui/statusbarstyle';

declare type StatusBar = {
  height: number;
  backgroundColor: Color;
  visible: boolean;
  style: StatusbarStyle;
};

export = StatusBar;
