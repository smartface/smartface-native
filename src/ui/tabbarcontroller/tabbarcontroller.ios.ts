import { BarTextTransform, ITabBarController, LargeTitleDisplayMode, PresentationStyle } from '.';
import OverScrollMode from '../shared/android/overscrollmode';
import Color from '../color';
import Page from '../page';
import PageIOS from '../page/page.ios';
import { ITabbarItem } from '../tabbaritem';
import { TabBarControllerEvents } from './tabbarcontroller-events';

const UITabBarItem = SF.requireClass('UITabBarItem');

export default class TabBarControllerIOS<TEvent extends string = TabBarControllerEvents>
  extends PageIOS<TEvent | TabBarControllerEvents, any, ITabBarController>
  implements ITabBarController
{

  static iOS: {
    BarTextTransform: typeof BarTextTransform;
    LargeTitleDisplayMode: typeof LargeTitleDisplayMode;
    PresentationStyle: typeof PresentationStyle;
  };
  private _items: ITabbarItem[];
  private _autoCapitalize: boolean;
  private _iconColor: { normal: Color; selected: Color } | Color;
  private _textColor: { normal: Color; selected: Color } | Color;
  private _onPageCreate: (index: number) => Page;
  private _onSelected: (index: number) => void;
  private iOSProps: {barTextTransform?: BarTextTransform} = {};
  constructor(params?: Partial<ITabBarController>) {
    super(params);
    if (!this.nativeObject) {
      this._nativeObject = new __SF_TopTabViewController();
    }

    const self = this;
    this.addIOSProps({
      get barTextTransform(): BarTextTransform {
        return self.nativeObject.topBar.valueForKey('titleTextTransform');
      },
      set barTextTransform(value: BarTextTransform) {
        if (typeof value === 'number') {
          self.nativeObject.topBar.setValueForKey(value, 'titleTextTransform');
        }
      }
    });
  }

  get barHeight(): number {
    return this.nativeObject.barHeight;
  }

  get items(): ITabbarItem[] {
    return this._items;
  }
  set items(value: ITabbarItem[]) {
    if (typeof value === 'object') {
      this._items = value;

      const nativeItems = [];
      for (let i in this._items) {
        if (typeof this._items[i].nativeObject === 'undefined') {
          this._items[i].nativeObject = UITabBarItem.new();
        }
        this._items[i].invalidate();
        nativeItems[i] = this._items[i].nativeObject;
      }
      this.nativeObject.tabBarItems = nativeItems;
    }
  }

  dividerColor: Color;
  dividerPadding: number;
  dividerWidth: number;

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
    if (typeof value === 'boolean') {
      if (value) {
        // TODO Old version has not the field?
        this.iOSProps.barTextTransform = BarTextTransform.AUTO;
      } else {
        this.iOSProps.barTextTransform = BarTextTransform.NONE;
      }
      this._autoCapitalize = value;
    }
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

  get onPageCreate(): (index: number) => Page {
    return this._onPageCreate;
  }
  set onPageCreate(value: (index: number) => Page) {
    this._onPageCreate = value;
    this.nativeObject.viewControllerForIndex = (index: number) => {
      const retval = this._onPageCreate?.(index)?.nativeObject;
      this.emit('pageCreate', index);
      return retval;
    };
  }

  get onSelected(): (index: number) => void {
    return this._onSelected;
  }
  set onSelected(value: (index: number) => void) {
    this._onSelected = value;
    this.nativeObject.tabWillSelectAtIndex = (index: number) => {
      this._onSelected?.(index);
      this.emit('selected', index);
    };
  }
}

// function TabBarController(params) {
//   var self = this;

//   const EventFunctions = {
//     [Events.PageCreate]: function () {
//       _onPageCreate = (state) => {
//         this.emitter.emit(Events.PageCreate, state);
//       };
//       self.nativeObject.viewControllerForIndex = function (index) {
//         var retval = undefined;
//         retval = _onPageCreate.call(this, index).nativeObject;
//         return retval;
//       }.bind(this);
//     },

//     [Events.Selected]: function () {
//       _onSelected = (state) => {
//         this.emitter.emit(Events.Selected, state);
//       };
//       self.nativeObject.tabWillSelectAtIndex = function (index) {
//         _onSelected.call(this, index);
//       }.bind(this);
//     }
//   };
//   EventEmitterCreator(this, EventFunctions);

//   Object.defineProperty(self.ios, 'barTextTransform', {
//     get: function () {
//       return self.nativeObject.topBar.valueForKey('titleTextTransform');
//     },
//     set: function (value) {
//       if (typeof value === 'number') {
//         self.nativeObject.topBar.setValueForKey(value, 'titleTextTransform');
//       }
//     },
//     enumerable: true,
//     configurable: true
//   });

// module.exports = TabBarController;
