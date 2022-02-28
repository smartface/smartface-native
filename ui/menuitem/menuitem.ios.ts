import MenuItem, { AbstractMenuItem, Style } from '.';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import Color from '../color';
import { MenuItemEvents } from './menuitem-events';

export default class MenuItemIOS extends NativeEventEmitterComponent<MenuItemEvents> implements AbstractMenuItem {
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
  private _title: string = '';
  private _onSelected: () => void;
  constructor(params?: Partial<MenuItem>) {
    super();
    const self = this;

    const ios = {
      get style(): Style {
        return self._ios.style;
      },
      set style(color: Style) {
        self._ios.style = color;
      }
    };

    Object.assign(this._ios, ios);

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
    this._title = value;
  }
  get onSelected(): () => void {
    return this._onSelected;
  }
  set onSelected(callback: () => void) {
    this._onSelected = callback;
  }
  toString() {
    return 'MenuItem';
  }
  onSelectedListener() {
    this.onSelected?.();
    this.emit(MenuItemEvents.Selected);
  }
  get android() {
    return this._android;
  }
  get ios() {
    return this._ios;
  }
}
