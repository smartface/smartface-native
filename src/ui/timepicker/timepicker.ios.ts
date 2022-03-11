import { ITimePicker } from '.';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { UIDatePickerMode } from '../../util';
import { TimePickerEvents } from './timepicker-events';

export default class TimePickerIOS<TEvent extends string = TimePickerEvents> extends NativeEventEmitterComponent<TEvent | TimePickerEvents> implements ITimePicker<TEvent | TimePickerEvents> {
  private _hours: number | null = null;
  private _minutes: number | null = null;
  constructor(params: Partial<ITimePicker> = {}) {
    super();

    if (!this.nativeObject) {
      this.nativeObject = new __SF_UIDatePicker();
    }

    this.nativeObject.onSelected = (e: { date: Date }) => {
      const time = e.date;
      const params = {
        hour: time.getHours(),
        minute: time.getMinutes()
      };
      this.emit('selected', params);
      this.onTimeSelected?.(params);
    };

    for (const param in params) {
      this[param] = params[param];
    }
  }
  setTime(params: { hour: number; minute: number }): void {
    this._hours = params.hour;
    this._minutes = params.minute;
  }
  is24HourFormat = false;
  show(): void {
    const date = new Date();
    if (this._hours && this._minutes) {
      date.setHours(this._hours);
      date.setMinutes(this._minutes);
    }
    this.nativeObject.defaultDate = date;
    this.nativeObject.datePickerMode = UIDatePickerMode.time;
    this.nativeObject.show();
  }
  onTimeSelected: (e: { hour: number; minute: number }) => void;
}
