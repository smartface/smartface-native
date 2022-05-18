import { ITimePicker } from './timepicker';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import UIDatePickerMode from '../../util/iOS/uidatepickermode';
import { TimePickerEvents } from './timepicker-events';

export default class TimePickerIOS<TEvent extends string = TimePickerEvents> extends NativeEventEmitterComponent<TEvent | TimePickerEvents> implements ITimePicker<TEvent | TimePickerEvents> {
  protected createNativeObject() {
    return new __SF_UIDatePicker();
  }
  private _hours: number | null = null;
  private _minutes: number | null = null;
  constructor(params: Partial<ITimePicker> = {}) {
    super(params);
    this.nativeObject.onSelected = (e: { date: Date }) => {
      const time = e.date;
      const params = {
        hour: time.getHours(),
        minute: time.getMinutes()
      };
      this.emit('selected', params);
      this.onTimeSelected?.(params);
    };
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
