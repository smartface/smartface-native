import MenuItem, { AbstractMenuItem, IMenuItem, Style } from '.';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import Exception from '../../util/exception';
import TypeUtil from '../../util/type';
import Color from '../color';
import { MenuItemEvents } from './menuitem-events';

const NativeSpannable = requireClass('android.text.Spanned');
const NativeColorSpan = requireClass('android.text.style.ForegroundColorSpan');
const NativeSpannableStringBuilder = requireClass('android.text.SpannableStringBuilder');

export default class MenuItemAndroid extends NativeEventEmitterComponent<MenuItemEvents, any, IMenuItem> implements AbstractMenuItem {
  protected createNativeObject() {
    return null;
  }
  static Events = MenuItemEvents;
  static Styles = {
    DEFAULT: Style.DEFAULT,
    CANCEL: Style.CANCEL,
    DESTRUCTIVE: Style.DESTRUCTIVE
  };
  private _title: string;
  private _titleColor?: Color;
  private _onSelected: () => void;
  constructor(params?: Partial<MenuItem>) {
    super(params);
    const self = this;

    const callbackWrapper = () => {
      this.emit(MenuItemEvents.Selected);
    };

    this._onSelected = callbackWrapper;

    this.addAndroidProps({
      get titleColor(): Color | undefined {
        return self._titleColor;
      },
      set titleColor(color: Color | undefined) {
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
    });
  }
  getActionView: any;
  onSelectedListener?: (() => void) | undefined;
  get title(): string {
    return this._title;
  }
  set title(value: string) {
    if (!TypeUtil.isString(value)) {
      throw new TypeError(Exception.TypeError.STRING);
    }
    this._title = value;
  }
  get onSelected(): () => void {
    return this._onSelected;
  }
  set onSelected(callback: () => void) {
    const callbackWrapper = () => {
      callback?.();
      this.emit(MenuItemEvents.Selected);
    };

    this._onSelected = callbackWrapper;
  }
  toString() {
    return 'MenuItem';
  }
}
