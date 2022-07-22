import { IDatePicker, DatePickerStyle, DatePickerMode } from './datepicker';
import AndroidConfig from '../../util/Android/androidconfig';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { DatePickerEvents } from './datepicker-events';

const NativeDatePickerDialog = requireClass('android.app.DatePickerDialog');
const NativeDialogInterface = requireClass('android.content.DialogInterface');

export default class DatePickerAndroid<TEvent extends string = DatePickerEvents> extends NativeEventEmitterComponent<TEvent | DatePickerEvents, any, IDatePicker> implements IDatePicker {
  onDateSelected: IDatePicker['onDateSelected'];
  onCancelled: IDatePicker['onCancelled'];
  createNativeObject(params: Partial<IDatePicker> = {}) {
    const androidStyle = params?.android?.style || DatePickerAndroid.Android.Style.DEFAULT;
    const today = new Date();
    this.addAndroidProps({
      get style() {
        return androidStyle;
      }
    });
    const nativeObject = new NativeDatePickerDialog(
      AndroidConfig.activity,
      androidStyle,
      NativeDatePickerDialog.OnDateSetListener.implement({
        onDateSet: (datePicker, year, month, day) => {
          const date = new Date(year, month, day);
          this.onDateSelected?.(date);
          this.emit('selected', date);
        }
      }),
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    nativeObject.setOnCancelListener(
      NativeDialogInterface.OnCancelListener.implement({
        onCancel: (dialogInterface: any) => {
          this.emit('cancelled');
          this.onCancelled?.();
        }
      })
    );
    return nativeObject;
  }
  constructor(params: Partial<IDatePicker> = {}) {
    super(params);
  }

  show() {
    this.nativeObject.show();
  }

  setMinDate(date: Date): void {
    const milliTime = date.getTime();

    const nativeDatePicker = this.nativeObject.getDatePicker();
    nativeDatePicker.setMinDate(long(milliTime));
  }

  setMaxDate(date: Date): void {
    const milliTime = date.getTime();

    const nativeDatePicker = this.nativeObject.getDatePicker();
    nativeDatePicker.setMaxDate(long(milliTime));
  }

  setDate(date: Date): void {
    this.nativeObject.updateDate(date.getFullYear(), date.getMonth(), date.getDate());
  }

  toString() {
    return 'DatePicker';
  }

  static Android = {
    Style: DatePickerStyle
  };
  static iOS = {
    DatePickerMode: DatePickerMode
  };
}
