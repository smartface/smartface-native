import { IToast } from '.';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { MobileOSProps } from '../../core/native-mobile-component';
import { AndroidConfig, UnitConverter } from '../../util';
import Color from '../color';
import { ToastEvents } from './toast-events';

const NativeSnackBar = requireClass('com.google.android.material.snackbar.Snackbar');
const NativeR = requireClass(AndroidConfig.packageName + '.R');
const NativeView = requireClass('android.view.View');

const DEFAULT_DURATION_IN_SECONDS = 4;
const DEFAULT_MESSAGE = '';

export default class ToastAndroid<TEvent extends string = ToastEvents, TProps extends MobileOSProps<{}, {}> = MobileOSProps<{}, {}>>
  extends NativeEventEmitterComponent<TEvent | ToastEvents, any, TProps>
  implements IToast
{
  private _message: string;
  private _messageTextColor: Color;
  private _actionTextColor: Color;
  private _backgroundColor: Color;
  private _bottomOffset: number;
  constructor(params?: TProps) {
    super(params);
    if (!this.nativeObject) {
      this.nativeObject = this.createNativeSnackBar({
        duration: DEFAULT_DURATION_IN_SECONDS,
        message: DEFAULT_MESSAGE
      });
    }
    const nativeCallback = NativeSnackBar.Callback.extend(
      'SFSnackBarCallback',
      {
        onDismissed: () => {
          this.onDismissed?.();
          this.emit('dismissed');
        }
      },
      null
    );
    this.nativeObject.addCallback(nativeCallback);
  }
  set message(value: string) {
    this._message = value;
    this.nativeObject.setText(value);
  }
  get message(): string {
    return this._message;
  }
  set backgroundColor(value: Color) {
    this._backgroundColor = value;
    this.nativeObject.setBackgroundTint(value.nativeObject);
  }
  get backgroundColor(): Color {
    return this._backgroundColor;
  }
  set actionTextColor(value: Color) {
    this._actionTextColor = value;
    this.nativeObject.setActionTextColor(value.nativeObject);
  }
  get actionTextColor(): Color {
    return this._actionTextColor;
  }
  set messageTextColor(value: Color) {
    this._messageTextColor = value;
    this.nativeObject.setTextColor(value.nativeObject);
  }
  get messageTextColor(): Color {
    return this._messageTextColor;
  }
  set bottomOffset(value: number) {
    this._bottomOffset = value;
    this.nativeObject.getView().setTranslationY(UnitConverter.dpToPixel(-value));
  }
  get bottomOffset(): number {
    return this._bottomOffset;
  }
  set duration(value: number) {
    this.nativeObject.setDuration(this.convertToMiliSeconds(value));
  }
  get duration(): number {
    return this.convertToSeconds(this.nativeObject.getDuration());
  }
  get isShowing(): boolean {
    return this.nativeObject.isShown();
  }
  createAction(title: string, callback: () => void): void {
    const onClickListener = NativeView.OnClickListener.implement({
      onClick: () => callback?.()
    });
    this.nativeObject.setAction(title, onClickListener);
  }
  onDismissed: (callback: void) => void;
  show(): void {
    this.nativeObject.show();
  }
  dismiss(): void {
    this.nativeObject.dismiss();
  }
  private convertToMiliSeconds(seconds: number) {
    return seconds * 1000;
  }
  private convertToSeconds(miliSeconds: number) {
    return miliSeconds / 1000;
  }
  private createNativeSnackBar(params: { message: string; duration: number }) {
    const { message, duration } = params;
    const view = AndroidConfig.activity.findViewById(NativeR.id.page_container);
    return NativeSnackBar.make(view, message, this.convertToMiliSeconds(duration));
  }
}
