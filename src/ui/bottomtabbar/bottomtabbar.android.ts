import AndroidConfig from '../../util/Android/androidconfig';
import Color from '../color';
import { IBottomTabBar } from './bottomtabbar';
import AndroidUnitConverter from '../../util/Android/unitconverter';
import { NativeMobileComponent } from '../../core/native-mobile-component';
import { ITabbarItem } from '../tabbaritem/tabbaritem';

const NativeBottomNavigationView = requireClass('com.google.android.material.bottomnavigation.BottomNavigationView');
const NativeContextThemeWrapper = requireClass('android.view.ContextThemeWrapper');
const ColorStateList = requireClass('android.content.res.ColorStateList');
const NativeR = requireClass(AndroidConfig.packageName + '.R');
const NativeRDefault = requireClass('android.R');
const activity = AndroidConfig.activity;
const MAXITEMCOUNT = 5;

export default class BottomTabBarAndroid extends NativeMobileComponent<any, IBottomTabBar> implements IBottomTabBar {
  protected createNativeObject() {
    return new NativeBottomNavigationView(new NativeContextThemeWrapper(activity, NativeR.style.Theme_MaterialComponents_Light));
  }
  private _itemColors: IBottomTabBar['itemColor'];
  private _backgroundColor: Color;
  private _items: ITabbarItem[];
  constructor(params?: Partial<BottomTabBarAndroid>) {
    super(params);
    this.backgroundColor = Color.WHITE; // Don't remove. If don't set backgroundColor,elevation doesn't work with default background white color.
    this.itemColor = this._itemColors;
  }
  private getAndroidParams(): IBottomTabBar['android'] {
    return {
      get maxItemCount() {
        return MAXITEMCOUNT;
      }
    };
  }
  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this._itemColors = {
      // Do not remove. COR-1931 describes what happening.
      normal: Color.GRAY,
      selected: Color.create('#00a1f1')
    };
    this._items = [];
    this._backgroundColor = Color.WHITE;
    super.preConstruct(params);
    this.addAndroidProps(this.getAndroidParams());
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
  set items(tabBarItems: ITabbarItem[]) {
    this.createTabbarMenuItems(tabBarItems);
  }
  get itemColor() {
    return this._itemColors;
  }
  set itemColor(colors: { normal: Color; selected: Color }) {
    if (colors?.normal && colors?.selected) {
      if (colors.normal instanceof Color && colors.selected instanceof Color) {
        this._itemColors = colors;
        const states = array([array([NativeRDefault.attr.state_checked], 'int'), array([], 'int')]);

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
  createTabbarMenuItems(tabBarItems: ITabbarItem[]) {
    const btbMenu = this.nativeObject.getMenu();
    btbMenu.clear();
    tabBarItems.forEach((tabbarItem, index) => {
      tabbarItem.tabBarItemParent = this;
      let title: string;
      if (tabbarItem.android.attributedTitleBuilder !== undefined) {
        title = tabbarItem.android.attributedTitleBuilder;
      } else {
        title = tabbarItem.title || `Title ${index}`;
      }

      tabbarItem.nativeObject = btbMenu.add(0, index, 0, title);
      tabbarItem.title = title;
      tabbarItem.icon = tabbarItem.icon;
      tabbarItem.android.systemIcon = tabbarItem.android.systemIcon;
      tabbarItem.index = index;
    });
    // Adding badge must be after added all menu items.
    tabBarItems.forEach((tabbarItem, index) => {
      tabbarItem.badge = tabbarItem.badge;
    });
    this._items = tabBarItems;
  }
}
