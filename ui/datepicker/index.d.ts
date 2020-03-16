import Color = require("../color");
import Font = require("../font");

export = DatePicker;
/**
 * @class UI.DatePicker
 * @since 0.1
 *
 * DatePicker is a dialog where users are able to pick a date on.
 *
 *     @example
 *     const DatePicker = require('sf-core/ui/datepicker');
 *     var myDatePicker = new DatePicker();
 *     myDatePicker.onDateSelected = function(date) {
 *         console.log('Year: ' + date.getFullYear() + ' Month: ' + date.getMonth() + ' Day' + date.getDate());
 *     };
 *     myDatePicker.show();
 *
 */
declare class DatePicker extends NativeComponent {
	constructor(params?: any);
  ios: {};
/**
 * Sets the initial date avaliable on the picker.
 *
 * @method setDate
 * @android
 * @ios
 * @param {Date} date
 * @since 0.1
 */
  setDate(date: Date):void;
/**
 * Sets the minimum date avaliable on the picker.
 *
 * @method setMinDate
 * @android
 * @ios
 * @param {Date} minDate
 * @since 0.1
 */
  setMinDate(date: Date):void;
/**
 * Sets the maximum date avaliable on the picker.
 *
 * @method setMaxDate
 * @android
 * @ios
 * @param {Date} maxDate
 * @since 0.1
 */
  setMaxDate(date: Date):void;
/**
 * Makes the picker appear on the screen.
 *
 * @method show
 * @android
 * @ios
 * @since 0.1
 */
  show():void;
/**
 * Triggered when a date is selected on the picker.
 *
 * @since 0.1
 * @param {Date} date
 * @event onDateSelected
 * @android
 * @ios
 */
  onDateSelected: (date: Date) => void;
/**
 * Triggered when click cancel button on the picker.
 *
 * @since 3.1.3
 * @event onCancelled
 * @android
 * @ios
 */
  onCancelled: () => void;
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
  titleColor: Color;
/**
 * Gets/sets titleFont of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Font} titleFont
 * @ios
 * @since 3.1.3
 */
  titleFont: Font;
/**
 * Gets/sets cancelColor of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} cancelColor
 * @ios
 * @since 3.1.3
 */
  cancelColor: Color;
/**
 * Gets/sets cancelHighlightedColor of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} cancelHighlightedColor
 * @ios
 * @since 3.1.3
 */
  cancelHighlightedColor: Color;
/**
 * Gets/sets cancelFont of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Font} cancelFont
 * @ios
 * @since 3.1.3
 */
  cancelFont: Font;
/**
 * Gets/sets okColor of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} okColor
 * @ios
 * @since 3.1.3
 */
  okColor: Color;
/**
 * Gets/sets okHighlightedColor of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} okHighlightedColor
 * @ios
 * @since 3.1.3
 */
  okHighlightedColor: Color;
/**
 * Gets/sets okColor of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} okColor
 * @ios
 * @since 3.1.3
 */
  okFont: Font;
/**
 * The mode determines whether dates, times, or both dates and times are displayed.
 *
 * @property {UI.DatePicker.iOS.DatePickerMode} datePickerMode
 * @ios
 * @since 3.1.3
 */
  datePickerMode: DatePicker.iOS.DatePickerMode;
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
 * According to your requirements, this property enables you to specify native built-in styles.
 *
 * @property {UI.DatePicker.Android.Style} style
 * @android
 * @since 3.1.3
 */
  style: DatePicker.Android.Style;
}
declare namespace DatePicker {
	namespace Android {
/** 
 * @enum UI.DatePicker.Android.Style
 * @android
 * @since 3.1.3
 *
 * According to your requirements, you should choose of the theme enums. 
 * If there is no theme specified then default them style will be applied. Theme enum must be given with constructor.
 *
 *     @example
 *     const DatePicker = require('sf-core/ui/datepicker');
 *     var myDatePicker = new DatePicker({
 *        android: {
 *          style: DatePicker.Android.Style.DEFAULT_DARK
 *        }
 *     });
 *     myDatePicker.onDateSelected = function(date) {
 *         console.log('Year: ' + date.getFullYear() + ' Month: ' + date.getMonth() + ' Day' + date.getDate());
 *     };
 *     myDatePicker.show();
 *
 */
		enum Style {
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
            DEFAULT_DARK = 1,
/**
 * Native default light theme with a light background.
 *
 * @property DEFAULT_LIGHT
 * @static
 * @android
 * @readonly
 * @since 3.1.3
 */
            DEFAULT_LIGHT = 2,
/**
 * Material dark theme with two-tone backgrounds.
 *
 * @property MATERIAL_DARK
 * @static
 * @android
 * @readonly
 * @since 3.1.3
 */
            MATERIAL_DARK = 3,
/**
 * Material light theme  with two-tone backgrounds.
 *
 * @property MATERIAL_LIGHT
 * @static
 * @android
 * @readonly
 * @since 3.1.3
 */
			MATERIAL_LIGHT = 4
		}
    }
/**
 * iOS Specific Properties.
 * @class UI.DatePicker.iOS
 * @since 3.1.3
 */
	namespace iOS {
/** 
 * @enum {Number} UI.DatePicker.iOS.DatePickerMode
 * @since 3.1.3
 * @ios
 */
		enum DatePickerMode {
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
	}
}
