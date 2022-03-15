import HeaderBarItem, { IHeaderBarItem } from '.';
import { NativeMobileComponent } from '../../core/native-mobile-component';
import Invocation from '../../util/iOS/invocation';
import Badge from '../badge';
import Color from '../color';
import FlexLayout from '../flexlayout';
import Font from '../font';
import Image from '../image';
import { IView } from '../view';

export default class HeaderBarItemIOS extends NativeMobileComponent<any, IHeaderBarItem> implements IHeaderBarItem {
  iOS = {
    SystemItem: {
      DONE: 0,
      CANCEL: 1,
      EDIT: 2,
      SAVE: 3,
      ADD: 4,
      FLEXIBLESPACE: 5,
      FIXEDSPACE: 6,
      COMPOSE: 7,
      REPLY: 8,
      ACTION: 9,
      ORGANIZE: 10,
      BOOKMARKS: 11,
      SEARCH: 12,
      REFRESH: 13,
      STOP: 14,
      CAMERA: 15,
      TRASH: 16,
      PLAY: 17,
      PAUSE: 18,
      REWIND: 19,
      FASTFORWARD: 20,
      UNDO: 21,
      REDO: 22
    }
  };
  private _systemItem;
  private _badge: Badge;
  private _nativeView;
  private _font: Font | undefined;
  private _customView: IView | undefined;
  private _onPress: HeaderBarItem['onPress'] = null;

  constructor(params?: Partial<HeaderBarItem>) {
    super(params);
    if (params && params.ios && params.ios.systemItem) {
      this._systemItem = params.ios.systemItem;
      this.nativeObject = __SF_UIBarButtonItem.createWithSystemItem(params.ios.systemItem);
    } else {
      this.nativeObject = new __SF_UIBarButtonItem();
    }

    this.nativeObject.target = this.nativeObject;

    this._badge = new Badge({ nativeObject: this.nativeObject });

    const self = this;
    this.addIOSProps({
      get systemItem() {
        return self._systemItem;
      },
      get font() {
        return self._font;
      },
      set font(value: Font | undefined) {
        self._font = value;
        if (self._font) {
          self.nativeObject.setTitleTextAttributesForState({ NSFont: self._font }, 0); //UIControlStateNormal
          self.nativeObject.setTitleTextAttributesForState({ NSFont: self._font }, 1 << 0); //UIControlStateHighlighted
          self.nativeObject.setTitleTextAttributesForState({ NSFont: self._font }, 1 << 1); //UIControlStateDisabled
        } else {
          self.nativeObject.setTitleTextAttributesForState({}, 0); //UIControlStateNormal
          self.nativeObject.setTitleTextAttributesForState({}, 1 << 0); //UIControlStateHighlighted
          self.nativeObject.setTitleTextAttributesForState({}, 1 << 1); //UIControlStateDisabled
        }
      }
    });

    const { ios, android, ...restParams } = params || {};
  }
  get layout() {
    let retval;
    if (this._nativeView) {
      retval = this._nativeView;
    } else {
      this._nativeView = this.nativeObject.containerView
        ? new FlexLayout({
            nativeObject: this.nativeObject.containerView
          })
        : undefined;
      retval = this._nativeView;
    }
    return retval;
  }
  get title() {
    return this.nativeObject.title;
  }
  set title(value: string) {
    if (typeof value !== 'string') {
      return;
    }
    this.nativeObject.title = value;
  }
  get customView() {
    return this._customView;
  }
  set customView(value: any) {
    this._customView = value;
    this._customView?.applyLayout();
    this._customView && this.nativeObject.setValueForKey(this._customView.nativeObject, 'customView');
  }
  get image() {
    let retval: any = undefined;
    if (this.nativeObject.image) {
      retval = Image.createFromImage(this.nativeObject.image);
    }
    return retval;
  }
  set image(value: string | Image) {
    if (typeof value === 'string') {
      const image = Image.createFromFile(value);
      if (image) this.nativeObject.image = image.nativeObject;
    } else if (value instanceof Image) {
      {
        this.nativeObject.image = value.nativeObject;
      }
    }
  }
  get color() {
    return new Color({
      color: this.nativeObject.tintColor
    });
  }
  set color(value: Color) {
    if (value) {
      this.nativeObject.tintColor = value.nativeObject;
    }
  }
  get enabled() {
    return this.nativeObject.enabled;
  }
  set enabled(value: boolean) {
    this.nativeObject.enabled = value;
  }
  get onPress() {
    return this._onPress;
  }
  set onPress(value) {
    if (value instanceof Function) {
      this._onPress = value.bind(this);
      this.nativeObject.addJSAction(this._onPress);
    }
  }
  get badge() {
    return this._badge;
  }
  get size() {
    return this.layout
      ? {
          width: this.layout.nativeObject.frame.width,
          height: this.layout.nativeObject.frame.height
        }
      : undefined;
  }
  get accessibilityLabel() {
    return Invocation.invokeInstanceMethod(this.nativeObject, 'accessibilityLabel', [], 'NSString') as string;
  }
  set accessibilityLabel(value: string) {
    const nativeAccessibilityLabel = new Invocation.Argument({
      type: 'NSString',
      value: value
    });
    Invocation.invokeInstanceMethod(this.nativeObject, 'setAccessibilityLabel:', [nativeAccessibilityLabel]);
  }
  getScreenLocation() {
    return this.layout.getScreenLocation();
  }
}
