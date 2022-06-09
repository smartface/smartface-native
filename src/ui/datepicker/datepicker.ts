import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { DatePickerEvents } from './datepicker-events';
import { IColor } from '../color/color';
import { IFont } from '../font/font';
import { MobileOSProps } from '../../core/native-mobile-component';

/**
 * @enum UI.DatePicker.Android.Style
 * @android
 * @since 3.1.3
 *
 * According to your requirements, you should choose of the theme enums.
 * If there is no theme specified then default them style will be applied. Theme enum must be given with constructor.
 *
 *     @example
 *     import DatePicker from '@smartface/native/ui/datepicker';
 *     const myDatePicker = new DatePicker({
 *        android: {
 *          style: DatePicker.Android.Style.DEFAULT_DARK
 *        }
 *     });
 *     myDatePicker.onDateSelected = (date) => {
 *         console.log('Year: ' + date.getFullYear() + ' Month: ' + date.getMonth() + ' Day' + date.getDate());
 *     };
 *     myDatePicker.show();
 *
 */
export enum DatePickerStyle {
  /**
   * Native default DatePicker theme.
   *
   * @property DEFAULT
   * @static
   * @android
   * @readonly
   * @since 3.1.3
   */
  DEFAULT = 0,
  /**
   * Native default dark theme with a dark background.
   *
   * @property DEFAULT_DARK
   * @static
   * @android
   * @readonly
   * @since 3.1.3
   */
  DEFAULT_DARK = 16974545,
  /**
   * Native default light theme with a light background.
   *
   * @property DEFAULT_LIGHT
   * @static
   * @android
   * @readonly
   * @since 3.1.3
   */
  DEFAULT_LIGHT = 16974546,
  /**
   * Material dark theme with two-tone backgrounds.
   *
   * @property MATERIAL_DARK
   * @static
   * @android
   * @readonly
   * @since 3.1.3
   */
  MATERIAL_DARK = 16974374,
  /**
   * Material light theme  with two-tone backgrounds.
   *
   * @property MATERIAL_LIGHT
   * @static
   * @android
   * @readonly
   * @since 3.1.3
   */
  MATERIAL_LIGHT = 16974394
}

/**
 * @enum {Number} UI.DatePicker.iOS.DatePickerMode
 * @since 3.1.3
 * @ios
 */
export enum DatePickerMode {
  /**
   * A mode that displays the date in hours, minutes.
   *
   * @property {Number} TIME
   * @static
   * @ios
   * @readonly
   * @since 3.1.3
   */
  TIME = 0,
  /**
   * A mode that displays the date in months, days of the month, and years.
   *
   * @property {Number} DATE
   * @static
   * @ios
   * @readonly
   * @since 3.1.3
   */
  DATE = 1,
  /**
   * A mode that displays the date as unified day of the week, month, and day of the month values, plus hours, minutes.
   *
   * @property {Number} DATEANDTIME
   * @static
   * @ios
   * @readonly
   * @since 3.1.3
   */
  DATEANDTIME = 2
}

export interface DatePickerIOSProperties {
  /**
   * Gets/sets title of the picker. This property only works with show method. Must set before show method.
   *
   * @property {String} title
   * @ios
   * @since 3.1.3
   */
  title: string;
  /**
   * Gets/sets titleColor of the picker. This property only works with show method. Must set before show method.
   *
   * @property {UI.Color} titleColor
   * @ios
   * @since 3.1.3
   */
  titleColor: IColor;
  /**
   * Gets/sets titleFont of the picker. This property only works with show method. Must set before show method.
   *
   * @property {UI.Font} titleFont
   * @ios
   * @since 3.1.3
   */
  titleFont: IFont;
  /**
   * Gets/sets cancelColor of the picker. This property only works with show method. Must set before show method.
   *
   * @property {UI.Color} cancelColor
   * @ios
   * @since 3.1.3
   */
  cancelColor: IColor;
  /**
   * Gets/sets cancelHighlightedColor of the picker. This property only works with show method. Must set before show method.
   *
   * @property {UI.Color} cancelHighlightedColor
   * @ios
   * @since 3.1.3
   */
  cancelHighlightedColor: IColor;
  /**
   * Gets/sets cancelFont of the picker. This property only works with show method. Must set before show method.
   *
   * @property {UI.Font} cancelFont
   * @ios
   * @since 3.1.3
   */
  cancelFont: IFont;
  /**
   * Gets/sets okColor of the picker. This property only works with show method. Must set before show method.
   *
   * @property {UI.Color} okColor
   * @ios
   * @since 3.1.3
   */
  okColor: IColor;
  /**
   * Gets/sets okHighlightedColor of the picker. This property only works with show method. Must set before show method.
   *
   * @property {UI.Color} okHighlightedColor
   * @ios
   * @since 3.1.3
   */
  okHighlightedColor: IColor;
  /**
   * Gets/sets okColor of the picker. This property only works with show method. Must set before show method.
   *
   * @property {UI.Color} okColor
   * @ios
   * @since 3.1.3
   */
  okFont: IFont;
  /**
   * The mode determines whether dates, times, or both dates and times are displayed.
   *
   * @property {UI.DatePicker.iOS.DatePickerMode} datePickerMode
   * @ios
   * @since 3.1.3
   */
  datePickerMode: DatePickerMode;
  /**
   * Gets/sets cancelText of the picker. This property only works with show method. Must set before show method.
   *
   * @property {String} cancelText
   * @ios
   * @since 3.1.3
   */
  cancelText: string;
  /**
   * Gets/sets okText of the picker. This property only works with show method. Must set before show method.
   *
   * @property {String} okText
   * @ios
   * @since 3.1.3
   */
  okText: string;
  /**
   * Gets/sets textColor of Picker.
   *
   * @property {UI.Color} textColor
   * @ios
   * @since 4.2.3
   */
  textColor?: IColor;
  /**
   * Gets/sets dialogLineColor of Picker.
   *
   * @property {UI.Color} dialogLineColor
   * @ios
   * @since 4.2.3
   */
  dialogLineColor: IColor;
  /**
   * Gets/sets dialogBackgroundColor of Picker.
   *
   * @property {UI.Color} dialogBackgroundColor
   * @ios
   * @since 4.2.3
   */
  dialogBackgroundColor: IColor;
}

