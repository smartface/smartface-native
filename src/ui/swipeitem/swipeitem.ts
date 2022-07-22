import { ISwipeItem, ISwipeItemAndroidParams, ISwipeItemIOSParams } from '.';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { WithMobileOSProps } from '../../core/native-mobile-component';
import Color from '../color';
import { IColor } from '../color/color';
import Font from '../font';
import { IFont } from '../font/font';
import { IImage } from '../image/image';
import { SwipeItemEvents } from './swipeitem-events';
export default class SwipeItem
  extends NativeEventEmitterComponent<SwipeItemEvents, any, WithMobileOSProps<Partial<ISwipeItem>, Partial<ISwipeItemIOSParams>, Partial<ISwipeItemAndroidParams>>>
  implements ISwipeItem
{
  protected createNativeObject() {
    return null;
  }
  private _text: string = 'Button';
  private _backgroundColor = Color.GRAY;
  private _textColor = Color.WHITE;
  private _icon?: IImage;
  private _font: IFont | null = Font.create(Font.DEFAULT, 14);
  private _onPress: ISwipeItem['onPress'];
  private _padding: number = 0;
  private _iconTextSpacing: ISwipeItem['ios']['iconTextSpacing'];
  private _isAutoHide: ISwipeItem['ios']['isAutoHide'];
  private _threshold: ISwipeItem['android']['threshold'] = 0.5;
  private _borderBottomLeftRadius: ISwipeItem['android']['borderBottomLeftRadius'] = 0;
  private _borderBottomRightRadius: ISwipeItem['android']['borderBottomRightRadius'] = 0;
  private _borderTopRightRadius: ISwipeItem['android']['borderTopRightRadius'] = 0;
  private _borderTopLeftRadius: ISwipeItem['android']['borderTopLeftRadius'] = 0;
  private _paddingLeft: ISwipeItem['android']['paddingLeft'] = 0;
  private _paddingRight: ISwipeItem['android']['paddingRight'] = 0;
  private _paddingBottom: ISwipeItem['android']['paddingBottom'] = 0;
  private _paddingTop: ISwipeItem['android']['paddingTop'] = 0;
  constructor(params: Partial<ISwipeItem> = {}) {
    super(params);
    this.addIOSProps(this.getIOSParams());
    this.addAndroidProps(this.getAndroidParams());
  }
  protected preConstruct(params?: Partial<Record<string, any>>): void {
    super.preConstruct(params);
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
  set font(value: IFont | null) {
    this._font = value;
  }
  get backgroundColor() {
    return this._backgroundColor;
  }
  set backgroundColor(value: IColor) {
    this._backgroundColor = value;
  }
  get textColor() {
    return this._textColor;
  }
  set textColor(value: IColor) {
    this._textColor = value;
  }
  get onPress() {
    return this._onPress;
  }
  set onPress(value: ISwipeItem['onPress']) {
    this._onPress = value;
  }
  get icon() {
    return this._icon;
  }
  set icon(value: ISwipeItem['icon']) {
    this._icon = value;
  }

  private getIOSParams() {
    const self = this;
    return {
      get padding(): number {
        return self._padding;
      },
      set padding(value: number) {
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
