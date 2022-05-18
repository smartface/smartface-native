import { ButtonType, IAlertView } from './alertview';
import { NativeMobileComponent } from '../../core/native-mobile-component';
import AndroidConfig from '../../util/Android/androidconfig';
import AndroidUnitConverter from '../../util/Android/unitconverter';
import LayoutParams from '../../util/Android/layoutparams';
import TextBoxAndroid from '../textbox/textbox.android';
import { ITextBox } from '../textbox/textbox';

const NativeAlertDialog = requireClass('io.smartface.android.sfcore.ui.alertview.SFAlertView');
const NativeDialogInterface = requireClass('android.content.DialogInterface');

export default class AlertViewAndroid extends NativeMobileComponent<any, IAlertView> implements IAlertView {
  protected createNativeObject() {
    return new NativeAlertDialog(AndroidConfig.activity);
  }
  private __didSetOnDismissListener: boolean;
  private __buttonCallbacks: { [key: number]: () => void };
  private _title: string;
  private _message: string;
  private _textBoxes: ITextBox[];
  private _onDismiss: IAlertView['onDismiss'];
  private _cancellable: IAlertView['android']['cancellable'];
  constructor(params?: Partial<IAlertView>) {
    super(params);
    this.androidSpecificProperties();
  }
  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this.__buttonCallbacks = {};
    this._title = '';
    this._message = '';
    this._textBoxes = [];
    this.__didSetOnDismissListener = true;
    super.preConstruct(params);
  }
  isShowing(): void {
    return this.nativeObject.isShowing();
  }
  show(): void {
    this.nativeObject.show();
  }
  toString(): string {
    return 'AlertView';
  }
  dismiss(): void {
    this.nativeObject.dismiss();
  }
  addButton(params: Partial<Parameters<IAlertView['addButton']>['0']>): void {
    const text = params.text || '';
    const buttonType = Number.isInteger(params.type) ? params.type : params.index;
    if (typeof buttonType === 'number' && params.onClick) {
      this.__buttonCallbacks[buttonType] = params.onClick;
    }
    let nativeButtonIndex = -3;
    switch (buttonType) {
      case AlertViewAndroid.Android.ButtonType.POSITIVE:
        nativeButtonIndex = -1;
        break;
      case AlertViewAndroid.Android.ButtonType.NEGATIVE:
        nativeButtonIndex = -2;
        break;
      default:
        nativeButtonIndex = -3;
        break;
    }

    this.nativeObject.setButton(
      nativeButtonIndex,
      text,
      NativeDialogInterface.OnClickListener.implement({
        onClick: (dialog: any, which: number) => {
          let callbackType = NaN;
          switch (which) {
            case -1:
              callbackType = AlertViewAndroid.Android.ButtonType.POSITIVE;
              break;
            case -2:
              callbackType = AlertViewAndroid.Android.ButtonType.NEGATIVE;
              break;
            case -3:
              callbackType = AlertViewAndroid.Android.ButtonType.NEUTRAL;
              break;
            default:
              break;
          }
          if (!isNaN(callbackType)) {
            this.__buttonCallbacks[callbackType]?.();
          }
        }
      })
    );
  }
  addTextBox(params: Partial<Parameters<IAlertView['addTextBox']>['0']>): void {
    const { hint = '', text = '', isPassword = false, android: { viewSpacings: viewSpacings = {}, height, width } = {} } = params;
    const mTextBox = new TextBoxAndroid({
      hint,
      text
    });
    if (isPassword) {
      mTextBox.isPassword = isPassword;
      mTextBox.android.cursorPosition = {
        start: text.length,
        end: text.length
      };
    }
    const viewSpacingsInPx = { left: 0, right: 0, top: 0, bottom: 0 };
    Object.keys(viewSpacings).map((key) => {
      viewSpacingsInPx[key] = AndroidUnitConverter.dpToPixel(viewSpacings[key]);
    });
    const dpHeight = this.dpToPixel(height);
    const dpWidth = this.dpToPixel(width);
    this.nativeObject.addTextBox(mTextBox.nativeObject, dpWidth, dpHeight, viewSpacingsInPx.left, viewSpacingsInPx.top, viewSpacingsInPx.right, viewSpacingsInPx.bottom);
    this._textBoxes.push(mTextBox);
  }

  private dpToPixel(size: number | undefined) {
    return size !== undefined ? AndroidUnitConverter.dpToPixel(size) : LayoutParams.MATCH_PARENT;
  }

  private setOnDismissListener() {
    this.nativeObject.setOnDismissListener(
      NativeDialogInterface.OnDismissListener.implement({
        onDismiss: () => this._onDismiss()
      })
    );
    this.__didSetOnDismissListener = true;
  }

  private androidSpecificProperties() {
    const self = this;
    this.addAndroidProps({
      get cancellable(): IAlertView['android']['cancellable'] {
        return self._cancellable;
      },
      set cancellable(value: IAlertView['android']['cancellable']) {
        self._cancellable = value;
        self.nativeObject.setCancelable(value);
        self.nativeObject.setCanceledOnTouchOutside(value);
      }
    });
  }

  get textBoxes(): IAlertView['textBoxes'] {
    return this._textBoxes.map((textBox) => ({ text: textBox.text }));
  }

  get title(): IAlertView['title'] {
    return this._title;
  }
  set title(value: IAlertView['title']) {
    this._title = value;
    this.nativeObject.setTitle(value);
  }
  get message(): IAlertView['message'] {
    return this._message;
  }
  set message(value: IAlertView['message']) {
    this._message = value;
    this.nativeObject.setMessage(value);
  }

  get onDismiss(): IAlertView['onDismiss'] {
    return this._onDismiss;
  }
  set onDismiss(value: IAlertView['onDismiss']) {
    this._onDismiss = value.bind(this);
    if (!this.__didSetOnDismissListener) {
      this.setOnDismissListener();
    }
  }

  static Android = {
    ButtonType: ButtonType
  };
}