export interface DatePickerAndroidProperties {
  /**
   * According to your requirements, this property enables you to specify native built-in styles.
   *
   * @property {UI.DatePicker.Android.Style} style
   * @android
   * @since 3.1.3
   */
  style: DatePickerStyle;
}

export declare interface IDatePicker<
  TEvent extends string = DatePickerEvents,
  TNative = any,
  TMobile extends MobileOSProps<DatePickerIOSProperties, DatePickerAndroidProperties> = MobileOSProps<DatePickerIOSProperties, DatePickerAndroidProperties>
> extends NativeEventEmitterComponent<TEvent | DatePickerEvents, TNative, TMobile> {
  /**
   * Sets the initial date avaliable on the picker.
   *
   * @method setDate
   * @android
   * @ios
   * @param {Date} date
   * @since 0.1
   */
  setDate(date: Date): void;
  /**
   * Sets the minimum date avaliable on the picker.
   *
   * @method setMinDate
   * @android
   * @ios
   * @param {Date} minDate
   * @since 0.1
   */
  setMinDate(date: Date): void;
  /**
   * Sets the maximum date avaliable on the picker.
   *
   * @method setMaxDate
   * @android
   * @ios
   * @param {Date} maxDate
   * @since 0.1
   */
  setMaxDate(date: Date): void;
  /**
   * Makes the picker appear on the screen.
   *
   * @method show
   * @android
   * @ios
   * @since 0.1
   */
  show(): void;
  /**
   * Triggered when a date is selected on the picker.
   *
   * @since 0.1
   * @param {Date} date
   * @event onDateSelected
   * @deprecated
   * @android
   * @ios
   * @example
   * ```
   * import DatePicker from '@smartface/native/ui/datepicker';
   *
   * const datePicker = new DatePicker();
   * datePicker.on(DatePicker.Events.Selected, (params) => {
   *  console.info('onDateSelected', params);
   * });
   * ```
   */
  onDateSelected: (date: Date) => void;
  /**
   * Triggered when click cancel button on the picker.
   *
   * @since 3.1.3
   * @event onCancelled
   * @deprecated
   * @android
   * @ios
   * @example
   * ```
   * import DatePicker from '@smartface/native/ui/datepicker';
   *
   * const datePicker = new DatePicker();
   * datePicker.on(DatePicker.Events.Cancelled, () => {
   *  console.info('onCancelled');
   * });
   * ```
   */
  onCancelled: () => void;
}

export abstract class AbstractDatePicker extends NativeEventEmitterComponent<DatePickerEvents, any, IDatePicker> implements IDatePicker {
  constructor(params?: Partial<IDatePicker>) {
    super(params);
  }
  abstract setDate(date: Date): void;
  abstract setMinDate(date: Date): void;
  abstract setMaxDate(date: Date): void;
  abstract show(): void;
  onDateSelected: (date: Date) => void;
  onCancelled: () => void;

  static Android: {
    Style: typeof DatePickerStyle;
  };
  static iOS: {
    DatePickerMode: typeof DatePickerMode;
  };
  protected createNativeObject() {
    throw new Error('Method not implemented');
  }
}

export declare class DatePickerImpl extends AbstractDatePicker {
  setDate(date: Date): void;
  setMinDate(date: Date): void;
  setMaxDate(date: Date): void;
  show(): void;
}
