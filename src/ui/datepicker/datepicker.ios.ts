import { AbstractDatePicker, DatePickerIOSProperties, DatePickerMode, IDatePicker, Style } from './datepicker';
import Color from '../color';
import { DatePickerEvents } from './datepicker-events';

export default class DatePickerIOS<TEvent extends string = DatePickerEvents> extends AbstractDatePicker implements IDatePicker<TEvent | DatePickerEvents> {
  protected _nativeObject: __SF_UIDatePicker;
  private _titleColor: DatePickerIOSProperties['titleColor'];
  private _titleFont: DatePickerIOSProperties['titleFont'];
  private _cancelColor: DatePickerIOSProperties['cancelColor'];
  private _cancelHighlightedColor: DatePickerIOSProperties['cancelHighlightedColor'];
  private _cancelFont: DatePickerIOSProperties['cancelFont'];
  private _okColor: DatePickerIOSProperties['okColor'];
  private _okHighlightedColor: DatePickerIOSProperties['okHighlightedColor'];
  private _okFont: DatePickerIOSProperties['okFont'];
  private _okText: string;
  private _cancelText: string;
  private onDateSelectedListener: (e: { date: Date }) => void;
  private onCancelledListener: () => void;
  __createNativeObject__() {
    return new __SF_UIDatePicker();
  }
  constructor(params: Partial<IDatePicker> = {}) {
    super();
    const { ios, android, ...restParams } = params;

    this.addIOSProps(this.iosProps);

    this.nativeObject.onSelected = (e) => {
      this.emit('selected', e.date);
      this.onDateSelected?.(e.date);
    };
    this.nativeObject.onCancelled = () => {
      this.emit('cancelled');
      this.onCancelled?.();
    };

    // Object.assign(this._ios, ios);
    // Object.assign(this._android, android);
    // Object.assign(this, restParams);
  }

  setDate(date: Date) {
    this.nativeObject.defaultDate = date;
  }

  setMinDate(date: Date) {
    this.nativeObject.minimumDate = date;
  }

  setMaxDate(date: Date) {
    this.nativeObject.maximumDate = date;
  }

  show() {
    this.nativeObject.show(
      this.ios.title || '',
      this.ios.titleColor?.nativeObject,
      this.ios.titleFont,
      this.ios.cancelColor?.nativeObject,
      this.ios.cancelHighlightedColor?.nativeObject,
      this.ios.cancelFont,
      this.ios.okColor?.nativeObject,
      this.ios.okHighlightedColor?.nativeObject,
      this.ios.okFont,
      this.ios.okText,
      this.ios.cancelText
    );
  }

  private get iosProps(): DatePickerIOSProperties {
    const self = this;

    return {
      get textColor(): DatePickerIOSProperties['textColor'] {
        if (self.nativeObject.textColor === undefined) {
          return undefined;
        }
        return new Color({
          color: self.nativeObject.textColor
        });
      },
      set textColor(value: DatePickerIOSProperties['textColor']) {
        self.nativeObject.textColor = value?.nativeObject;
      },
      get dialogBackgroundColor(): DatePickerIOSProperties['dialogBackgroundColor'] {
        return new Color({
          color: self.nativeObject.dialogBackgroundColor
        });
      },
      set dialogBackgroundColor(value: DatePickerIOSProperties['dialogBackgroundColor']) {
        self.nativeObject.dialogBackgroundColor = value.nativeObject;
      },
      get dialogLineColor(): DatePickerIOSProperties['dialogLineColor'] {
        return new Color({
          color: self.nativeObject.dialogLineColor
        });
      },
      set dialogLineColor(value: DatePickerIOSProperties['dialogLineColor']) {
        self.nativeObject.dialogLineColor = value.nativeObject;
      },
      get titleColor(): DatePickerIOSProperties['titleColor'] {
        return self._titleColor;
      },
      set titleColor(value: DatePickerIOSProperties['titleColor']) {
        self._titleColor = value;
      },
      get titleFont(): DatePickerIOSProperties['titleFont'] {
        return self._titleFont;
      },
      set titleFont(value: DatePickerIOSProperties['titleFont']) {
        self._titleFont = value;
      },
      get cancelColor(): DatePickerIOSProperties['cancelColor'] {
        return self._cancelColor;
      },
      set cancelColor(value: DatePickerIOSProperties['cancelColor']) {
        self._cancelColor = value;
      },
      get cancelHighlightedColor(): DatePickerIOSProperties['cancelHighlightedColor'] {
        return self._cancelHighlightedColor;
      },
      set cancelHighlightedColor(value: DatePickerIOSProperties['cancelHighlightedColor']) {
        self._cancelHighlightedColor = value;
      },
      get cancelFont(): DatePickerIOSProperties['cancelFont'] {
        return self._cancelFont;
      },
      set cancelFont(value: DatePickerIOSProperties['cancelFont']) {
        self._cancelFont = value;
      },
      get okColor(): DatePickerIOSProperties['okColor'] {
        return self._okColor;
      },
      set okColor(value: DatePickerIOSProperties['okColor']) {
        self._okColor = value;
      },
      get okHighlightedColor(): DatePickerIOSProperties['okHighlightedColor'] {
        return self._okHighlightedColor;
      },
      set okHighlightedColor(value: DatePickerIOSProperties['okHighlightedColor']) {
        self._okHighlightedColor = value;
      },
      get okFont(): DatePickerIOSProperties['okFont'] {
        return self._okFont;
      },
      set okFont(value: DatePickerIOSProperties['okFont']) {
        self._okFont = value;
      },
      get datePickerMode(): DatePickerIOSProperties['datePickerMode'] {
        return self.nativeObject.datePickerMode;
      },
      set datePickerMode(value: DatePickerIOSProperties['datePickerMode']) {
        self.nativeObject.datePickerMode = value;
      },
      get okText(): DatePickerIOSProperties['okText'] {
        return self._okText;
      },
      set okText(value: DatePickerIOSProperties['okText']) {
        self._okText = value;
      },
      get cancelText(): DatePickerIOSProperties['cancelText'] {
        return self._cancelText;
      },
      set cancelText(value: DatePickerIOSProperties['cancelText']) {
        self._cancelText = value;
      },
      title: ''
    };
  }
}
