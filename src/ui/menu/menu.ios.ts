import Menu, { AbstractMenu } from '.';
import NativeComponent from '../../core/native-component';
import Invocation from '../../util/iOS/invocation';
import MenuItem from '../menuitem';
import Page from '../page';

export default class MenuIOS extends NativeComponent implements AbstractMenu {
  protected createNativeObject() {
    return null;
  }
  private _items: MenuItem[] = [];
  private _headerTitle = '';
  constructor(params?: Partial<Menu>) {
    super(params);
  }
  get items() {
    return this._items;
  }
  set items(value: MenuItem[]) {
    this._items = value;
  }
  get headerTitle() {
    return this._headerTitle;
  }
  set headerTitle(value: string) {
    this._headerTitle = value;
  }
  show(page: Page) {
    this.nativeObject = __SF_UIAlertController.createAlertController(0);

    if (this.headerTitle && this.headerTitle !== '') {
      this.nativeObject.title = this.headerTitle;
    }

    for (let i = 0; i < this.items.length; i++) {
      const style = this.items[i].ios.style;
      const listener = this.items[i].onSelectedListener;
      if (style && listener) {
        const action = __SF_UIAlertAction.createAction(this.items[i].title, style, listener);
        this.nativeObject.addAction(action);
      }
    }

    const popOver = this.nativeObject.valueForKey('popoverPresentationController');
    if (popOver) {
      const argSourceView = new Invocation.Argument({
        type: 'id',
        value: page.layout.nativeObject
      });
      Invocation.invokeInstanceMethod(popOver, 'setSourceView:', [argSourceView]);

      const argSourceRect = new Invocation.Argument({
        type: 'CGRect',
        value: {
          x: page.layout.nativeObject.bounds.width / 2,
          y: page.layout.nativeObject.bounds.height / 2,
          width: 0,
          height: 0
        }
      });
      Invocation.invokeInstanceMethod(popOver, 'setSourceRect:', [argSourceRect]);

      const argPermittedArrowDirections = new Invocation.Argument({
        type: 'NSInteger',
        value: 0
      });
      Invocation.invokeInstanceMethod(popOver, 'setPermittedArrowDirections:', [argPermittedArrowDirections]);
    }

    page.nativeObject.presentViewController(this.nativeObject);
  }
}
