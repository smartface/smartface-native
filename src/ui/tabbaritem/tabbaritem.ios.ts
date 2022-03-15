import { ITabbarItem } from '.';
import { NativeMobileComponent } from '../../core/native-mobile-component';
import Invocation from '../../util/ios/invocation';
import Badge, { IBadge } from '../badge';
import FlexLayout from '../flexlayout';
import Font from '../font';
import Image from '../image';
import { IPage } from '../page';

export default class TabbarItemIOS extends NativeMobileComponent<any, ITabbarItem> implements ITabbarItem {
  private _nativeView;
  private _title: string = '';
  private _icon: any;
  private _badge: IBadge | Record<string, any>;
  private _route: string;
  constructor(params?: Partial<TabbarItemIOS>) {
    super(params);
    this.nativeObject = undefined;
    if (params && params.nativeObject) {
      this.nativeObject = params.nativeObject;
    }

    this._badge = this.nativeObject
      ? new Badge({ nativeObject: this.nativeObject })
      : ({
          backgroundColor: null,
          borderColor: null,
          borderWidth: 0,
          textColor: null,
          visible: false,
          moveX: undefined,
          moveY: undefined,
          move: function (x, y) {
            this.moveX = x;
            this.moveY = y;
          }
        } as unknown as IBadge);

    this.addIOSProps({
      get font(): Font {
        return this._ios?.font;
      },
      set font(value: Font) {
        this._ios.font = value;
        if (this.nativeObject) {
          if (this._ios.font) {
            this.nativeObject.setTitleTextAttributesForState({ NSFont: this._ios.font }, 0); //UIControlStateNormal
            this.nativeObject.setTitleTextAttributesForState({ NSFont: this._ios.font }, 1 << 0); //UIControlStateHighlighted
            this.nativeObject.setTitleTextAttributesForState({ NSFont: this._ios.font }, 1 << 1); //UIControlStateDisabled
          } else {
            this.nativeObject.setTitleTextAttributesForState({}, 0); //UIControlStateNormal
            this.nativeObject.setTitleTextAttributesForState({}, 1 << 0); //UIControlStateHighlighted
            this.nativeObject.setTitleTextAttributesForState({}, 1 << 1); //UIControlStateDisabled
          }
        }
      }
    });
  }
  setProperties(params: { itemTitle: string; itemIcon: string | { normal: string | Image; selected: string | Image } | Image; systemIcon?: string | number | undefined }): void {
    throw new Error('Method not implemented.');
  }
  tabBarItemParent: IPage | null = null;
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
      this._nativeView = new FlexLayout({
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
  set icon(icon: { normal: Image | string; selected: Image | string } | Image | string) {
    if (typeof icon === 'object') {
      this._icon = icon;
      if (this.nativeObject) {
        if (this._icon && (this._icon.normal || this._icon.selected)) {
          if (typeof this._icon.normal === 'object') {
            this.nativeObject.image = this._icon.normal.nativeObject;
          } else if (typeof this._icon.normal === 'string') {
            const image = Image.createFromFile(this._icon.normal);
            if (image) this.nativeObject.image = image.nativeObject;
          } else {
            this.nativeObject.image = undefined;
          }

          if (typeof this._icon.selected === 'object') {
            this.nativeObject.selectedImage = this._icon.selected.nativeObject;
          } else if (typeof this._icon.selected === 'string') {
            const image = Image.createFromFile(this._icon.selected);
            if (image) this.nativeObject.selectedImage = image.nativeObject;
          } else {
            this.nativeObject.selectedImage = undefined;
          }
        } else {
          if (typeof this._icon === 'object') {
            this.nativeObject.image = this._icon ? this._icon.nativeObject : undefined;
            this.nativeObject.selectedImage = this._icon ? this._icon.nativeObject : undefined;
          } else if (typeof this._icon === 'string') {
            const image = Image.createFromFile(this._icon);
            if (image) {
              this.nativeObject.image = image.nativeObject ? image.nativeObject : undefined;
              this.nativeObject.selectedImage = image.nativeObject ? image.nativeObject : undefined;
            }
          }
        }
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
    if (this._badge && !(this._badge instanceof Badge)) {
      // @ts-ignore
      delete this._badge['move'];
      const _badgeWithNativeObject = new Badge({
        nativeObject: this.nativeObject,
        ...(this._badge as any)
      });
      this._badge.moveX !== undefined && _badgeWithNativeObject.move(this._badge.moveX, this._badge.moveY);
      this._badge = _badgeWithNativeObject;
    }
  }
}
