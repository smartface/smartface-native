import { IMenuItem, MenuItemStyle } from './menuitem';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { MenuItemEvents } from './menuitem-events';

export default class MenuItemIOS extends NativeEventEmitterComponent<MenuItemEvents, any, IMenuItem> implements IMenuItem {
  protected createNativeObject() {
    return null;
  }
  static Styles = {
    DEFAULT: MenuItemStyle.DEFAULT,
    CANCEL: MenuItemStyle.CANCEL,
    DESTRUCTIVE: MenuItemStyle.DESTRUCTIVE
  };
  private _title: string;
  private _style: MenuItemStyle;
  constructor(params?: Partial<IMenuItem>) {
    super(params);
    this.addIOSProps(this.getIOSProps());
  }
  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this._title = '';
    this._style = MenuItemStyle.DEFAULT;
    super.preConstruct(params);
  }
  private getIOSProps() {
    const self = this;
    return {
      get style(): MenuItemStyle {
        return self._style;
      },
      set style(color: MenuItemStyle) {
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
