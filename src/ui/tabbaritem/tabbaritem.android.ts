import { ITabbarItem } from './tabbaritem';
import { NativeMobileComponent } from '../../core/native-mobile-component';
import AttributedString from '../attributedstring';
import UnitConverter from '../../util/Android/unitconverter';
import BottomTabBar from '../bottomtabbar';
import ImageAndroid from '../image/image.android';
import TabBarController from '../tabbarcontroller';
import ViewState from '../shared/viewState';
import isViewState from '../../util/isViewState';
import BadgeAndroid from '../badge/badge.android';
import { IBadge } from '../badge/badge';
import { ITabBarController } from '../tabbarcontroller/tabbarcontroller';
import { IBottomTabBar } from '../bottomtabbar/bottomtabbar';

const NativeFrameLayout = requireClass('android.widget.FrameLayout');
const NativeStateListDrawable = requireClass('android.graphics.drawable.StateListDrawable');
const NativeR = requireClass('android.R');

export default class TabbarItemAndroid extends NativeMobileComponent<any, ITabbarItem> implements ITabbarItem {
  protected createNativeObject() {
    return null;
  }
  private _title: string;
  private _icon: ViewState<ImageAndroid> | string;
  private _badgeObj: IBadge;
  private _systemIcon: any;
  private _tabBarItemParent: ITabBarController | IBottomTabBar | null;
  index: number | null;
  _attributedTitleBuilder: any;
  private _attributedTitle?: AttributedString;
  private _route: string;

  constructor(params?: Partial<ITabbarItem>) {
    super(params);
    this.addAndroidProps(this.getAndroidProps());
  }
  invalidate(): void {
    throw new Error('Method not implemented.');
  }
  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this._tabBarItemParent = null;
    this.index = null;
    super.preConstruct(params);
  }
  private getAndroidProps() {
    const self = this;
    return {
      get systemIcon() {
        return self._systemIcon;
      },
      set systemIcon(systemIcon) {
        self._systemIcon = systemIcon;
        if (self.nativeObject && systemIcon) {
          self.nativeObject.setIcon(ImageAndroid.systemDrawableId(self._systemIcon));
        }
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
    }

    if (isViewState(value)) {
      const normal = value.normal instanceof ImageAndroid ? value.normal : EmptyImage;
      const selected = value.selected instanceof ImageAndroid ? value.selected : EmptyImage;
      // TODO: Refactor this implemenation. Discuss with ios team.
      value = { ...value, ...this.makeSelector(normal, selected) };
    }
    this.nativeObject?.setIcon((value as ImageAndroid)?.nativeObject || EmptyImage.nativeObject);
  }
  get badge() {
    if (this._badgeObj === undefined) {
      this._badgeObj = new BadgeAndroid();
    }
    if (this._badgeObj.nativeObject.getParent() === undefined) {
      this.setBadgeToTabarItem(this._badgeObj);
    }
    return this._badgeObj;
  }
  set badge(value) {
    if (value instanceof BadgeAndroid) {
      this._badgeObj = value;
    } else if (typeof value === 'object') {
      this._badgeObj = new BadgeAndroid(value);
    }
    if (this._badgeObj.nativeObject.getParent() === undefined) {
      this.setBadgeToTabarItem(this._badgeObj);
    }
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
  setBadgeToTabarItem(badgeObj: IBadge) {
    if (this._tabBarItemParent !== null && this.index !== null) {
      const TOP_CENTERHORIZANTAL = 1 | 48;
      const WRAP_CONTENT = -2;
      const layoutParams = new NativeFrameLayout.LayoutParams(WRAP_CONTENT, WRAP_CONTENT, TOP_CENTERHORIZANTAL);
      layoutParams.setMarginStart(UnitConverter.dpToPixel(12));
      badgeObj.nativeObject.setLayoutParams(layoutParams);

      const nativeBottomTabarMenuView = this._tabBarItemParent.nativeObject.getChildAt(0);
      const nativeMenuItem = nativeBottomTabarMenuView.getChildAt(this.index);
      nativeMenuItem.addView(badgeObj.nativeObject);
    }
  }
  toString() {
    return 'TabBarItem';
  }
}
