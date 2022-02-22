import AndroidConfig from '../../util/Android/androidconfig';
import LayoutParams from '../../util/Android/layoutparams';
import SystemServices from '../../util/Android/systemservices';
import Color from '../color';
import FlexLayout from '../flexlayout';
import Screen from '../../device/screen';
import { AbstractDialog, DialogStyle, DEFAULT_TRANSLUCENCY } from './dialog';
import Application from '../../application';

const NativeDialog = requireClass('android.app.Dialog');
const NativeColorDrawable = requireClass('android.graphics.drawable.ColorDrawable');
const DialogInterface = requireClass('android.content.DialogInterface');

interface IDialogAndroid {
  hideKeyboard(): void;
  onShow(): void;
  cancelable: boolean;
  isTransparent: boolean;
  themeStyle: DialogStyle;
}

export default class DialogAndroid extends AbstractDialog {
  private _android: IDialogAndroid;
  private _isTransparent: boolean;
  private _themeStyle = DialogAndroid.Android.Style.ThemeDefault;
  private _layout: FlexLayout;
  private _onShowCallback: () => void;
  private _isSetListener = false;
  private _cancelable = false;
  skipDefaults = false;
  private dialogWindow;
  private colorDrawable;

  constructor(params: Partial<DialogAndroid> = {}) {
    super();
    this._layout = new FlexLayout({ backgroundColor: Color.TRANSPARENT });
    this._isTransparent = params?.android?.isTransparent || false;
    this._themeStyle ||= params?.android?.themeStyle;

    this.nativeObject = this.nativeObject || new NativeDialog(AndroidConfig.activity, this._themeStyle);

    this.skipDefaults = params.skipDefaults || this._isTransparent;
    for (const param in params) {
      this[param] = params[param];
    }

    this.assignAndroidProperties();
    this.initDialogLayout();
  }
  setShowListener() {
    const listener = DialogInterface.OnShowListener.implement({
      onShow: () => this._onShowCallback?.()
    });
    this.nativeObject.setOnShowListener(listener);
    this._isSetListener = true;
  }

  private initDialogLayout() {
    this.dialogWindow = this.nativeObject.getWindow();
    const dialogAlpha = this.skipDefaults ? 0 : DEFAULT_TRANSLUCENCY;
    this.colorDrawable = new NativeColorDrawable(Color.create(dialogAlpha, 0, 0, 0).nativeObject);
    this.dialogWindow.setBackgroundDrawable(this.colorDrawable);
    this.nativeObject.setContentView(this._layout.nativeObject);

    if (!this.skipDefaults) {
      this.dialogWindow.setLayout(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
      this.nativeObject.requestWindowFeature(1); // View.Window.FEATURE_NO_TITLE
    } else {
      this.dialogWindow.setGravity(80);
      this.dialogWindow.setBackgroundDrawable(this.colorDrawable);

      const isStatusBarVisible = Application.statusBar.visible;
      const statusBarHeight = isStatusBarVisible ? Application.statusBar.visible : 0;
      const layoutHeight = Screen.height - statusBarHeight;
      this._layout.height = statusBarHeight > 0 ? statusBarHeight : layoutHeight;
      this.dialogWindow.setLayout(LayoutParams.MATCH_PARENT, statusBarHeight > 0 ? LayoutParams.WRAP_CONTENT : LayoutParams.MATCH_PARENT);
    }
  }

  private assignAndroidProperties() {
    const self = this;
    this.android = {
      hideKeyboard(): void {
        if (!self.nativeObject) {
          return;
        }
        const windowToken = self.nativeObject.getWindow().getCurrentFocus().getWindowToken();
        const inputManager = AndroidConfig.getSystemService(SystemServices.INPUT_METHOD_SERVICE, SystemServices.INPUT_METHOD_MANAGER);
        inputManager.hideSoftInputFromWindow(windowToken, 0);
      },
      set onShow(value: IDialogAndroid['onShow']) {
        self._onShowCallback = value;
        if (!self._isSetListener) {
          self.setShowListener();
        }
      },
      get onShow() {
        return self._onShowCallback;
      },
      get cancelable() {
        return self._cancelable;
      },
      set cancelable(value: IDialogAndroid['cancelable']) {
        self._cancelable = value;
        self.nativeObject.setCancelable(value);
      },
      get isTransparent() {
        return self._isTransparent;
      },
      set isTransparent(value: IDialogAndroid['isTransparent']) {
        self._isTransparent = value;
      },
      get themeStyle() {
        return self._themeStyle;
      },
      set themeStyle(value: IDialogAndroid['themeStyle']) {
        self._themeStyle = value;
      }
    };
  }

  get android() {
    return this._android;
  }

  set android(value: Partial<IDialogAndroid>) {
    Object.assign(this._android, value);
  }

  get layout() {
    return this._layout;
  }

  show() {
    this.nativeObject.show();
  }

  hide() {
    this.nativeObject.dismiss();
  }

  static Android: {
    Style: typeof DialogStyle;
  };
}
