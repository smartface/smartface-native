import { IBottomTabBar } from './bottomtabbar';
import NativeComponent from '../../core/native-component';
import { NativeMobileComponent } from '../../core/native-mobile-component';
import System from '../../device/system';
import Color from '../color';
import ColorIOS from '../color/color.ios';
import ImageIOS from '../image/image.ios';
import TabBarItem from '../tabbaritem';

export default class BottomTabBarIOS extends NativeMobileComponent<any, IBottomTabBar> implements IBottomTabBar {
  private appearance: any;
  private _items: TabBarItem[];
  private _borderVisibility: boolean;
  private _itemColor: IBottomTabBar['itemColor']; // Do not remove. COR-1931 describes what happening.
  private _selectionIndicatorImage: any;
  constructor(params?: Partial<IBottomTabBar> & Partial<NativeComponent>) {
    super(params);
    this.addIOSProps(this.getIOSParams());
  }
  protected init(params?: Partial<Record<string, any>>): void {
    this.nativeObject.translucent = false;
    this.nativeObject.delegate = this;
    // Xcode 13.1 background bug fixes [NTVE-398]
    if (parseInt(System.OSVersion) >= 15) {
      this.appearance = new __SF_UITabBarAppearance();

      this.appearance.configureWithOpaqueBackground();

      this.nativeObject.standardAppearance = this.appearance;
      this.nativeObject.scrollEdgeAppearance = this.nativeObject.standardAppearance;
    }
    this._items = [];
    this._borderVisibility = true;
    this._itemColor = {
      normal: Color.GRAY,
      selected: Color.create('#00a1f1')
    };
    super.init(params);
  }
  protected createNativeObject() {
    return null;
  }
  get height() {
    return this.nativeObject.frame.height;
  }
  get items() {
    return this._items;
  }
  getIOSParams(): IBottomTabBar['ios'] {
    const self = this;
    return {
      get translucent() {
        return self.nativeObject.translucent;
      },
      set translucent(value) {
        if (typeof value === 'boolean') {
          self.nativeObject.translucent = value;
        }
      }
    };
  }
  set items(value: TabBarItem[]) {
    console.info('set items: ', value);
    if (Array.isArray(value)) {
      this._items = value;
      this._items.forEach((item, index) => {
        console.info('set items: ', {
          item,
          nativeObject: typeof item.nativeObject,
          nativeItems: typeof this.nativeObject.items[index]
        });
        item.nativeObject = this.nativeObject.items[index];
        item.invalidate();
      });
    }
  }
  get itemColor() {
    return this._itemColor;
  }
  set itemColor(itemColorObject) {
    if (typeof itemColorObject === 'object') {
      this._itemColor = itemColorObject;
      this.tintColor = this._itemColor;
    }
  }
  get backgroundColor() {
    return new Color({
      color: this.nativeObject.barTintColor
    });
  }
  set backgroundColor(value: Color) {
    // Xcode 13.1 background bug fixes [NTVE-398]
    if (parseInt(System.OSVersion) >= 15) {
      this.appearance.backgroundColor = value.nativeObject;

      this.nativeObject.standardAppearance = this.appearance;
      this.nativeObject.scrollEdgeAppearance = this.appearance;
    } else {
      this.nativeObject.barTintColor = value.nativeObject;
    }
  }
  tabBarControllerItemsDidChange() {
    if (this.items.length === this.nativeObject.items.length) {
      for (const i in this.nativeObject.items) {
        this.items[i].nativeObject = this.nativeObject.items[i];
      }
    } else {
      const itemsArray: TabBarItem[] = [];
      for (const i in this.nativeObject.items) {
        const sfTabBarItem = new TabBarItem({
          nativeObject: this.nativeObject.items[i]
        });
        itemsArray.push(sfTabBarItem);
      }
      this.items = itemsArray;
    }
  }
  get tintColor() {
    return new ColorIOS({
      color: this.nativeObject.tintColor
    }) as any; //TODO: tintColor getter and setter conflict
  }
  set tintColor(value: { selected: Color; normal: Color }) {
    if (this.nativeObject) {
      if (typeof value.normal === 'object') {
        this.unselectedItemColor = value.normal;
      }
      if (typeof value.selected === 'object') {
        this.nativeObject.tintColor = value.selected.nativeObject;
      }
    }
  }
  get unselectedItemColor() {
    return new Color({
      color: this.nativeObject.unselectedItemTintColor
    });
  }
  set unselectedItemColor(value: Color) {
    this.nativeObject.unselectedItemTintColor = value.nativeObject;
  }
  get backgroundImage() {
    return ImageIOS.createFromImage(this.nativeObject.backgroundImage);
  }
  set backgroundImage(value: ImageIOS) {
    this.nativeObject.backgroundImage = value.nativeObject;
  }
  get borderVisibility() {
    return this._borderVisibility;
  }
  set borderVisibility(value: boolean) {
    if (typeof value === 'boolean') {
      if (value) {
        this.nativeObject.shadowImage = undefined;
        this.nativeObject.backgroundImage = undefined;
      } else {
        const emptyImage = __SF_UIImage.getInstance();
        this.nativeObject.shadowImage = emptyImage;
        this.nativeObject.backgroundImage = emptyImage;
      }
      this._borderVisibility = value;
    }
  }
  get selectionIndicatorImage() {
    return this._selectionIndicatorImage;
  }
  set selectionIndicatorImage(value) {
    if (typeof value === 'object') {
      this._selectionIndicatorImage = value;
      this.nativeObject.selectionIndicatorImage = this._selectionIndicatorImage.nativeObject;
    }
  }
}
