import { ITabBarController } from '.';
import Application from '../../application';
import AndroidConfig from '../../util/Android/androidconfig';
import AndroidUnitConverter from '../../util/Android/unitconverter';
import Color from '../color';
import type Page from '../page';
import PageAndroid from '../page/page.android';
import OverScrollMode from '../shared/android/overscrollmode';
import SwipeView from '../swipeview';
import { ITabbarItem } from '../tabbaritem';
import { TabBarControllerEvents } from './tabbarcontroller-events';

/* globals requireClass */
const NativeTabLayout = requireClass('com.google.android.material.tabs.TabLayout');
const NativeRelativeLayout = requireClass('android.widget.RelativeLayout');
const NativeYogaNodeFactory = requireClass('com.facebook.yoga.YogaNodeFactory');
const NativeGradientDrawable = requireClass('android.graphics.drawable.GradientDrawable');
const PorterDuff = requireClass('android.graphics.PorterDuff');

const ModeSRC_IN = PorterDuff.Mode.SRC_IN;

export default class TabBarControllerAndroid<TEvent extends string = TabBarControllerEvents> extends PageAndroid<TEvent | TabBarControllerEvents, any, ITabBarController> implements ITabBarController {
  // export default class TabBarControllerAndroid<TEvent extends string = TabBarControllerEvents> extends PageAndroid<TEvent | TabBarControllerEvents> implements ITabBarController {
  private _onSelectedCallback: (index: number) => void;
  private _onPageCreateCallback: (index: number) => Page;
  private _items: ITabbarItem[];
  private _barColor: Color;
  private _indicatorColor: Color;
  private _textColor: Color | { normal: Color; selected: Color };
  private _iconColor: Color | { normal: Color; selected: Color };
  private _overScrollMode: OverScrollMode;
  private _scrollEnabled: boolean = false;
  private _dividerWidth: number = 0;
  private _dividerPadding: number = 0;
  private _dividerColor: Color;
  private _indicatorHeight: number;
  private _autoCapitalize: boolean = true;
  private tabLayout: any;
  private divider: any;
  private swipeView: SwipeView;
  private dividerDrawable: typeof NativeGradientDrawable;

  constructor(params?: Partial<ITabBarController>) {
    super(params);

    this._items = [];
    this._overScrollMode = OverScrollMode.ALWAYS;
    this._dividerColor = Color.BLACK;
    this._indicatorColor = Color.create('#00A1F1');
    this._barColor = Color.WHITE;
    this._textColor = Color.BLACK;

    this.tabLayout.nativeObject = new NativeTabLayout(AndroidConfig.activity);
    this.tabLayout.yogaNode = NativeYogaNodeFactory.create();
    this.tabLayout.nativeObject.setLayoutParams(new NativeRelativeLayout.LayoutParams(-1, -2));
    this.divider = this.tabLayout.nativeObject.getChildAt(0);
    //Todo: When Google fixed its issue (https://issuetracker.google.com/issues/36973591), remove this line.
    this.tabLayout.nativeObject.setLayoutDirection(Application.LayoutDirection.LEFTTORIGHT);

    if (!this.swipeView) {
      this.swipeView = new SwipeView({
        page: this,
        flexGrow: 1,
        onPageCreate: (position: number) => {
          this.emit('pageCreate', position);
          if (!this.onPageCreate) {
            return null;
          }
          return this.onPageCreate(position);
        },
        // TODO: Remove params.items check later version
        pageCount: params && params.items ? params.items.length : this._items.length
      });
    }

    this.tabLayout.nativeObject.setupWithViewPager(this.swipeView.nativeObject);
    this.layout.addChild(this.tabLayout);
    this.layout.addChild(this.swipeView);

    const listener = NativeTabLayout.OnTabSelectedListener.implement({
      onTabSelected: (tab) => {
        this.onSelected && this.onSelected(tab.getPosition());
        this.emit('selected', tab.getPosition());
        if (!this.iconColor) return;

        const selectedColor = this.iconColor instanceof Color ? this.iconColor : this.iconColor.selected;
        const tabIcon = tab.getIcon();
        tabIcon && tabIcon.setColorFilter(selectedColor.nativeObject, ModeSRC_IN);
      },
      onTabUnselected: (tab) => {
        if (!this.iconColor) return;

        const normalColor = this.iconColor instanceof Color ? this.iconColor : this.iconColor.normal;
        const tabIcon = tab.getIcon();
        tabIcon && tabIcon.setColorFilter(normalColor.nativeObject, ModeSRC_IN);
      },
      onTabReselected: (tab) => {}
    });
    this.tabLayout.nativeObject.addOnTabSelectedListener(listener);

    const self = this;
    this.addAndroidProps({
      get dividerWidth(): number {
        return self._dividerWidth;
      },
      set dividerWidth(value: number) {
        self._dividerWidth = value;

        self.divider.setShowDividers(2); // 2 = LinearLayout.SHOW_DIVIDER_MIDDLE
        self.dividerDrawable = new NativeGradientDrawable();
        self.dividerDrawable.setColor(self._dividerColor.nativeObject);

        let px = AndroidUnitConverter.dpToPixel(value);
        self.dividerDrawable.setSize(px, 1);
        px = AndroidUnitConverter.dpToPixel(self._dividerPadding);
        self.divider.setDividerPadding(px);
        self.divider.setDividerDrawable(self.dividerDrawable);
      },
      get dividerColor(): Color {
        return self._dividerColor;
      },
      set dividerColor(value: Color) {
        self._dividerColor = value;
        if (self.dividerDrawable) {
          self.dividerDrawable.setColor(value.nativeObject);
        }
      },
      get dividerPadding(): number {
        return self._dividerPadding;
      },
      set dividerPadding(value: number) {
        self._dividerPadding = value;
        if (self.dividerDrawable) {
          const px = AndroidUnitConverter.dpToPixel(self._dividerPadding);
          self.divider.setDividerPadding(px);
        }
      },
      get overScrollMode(): OverScrollMode {
        return self._overScrollMode;
      },
      set overScrollMode(value: OverScrollMode) {
        self._overScrollMode = value;
        self.swipeView.android.overScrollMode = value;
        self.tabLayout.nativeObject.setOverScrollvalue(value);
      }
    });
  }

