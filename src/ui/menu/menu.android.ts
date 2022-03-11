import Menu, { AbstractMenu } from '.';
import { Exception, TypeUtil } from '../../util';
import MenuItem from '../menuitem';
import Page from '../page';

export default class MenuAndroid implements AbstractMenu {
  private _items: MenuItem[] = [];
  private _headerTitle = '';
  constructor(params?: Partial<Menu>) {
    Object.assign(this, params);
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
    // TODO: add contextMenu to page
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
