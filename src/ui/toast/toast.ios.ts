import { IToast } from './toast';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { MobileOSProps } from '../../core/native-mobile-component';
import Color from '../color';
import { ToastEvents } from './toast-events';

export default class ToastIOS<TEvent extends string = ToastEvents, TProps extends MobileOSProps<{}, {}> = MobileOSProps<{}, {}>>
  extends NativeEventEmitterComponent<TEvent | ToastEvents, __SF_Snackbar, TProps>
  implements IToast
{
  protected createNativeObject() {
    return new __SF_Snackbar();
  }
  private _bottomOffset: number;
  constructor(params?: TProps) {
    super(params);
    this.nativeObject.dismissed = () => {
      this.emit('dismissed');
      this.onDismissed?.();
    };
  }
  set message(value: string) {
    this.nativeObject.messageText = value;
  }
  get message(): string {
    return this.nativeObject.messageText;
  }
  set backgroundColor(value: Color) {
    this.nativeObject.messageViewBackgroundColor = value.nativeObject;
  }
  get backgroundColor(): Color {
    return this.nativeObject.messageViewBackgroundColor;
  }
  set actionTextColor(value: Color) {
    this.nativeObject.actionTextColor = value.nativeObject;
  }
  get actionTextColor(): Color {
    return this.nativeObject.actionTextColor;
  }
  set messageTextColor(value: Color) {
    this.nativeObject.messageTextColor = value.nativeObject;
  }
  get messageTextColor(): Color {
    return this.nativeObject.messageTextColor;
  }
  set bottomOffset(value: number) {
    this._bottomOffset = value;
    this.nativeObject.bottomOffset = value;
  }
  get bottomOffset(): number {
    return this._bottomOffset;
  }
  set duration(value: number) {
    this.nativeObject.duration = value;
  }
  get duration(): number {
    return this.nativeObject.duration;
  }
  get isShowing(): boolean {
    return this.nativeObject.isShowing();
  }
  createAction(title: string, callback: () => void): void {
    this.nativeObject.action(title, callback);
  }
  onDismissed: (callback: void) => void;
  show(): void {
    this.nativeObject.show();
  }
  dismiss(): void {
    this.nativeObject.dismiss();
  }
}
