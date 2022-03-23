import Color from '../color';
import Font from '../font';
import { AttributedStringBase } from './attributedstring';

export default class AttributedStringIOS extends AttributedStringBase {
  private _string = '';
  private _foregroundColor = Color.BLACK;
  private _underlineColor = Color.BLACK;
  private _strikethroughColor = Color.BLACK;
  private _backgroundColor = Color.TRANSPARENT;
  private _font = Font.create(Font.DEFAULT, 14, Font.NORMAL);
  private _underline = false;
  private _strikethrough = false;
  private _link?: string;
  constructor(params?: ConstructorParameters<typeof AttributedStringBase>['0']) {
    super(params);
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
  get underlineColor() {
    return this._underlineColor;
  }
  set underlineColor(value) {
    this._underlineColor = value;
  }
  get strikethroughColor() {
    return this._strikethroughColor;
  }
  set strikethroughColor(value) {
    this._strikethroughColor = value;
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
}
