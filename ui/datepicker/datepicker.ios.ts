import { AbstractDatePicker, DatePickerIOSProperties, DatePickerMode, IDatePicker, Style } from '.';
import Color from '../color';
import { DatePickerEvents } from './datepicker-events';

export default class DatePickerIOS<TEvent extends string = DatePickerEvents> extends AbstractDatePicker<TEvent> {
  protected _nativeObject: __SF_UIDatePicker;
  private _titleColor: IDatePicker['ios']['titleColor'];
  private _titleFont: IDatePicker['ios']['titleFont'];
  private _cancelColor: IDatePicker['ios']['cancelColor'];
  private _cancelHighlightedColor: IDatePicker['ios']['cancelHighlightedColor'];
  private _cancelFont: IDatePicker['ios']['cancelFont'];
  private _okColor: IDatePicker['ios']['okColor'];
  private _okHighlightedColor: IDatePicker['ios']['okHighlightedColor'];
  private _okFont: IDatePicker['ios']['okFont'];
  private _okText: string;
  private _cancelText: string;
  private onDateSelectedListener: (e: { date: Date }) => void;
  private onCancelledListener: () => void;
  constructor(params: Partial<IDatePicker> = {}) {
    super();
    const { ios, android, ...restParams } = params;

    if (!this.nativeObject) {
      this._nativeObject = new __SF_UIDatePicker();
    }

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
      get textColor(): IDatePicker['ios']['textColor'] {
        if (self.nativeObject.textColor === undefined) {
          return undefined;
        }
        return new Color({
          color: self.nativeObject.textColor
        });
      },
      set textColor(value: IDatePicker['ios']['textColor']) {
        self.nativeObject.textColor = value?.nativeObject;
      },
      get dialogBackgroundColor(): IDatePicker['ios']['dialogBackgroundColor'] {
        return new Color({
          color: self.nativeObject.dialogBackgroundColor
        });
      },
      set dialogBackgroundColor(value: IDatePicker['ios']['dialogBackgroundColor']) {
        self.nativeObject.dialogBackgroundColor = value.nativeObject;
      },
      get dialogLineColor(): IDatePicker['ios']['dialogLineColor'] {
        return new Color({
          color: self.nativeObject.dialogLineColor
        });
      },
      set dialogLineColor(value: IDatePicker['ios']['dialogLineColor']) {
        self.nativeObject.dialogLineColor = value.nativeObject;
      },
      get titleColor(): IDatePicker['ios']['titleColor'] {
        return self._titleColor;
      },
      set titleColor(value: IDatePicker['ios']['titleColor']) {
        self._titleColor = value;
      },
      get titleFont(): IDatePicker['ios']['titleFont'] {
        return self._titleFont;
      },
      set titleFont(value: IDatePicker['ios']['titleFont']) {
        self._titleFont = value;
      },
      get cancelColor(): IDatePicker['ios']['cancelColor'] {
        return self._cancelColor;
      },
      set cancelColor(value: IDatePicker['ios']['cancelColor']) {
        self._cancelColor = value;
      },
      get cancelHighlightedColor(): IDatePicker['ios']['cancelHighlightedColor'] {
        return self._cancelHighlightedColor;
      },
      set cancelHighlightedColor(value: IDatePicker['ios']['cancelHighlightedColor']) {
        self._cancelHighlightedColor = value;
      },
      get cancelFont(): IDatePicker['ios']['cancelFont'] {
        return self._cancelFont;
      },
      set cancelFont(value: IDatePicker['ios']['cancelFont']) {
        self._cancelFont = value;
      },
      get okColor(): IDatePicker['ios']['okColor'] {
        return self._okColor;
      },
      set okColor(value: IDatePicker['ios']['okColor']) {
        self._okColor = value;
      },
      get okHighlightedColor(): IDatePicker['ios']['okHighlightedColor'] {
        return self._okHighlightedColor;
      },
      set okHighlightedColor(value: IDatePicker['ios']['okHighlightedColor']) {
        self._okHighlightedColor = value;
      },
      get okFont(): IDatePicker['ios']['okFont'] {
        return self._okFont;
      },
      set okFont(value: IDatePicker['ios']['okFont']) {
        self._okFont = value;
      },
      get datePickerMode(): IDatePicker['ios']['datePickerMode'] {
        return self.nativeObject.datePickerMode;
      },
      set datePickerMode(value: IDatePicker['ios']['datePickerMode']) {
        self.nativeObject.datePickerMode = value;
      },
      get okText(): IDatePicker['ios']['okText'] {
        return self._okText;
      },
      set okText(value: IDatePicker['ios']['okText']) {
        self._okText = value;
      },
      get cancelText(): IDatePicker['ios']['cancelText'] {
        return self._cancelText;
      },
      set cancelText(value: IDatePicker['ios']['cancelText']) {
        self._cancelText = value;
      },
      title: ""
    };
  }
}
