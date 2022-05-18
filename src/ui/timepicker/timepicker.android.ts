import { ITimePicker } from './timepicker';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import AndroidConfig from '../../util/Android/androidconfig';
import { TimePickerEvents } from './timepicker-events';

const NativeTimePickerDialog = requireClass('android.app.TimePickerDialog');

export default class TimePickerAndroid<TEvent extends string = TimePickerEvents> extends NativeEventEmitterComponent<TEvent | TimePickerEvents> implements ITimePicker<TEvent | TimePickerEvents> {
  protected createNativeObject() {
    return null;
  }
  preConstruct(params: Partial<ITimePicker> = {}) {
    this._is24HourFormat = true;
    super.preConstruct(params);
  }
  private _is24HourFormat: boolean;
  private _hour: number | undefined;
  private _minutes: number | undefined;
  constructor(params: Partial<ITimePicker> = {}) {
    super(params);
  }
  onTimeSelected: (e: { hour: number; minute: number }) => void;

  setTime(params: { hour: number; minute: number }): void {
    this.hour = params.hour;
    this.minutes = params.minute;
  }

  show(): void {
    this.nativeObject = this.createTimerDialog();
    this.nativeObject.show();
  }

  get is24HourFormat(): boolean {
    return this._is24HourFormat;
  }
  set is24HourFormat(value: boolean) {
    this._is24HourFormat = value;
  }

  get hour(): number | undefined {
    return this._hour;
  }
  set hour(value: number | undefined) {
    this._hour = value;
  }

  get minutes(): number | undefined {
    return this._minutes;
  }
  set minutes(value: number | undefined) {
    this._minutes = value;
  }

  private createTimerDialog() {
    const _date = new Date();
    const hour = this._hour || _date.getHours();
    const minutes = this._minutes || _date.getMinutes();
    const nativeObject = new NativeTimePickerDialog(
      AndroidConfig.activity,
      NativeTimePickerDialog.OnTimeSetListener.implement({
        onTimeSet: (timePicker: any, hour: number, minute: number) => {
          const e = {
            hour,
            minute
          };
          this.emit('selected', e);
          this.onTimeSelected?.(e);
        }
      }),
      hour,
      minutes,
      !!this._is24HourFormat
    );
    nativeObject.setTitle('');
    return nativeObject;
  }
}
