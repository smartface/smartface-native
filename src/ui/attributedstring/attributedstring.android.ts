import { NativeMobileComponent } from '../../core/native-mobile-component';
import Color from '../color';
import Font from '../font';
import TextView from '../textview';
import { IAttributedString } from './attributedstring';

const SFClickableSpan = requireClass('io.smartface.android.sfcore.ui.textview.SFClickableSpan');
const NativeForegroundColorSpan = requireClass('android.text.style.ForegroundColorSpan');
const NativeAbsoluteSizeSpan = requireClass('android.text.style.AbsoluteSizeSpan');
const NativeBackgroundColorSpan = requireClass('android.text.style.BackgroundColorSpan');
const SFTypefaceSpan = requireClass('io.smartface.android.sfcore.ui.textview.SFTypefaceSpan');
const NativeUnderlineSpan = requireClass('android.text.style.UnderlineSpan');
const NativeStrikethroughSpan = requireClass('android.text.style.StrikethroughSpan');

const SPAN_EXCLUSIVE_EXCLUSIVE = 33;
class AttributedStringAndroid extends NativeMobileComponent<any, IAttributedString> implements IAttributedString {
  private _string: IAttributedString['string'];
  private _foregroundColor: IAttributedString['foregroundColor'];
  private _backgroundColor: IAttributedString['foregroundColor'];
  private _font: IAttributedString['font'];
  private _underline: IAttributedString['underline'];
  private _strikethrough: IAttributedString['strikethrough'];
  private _link?: string;
  private textView: TextView;
  constructor(params?: IAttributedString) {
    super(params);
  }
  protected createNativeObject(params?: Partial<Record<string, any>>) {
    return null;
  }
  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this._string = '';
    this._foregroundColor = Color.BLACK;
    this._backgroundColor = Color.TRANSPARENT;
    this._font = Font.create(Font.DEFAULT, 14, Font.NORMAL);
    this._underline = false;
    this._strikethrough = false;
    super.preConstruct(params);
  }
  get string() {
    return this._string;
  }
  set string(value) {
    this._string = value;
  }
  get font() {
    return this._font;
  }
  set font(value) {
    this._font = value;
  }
  get foregroundColor() {
    return this._foregroundColor;
  }
  set foregroundColor(value) {
    this._foregroundColor = value;
  }
  get underline() {
    return this._underline;
  }
  set underline(value) {
    this._underline = value;
  }
  get strikethrough() {
    return this._strikethrough;
  }
  set strikethrough(value) {
    this._strikethrough = value;
  }
  get backgroundColor() {
    return this._backgroundColor;
  }
  set backgroundColor(value) {
    this._backgroundColor = value;
  }
  get link() {
    return this._link;
  }
  set link(value) {
    this._link = value;
  }
  setSpan(stringBuilder: any) {
    stringBuilder.append(this.string);
    const start = stringBuilder.length() - this.string.length;
    const end = stringBuilder.length();

    if (this.link !== undefined) {
      const clickableSpanOverrideMethods = {
        onClick: () => {
          this.textView.onLinkClick?.(this.link);
          this.textView.emit('linkClick', this.link);
        },
        updateDrawState: (ds: any) => {
          ds.setUnderlineText(this.underline);
        }
      };

      const clickSpan = new SFClickableSpan(clickableSpanOverrideMethods);
      stringBuilder.setSpan(clickSpan, start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
    }

    if (this.strikethrough) {
      const _strikethroughSpan = new NativeStrikethroughSpan();
      stringBuilder.setSpan(_strikethroughSpan, start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
    }

    if (this.foregroundColor) {
      stringBuilder.setSpan(new NativeForegroundColorSpan(this.foregroundColor.nativeObject), start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
    }
    if (this.backgroundColor) {
      stringBuilder.setSpan(new NativeBackgroundColorSpan(this.backgroundColor.nativeObject), start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
    }
    if (this.font) {
      const _typeSpan = new SFTypefaceSpan('SF', this.font.nativeObject);
      stringBuilder.setSpan(_typeSpan, start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
      stringBuilder.setSpan(new NativeAbsoluteSizeSpan(this.font.size, true), start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
    }

    if (this.underline === true) {
      stringBuilder.setSpan(new NativeUnderlineSpan(), start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
    }
  }
}

export default AttributedStringAndroid;
