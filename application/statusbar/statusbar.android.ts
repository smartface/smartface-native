import Color from '../../ui/color';
import AndroidConfig from '../../util/Android/androidconfig';
import AndroidUnitConverter from '../../util/Android/unitconverter';

/* globals requireClass */
const NativeBuildVersion = requireClass('android.os.Build');
const NativeView = requireClass('android.view.View');
const SFViewUtil = requireClass('io.smartface.android.sfcore.ui.view.SFViewUtil');

const MINAPILEVEL_STATUSBARCOLOR = 21;
const MINAPILEVEL_STATUSBARICONCOLOR = 23;

// WindowManager.LayoutParams flags
const FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS = -2147483648;
const FLAG_FULLSCREEN = 1024;
const FLAG_TRANSLUCENT_STATUS = 67108864;
const SYSTEM_UI_FLAG_LIGHT_STATUS_BAR = NativeView.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;

export enum StatusBarStyle {
  DEFAULT,
  LIGHTCONTENT
}

export default class StatusBar {
  private constructor() {}
  private static _visible = true;
  private static _statusBarStyle = StatusBarStyle.LIGHTCONTENT;
  private static _color: Color;
  private static _transparent: boolean;
  static readonly Styles = StatusBarStyle;
  static get style(): StatusBarStyle {
    return StatusBar._statusBarStyle;
  }
  static set style(value: StatusBarStyle) {
    if (NativeBuildVersion.VERSION.SDK_INT >= MINAPILEVEL_STATUSBARICONCOLOR) {
      this._statusBarStyle = value;
      let decorView = AndroidConfig.activity.getWindow().getDecorView();
      let systemUiVisibilityFlags = decorView.getSystemUiVisibility();
      if (this._statusBarStyle == StatusBarStyle.DEFAULT) {
        // SYSTEM_UI_FLAG_LIGHT_STATUS_BAR = 8192
        systemUiVisibilityFlags |= SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
      } else {
        //STATUS_BAR_VISIBLE = 0
        systemUiVisibilityFlags &= ~SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
      }

      decorView.setSystemUiVisibility(systemUiVisibilityFlags);
    }
  }
  static get visible(): boolean {
    return StatusBar._visible;
  }
  static set visible(value: boolean) {
    StatusBar._visible = value;
    const window = AndroidConfig.activity.getWindow();
    if (value) {
      window.clearFlags(FLAG_FULLSCREEN);
    } else {
      window.addFlags(FLAG_FULLSCREEN);
    }
  }
  static get backgroundColor(): Color {
    return StatusBar._color;
  }
  static set backgroundColor(color: Color) {
    StatusBar._color = color;
    if (NativeBuildVersion.VERSION.SDK_INT >= MINAPILEVEL_STATUSBARCOLOR) {
      const window = AndroidConfig.activity.getWindow();
      window.addFlags(FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
      // TODO: color needs nativeObject
      window.setStatusBarColor(color.nativeObject);
    }
  }
  static get height(): number {
    let result = 0;
    const resourceId = AndroidConfig.activityResources.getIdentifier('status_bar_height', 'dimen', 'android');
    if (resourceId > 0) {
      result = AndroidConfig.activityResources.getDimensionPixelSize(resourceId);
    }
    return AndroidUnitConverter.pixelToDp(result);
  }
  static get ios() {
    return {
      style: null
    };
  }
  static get android() {
    return {
      get color() {
        return StatusBar._color;
      },
      set color(value: Color) {
        StatusBar._color = value;
        if (NativeBuildVersion.VERSION.SDK_INT >= MINAPILEVEL_STATUSBARCOLOR) {
          const window = AndroidConfig.activity.getWindow();
          window.addFlags(FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
          // TODO: color needs nativeObject
          window.setStatusBarColor(value.nativeObject);
        }
      },
      get transparent() {
        return StatusBar._transparent;
      },
      set transparent(value: boolean) {
        const hideStatusBarBackground = true;
        let isSetFitsSystemWindows = true;
        StatusBar._transparent = value;
        let window = AndroidConfig.activity.getWindow();
        let flags = window.getDecorView().getSystemUiVisibility();
        if (value) {
          if (hideStatusBarBackground) {
            window.clearFlags(FLAG_TRANSLUCENT_STATUS);
            window.setStatusBarColor(0);
            // 256 = View.SYSTEM_UI_FLAG_LAYOUT_STABLE, 1024 = View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            flags |= 256 | 1024;
            window.getDecorView().setSystemUiVisibility(flags);
          } else {
            flags |= FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS;
            flags |= FLAG_TRANSLUCENT_STATUS;
            window.addFlags(flags);
          }
          isSetFitsSystemWindows = false;
        } else {
          window.clearFlags(FLAG_TRANSLUCENT_STATUS);
          flags |= 1024 | 256;
          window.getDecorView().setSystemUiVisibility(flags);
          window.addFlags(FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        }
        SFViewUtil.setFitsSystemWindows(window, isSetFitsSystemWindows);
      }
    };
  }
}
