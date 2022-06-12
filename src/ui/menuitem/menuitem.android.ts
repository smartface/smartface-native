import { IMenuItem, MenuItemStyle } from './menuitem';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import Exception from '../../util/exception';
import TypeUtil from '../../util/type';
import { MenuItemEvents } from './menuitem-events';
import { IColor } from '../color/color';

const NativeSpannable = requireClass('android.text.Spanned');
const NativeColorSpan = requireClass('android.text.style.ForegroundColorSpan');
const NativeSpannableStringBuilder = requireClass('android.text.SpannableStringBuilder');

export default class MenuItemAndroid extends NativeEventEmitterComponent<MenuItemEvents, any, IMenuItem> implements IMenuItem {
  protected createNativeObject() {
    return null;
  }
  static Events = MenuItemEvents;
  static Styles = {
    DEFAULT: MenuItemStyle.DEFAULT,
    CANCEL: MenuItemStyle.CANCEL,
    DESTRUCTIVE: MenuItemStyle.DESTRUCTIVE
  };
  private _title: string;
  private _titleColor?: IColor;
  constructor(params?: Partial<IMenuItem>) {
    super(params);
    this.addAndroidProps(this.getAndroidProps());
  }
  getAndroidProps() {
    const self = this;
    return {
      get titleColor(): IColor | undefined {
        return self._titleColor;
      },
      set titleColor(color: IColor | undefined) {
        self._titleColor = color;
      },
      spanTitle() {
        let spannableStringBuilder = new NativeSpannableStringBuilder('');
        if (self._title) {
          spannableStringBuilder = new NativeSpannableStringBuilder(self._title);
          if (self._titleColor) {
            const colorSpan = new NativeColorSpan(self._titleColor.nativeObject);
            spannableStringBuilder.setSpan(colorSpan, 0, self._title.length, NativeSpannable.SPAN_INCLUSIVE_INCLUSIVE);
            return spannableStringBuilder;
          }
        }
        return spannableStringBuilder;
      }
    };
  }
  onSelected: () => void;
  onSelectedListener() {
    this.emit('selected');
    this.onSelected?.();
  }
  get title(): string {
    return this._title;
  }
  set title(value: string) {
    if (!TypeUtil.isString(value)) {
      throw new TypeError(Exception.TypeError.STRING);
    }
    this._title = value;
  }
  toString() {
    return 'MenuItem';
  }
}
