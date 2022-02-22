import NativeComponent from '../../core/native-component';
import TextBox from '../textbox';
import { AbstractAlertView, ButtonType, IAlertView } from './alertview';
import { LayoutParams, UnitConverter } from '../../util';

const NativeAlertDialog = requireClass('io.smartface.android.sfcore.ui.alertview.SFAlertView');
const NativeDialogInterface = requireClass('android.content.DialogInterface');

export default class AlertViewAndroid extends NativeComponent implements IAlertView {
  private _android: AbstractAlertView['android'];
  private __didSetOnDismissListener = true;
  private __buttonCallbacks: Array<() => void> = [];
  private __title = '';
  private __message = '';
  private __textBoxes: TextBox[];
  private __onDismiss: AbstractAlertView['onDismiss'];
  private _cancellable: AbstractAlertView['android']['cancellable'];
  constructor(params: Partial<AlertViewAndroid> = {}) {
    super();
    if (!this.nativeObject) {
      this.nativeObject = new NativeAlertDialog(AndroidConfig.activity);
    }
    this.androidSpecificProperties();
    for (const param in params) {
      this[param] = params[param];
    }
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
  addButton(params: Partial<Parameters<AbstractAlertView['addButton']>['0']>): void {
    const text = params.text || '';
    const buttonType = params.type || params.index;
    this.__buttonCallbacks[buttonType] = params.onClick;
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
          let callbackType = AlertViewAndroid.Android.ButtonType.NEUTRAL;
          switch (which) {
            case -1:
              callbackType = AlertViewAndroid.Android.ButtonType.POSITIVE;
              break;
            case -2:
              callbackType = AlertViewAndroid.Android.ButtonType.NEGATIVE;
              break;
            default:
              break;
          }
          this.__buttonCallbacks[callbackType]?.();
        }
      })
    );
  }
  addTextBox(params: Partial<Parameters<AbstractAlertView['addTextBox']>['0']>): void {
    const { hint = '', text = '', isPassword = false, android: { viewSpacings: viewSpacings = {}, height, width } = {} } = params;
    const mTextBox = new TextBox({
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
      viewSpacingsInPx[key] = UnitConverter.dpToPixel(viewSpacings[key]);
    });
    const dpHeight = this.dpToPixel(height);
    const dpWidth = this.dpToPixel(width);
    this.nativeObject.addTextBox(mTextBox.nativeObject, dpWidth, dpHeight, viewSpacingsInPx.left, viewSpacingsInPx.top, viewSpacingsInPx.right, viewSpacingsInPx.bottom);
    this.__textBoxes.push(mTextBox);
  }

  private dpToPixel(size: number) {
    return size !== undefined ? UnitConverter.dpToPixel(size) : LayoutParams.MATCH_PARENT;
  }

  private setOnDismissListener() {
    this.nativeObject.setOnDismissListener(
      NativeDialogInterface.OnDismissListener.implement({
        onDismiss: () => this.__onDismiss()
      })
    );
    this.__didSetOnDismissListener = true;
  }

  private androidSpecificProperties() {
    const self = this;
    this._android = {
      get cancellable(): AbstractAlertView['android']['cancellable'] {
        return self._cancellable;
      },
      set cancellable(value: AbstractAlertView['android']['cancellable']) {
        self._cancellable = value;
        self.nativeObject.setCancelable(value);
        self.nativeObject.setCanceledOnTouchOutside(value);
      }
    };
  }

  get textBoxes(): AbstractAlertView['textBoxes'] {
    return this.__textBoxes.map((textBox) => ({ text: textBox.text }));
  }

  get title(): AbstractAlertView['title'] {
    return this.__title;
  }
  set title(value: AbstractAlertView['title']) {
    this.__title = value;
    this.nativeObject.setTitle(value);
  }
  get message(): AbstractAlertView['message'] {
    return this.__message;
  }
  set message(value: AbstractAlertView['message']) {
    this.__message = value;
    this.nativeObject.setMessage(value);
  }

  get onDismiss(): AbstractAlertView['onDismiss'] {
    return this.__onDismiss;
  }
  set onDismiss(value: AbstractAlertView['onDismiss']) {
    this.__onDismiss = value.bind(this);
    if (!this.__didSetOnDismissListener) {
      this.setOnDismissListener();
    }
  }
  get android() {
    return this._android;
  }

  static Android = {
    ButtonType: ButtonType
  };
}
