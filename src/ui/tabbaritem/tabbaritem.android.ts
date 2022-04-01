import { ITabbarItem } from './tabbaritem';
import { NativeMobileComponent } from '../../core/native-mobile-component';
import AttributedString from '../attributedstring';
import UnitConverter from '../../util/Android/unitconverter';
import Badge from '../badge';
import BottomTabBar from '../bottomtabbar';
import ImageAndroid from '../image/image.android';
import TabBarController from '../tabbarcontroller';
import BottomTabbarController from '../bottomtabbarcontroller';
import ViewState from '../shared/viewState';
import isViewState from '../../util/isViewState';

const NativeFrameLayout = requireClass('android.widget.FrameLayout');
const NativeStateListDrawable = requireClass('android.graphics.drawable.StateListDrawable');
const NativeR = requireClass('android.R');

export default class TabbarItemAndroid extends NativeMobileComponent<any, ITabbarItem> implements ITabbarItem {
  protected createNativeObject() {
    return null;
  }
  private _title: string;
  private _icon: ViewState<ImageAndroid> | string;
  private _badgeObj: Badge;
  private _systemIcon: any;
  private _tabBarItemParent: TabBarController | BottomTabbarController | null = null;
  private index = null;
  private badgeAdded = false;
  _attributedTitleBuilder: any;
  private _attributedTitle?: AttributedString;
  private _route: string;

  constructor(params?: Partial<ITabbarItem>) {
    super(params);
    const self = this;

    const android = {
      get systemIcon() {
        return self._systemIcon;
      },
      set systemIcon(systemIcon) {
        self._systemIcon = systemIcon;
        self.nativeObject && self.nativeObject.setIcon(ImageAndroid.systemDrawableId(self._systemIcon));
      },
      get attributedTitle() {
        // TODO: Ask if _attributedTitleBuilder exists or not.
        // return self._attributedTitleBuilder || self._android?.attributedTitle;
        return self._attributedTitle;
      },
      set attributedTitle(value: AttributedString | undefined) {
        self._attributedTitle = value;
      }
    };
    this.addAndroidProps(android);
  }
  invalidate(): void {
    throw new Error('Method not implemented.');
  }
  get tabBarItemParent() {
    return this._tabBarItemParent;
  }

  set tabBarItemParent(value) {
    this._tabBarItemParent = value;
  }

  get title() {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
    this.titleSetter(value);
  }
  get route() {
    return this._route;
  }
  set route(value: string) {
    this._route = value;
  }
  get icon() {
    return this._icon;
  }
  set icon(value) {
    this._icon = value;
    const EmptyImage = new ImageAndroid({
      path: null
    });

    if (typeof value === 'string') {
      //IDE requires this implementation.
      value = ImageAndroid.createImageFromPath(value);
    } else if (isViewState(value)) {
      value.normal = ImageAndroid.createImageFromPath(value.normal);
      value.selected = ImageAndroid.createImageFromPath(value.selected);
    } else {
      throw new Error('icon should be an instance of Image or given icon path should be properly defined.');
    }

    if (isViewState(value)) {
      const normal = value.normal instanceof ImageAndroid ? value.normal : EmptyImage;
      const selected = value.selected instanceof ImageAndroid ? value.selected : EmptyImage;
      // TODO: Refactor this implemenation. Discuss with ios team.
      value = { ...value, ...this.makeSelector(normal, selected) };
    }
    this.nativeObject?.setIcon((value as ImageAndroid).nativeObject);
  }
  get badge() {
    if (this._badgeObj === undefined) this._badgeObj = new Badge();
    this._badgeObj.nativeObject.getParent() === undefined && this.setBadgeToTabarItem(this._badgeObj);

    return this._badgeObj;
  }
  titleSetter(title: string) {
    if (!this.nativeObject) {
      return;
    }

    if (this._tabBarItemParent instanceof TabBarController) {
      this.nativeObject.setText(title);
    } else if (this._tabBarItemParent instanceof BottomTabBar) {
      this.nativeObject.setTitle(title);
    }
  }
  makeSelector(normalImage: ImageAndroid, selectedImage: ImageAndroid) {
    const res = new NativeStateListDrawable();
    const attrState = this._tabBarItemParent instanceof TabBarController ? 'state_selected' : 'state_checked';
    res.addState(array([NativeR.attr[attrState]], 'int'), selectedImage.nativeObject);
    res.addState(array([], 'int'), normalImage.nativeObject);

    return {
      nativeObject: res
    };
  }
  setBadgeToTabarItem(badgeObj: any) {
    this.badgeAdded = true;
    if (this._tabBarItemParent !== null && this.index !== null) {
      const TOP_CENTERHORIZANTAL = 1 | 48;
      const WRAP_CONTENT = -2;
      const layoutParams = new NativeFrameLayout.LayoutParams(WRAP_CONTENT, WRAP_CONTENT, TOP_CENTERHORIZANTAL);
      badgeObj.layoutParams = layoutParams;
      layoutParams.setMarginStart(UnitConverter.dpToPixel(12));
      badgeObj.nativeObject.setLayoutParams(badgeObj.layoutParams);

      const nativeBottomTabarMenuView = this._tabBarItemParent.nativeObject.getChildAt(0);
      const nativeMenuItem = nativeBottomTabarMenuView.getChildAt(this.index);
      nativeMenuItem.addView(badgeObj.nativeObject);
    }
  }
  toString() {
    return 'TabBarItem';
  }
  setProperties(params: { itemTitle: string; itemIcon: ImageAndroid | string; systemIcon: string | number }) {
    const { itemTitle, itemIcon, systemIcon } = params;

    if (itemTitle) this.title = itemTitle;
    if (itemIcon) this.icon = itemIcon;
    if (systemIcon) this.android.systemIcon = systemIcon;
  }
}
