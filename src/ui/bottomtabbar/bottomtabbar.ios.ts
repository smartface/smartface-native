import { IBottomTabBar } from '.';
import NativeComponent from '../../core/native-component';
import System from '../../device/system';
import Color from '../color';
import ColorIOS from '../color/color.ios';
import Image from '../image';
import TabBarItem from '../tabbaritem';

const UITabBar = requireClass('UITabBar');

export default class BottomTabBarIOS extends NativeComponent implements IBottomTabBar {
  private _android: Partial<{
    maxItemCount: boolean;
    disableItemAnimation: boolean;
  }> = {};
  private _ios: Partial<{
    translucent: boolean;
  }> = {};
  private appearance;
  private _items: TabBarItem[];
  private _borderVisibility: boolean = true;
  private _itemColor = {
    normal: undefined,
    selected: undefined
  };
  private _selectionIndicatorImage: any;
  constructor(params?: Partial<IBottomTabBar> & Partial<NativeComponent>) {
    super();

    this.nativeObject = undefined;
    this.appearance = undefined;
    if (params.nativeObject) {
      this.nativeObject = params.nativeObject;

      // Xcode 13.1 background bug fixes [NTVE-398]
      if (parseInt(System.OSVersion) >= 15) {
        this.appearance = new __SF_UITabBarAppearance();

        this.appearance.configureWithOpaqueBackground();

        this.nativeObject.standardAppearance = this.appearance;
        this.nativeObject.scrollEdgeAppearance = this.nativeObject.standardAppearance;
      }
    }

    this.nativeObject.translucent = false;

    const self = this;
    this._ios = {
      get translucent() {
        return self.nativeObject.translucent;
      },
      set translucent(value) {
        if (typeof value === 'boolean') {
          self.nativeObject.translucent = value;
        }
      }
    };

    this.itemColor = {
      normal: Color.GRAY,
      selected: Color.create('#00a1f1')
    }; // Do not remove. COR-1931 describes what happening.

    const { ios, android, ...restParams } = params;
    Object.assign(this._ios, ios);
    Object.assign(this._android, android);
    Object.assign(this, restParams);
  }
  get android() {
    return this._android;
  }
  get ios() {
    return this._ios;
  }
  get height() {
    return this.nativeObject.frame.height;
  }
  get items() {
    return this._items;
  }
  set items(value: TabBarItem[]) {
    if (typeof value === 'object') {
      this._items = value;

      for (const i in this._items) {
        //TODO: update once tabbaritem merged
        if (typeof this._items[i].nativeObject === 'undefined') {
          this._items[i]._nativeObject = this.nativeObject.items[i];
        }
        this._items[i].invalidate();
      }
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
      const itemsArray = [];
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
    return Image.createFromImage(this.nativeObject.backgroundImage);
  }
  set backgroundImage(value: Image) {
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
