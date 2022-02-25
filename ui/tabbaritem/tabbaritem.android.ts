import { AbstractTabBarItem } from '.';
import NativeComponent from '../../core/native-component';
import AttributedString from '../attributedstring';
import Badge from '../badge';
import BottomTabBar from '../bottomtabbar';
import { AbstractFont } from '../font/font';
import Image from '../image';
import TabBarController from '../tabbarcontroller';
const NativeDrawable = requireClass('android.graphics.drawable.Drawable');
const NativeFrameLayout = requireClass('android.widget.FrameLayout');

export default class TabbarItemAndroid extends NativeComponent implements AbstractTabBarItem {
  private _title;
  private _icon;
  private _badgeObj = undefined;
  private _systemIcon;
  private tabBarItemParent = null;
  private index = null;
  private badgeAdded = false;
  private _android: Partial<{
    attributedTitle: AttributedString;
    systemIcon: number | string;
  }> = {};
  private _route: string;
  public ios: Partial<{ font: AbstractFont }> = {};
  constructor(params?: Partial<AbstractTabBarItem>) {
    super();
    // Assign parameters given in constructor
    if (params) {
      for (const param in params) {
        this[param] = params[param];
      }
    }
    const self = this;
    this._android = {
      get systemIcon() {
        return self._systemIcon;
      },
      set systemIcon(systemIcon) {
        self._systemIcon = systemIcon;
        self.nativeObject && self.nativeObject.setIcon(Image.systemDrawableId(self._systemIcon));
      },
      get attributedTitle() {
        return self._android?.attributedTitle;
      },
      set attributedTitle(value: AttributedString) {
        self._android.attributedTitle = value;
      }
    };
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
  set icon(value: { normal: Image | string; selected: Image | string } | Image | string) {
    this._icon = value;
    const EmptyImage = {
      nativeObject: NativeDrawable.createFromPath(null)
    } as Image;

    let icon = value;
    if (icon.constructor === String) {
      //IDE requires this implementation.
      icon = Image.createImageFromPath(icon);
    } else if (icon instanceof Object && !(icon instanceof Image)) {
      icon.normal = Image.createImageFromPath(icon.normal);
      icon.selected = Image.createImageFromPath(icon.selected);
    } else {
      throw new Error('icon should be an instance of Image or given icon path should be properly.');
    }

    if (icon instanceof Object) {
      // TODO: Refactor this implemenation. Discuss with ios team.
      if (!(icon instanceof Image) && icon.normal instanceof Image && icon.selected instanceof Image) {
        icon = { ...icon, ...this.makeSelector(icon.normal, icon.selected) };
      } else if (!(icon instanceof Image) && icon.normal instanceof Image) {
        icon = { ...icon, ...this.makeSelector(icon.normal, EmptyImage) };
      } else if (!(icon instanceof Image) && icon.selected instanceof Image) {
        icon = { ...icon, ...this.makeSelector(EmptyImage, icon.selected) };
      }
    }
    this.nativeObject && this.nativeObject.setIcon((icon as any).nativeObject);
  }
  get badge() {
    if (this._badgeObj === undefined) this._badgeObj = new Badge();
    this._badgeObj.nativeObject.getParent() === undefined && this.setBadgeToTabarItem(this._badgeObj);

    return this._badgeObj;
  }
  get android() {
    return this._android;
  }
  set android(value) {
    Object.assign(this._android, value || {});
  }
  titleSetter(title: string) {
    if (!this.nativeObject) return;

    if (this.tabBarItemParent instanceof TabBarController) this.nativeObject.setText(title);
    else if (this.tabBarItemParent instanceof BottomTabBar) this.nativeObject.setTitle(title);
  }
  makeSelector(normalImage: Image, selectedImage: Image) {
    const NativeStateListDrawable = requireClass('android.graphics.drawable.StateListDrawable');
    const NativeR = requireClass('android.R');

    const res = new NativeStateListDrawable();
    let attrState;
    if (this.tabBarItemParent instanceof TabBarController) attrState = 'state_selected';
    else attrState = 'state_checked';
    res.addState(array([NativeR.attr[attrState]], 'int'), selectedImage.nativeObject);
    res.addState(array([], 'int'), normalImage.nativeObject);

    return {
      nativeObject: res
    };
  }
  setBadgeToTabarItem(badgeObj: any) {
    this.badgeAdded = true;
    if (this.tabBarItemParent !== null && this.index !== null) {
      const TOP_CENTERHORIZANTAL = 1 | 48;
      const WRAP_CONTENT = -2;
      const layoutParams = new NativeFrameLayout.LayoutParams(WRAP_CONTENT, WRAP_CONTENT, TOP_CENTERHORIZANTAL);
      badgeObj.layoutParams = layoutParams;
      layoutParams.setMarginStart(AndroidUnitConverter.dpToPixel(12));
      badgeObj.nativeObject.setLayoutParams(badgeObj.layoutParams);

      const nativeBottomTabarMenuView = this.tabBarItemParent.nativeObject.getChildAt(0);
      const nativeMenuItem = nativeBottomTabarMenuView.getChildAt(this.index);
      nativeMenuItem.addView(badgeObj.nativeObject);
    }
  }
  toString() {
    return 'TabBarItem';
  }
  setProperties(params: { itemTitle: string; itemIcon: Image; systemIcon: string | number }) {
    const { itemTitle, itemIcon, systemIcon } = params;

    if (itemTitle) this.title = itemTitle;
    if (itemIcon) this.icon = itemIcon;
    if (systemIcon) this.android.systemIcon = systemIcon;
  }
}
