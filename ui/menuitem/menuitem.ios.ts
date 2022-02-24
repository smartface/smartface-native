import MenuItem, { AbstractMenuItem, Style } from '.';
import { eventCallbacksAssign } from '../../core/eventemitter/eventCallbacksAssign';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { Exception, TypeUtil } from '../../util';
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

    const EventFunctions = {
      [MenuItemEvents.Selected]: function () {
        self.onSelected?.();
      }
    };

    eventCallbacksAssign(this, EventFunctions);

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
    if (!TypeUtil.isFunction(callback)) {
      throw new TypeError(Exception.TypeError.FUNCTION);
    }
    this._onSelected = callback;
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
