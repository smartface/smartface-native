import MenuItem, { AbstractMenuItem, Style } from '.';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { Exception, TypeUtil } from '../../util';
import Color from '../color';
import { MenuItemEvents } from './menuitem-events';

const NativeSpannable = requireClass('android.text.Spanned');
const NativeColorSpan = requireClass('android.text.style.ForegroundColorSpan');
const NativeSpannableStringBuilder = requireClass('android.text.SpannableStringBuilder');

export default class MenuItemAndroid extends NativeEventEmitterComponent<MenuItemEvents> implements AbstractMenuItem {
  static Events = MenuItemEvents;
  static Styles = {
    DEFAULT: Style.DEFAULT,
    CANCEL: Style.CANCEL,
    DESTRUCTIVE: Style.DESTRUCTIVE
  };
  private _android: Partial<{ titleColor: Color }> = {};
  private _ios: Partial<{ style: Style }> = {
    style: Style.DEFAULT
  };
  private _title: string;
  private _onSelected: () => void;
  constructor(params?: Partial<MenuItem>) {
    super();
    const self = this;

    const callbackWrapper = () => {
      this.emit(MenuItemEvents.Selected);
    };

    this._onSelected = callbackWrapper;

    const android = {
      get titleColor(): Color {
        return self._android.titleColor;
      },
      set titleColor(color: Color) {
        self._android.titleColor = color;
      },
      spanTitle() {
        let spannableStringBuilder = new NativeSpannableStringBuilder('');
        if (self._title) {
          spannableStringBuilder = new NativeSpannableStringBuilder(self._title);
          if (self.android.titleColor) {
            const colorSpan = new NativeColorSpan(self.android.titleColor.nativeObject);
            spannableStringBuilder.setSpan(colorSpan, 0, self._title.length, NativeSpannable.SPAN_INCLUSIVE_INCLUSIVE);
            return spannableStringBuilder;
          }
        }
        return spannableStringBuilder;
      }
    };

    Object.assign(this._android, android);

    // Assign parameters given in constructor
    if (params) {
      for (const param in params) {
        this[param] = params[param];
      }
    }
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
  get android() {
    return this._android;
  }
  get ios() {
    return this._ios;
  }
}
