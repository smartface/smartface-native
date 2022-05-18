import Color from '../color';
import Font from '../font';
import { AttributedStringBase, IAttributedString } from './attributedstring';

export default class AttributedStringIOS extends AttributedStringBase implements IAttributedString {
  private _string: IAttributedString['string'];
  private _foregroundColor: IAttributedString['foregroundColor'];
  private _underlineColor: IAttributedString['ios']['underlineColor'];
  private _strikethroughColor: IAttributedString['ios']['strikethroughColor'];
  private _backgroundColor: IAttributedString['foregroundColor'];
  private _font: IAttributedString['font'];
  private _underline: IAttributedString['underline'];
  private _strikethrough: IAttributedString['strikethrough'];
  private _link?: string;
  constructor(params?: ConstructorParameters<typeof AttributedStringBase>['0']) {
    super(params);
  }
  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this._string = '';
    this._foregroundColor = Color.BLACK;
    this._underlineColor = Color.BLACK;
    this._strikethroughColor = Color.BLACK;
    this._backgroundColor = Color.TRANSPARENT;
    this._font = Font.create(Font.DEFAULT, 14, Font.NORMAL);
    this._underline = false;
    this._strikethrough = false;
    super.preConstruct(params);
    this.addIOSProps(this.getIOSProps());
  }

  protected getIOSProps() {
    const self = this;
    return {
      get underlineColor() {
        return self._underlineColor;
      },
      set underlineColor(value) {
        self._underlineColor = value;
      },
      get strikethroughColor() {
        return self._strikethroughColor;
      },
      set strikethroughColor(value) {
        self._strikethroughColor = value;
      }
    };
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
}
