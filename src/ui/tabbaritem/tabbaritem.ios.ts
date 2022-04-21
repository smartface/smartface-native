import { ITabbarItem } from './tabbaritem';
import { NativeMobileComponent } from '../../core/native-mobile-component';
import Invocation from '../../util/iOS/invocation';
import { IBadge } from '../badge/badge';
import { IBottomTabBarController } from '../bottomtabbarcontroller/bottomtabbarcontroller';
import FlexLayoutIOS from '../flexlayout/flexlayout.ios';
import FontIOS from '../font/font.ios';
import ImageIOS from '../image/image.ios';
import BadgeIOS from '../badge/badge.ios';
import { TabBarControllerImpl } from '../tabbarcontroller/tabbarcontroller';
import isViewState from '../../util/isViewState';

const UITabBarItem = SF.requireClass('UITabBarItem');

export default class TabbarItemIOS extends NativeMobileComponent<any, ITabbarItem> implements ITabbarItem {
  private _nativeView: any;
  private _title: string;
  private _icon: ITabbarItem['icon'];
  private _badge: Partial<IBadge>;
  private _route: string;
  private _font: ITabbarItem['ios']['font'];

  constructor(params: Partial<ITabbarItem> = {}) {
    super(params);
    this.addIOSProps(this.getIOSProps());
  }
  protected createNativeObject(params: Partial<ITabbarItem>) {
    return UITabBarItem.new();
  }
  protected preConstruct(params: Partial<ITabbarItem>): void {
    this._title = '';
    const defaultBadge = {
      backgroundColor: undefined,
      borderColor: undefined,
      borderWidth: 0,
      textColor: undefined,
      visible: false,
      moveX: undefined,
      moveY: undefined,
      move: function (x, y) {
        this.moveX = x;
        this.moveY = y;
      }
    };
    this._badge = this.nativeObject ? new BadgeIOS({ nativeObject: this.nativeObject }) : defaultBadge;
    this.addIOSProps(this.getIOSProps());
    super.preConstruct(params);
  }
  getIOSProps() {
    const self = this;
    return {
      get font(): FontIOS {
        return self._font;
      },
      set font(value: FontIOS) {
        self._font = value;
        if (!self.nativeObject) {
          return;
        }
        if (self.ios.font) {
          self.nativeObject.setTitleTextAttributesForState({ NSFont: self.ios.font }, 0); //UIControlStateNormal
          self.nativeObject.setTitleTextAttributesForState({ NSFont: self.ios.font }, 1 << 0); //UIControlStateHighlighted
          self.nativeObject.setTitleTextAttributesForState({ NSFont: self.ios.font }, 1 << 1); //UIControlStateDisabled
        } else {
          self.nativeObject.setTitleTextAttributesForState({}, 0); //UIControlStateNormal
          self.nativeObject.setTitleTextAttributesForState({}, 1 << 0); //UIControlStateHighlighted
          self.nativeObject.setTitleTextAttributesForState({}, 1 << 1); //UIControlStateDisabled
        }
      }
    };
  }
  tabBarItemParent: TabBarControllerImpl | IBottomTabBarController | null;
  setProperties(params): void {
    throw new Error('Method not implemented.');
  }
  get route(): string {
    return this._route;
  }
  set route(value: string) {
    this._route = value;
  }
  get layout() {
    let retval: any;
    if (this._nativeView) {
      retval = this._nativeView;
    } else {
      const key = new Invocation.Argument({
        type: 'NSString',
        value: 'view'
      });
      const view = Invocation.invokeInstanceMethod(this.nativeObject, 'valueForKey:', [key], 'id');
      this._nativeView = new FlexLayoutIOS({
        nativeObject: view
      });
      retval = this._nativeView;
    }
    return retval;
  }
  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
    if (this.nativeObject) {
      this.nativeObject.title = value;
    }
  }
  get icon() {
    return this._icon;
  }
  set icon(value) {
    this._icon = value;
    if (typeof value === 'undefined' || !this.nativeObject) {
      return;
    } else if (typeof value === 'string') {
      const image = ImageIOS.createFromFile(value);
      if (image instanceof ImageIOS) {
        this.nativeObject.image = image.nativeObject || undefined;
        this.nativeObject.selectedImage = image.nativeObject || undefined;
      }
    } else if (value instanceof ImageIOS) {
      this.nativeObject.image = value?.nativeObject || undefined;
      this.nativeObject.selectedImage = value?.nativeObject || undefined;
    } else if (isViewState(value)) {
      if (typeof value.normal === 'string') {
        const image = ImageIOS.createFromFile(value.normal);
        if (image) {
          this.nativeObject.image = image.nativeObject;
        }
      } else {
        this.nativeObject.image = value.normal?.nativeObject || undefined;
      }
      if (typeof value.selected === 'string') {
        const image = ImageIOS.createFromFile(value.selected);
        if (image) {
          this.nativeObject.image = image.nativeObject;
        }
      } else {
        this.nativeObject.image = value.selected?.nativeObject || undefined;
      }
    }
  }
  get badge(): IBadge {
    return this._badge as IBadge;
  }
  getScreenLocation() {
    return this.layout.getScreenLocation();
  }
  invalidate() {
    if (this._badge && !(this._badge instanceof BadgeIOS)) {
      delete this._badge['move'];
      const _badgeWithNativeObject = new BadgeIOS({
        nativeObject: this.nativeObject,
        ...this._badge
      });
      this._badge.moveX !== undefined && _badgeWithNativeObject.move(this._badge.moveX, this._badge.moveY);
      this._badge = _badgeWithNativeObject;
    }
  }
}
