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
function DatePicker () {}

/**
 * Sets the initial date avaliable on the picker.
 *
 * @method setDate
 * @android
 * @ios
 * @param {Date} date
 * @since 0.1
 */
DatePicker.prototype.setDate = function(date) {};

/**
 * Sets the minimum date avaliable on the picker.
 *
 * @method setMinDate
 * @android
 * @ios
 * @param {Date} minDate
 * @since 0.1
 */
DatePicker.prototype.setMinDate = function(date) {};

/**
 * Sets the maximum date avaliable on the picker.
 *
 * @method setMaxDate
 * @android
 * @ios
 * @param {Date} maxDate
 * @since 0.1
 */
DatePicker.prototype.setMaxDate = function(date) {};

/**
 * Makes the picker appear on the screen.
 *
 * @method show
 * @android
 * @ios
 * @since 0.1
 */
DatePicker.prototype.show = function() {};

/**
 * Triggered when a date is selected on the picker.
 *
 * @since 0.1
 * @param {Date} date
 * @event onDateSelected
 * @android
 * @ios
 */
DatePicker.prototype.onDateSelected = function(date) {};

/**
 * Triggered when click cancel button on the picker.
 *
 * @since 3.1.3
 * @event onCancelled
 * @android
 * @ios
 */
DatePicker.prototype.onCancelled = function() {};

/**
 * Gets/sets title of the picker. This property only works with show method. Must set before show method.
 *
 * @property {String} title
 * @ios
 * @since 3.1.3
 */
DatePicker.prototype.title;

/**
 * Gets/sets titleColor of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} titleColor
 * @ios
 * @since 3.1.3
 */
DatePicker.prototype.titleColor;

/**
 * Gets/sets titleFont of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Font} titleFont
 * @ios
 * @since 3.1.3
 */
DatePicker.prototype.titleFont;

/**
 * Gets/sets cancelColor of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} cancelColor
 * @ios
 * @since 3.1.3
 */
DatePicker.prototype.cancelColor;

/**
 * Gets/sets cancelHighlightedColor of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} cancelHighlightedColor
 * @ios
 * @since 3.1.3
 */
DatePicker.prototype.cancelHighlightedColor;

/**
 * Gets/sets cancelFont of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Font} cancelFont
 * @ios
 * @since 3.1.3
 */
DatePicker.prototype.cancelFont;

/**
 * Gets/sets okColor of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} okColor
 * @ios
 * @since 3.1.3
 */
DatePicker.prototype.okColor;

/**
 * Gets/sets okHighlightedColor of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} okHighlightedColor
 * @ios
 * @since 3.1.3
 */
DatePicker.prototype.okHighlightedColor;

/**
 * Gets/sets okFont of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Font} okFont
 * @ios
 * @since 3.1.3
 */
DatePicker.prototype.okFont;

/**
 * The mode determines whether dates, times, or both dates and times are displayed.
 *
 * @property {UI.DatePicker.iOS.DatePickerMode} datePickerMode
 * @ios
 * @since 3.1.3
 */
DatePicker.prototype.datePickerMode;

/**
 * According to your requirements, this property enables you to specify native built-in styles.
 *
 * @property {UI.DatePicker.Android.Style} style
 * @android
 * @since 3.1.3
 */
DatePicker.prototype.style;

/**
 * iOS Specific Properties.
 * @class UI.DatePicker.iOS
 * @since 3.1.3
 */
DatePicker.iOS = {};

/** 
 * @enum {Number} UI.DatePicker.iOS.DatePickerMode
 * @since 3.1.3
 * @ios
 */
DatePicker.iOS.DatePickerMode = {};

/**
 * A mode that displays the date in hours, minutes.
 * 
 * @property {Number} TIME
 * @static
 * @ios
 * @readonly
 * @since 3.1.3
 */
DatePicker.iOS.DatePickerMode.TIME = 0;

/**
 * A mode that displays the date in months, days of the month, and years.
 * 
 * @property {Number} DATE
 * @static
 * @ios
 * @readonly
 * @since 3.1.3
 */
DatePicker.iOS.DatePickerMode.DATE = 1;

/**
 * A mode that displays the date as unified day of the week, month, and day of the month values, plus hours, minutes.
 * 
 * @property {Number} DATEANDTIME
 * @static
 * @ios
 * @readonly
 * @since 3.1.3
 */
DatePicker.iOS.DatePickerMode.DATEANDTIME = 1;


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
DatePicker.Android.Style= {};


/**
 * Native default DatePicker theme.
 *
 * @property DEFAULT
 * @static
 * @android
 * @readonly
 * @since 3.1.3
 */
DatePicker.Android.Style.DEFAULT;


/**
 * Native default dark theme with a dark background.
 *
 * @property DEFAULT_DARK
 * @static
 * @android
 * @readonly
 * @since 3.1.3
 */
DatePicker.Android.Style.DEFAULT_DARK;


/**
 * Native default light theme with a light background.
 *
 * @property DEFAULT_LIGHT
 * @static
 * @android
 * @readonly
 * @since 3.1.3
 */
DatePicker.Android.Style.DEFAULT_LIGHT;


/**
 * Material dark theme with two-tone backgrounds.
 *
 * @property MATERIAL_DARK
 * @static
 * @android
 * @readonly
 * @since 3.1.3
 */
DatePicker.Android.Style.MATERIAL_DARK;


/**
 * Material light theme  with two-tone backgrounds.
 *
 * @property MATERIAL_LIGHT
 * @static
 * @android
 * @readonly
 * @since 3.1.3
 */
DatePicker.Android.Style.MATERIAL_LIGHT;


module.exports = DatePicker;
