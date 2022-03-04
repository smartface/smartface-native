import { NavigationBarStyle } from '.';
import Color from '../../../ui/color';
import { AndroidConfig } from '../../../util';

const NativeBuild = requireClass('android.os.Build');

export default class NavigationBar {
  private constructor() {}
  static readonly Styles = NavigationBarStyle;
  private static _style: NavigationBarStyle = NavigationBarStyle.DARKCONTENT;
  private static _color: Color = Color.BLACK;
  static get style(): NavigationBarStyle {
    return NavigationBar._style;
  }
  static set style(value: NavigationBarStyle) {
    NavigationBar._style = value;
    if (NativeBuild.VERSION.SDK_INT >= 26) {
      const window = AndroidConfig.activity.getWindow();
      let flags = window.getDecorView().getSystemUiVisibility();
      // 16 = View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR
      NavigationBar._style === NavigationBarStyle.DARKCONTENT ? (flags |= 16) : (flags &= ~16);
      window.getDecorView().setSystemUiVisibility(flags);
    }
  }
  static get color(): Color {
    return NavigationBar._color;
  }
  static set color(value: Color) {
    if (NativeBuild.VERSION.SDK_INT >= 21) {
      NavigationBar._color = value;
      const window = AndroidConfig.activity.getWindow();
      window.setNavigationBarColor(NavigationBar._color.nativeObject);
    }
  }
}
