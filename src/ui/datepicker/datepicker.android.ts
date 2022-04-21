import { AbstractDatePicker, IDatePicker, Style } from './datepicker';
import AndroidConfig from '../../util/Android/androidconfig';

const NativeDatePickerDialog = requireClass('android.app.DatePickerDialog');
const NativeDialogInterface = requireClass('android.content.DialogInterface');

export default class DatePickerAndroid extends AbstractDatePicker {
  onDateSelected: IDatePicker['onDateSelected'];
  onCancelled: IDatePicker['onCancelled'];
  static Android = {
    Style
  };
  __createNativeObject__(params: Partial<IDatePicker> = {}) {
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
}
