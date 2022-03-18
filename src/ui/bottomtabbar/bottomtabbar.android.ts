import AndroidConfig from '../../util/Android/androidconfig';
import Color from '../color';
import TabBarItem from '../tabbaritem';
import BottomTabBar, { IBottomTabBar } from '.';
import AndroidUnitConverter from '../../util/Android/unitconverter';
import { NativeMobileComponent } from '../../core/native-mobile-component';

const NativeBottomNavigationView = requireClass('com.google.android.material.bottomnavigation.BottomNavigationView');
const NativeContextThemeWrapper = requireClass('android.view.ContextThemeWrapper');
const NativeR = requireClass(AndroidConfig.packageName + '.R');
const activity = AndroidConfig.activity;
const MAXITEMCOUNT = 5;

export default class BottomTabBarAndroid extends NativeMobileComponent<any, IBottomTabBar> implements IBottomTabBar {
  protected createNativeObject() {
    return new NativeBottomNavigationView(new NativeContextThemeWrapper(activity, NativeR.style.Theme_MaterialComponents_Light));
  }
  private _itemColors = {
    normal: Color.GRAY,
    selected: Color.create('#00a1f1')
  }; // Do not remove. COR-1931 describes what happening.
  private _backgroundColor = Color.WHITE;
  private _items: TabBarItem[] = [];
  constructor(params?: Partial<BottomTabBar>) {
    super(params);
    this.addAndroidProps(this.getAndroidParams());
    this.backgroundColor = Color.WHITE; // Don't remove. If don't set backgroundColor,elevation doesn't work with default background white color.
  }
  private getAndroidParams(): IBottomTabBar['android'] {
    return {
      get maxItemCount() {
        return MAXITEMCOUNT;
      }
    };
  }
  get height() {
    let result = 0;
    const packageName = activity.getPackageName();
    const resourceId = AndroidConfig.activityResources.getIdentifier('design_bottom_navigation_height', 'dimen', packageName);
    if (resourceId > 0) {
      result = AndroidConfig.activityResources.getDimensionPixelSize(resourceId);
    }
    return AndroidUnitConverter.pixelToDp(result);
  }
  get items() {
    return this._items;
  }
  set items(tabBarItems: TabBarItem[]) {
    this.createTabbarMenuItems(tabBarItems);
  }
  get itemColor() {
    return this._itemColors;
  }
  set itemColor(colors: { normal: Color; selected: Color }) {
    if (colors && colors.normal && colors.selected) {
      if (colors.normal instanceof Color && colors.selected instanceof Color) {
        const NativeR = requireClass('android.R');
        this._itemColors = colors;
        const states = array([array([NativeR.attr.state_checked], 'int'), array([], 'int')]);

        const ColorStateList = requireClass('android.content.res.ColorStateList');
        const nativeColorArray = array([colors.selected.nativeObject, colors.normal.nativeObject], 'int');
        const statelist = new ColorStateList(states, nativeColorArray);
        this.nativeObject.setItemTextColor(statelist);
        this.nativeObject.setItemIconTintList(statelist);
      } else {
        throw new Error('itemColor should be an object that contains instances of Color');
      }
    } else {
      throw new Error('itemColor should be an object that contains normal and selected state.');
    }
  }
  get backgroundColor() {
    return this._backgroundColor;
  }
  set backgroundColor(color: Color) {
    if (color instanceof Color) {
      this._backgroundColor = color;
      this.nativeObject.setBackgroundColor(color.nativeObject);
    }
  }
  toString() {
    return 'Tab';
  }
  createTabbarMenuItems(tabBarItems: any[]) {
    const btbMenu = this.nativeObject.getMenu();
    btbMenu.clear();

    for (let i = 0; i < tabBarItems.length; i++) {
      const tabbarItem = tabBarItems[i];
      tabbarItem.tabBarItemParent = this;
      let title;
      if (tabbarItem._attributedTitleBuilder !== undefined) {
        title = tabbarItem._attributedTitleBuilder;
      } else {
        title = tabbarItem.title ? tabbarItem.title : 'Title ' + i;
      }

      tabbarItem.nativeObject = btbMenu.add(0, i, 0, title);
      tabbarItem.setProperties({
        itemIcon: tabbarItem.icon,
        systemIcon: tabbarItem.android.systemIcon
      });
      tabbarItem.index = i;
    }
    this.addBadgeToItem(tabBarItems);
    this._items = tabBarItems;
  }
  addBadgeToItem(tabBarItems) {
    // Adding badge must be after added all menu items.
    for (let i = 0; i < tabBarItems.length; i++) {
      //TODO: what is this?
      tabBarItems[i].badgeAdded && tabBarItems[i].badge;
    }
  }
}
