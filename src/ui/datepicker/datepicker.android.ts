import { AbstractDatePicker, IDatePicker, Style } from '.';
import AndroidConfig from '../../util/Android/androidconfig';

const NativeDatePickerDialog = requireClass('android.app.DatePickerDialog');
const NativeDialogInterface = requireClass('android.content.DialogInterface');

export default class DatePickerAndroid extends AbstractDatePicker {
  private _onDateSelected: IDatePicker['onDateSelected'];
  private _onCancelled: IDatePicker['onCancelled'];
  static Android = {
    Style
  };
  createNativeObject(params: Partial<IDatePicker> = {}) {
    const androidStyle = params?.android?.style || DatePickerAndroid.Android.Style.DEFAULT;
    const today = new Date();
    return new NativeDatePickerDialog(
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
  }
  constructor(params: Partial<IDatePicker> = {}) {
    super(params);
    const androidStyle = params?.android?.style || DatePickerAndroid.Android.Style.DEFAULT;
    this.addAndroidProps({
      get style() {
        return androidStyle;
      }
    });

    this.nativeObject.setOnCancelListener(
      NativeDialogInterface.OnCancelListener.implement({
        onCancel: (dialogInterface: any) => {
          this.emit('cancelled');
          this.onCancelled?.();
        }
      })
    );
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
