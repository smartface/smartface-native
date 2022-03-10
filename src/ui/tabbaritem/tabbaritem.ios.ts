import { AbstractTabBarItem } from '.';
import NativeComponent from '../../core/native-component';
import { AttributedStringBase } from '../../global/attributedstring/attributedstring';
import { Invocation } from '../../util';
import Badge from '../badge';
import FlexLayout from '../flexlayout';
import Font from '../font';
import Image from '../image';

export default class TabbarItemIOS extends NativeComponent implements AbstractTabBarItem {
  private _nativeView;
  private _title = '';
  private _icon;
  private _badge;
  private _route: string;
  private _android: Partial<{ attributedTitle: AttributedStringBase; systemIcon: string | number }> = {};
  private _ios: Partial<{ font: Font }> = {};
  constructor(params?: Partial<TabbarItemIOS>) {
    super();
    this.nativeObject = undefined;
    if (params && params.nativeObject) {
      this.nativeObject = params.nativeObject;
    }

    this._badge = this.nativeObject
      ? new Badge({ nativeObject: self.nativeObject })
      : {
          move: function (x, y) {
            this.moveX = x;
            this.moveY = y;
          }
        };

    this._ios = {
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
    };
    const { ios, android, ...restParams } = params;
    Object.assign(this._ios, ios);
    Object.assign(this._android, android);
    Object.assign(this, restParams);
  }
  get android() {
    return this._android;
  }
  get ios() {
    return this._ios;
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
            this.nativeObject.image = image.nativeObject;
          } else {
            this.nativeObject.image = undefined;
          }

          if (typeof this._icon.selected === 'object') {
            this.nativeObject.selectedImage = this._icon.selected.nativeObject;
          } else if (typeof this._icon.selected === 'string') {
            const image = Image.createFromFile(this._icon.selected);
            this.nativeObject.selectedImage = image.nativeObject;
          } else {
            this.nativeObject.selectedImage = undefined;
          }
        } else {
          if (typeof this._icon === 'object') {
            this.nativeObject.image = this._icon ? this._icon.nativeObject : undefined;
            this.nativeObject.selectedImage = this._icon ? this._icon.nativeObject : undefined;
          } else if (typeof this._icon === 'string') {
            const image = Image.createFromFile(this._icon);
            this.nativeObject.image = image.nativeObject ? image.nativeObject : undefined;
            this.nativeObject.selectedImage = image.nativeObject ? image.nativeObject : undefined;
          }
        }
      }
    }
  }
  get badge(): Badge {
    return this._badge;
  }
  getScreenLocation() {
    return this.layout.getScreenLocation();
  }
  invalidate() {
    if (this._badge.constructor.name !== 'Badge') {
      delete this._badge['move'];
      const _badgeWithNativeObject = new Badge({
        nativeObject: this.nativeObject,
        parameters: this._badge
      });
      this._badge.moveX !== undefined && _badgeWithNativeObject.move(this._badge.moveX, this._badge.moveY);
      this._badge = _badgeWithNativeObject;
    }
  }
}
