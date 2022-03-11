import { ITimePicker } from '.';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { AndroidConfig } from '../../util';
import { TimePickerEvents } from './timepicker-events';

const NativeTimePickerDialog = requireClass('android.app.TimePickerDialog');

export default class TimePickerAndroid<TEvent extends string = TimePickerEvents> extends NativeEventEmitterComponent<TEvent | TimePickerEvents> implements ITimePicker<TEvent | TimePickerEvents> {
  private _is24HourFormat = true;
  private _onTimeSelected: ITimePicker['onTimeSelected'];
  private _hour: number | null = null;
  private _minutes: number | null = null;
  constructor(params: Partial<ITimePicker> = {}) {
    super();

    if (!this.nativeObject) {
      this.createTimerDialog();
    }

    for (const param in params) {
      this[param] = params[param];
    }
  }
  
  setTime(params: { hour: number; minute: number }): void {
    this.hour = params.hour;
    this.minutes = params.minute;
  }

  show(): void {
    this.createTimerDialog();
    this.nativeObject.show();
  }

  get onTimeSelected(): ITimePicker['onTimeSelected'] {
    return this._onTimeSelected;
  }

  set onTimeSelected(value: ITimePicker['onTimeSelected']) {
    this._onTimeSelected = value;
  }

  get is24HourFormat(): boolean {
    return this._is24HourFormat;
  }
  set is24HourFormat(value: boolean) {
    this._is24HourFormat = value;
    this.nativeObject && this.nativeObject.setIs24HourView(value);
  }

  get hour(): number | null {
    return this._hour;
  }
  set hour(value: number | null) {
    this._hour = value;
  }

  get minutes(): number | null {
    return this._minutes;
  }
  set minutes(value: number | null) {
    this._minutes = value;
  }

  private createTimerDialog() {
    let hour: number | null;
    let minutes: number | null;
    if (this._hour === null && this._minutes === null) {
      const _date = new Date();
      hour = _date.getHours();
      minutes = _date.getMinutes();
    } else {
      hour = this.hour;
      minutes = this.minutes;
    }
    this.nativeObject = new NativeTimePickerDialog(
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
      this._is24HourFormat
    );
    this.nativeObject.setTitle('');
  }
}
