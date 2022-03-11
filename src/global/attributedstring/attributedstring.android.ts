import Color from '../../ui/color';
import Font from '../../ui/font';
import { AttributedStringBase, IAttributedString } from './attributedstring';

const SPAN_EXCLUSIVE_EXCLUSIVE = 33;
class AttributedStringAndroid extends AttributedStringBase {
  private _string = '';
  private _foregroundColor = Color.BLACK;
  private _backgroundColor = Color.TRANSPARENT;
  private _font = Font.create(Font.DEFAULT, 14, Font.NORMAL);
  private _underline = false;
  private _strikethrough = false;
  private _link?: string = undefined;
  private textView: any;
  ios = {};
  android = {};
  constructor(params?: Partial<IAttributedString>) {
    super();

    if (params) {
      for (const param in params) {
        this[param] = params[param];
      }
    }
  }
  get string() {
    return this._string;
  }
  set string(value: string) {
    this._string = value;
  }
  get font() {
    return this._font;
  }
  set font(value: Font) {
    this._font = value;
  }
  get foregroundColor() {
    return this._foregroundColor;
  }
  set foregroundColor(value: Color) {
    this._foregroundColor = value;
  }
  get underline() {
    return this._underline;
  }
  set underline(value: boolean) {
    this._underline = value;
  }
  get strikethrough() {
    return this._strikethrough;
  }
  set strikethrough(value: boolean) {
    this._strikethrough = value;
  }
  get backgroundColor() {
    return this._backgroundColor;
  }
  set backgroundColor(value: Color) {
    this._backgroundColor = value;
  }
  get link() {
    return this._link;
  }
  set link(value: string) {
    this._link = value;
  }
  setSpan(stringBuilder: any) {
    const self = this;
    stringBuilder.append(this.string);
    const start = stringBuilder.length() - this.string.length;
    const end = stringBuilder.length();

    if (this.link !== undefined) {
      const clickableSpanOverrideMethods = {
        onClick: function () {
          self.textView.onClick && self.textView.onClick(self.link);
          self.textView.onLinkClick && self.textView.onLinkClick(self.link);
        },
        updateDrawState: function (ds) {
          ds.setUnderlineText(self.underline);
        }
      };

      const SFClickableSpan = requireClass('io.smartface.android.sfcore.ui.textview.SFClickableSpan');
      const clickSpan = new SFClickableSpan(clickableSpanOverrideMethods);
      stringBuilder.setSpan(clickSpan, start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
    }

    if (this.strikethrough) {
      const NativeStrikethroughSpan = requireClass('android.text.style.StrikethroughSpan');
      const _strikethroughSpan = new NativeStrikethroughSpan();
      stringBuilder.setSpan(_strikethroughSpan, start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
    }

    if (this.foregroundColor) {
      const NativeForegroundColorSpan = requireClass('android.text.style.ForegroundColorSpan');
      stringBuilder.setSpan(new NativeForegroundColorSpan(this.foregroundColor.nativeObject), start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
    }
    if (this.backgroundColor) {
      const NativeBackgroundColorSpan = requireClass('android.text.style.BackgroundColorSpan');
      stringBuilder.setSpan(new NativeBackgroundColorSpan(this.backgroundColor.nativeObject), start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
    }
    if (this.font) {
      const NativeAbsoluteSizeSpan = requireClass('android.text.style.AbsoluteSizeSpan');
      const SFTypefaceSpan = requireClass('io.smartface.android.sfcore.ui.textview.SFTypefaceSpan');

      const _typeSpan = new SFTypefaceSpan('SF', this.font.nativeObject);
      stringBuilder.setSpan(_typeSpan, start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
      stringBuilder.setSpan(new NativeAbsoluteSizeSpan(this.font.size, true), start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
    }

    if (this.underline === true) {
      const NativeUnderlineSpan = requireClass('android.text.style.UnderlineSpan');
      stringBuilder.setSpan(new NativeUnderlineSpan(), start, end, SPAN_EXCLUSIVE_EXCLUSIVE);
    }
  }
}

export default AttributedStringAndroid;
