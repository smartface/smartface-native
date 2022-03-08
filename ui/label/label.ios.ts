import NSLineBreakMode from '../../util/iOS/nslinebreakmode';
import Color from '../color';
import { ViewEvents } from '../view/view-event';
import ViewIOS from '../view/view.ios';
import { ILabel } from '.';
import TextAlignment from '../shared/textalignment';

const DEFAULT_MINIMUM_FONT_SIZE = 1;

export default class LabelIOS<TEvent extends string = ViewEvents, TNative = any, TProps extends ILabel = ILabel> extends ViewIOS<TEvent, TNative, TProps> implements ILabel {
  private _minimumFontSize = DEFAULT_MINIMUM_FONT_SIZE;
  private _textAlignment = TextAlignment.MIDLEFT;
  protected _textColor: ILabel['textColor'] = Color.BLACK;
  constructor(params?: Partial<TProps>) {
    super(params);
    if (!this.nativeObject) {
      this._nativeObject = new __SF_SMFUILabel();
    }

    this.touchEnabled = true;
  }

  get font() {
    return this.nativeObject.font;
  }
  set font(value: ILabel['font']) {
    this.nativeObject.font = value;
    this.minimumFontSize = this.minimumFontSize;
  }
  get adjustFontSizeToFit() {
    return this.nativeObject.adjustsFontSizeToFitWidth;
  }
  set adjustFontSizeToFit(value: ILabel['adjustFontSizeToFit']) {
    this.nativeObject.baselineAdjustment = DEFAULT_MINIMUM_FONT_SIZE;
    this.nativeObject.adjustsFontSizeToFitWidth = value;
  }
  get minimumFontSize() {
    return this._minimumFontSize;
  }
  set minimumFontSize(value: ILabel['minimumFontSize']) {
    this._minimumFontSize = value;
    this.nativeObject.minimumScaleFactor = this._minimumFontSize / this.font.size;
  }
  get ellipsizeMode() {
    return NSLineBreakMode.nsLineBreakModeToEllipsizeMode(this.nativeObject.lineBreakMode);
  }
  set ellipsizeMode(value: ILabel['ellipsizeMode']) {
    this.nativeObject.lineBreakMode = NSLineBreakMode.ellipsizeModeToNSLineBreakMode(value);
  }
  get maxLines() {
    return this.nativeObject.numberOfLines;
  }
  set maxLines(value: ILabel['maxLines']) {
    this.nativeObject.numberOfLines = value;
  }
  get multiline() {
    return this.nativeObject.numberOfLines === 0 && this.nativeObject.numberOfLines === 0;
  }
  set multiline(value: ILabel['multiline']) {
    this.nativeObject.numberOfLines = value ? 0 : 1;
    this.nativeObject.lineBreakMode = value ? 0 : 4;
  }
  get text() {
    return this.nativeObject.text;
  }
  set text(value: ILabel['text']) {
    this.nativeObject.text = value;
  }
  get textAlignment() {
    return this._textAlignment;
  }
  set textAlignment(value: ILabel['textAlignment']) {
    this._textAlignment = value;
    this.nativeObject.textAlignment = value % 3;
  }
  get textColor() {
    return this._textColor;
  }
  set textColor(value: ILabel['textColor']) {
    if (value instanceof Color) {
      this._textColor = value;
      this.nativeObject.textColor = value.nativeObject;
    }
  }
}