  // TODO Unused fields
  dividerColor: Color;
  dividerPadding: number;
  dividerWidth: number;

  get barHeight(): number {
    return AndroidUnitConverter.pixelToDp(this.tabLayout.nativeObject.getHeight());
  }
  set barHeight(value: number) {
    this.tabLayout.yogaNode.setHeight(AndroidUnitConverter.dpToPixel(value));
  }

  get items(): ITabbarItem[] {
    return this._items;
  }
  set items(value: ITabbarItem[]) {
    // TODO: We have updated UI.TabBarItem in Router v2.
    // After it will merge, title and icon must be updated dynamically.
    this._items = value;

    // TODO: Maybe later, swipeView pageCount can be set dynamically.
    // After that, use refreshData method like listview.
    this.swipeView.pageCount = this._items.length;
    this.swipeView.pagerAdapter.notifyDataSetChanged();

    for (let i = 0; i < this._items.length; i++) {
      const item = this._items[i];
      // TODO: no _attributedTitleBuilder property in ItemTabbar. Ask it.
      // const itemTitle = item._attributedTitleBuilder ? item._attributedTitleBuilder : item.title;
      const itemTitle = item.title;

      // TODO: no tabBarItemParent property in ItemTabbar. Ask it.
      // @ts-ignore
      item.tabBarItemParent = this;
      // TODO: no nativeObject property in ItemTabbar. Ask it.
      // @ts-ignore
      item.nativeObject = this.tabLayout.nativeObject.getTabAt(i);
      item.setProperties({
        itemTitle,
        itemIcon: item.icon,
        systemIcon: item.android.systemIcon
      });
    }
    if (!this.autoCapitalize) this.setAllCaps(this._items, this.tabLayout.nativeObject, this.autoCapitalize);
  }

  get indicatorColor(): Color {
    return this._indicatorColor;
  }
  set indicatorColor(value: Color) {
    this._indicatorColor = value;
    this.tabLayout.nativeObject.setSelectedTabIndicatorColor(value.nativeObject);
  }

  get autoCapitalize(): boolean {
    return this._autoCapitalize;
  }
  set autoCapitalize(value: boolean) {
    this._autoCapitalize = value;
    if (this.items && this.items.length > 0) {
      // TODO: If you set title or icon later, native tabLayout capitalizes title of tab item.
      // Call this function after setting title.
      this.setAllCaps(this.items, this.tabLayout.nativeObject, value);
    }
  }

