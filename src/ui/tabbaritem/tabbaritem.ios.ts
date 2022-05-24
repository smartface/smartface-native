import { ITabbarItem } from './tabbaritem';
import { NativeMobileComponent } from '../../core/native-mobile-component';
import Invocation from '../../util/iOS/invocation';
import { IBadge } from '../badge/badge';
import FlexLayoutIOS from '../flexlayout/flexlayout.ios';
import FontIOS from '../font/font.ios';
import ImageIOS from '../image/image.ios';
import BadgeIOS from '../badge/badge.ios';
import { ITabBarController } from '../tabbarcontroller/tabbarcontroller';
import isViewState from '../../util/isViewState';
import { IBottomTabBar } from '../bottomtabbar/bottomtabbar';

const UITabBarItem = SF.requireClass('UITabBarItem');

export default class TabbarItemIOS extends NativeMobileComponent<any, ITabbarItem> implements ITabbarItem {
  private _nativeView: any;
  private _title: string;
  private _icon: ITabbarItem['icon'];
  private _badge: Partial<IBadge> | IBadge;
  private _route: string;
  private _font: ITabbarItem['ios']['font'];
  private _badgeProps: Partial<IBadge>;

  constructor(params: Partial<ITabbarItem> = {}) {
    super(params);
    this.addIOSProps(this.getIOSProps());
  }
  index: number | null;
  tabBarItemParent: ITabBarController | IBottomTabBar | null;
  protected createNativeObject(params: Partial<ITabbarItem>) {
    return UITabBarItem.new();
  }
  protected preConstruct(params: Partial<ITabbarItem>): void {
    this._title = '';
    this._badgeProps = {};
    this._badge = new BadgeIOS({ nativeObject: this.nativeObject });
    super.preConstruct(params);
    this.addIOSProps(this.getIOSProps());
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
  setProperties(params): void {}
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
    // This is done this way because nativeObject is always changing. Never create another badge object again.
    // This might reduce performance a bit, but this will stay like this until there's a better solution.
    return new BadgeIOS({ ...this._badgeProps, nativeObject: this.nativeObject });
  }

  set badge(value: IBadge) {
    this.setBadgeProps(value);
  }
  getScreenLocation() {
    return this.layout.getScreenLocation();
  }
  private setBadgeProps(props: Partial<IBadge>) {
    this._badgeProps.backgroundColor = props.backgroundColor;
    this._badgeProps.text = props.text;
    this._badgeProps.borderColor = props.borderColor;
    this._badgeProps.borderWidth = props.borderWidth;
    this._badgeProps.font = props.font;
    this._badgeProps.textColor = props.textColor;
    this._badgeProps.visible = props.visible;
  }
}
