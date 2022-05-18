import { IBottomTabBar, IBottomTabBarAndroidProps, IBottomTabBarIOSProps } from './bottomtabbar';
import NativeComponent from '../../core/native-component';
import { NativeMobileComponent, WithMobileOSProps } from '../../core/native-mobile-component';
import SystemIOS from '../../device/system/system.ios';
import ColorIOS from '../color/color.ios';
import ImageIOS from '../image/image.ios';
import TabBarItemIOS from '../tabbaritem/tabbaritem.ios';

export default class BottomTabBarIOS extends NativeMobileComponent<any, WithMobileOSProps<IBottomTabBar, IBottomTabBarIOSProps, IBottomTabBarAndroidProps>> implements IBottomTabBar {
  private appearance: any;
  private _items: TabBarItemIOS[];
  private _borderVisibility: boolean;
  private _itemColor: IBottomTabBar['itemColor']; // Do not remove. COR-1931 describes what happening.
  private _selectionIndicatorImage: ImageIOS;
  constructor(params?: Partial<IBottomTabBar> & Partial<NativeComponent>) {
    super(params);
    this.addIOSProps(this.getIOSParams());
  }
  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this.nativeObject.translucent = false;
    // Xcode 13.1 background bug fixes [NTVE-398]
    if (parseInt(SystemIOS.OSVersion) >= 15) {
      this.appearance = new __SF_UITabBarAppearance();

      this.appearance.configureWithOpaqueBackground();

      this.nativeObject.standardAppearance = this.appearance;
      this.nativeObject.scrollEdgeAppearance = this.appearance;
    }
    this._items = [];
    this._borderVisibility = true;
    this._itemColor = {
      normal: ColorIOS.GRAY,
      selected: ColorIOS.create('#00a1f1')
    };
    super.preConstruct(params);
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
  set items(value: TabBarItemIOS[]) {
    if (Array.isArray(value)) {
      this._items = value;
      this._items.forEach((item, index) => {
        // Re-set the values since nativeObject is set on runtime.
        item.nativeObject = this.nativeObject.items[index];
        item.title = item.title;
        item.icon = item.icon;
        item.route = item.route;
        item.ios.font = item.ios.font;
        item.invalidate();
      });
    }
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
  get itemColor() {
    return this._itemColor;
  }
  set itemColor(value) {
    if (value?.normal instanceof ColorIOS && value?.selected instanceof ColorIOS) {
      this._itemColor = value;
      this.tintColor = this._itemColor;
    }
  }
  get backgroundColor() {
    return new ColorIOS({
      color: this.nativeObject.barTintColor
    });
  }
  set backgroundColor(value: ColorIOS) {
    // Xcode 13.1 background bug fixes [NTVE-398]
    if (parseInt(SystemIOS.OSVersion) >= 15) {
      this.appearance.backgroundColor = value.nativeObject;

      this.nativeObject.standardAppearance = this.appearance;
      this.nativeObject.scrollEdgeAppearance = this.appearance;
    } else {
      this.nativeObject.barTintColor = value.nativeObject;
    }
  }
  tabBarControllerItemsDidChange() {
    if (this.items.length === this.nativeObject.items.length) {
      this.items.forEach((item, index) => {
        item.nativeObject = this.nativeObject.items[index];
      });
    } else {
      this.items = this.nativeObject.items.map((item: any) => {
        return new TabBarItemIOS({
          nativeObject: item
        });
      });
    }
  }
  get tintColor() {
    return new ColorIOS({
      color: this.nativeObject.tintColor
    }) as any; //TODO: tintColor getter and setter conflict
  }
  set tintColor(value) {
    if (value.normal instanceof ColorIOS) {
      this.unselectedItemColor = value.normal;
    }
    if (value.selected instanceof ColorIOS) {
      this.nativeObject.tintColor = value.selected.nativeObject;
    }
  }
  get unselectedItemColor() {
    return new ColorIOS({
      color: this.nativeObject.unselectedItemTintColor
    });
  }
  set unselectedItemColor(value: ColorIOS) {
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
  get selectionIndicatorImage() {
    return this._selectionIndicatorImage;
  }
  set selectionIndicatorImage(value) {
    if (value instanceof ImageIOS) {
      this._selectionIndicatorImage = value;
      this.nativeObject.selectionIndicatorImage = this._selectionIndicatorImage.nativeObject;
    }
  }
}
