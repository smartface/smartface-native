import MenuItem, { IMenuItem, Style } from '.';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { MenuItemEvents } from './menuitem-events';

export default class MenuItemIOS extends NativeEventEmitterComponent<MenuItemEvents, any, IMenuItem> implements IMenuItem {
  protected createNativeObject() {
    this._title = '';
    this._style = Style.DEFAULT;
    return null;
  }
  static Styles = {
    DEFAULT: Style.DEFAULT,
    CANCEL: Style.CANCEL,
    DESTRUCTIVE: Style.DESTRUCTIVE
  };
  private _style: Style;
  private _title: string;
  constructor(params?: Partial<MenuItem>) {
    super(params);
    this.addIOSProps(this.getIOSProps());
  }

  private getIOSProps() {
    const self = this;
    return {
      get style(): Style {
        return self._style;
      },
      set style(color: Style) {
        self._style = color;
      }
    };
  }
  onSelected: () => void;
  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
  }
  toString() {
    return 'MenuItem';
  }
  onSelectedListener() {
    this.onSelected?.();
    this.emit('selected');
  }
}
