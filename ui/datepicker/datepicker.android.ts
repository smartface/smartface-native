import { AbstractDatePicker, DatePickerMode, IDatePicker, Style } from '.';
import { AndroidConfig } from '../../util';

const NativeDatePickerDialog = requireClass('android.app.DatePickerDialog');
const NativeDialogInterface = requireClass('android.content.DialogInterface');

export default class DatePickerAndroid extends AbstractDatePicker {
  private _onDateSelected: IDatePicker['onDateSelected'];
  private _onCancelled: IDatePicker['onCancelled'];
  constructor(params: Partial<IDatePicker> = {}) {
    super(params);

    const today = new Date();

    const androidStyle = (params && params.android && params.android.style) || DatePickerAndroid.Android.Style.DEFAULT;
    if (!this.nativeObject) {
      this.nativeObject = new NativeDatePickerDialog(
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


    this.addAndroidProps({
      get style(){
        return androidStyle
      }
    })


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
