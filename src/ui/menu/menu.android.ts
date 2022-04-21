import { AbstractMenu } from './menu';
import NativeComponent from '../../core/native-component';
import Exception from '../../util/exception';
import TypeUtil from '../../util/type';
import MenuItem from '../menuitem';
import Page from '../page';

export default class MenuAndroid extends NativeComponent implements AbstractMenu {
  private _items: MenuItem[] = [];
  private _headerTitle = '';
  createNativeObject() {
    return null;
  }
  constructor(params?: Partial<AbstractMenu>) {
    super(params);
  }
  get items() {
    return this._items;
  }
  set items(value: MenuItem[]) {
    if (!TypeUtil.isArray(value)) {
      throw new TypeError(Exception.TypeError.ARRAY);
    }
    this._items = value;
  }
  get headerTitle() {
    return this._headerTitle;
  }
  set headerTitle(value: string) {
    if (!TypeUtil.isString(value)) {
      throw new TypeError(Exception.TypeError.STRING);
    }
    this._headerTitle = value;
  }
  show(page: Page) {
    if (!(page instanceof Page)) {
      throw new TypeError('Parameter must be instance of page');
    }
    const layout = page.layout;
    const layoutNativeObject = layout.nativeObject;
    const pageNativeObject = page.nativeObject;

    pageNativeObject.registerForContextMenu(layoutNativeObject);
    // TODO: Do not use like this, define an event to page and trigger that with given menu parameters
    page.contextMenu = {
      items: this._items,
      headerTitle: this._headerTitle
    };
    layoutNativeObject.showContextMenu();
    //Menu being shown by long press. To prevent it, unregister after showing.
    pageNativeObject.unregisterForContextMenu(layoutNativeObject);
  }
  toString() {
    return 'Menu';
  }
}
