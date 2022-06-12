import { BarTextTransform, ITabBarController } from './tabbarcontroller';
import OverScrollMode from '../shared/android/overscrollmode';
import Color from '../color';
import PageIOS from '../page/page.ios';
import { ITabbarItem } from '../tabbaritem/tabbaritem';
import { TabBarControllerEvents } from './tabbarcontroller-events';
import { PageImpl } from '../page/page';

export default class TabBarControllerIOS<TEvent extends string = TabBarControllerEvents>
  extends PageIOS<TEvent | TabBarControllerEvents, any, ITabBarController>
  implements ITabBarController<TEvent | TabBarControllerEvents>
{
  dividerColor: Color;
  dividerPadding: number;
  dividerWidth: number;
  private _items: ITabbarItem[];
  private _autoCapitalize: boolean;
  private _iconColor: { normal: Color; selected: Color } | Color;
  private _textColor: { normal: Color; selected: Color } | Color;
  private _barTextTransform: BarTextTransform;
  createNativeObject() {
    return new __SF_TopTabViewController();
  }
  preConstruct(params?: Partial<ITabBarController>) {
    super.preConstruct(params);
    this.addIOSProps(this.getIOSProps());
  }

  constructor(params?: Partial<ITabBarController>) {
    super(params);

    this.nativeObject.viewControllerForIndex = (index: number) => {
      const retval = this.onPageCreate?.(index)?.nativeObject;
      this.emit('pageCreate', index);
      return retval;
    };

    this.nativeObject.tabWillSelectAtIndex = (index: number) => {
      this.onSelected?.(index);
      this.emit('selected', index);
    };
  }
  onPageCreate: (index: number) => PageImpl;
  onSelected: (index: number) => void;

  getIOSProps() {
    const self = this;
    return {
      get barTextTransform(): BarTextTransform {
        return self.nativeObject.topBar.valueForKey('titleTextTransform');
      },
      set barTextTransform(value: BarTextTransform) {
        if (typeof value === 'number') {
          self.nativeObject.topBar.setValueForKey(value, 'titleTextTransform');
        }
      }
    };
  }

  get barHeight(): number {
    return this.nativeObject.barHeight;
  }

  get items(): ITabbarItem[] {
    return this._items;
  }
  set items(value: ITabbarItem[]) {
    this._items = value || [];
    this.nativeObject.tabBarItems = this._items.map((item) => {
      item.badge = item.badge;
      return item.nativeObject;
    });
  }

  get indicatorColor(): Color {
    return new Color({
      color: this.nativeObject.indicatorColor
    });
  }
  set indicatorColor(value: Color) {
    if (typeof value === 'object') {
      this.nativeObject.indicatorColor = value.nativeObject;
    }
  }

  get autoCapitalize(): boolean {
    return this._autoCapitalize;
  }
  set autoCapitalize(value: boolean) {
    this._barTextTransform = value ? BarTextTransform.AUTO : BarTextTransform.NONE;
    this._autoCapitalize = value;
  }

  get indicatorHeight(): number {
    return this.nativeObject.indicatorHeight;
  }
  set indicatorHeight(value: number) {
    if (typeof value === 'number') {
      this.nativeObject.indicatorHeight = value;
    }
  }

  overScrollMode: OverScrollMode;

  get barColor(): Color {
    return new Color({
      color: this.nativeObject.topBarBackgroundColor
    });
  }
  set barColor(value: Color) {
    if (typeof value === 'object') {
      this.nativeObject.topBarBackgroundColor = value.nativeObject;
    }
  }

  get scrollEnabled(): boolean {
    return this.nativeObject.scrollEnabled;
  }
  set scrollEnabled(value: boolean) {
    if (typeof value === 'boolean') {
      this.nativeObject.scrollEnabled = value;
    }
  }

  get selectedIndex(): number {
    return this.nativeObject.currentIndex;
  }

  setSelectedIndex(index: number, animated: boolean): void {
    const _animated = typeof animated !== 'undefined' ? animated : true;
    SF.dispatch_async(SF.dispatch_get_main_queue(), () => {
      this.nativeObject.setSelectedIndexWithAnimated(index, _animated);
    });
  }

  get iconColor(): { normal: Color; selected: Color } | Color {
    return this._iconColor;
  }
  set iconColor(value: { normal: Color; selected: Color } | Color) {
    if (!(value instanceof Color)) {
      this._iconColor = value;
      if (this._iconColor && (this._iconColor.normal || this._iconColor.selected)) {
        if (typeof this._iconColor.normal === 'object') {
          this.nativeObject.iconColor = this._iconColor.normal.nativeObject;
        } else {
          this.nativeObject.iconColor = undefined;
        }
        if (typeof this._iconColor.selected === 'object') {
          this.nativeObject.selectedIconColor = this._iconColor.selected.nativeObject;
        } else {
          this.nativeObject.selectedIconColor = undefined;
        }
      } else if (value instanceof Color) {
        if (typeof this._iconColor === 'object') {
          this.nativeObject.iconColor = value ? value.nativeObject : undefined;
          this.nativeObject.selectedIconColor = value ? value.nativeObject : undefined;
        }
      }
    }
  }

  get textColor(): { normal: Color; selected: Color } | Color {
    return this._textColor;
  }
  set textColor(value: { normal: Color; selected: Color } | Color) {
    if (!(value instanceof Color)) {
      this._textColor = value;

      if (this._textColor && (this._textColor.normal || this._textColor.selected)) {
        if (typeof this._textColor.normal === 'object') {
          this.nativeObject.titleColor = this._textColor.normal.nativeObject;
        } else {
          this.nativeObject.titleColor = undefined;
        }

        if (typeof this._textColor.selected === 'object') {
          this.nativeObject.selectedTitleColor = this._textColor.selected.nativeObject;
        } else {
          this.nativeObject.selectedTitleColor = undefined;
        }
      } else if (value instanceof Color) {
        if (typeof this._textColor === 'object') {
          this.nativeObject.titleColor = value ? value.nativeObject : undefined;
          this.nativeObject.selectedTitleColor = value ? value.nativeObject : undefined;
        }
      }
    }
  }

  get pagingEnabled(): boolean {
    return this.nativeObject.pagingEnabled;
  }
  set pagingEnabled(value: boolean) {
    this.nativeObject.pagingEnabled = value;
  }

  static iOS = {
    BarTextTransform: BarTextTransform,
    ...PageIOS.iOS
  };
}
