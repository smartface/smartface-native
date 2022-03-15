import Color from '../../../ui/color';
import AndroidConfig from '../../../util/Android/androidconfig';
import { NavigationBarBase, NavigationBarStyle } from './navigationbar';

const NativeBuild = requireClass('android.os.Build');

class NavigationBarAndroid implements NavigationBarBase {
  readonly Styles = NavigationBarStyle;
  private _style: NavigationBarStyle = NavigationBarStyle.DARKCONTENT;
  private _color: Color = Color.BLACK;
  get style(): NavigationBarStyle {
    return this._style;
  }
  set style(value: NavigationBarStyle) {
    this._style = value;
    if (NativeBuild.VERSION.SDK_INT >= 26) {
      const window = AndroidConfig.activity.getWindow();
      let flags = window.getDecorView().getSystemUiVisibility();
      // 16 = View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR
      this._style === NavigationBarStyle.DARKCONTENT ? (flags |= 16) : (flags &= ~16);
      window.getDecorView().setSystemUiVisibility(flags);
    }
  }
  get color(): Color {
    return this._color;
  }
  set color(value: Color) {
    if (NativeBuild.VERSION.SDK_INT >= 21) {
      this._color = value;
      const window = AndroidConfig.activity.getWindow();
      window.setNavigationBarColor(NavigationBar._color.nativeObject);
    }
  }
}

const NavigationBar = new NavigationBarAndroid();
export default NavigationBar;
