import { ITabbarItem } from './tabbaritem';
import { NativeMobileComponent } from '../../core/native-mobile-component';
import Invocation from '../../util/iOS/invocation';
import { IBadge } from '../badge';
import { IBottomTabBarController } from '../bottomtabbarcontroller';
import FlexLayoutIOS from '../flexlayout/flexlayout.ios';
import FontIOS from '../font/font.ios';
import ImageIOS from '../image/image.ios';
import BadgeIOS from '../badge/badge.ios';
import { TabBarControllerImpl } from '../tabbarcontroller/tabbarcontroller';
import isViewState from '../../util/isViewState';

export default class TabbarItemIOS extends NativeMobileComponent<any, ITabbarItem> implements ITabbarItem {
  private _nativeView: any;
  private _title: string;
  private _icon: ITabbarItem['icon'];
  private _badge: Partial<IBadge>;
  private _route: string;

  constructor(params?: Partial<ITabbarItem>) {
    super(params);
    this.addIOSProps(this.getIOSProps());
  }
  protected createNativeObject() {
    return null;
  }
  protected init(): void {
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
  }
  getIOSProps() {
    const self = this;
    return {
      get font(): FontIOS {
        return self.ios.font;
      },
      set font(value: FontIOS) {
        self.ios.font = value;
        if (this.ios.font) {
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
  get android() {
    return this._android;
  }
  get route(): string {
    return this._route;
  }
  set route(value: string) {
    this._route = value;
  }
  get layout() {
    let retval;
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
  set title(title: string) {
    if (typeof title === 'string') {
      this._title = title;
      if (this.nativeObject) {
        this.nativeObject.title = this._title;
      }
    }
  }
  get icon() {
    return this._icon;
  }
  set icon(value) {
    this._icon = value;
    if (typeof value === 'undefined') {
      return;
    } else if (typeof value === 'string') {
      const image = ImageIOS.createFromFile(value);
      if (image) {
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
