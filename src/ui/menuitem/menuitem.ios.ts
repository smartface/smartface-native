import MenuItem, { AbstractMenuItem, IMenuItem, Style } from '.';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import Color from '../color';
import { MenuItemEvents } from './menuitem-events';

export default class MenuItemIOS extends NativeEventEmitterComponent<MenuItemEvents, any, IMenuItem> implements AbstractMenuItem {
  static Events = MenuItemEvents;
  static Styles = {
    DEFAULT: Style.DEFAULT,
    CANCEL: Style.CANCEL,
    DESTRUCTIVE: Style.DESTRUCTIVE
  };
  private style:Style = Style.DEFAULT;

  private _title: string = '';
  private _onSelected: () => void;
  constructor(params?: Partial<MenuItem>) {
    super();
    const self = this;

    this.addIOSProps({
      get style(): Style {
        return self.style;
      },
      set style(color: Style) {
        self.style = color;
      }
    });

    // Assign parameters given in constructor
    if (params) {
      for (const param in params) {
        this[param] = params[param];
      }
    }
  }
  getActionView: any;
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
}