  get indicatorHeight(): number {
    return this._indicatorHeight;
  }
  set indicatorHeight(value: number) {
    this._indicatorHeight = value;
    const px = AndroidUnitConverter.dpToPixel(value);
    this.tabLayout.nativeObject.setSelectedTabIndicatorHeight(px);
  }

  overScrollMode: OverScrollMode;

  get barColor(): Color {
    return this._barColor;
  }
  set barColor(value: Color) {
    this._barColor = value;
    this.tabLayout.nativeObject.setBackgroundColor(value.nativeObject);
  }

  get scrollEnabled(): boolean {
    return this._scrollEnabled;
  }
  set scrollEnabled(value: boolean) {
    this._scrollEnabled = value;
    if (value) {
      this.tabLayout.nativeObject.setTabMode(0); // 0 = TabLayout.MODE_SCROLLABLE
      this.tabLayout.nativeObject.setLayoutParams(new NativeRelativeLayout.LayoutParams(-2, -2));
    } else {
      this.tabLayout.nativeObject.setTabMode(1); // 1 = TabLayout.MODE_FIXED
      this.tabLayout.nativeObject.setLayoutParams(new NativeRelativeLayout.LayoutParams(-1, -2));
    }
  }

  get selectedIndex(): number {
    return this.swipeView.currentIndex;
  }

  setSelectedIndex(index: number, animated: boolean): void {
    this.swipeView.swipeToIndex(index, animated);
  }

  get iconColor(): Color | { normal: Color; selected: Color } {
    return this._iconColor;
  }
  set iconColor(value: Color | { normal: Color; selected: Color }) {
    this._iconColor = value;
    const normalColor = value instanceof Color ? value : value.normal;
    const selectedColor = value instanceof Color ? value : value.selected;
    for (let i = 0; i < this._items.length; i++) {
      const tabIcon = this.tabLayout.nativeObject.getTabAt(i).getIcon();
      if (i === this.selectedIndex) {
        tabIcon && tabIcon.setColorFilter(selectedColor.nativeObject, ModeSRC_IN);
      } else {
        tabIcon && tabIcon.setColorFilter(normalColor.nativeObject, ModeSRC_IN);
      }
    }
  }

  get textColor(): Color | { normal: Color; selected: Color } {
    return this._textColor;
  }
  set textColor(value: Color | { normal: Color; selected: Color }) {
    this._textColor = value;
    const normalColor = value instanceof Color ? value : value.normal;
    const selectedColor = value instanceof Color ? value : value.selected;
    this.tabLayout.nativeObject.setTabTextColors(normalColor.nativeObject, selectedColor.nativeObject);
  }

  get pagingEnabled(): boolean {
    // TODO Boolean - boolean issue
    return this.swipeView.pagingEnabled;
  }
  set pagingEnabled(value: boolean) {
    this.swipeView.pagingEnabled = value;
  }

  get onPageCreate(): (index: number) => Page {
    return this._onPageCreateCallback;
  }
  set onPageCreate(value: (index: number) => Page) {
    this._onPageCreateCallback = value;
  }

  get onSelected(): (index: number) => void {
    return this._onSelectedCallback;
  }
  set onSelected(value: (index: number) => void) {
    this._onSelectedCallback = value;
  }

  setAllCaps(itemArray: any[], nativeTabLayout: any, autoCapitalize: boolean) {
    const NativeTextView = requireClass('android.widget.TextView');
    const viewGroupOfTabLayout = nativeTabLayout.getChildAt(0);
    const tabsCount = viewGroupOfTabLayout.getChildCount();
    for (let i = 0; i < tabsCount; i++) {
      const viewGroupOfTab = viewGroupOfTabLayout.getChildAt(i);
      const tabChildsCount = viewGroupOfTab.getChildCount();
      for (let j = 0; j < tabChildsCount; j++) {
        const tabViewChild = viewGroupOfTab.getChildAt(j);
        const isAssignableFrom = NativeTextView.isAssignableFrom(tabViewChild.getClass());
        if (isAssignableFrom) {
          tabViewChild.setAllCaps(autoCapitalize);
          itemArray[i].nativeTextView = tabViewChild;
        }
      }
    }
  }

  createDividerDrawableIfNeeded() {
    if (!this.dividerDrawable) {
      this.dividerDrawable = new NativeGradientDrawable();
    }
  }
}
