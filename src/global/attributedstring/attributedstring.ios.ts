import Color from '../../ui/color';
import Font from '../../ui/font';
import { IAttributedString } from './attributedstring';

class AttributedStringIOS implements IAttributedString {
  private _string = '';
  private _foregroundColor = Color.BLACK;
  private _underlineColor = Color.BLACK;
  private _strikethroughColor = Color.BLACK;
  private _backgroundColor = Color.TRANSPARENT;
  private _font = Font.create(Font.DEFAULT, 14, Font.NORMAL) as Font;
  private _underline = false;
  private _strikethrough = false;
  private _link?: string;
  ios = {};
  android = {};
  constructor(params?: Partial<IAttributedString>) {
    this.setParams(params);
  }
  nativeObject: { [key: string]: any; };
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
  get underlineColor() {
    return this._underlineColor;
  }
  set underlineColor(value: Color) {
    this._underlineColor = value;
  }
  get strikethroughColor() {
    return this._strikethroughColor;
  }
  set strikethroughColor(value: Color) {
    this._strikethroughColor = value;
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
  set link(value: string | undefined) {
    this._link = value;
  }
  setParams(params?: Partial<IAttributedString>) {
    for (const param in params) {
      if (param === 'ios' || param === 'android') {
        this.setOSSpecificParams(params[param], param);
      } else {
        this[param] = params[param];
      }
    }
  }
  setOSSpecificParams(params: Partial<IAttributedString>, key: string) {
    for (const param in params) {
      this[key][param] = params[param];
    }
  }
}

export default AttributedStringIOS;
