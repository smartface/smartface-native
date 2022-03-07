import { ISwipeItem, ISwipeItemAndroidParams, ISwipeItemIOSParams } from '.';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { WithMobileOSProps } from '../../core/native-mobile-component';
import Color from '../color';
import Font from '../font';
import Image from '../image';
import { SwipeItemEvents } from './swipeitem-events';

export default class SwipeItem
  extends NativeEventEmitterComponent<SwipeItemEvents, any, WithMobileOSProps<Partial<ISwipeItem>, Partial<ISwipeItemIOSParams>, Partial<ISwipeItemAndroidParams>>>
  implements ISwipeItem
{
  private _text = 'Button';
  private _backgroundColor = Color.GRAY;
  private _textColor = Color.WHITE;
  private _icon: Image;
  private _font = Font.create(Font.DEFAULT, 14);
  private _onPress: (params: { index: number }) => void;
  private _padding: number;
  private _iconTextSpacing: number;
  private _isAutoHide: boolean;
  private _threshold = 0.5;
  private _borderBottomLeftRadius = 0;
  private _borderBottomRightRadius = 0;
  private _borderTopRightRadius = 0;
  private _borderTopLeftRadius = 0;
  private _paddingLeft = 0;
  private _paddingRight = 0;
  private _paddingBottom = 0;
  private _paddingTop = 0;
  constructor(params: Partial<ISwipeItem> = {}) {
    super(params);
    this.addIOSProps(this.getIOSParams());
    this.addAndroidProps(this.getAndroidParams());
  }

  get text() {
    return this._text;
  }
  set text(value) {
    this._text = value;
  }
  get font() {
    return this._font;
  }
  set font(value) {
    this._font = value;
  }
  get backgroundColor() {
    return this._backgroundColor;
  }
  set backgroundColor(value) {
    this._backgroundColor = value;
  }
  get textColor() {
    return this._textColor;
  }
  set textColor(value) {
    this._textColor = value;
  }
  get onPress() {
    return this._onPress;
  }
  set onPress(value) {
    this._onPress = value;
  }
  get icon() {
    return this._icon;
  }
  set icon(value) {
    this._icon = value;
  }

  private getIOSParams() {
    const self = this;
    return {
      get padding(): ISwipeItem['ios']['padding'] {
        return self._padding;
      },
      set padding(value: ISwipeItem['ios']['padding']) {
        self._padding = value;
      },
      get iconTextSpacing(): ISwipeItem['ios']['iconTextSpacing'] {
        return self._iconTextSpacing;
      },
      set iconTextSpacing(value: ISwipeItem['ios']['iconTextSpacing']) {
        self._iconTextSpacing = value;
      },
      get isAutoHide(): ISwipeItem['ios']['isAutoHide'] {
        return self._isAutoHide;
      },
      set isAutoHide(value: ISwipeItem['ios']['isAutoHide']) {
        self._isAutoHide = value;
      }
    };
  }
  private getAndroidParams() {
    const self = this;
    return {
      get threadhold(): ISwipeItem['android']['threshold'] {
        return self._threshold;
      },
      set threadhold(value: ISwipeItem['android']['threshold']) {
        self._threshold = value;
      },
      get borderBottomLeftRadius(): ISwipeItem['android']['borderBottomLeftRadius'] {
        return self._borderBottomLeftRadius;
      },
      set borderBottomLeftRadius(value: ISwipeItem['android']['borderBottomLeftRadius']) {
        self._borderBottomLeftRadius = value;
      },
      get borderBottomRightRadius(): ISwipeItem['android']['borderBottomRightRadius'] {
        return self._borderBottomRightRadius;
      },
      set borderBottomRightRadius(value: ISwipeItem['android']['borderBottomRightRadius']) {
        self._borderBottomRightRadius = value;
      },
      get borderTopLeftRadius(): ISwipeItem['android']['borderTopLeftRadius'] {
        return self._borderTopLeftRadius;
      },
      set borderTopLeftRadius(value: ISwipeItem['android']['borderTopLeftRadius']) {
        self._borderTopLeftRadius = value;
      },
      get borderTopRightRadius(): ISwipeItem['android']['borderTopRightRadius'] {
        return self._borderTopRightRadius;
      },
      set borderTopRightRadius(value: ISwipeItem['android']['borderTopRightRadius']) {
        self._borderTopRightRadius = value;
      },
      get paddingLeft(): ISwipeItem['android']['paddingLeft'] {
        return self._paddingLeft;
      },
      set paddingLeft(value: ISwipeItem['android']['paddingLeft']) {
        self._paddingLeft = value;
      },
      get paddingRight(): ISwipeItem['android']['paddingRight'] {
        return self._paddingRight;
      },
      set paddingRight(value: ISwipeItem['android']['paddingRight']) {
        self._paddingRight = value;
      },
      get paddingTop(): ISwipeItem['android']['paddingTop'] {
        return self._paddingTop;
      },
      set paddingTop(value: ISwipeItem['android']['paddingTop']) {
        self._paddingTop = value;
      },
      get paddingBottom(): ISwipeItem['android']['paddingBottom'] {
        return self._paddingBottom;
      },
      set paddingBottom(value: ISwipeItem['android']['paddingBottom']) {
        self._paddingBottom = value;
      }
    };
  }
}
