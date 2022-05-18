import { AbstractStatusBar } from './statusbar';
import ColorAndroid from '../../ui/color/color.android';
import AndroidConfig from '../../util/Android/androidconfig';
import AndroidUnitConverter from '../../util/Android/unitconverter';

const NativeView = requireClass('android.view.View');
const SFViewUtil = requireClass('io.smartface.android.sfcore.ui.view.SFViewUtil');

// WindowManager.LayoutParams flags
const FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS = -2147483648;
const FLAG_FULLSCREEN = 1024;
const FLAG_TRANSLUCENT_STATUS = 67108864;
const SYSTEM_UI_FLAG_LIGHT_STATUS_BAR = NativeView.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;

export enum StatusBarStyle {
  DEFAULT,
  LIGHTCONTENT
}

class StatusBarAndroid implements AbstractStatusBar {
  private _visible = true;
  private _statusBarStyle: StatusBarStyle = StatusBarStyle.LIGHTCONTENT;
  private _color: ColorAndroid = ColorAndroid.WHITE;
  private _transparent: boolean;
  readonly Styles = StatusBarStyle;
  get style(): StatusBarStyle {
    return this._statusBarStyle;
  }
  set style(value: StatusBarStyle) {
    this._statusBarStyle = value;
    const decorView = AndroidConfig.activity.getWindow().getDecorView();
    let systemUiVisibilityFlags = decorView.getSystemUiVisibility();
    if (this._statusBarStyle === StatusBarStyle.DEFAULT) {
      // SYSTEM_UI_FLAG_LIGHT_STATUS_BAR = 8192
      systemUiVisibilityFlags |= SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
    } else {
      //STATUS_BAR_VISIBLE = 0
      systemUiVisibilityFlags &= ~SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
    }

    decorView.setSystemUiVisibility(systemUiVisibilityFlags);
  }
  get visible(): boolean {
    return this._visible;
  }
  set visible(value: boolean) {
    this._visible = value;
    const window = AndroidConfig.activity.getWindow();
    if (value) {
      window.clearFlags(FLAG_FULLSCREEN);
    } else {
      window.addFlags(FLAG_FULLSCREEN);
    }
  }
  get backgroundColor(): ColorAndroid {
    return this._color;
  }
  set backgroundColor(color: ColorAndroid) {
    if (color) {
      this._color = color;

      const window = AndroidConfig.activity.getWindow();
      window.addFlags(FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
      // TODO: color needs nativeObject
      window.setStatusBarColor(color.nativeObject);
    }
  }
  get height(): number {
    let result = 0;
    const resourceId = AndroidConfig.activityResources.getIdentifier('status_bar_height', 'dimen', 'android');
    if (resourceId > 0) {
      result = AndroidConfig.activityResources.getDimensionPixelSize(resourceId);
    }
    return AndroidUnitConverter.pixelToDp(result);
  }
  get ios() {
    return {
      style: null
    };
  }
  get android(): AbstractStatusBar['android'] {
    const self = this;
    return {
      get color(): ColorAndroid {
        return self._color;
      },
      set color(value: ColorAndroid) {
        if (value) {
          self._color = value;
          const window = AndroidConfig.activity.getWindow();
          window.addFlags(FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
          // TODO: color needs nativeObject
          window.setStatusBarColor(value.nativeObject);
        }
      },
      get transparent(): boolean {
        return self._transparent;
      },
      set transparent(value: boolean) {
        const hideStatusBarBackground = true;
        let isSetFitsSystemWindows = true;
        self._transparent = value;
        const window = AndroidConfig.activity.getWindow();
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

const StatusBar = new StatusBarAndroid();

export default StatusBar;
