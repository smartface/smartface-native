import { IHeaderBarItem } from './headerbaritem';
import { NativeMobileComponent } from '../../core/native-mobile-component';
import Invocation from '../../util/iOS/invocation';
import Badge from '../badge';
import Color from '../color';
import FlexLayout from '../flexlayout';
import Font from '../font';
import Image from '../image';
import { IView } from '../view/view';

enum SystemItem {
  DONE,
  CANCEL,
  EDIT,
  SAVE,
  ADD,
  FLEXIBLESPACE,
  FIXEDSPACE,
  COMPOSE,
  REPLY,
  ACTION,
  ORGANIZE,
  BOOKMARKS,
  SEARCH,
  REFRESH,
  STOP,
  CAMERA,
  TRASH,
  PLAY,
  PAUSE,
  REWIND,
  FASTFORWARD,
  UNDO,
  REDO
}

export default class HeaderBarItemIOS extends NativeMobileComponent<any, IHeaderBarItem> implements IHeaderBarItem {
  protected createNativeObject(params: Partial<IHeaderBarItem> = {}) {
    let nativeObject;
    if (!params?.ios?.systemItem) {
      nativeObject = new __SF_UIBarButtonItem();
    } else {
      this._systemItem = params.ios.systemItem;
      nativeObject = __SF_UIBarButtonItem.createWithSystemItem(params.ios.systemItem);
    }
    nativeObject.target = nativeObject;
    return nativeObject;
  }
  static iOS = {
    SystemItem
  };
  private _systemItem;
  private _badge: Badge;
  private _nativeView;
  private _font: Font | undefined;
  private _customView: IView | undefined;
  private _onPress: IHeaderBarItem['onPress'] = null;
  init(params: Partial<IHeaderBarItem> = {}) {
    super.init(params);
    this._badge = new Badge({ nativeObject: this.nativeObject });
    this._font = undefined;
    this._customView = undefined;
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
  }

  constructor(params?: Partial<IHeaderBarItem>) {
    super(params);
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
    return {
      width: this.layout?.nativeObject.frame.width || 0,
      height: this.layout?.nativeObject.frame.height || 0
    };
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
