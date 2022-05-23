import { IBadge } from './badge';
import NativeComponent from '../../core/native-component';
import Invocation from '../../util/iOS/invocation';
import Color from '../color';

export default class BadgeIOS extends NativeComponent implements IBadge {
  private _visible: boolean;
  private _text: string;
  private _backgroundColor: IBadge['backgroundColor'];
  private _borderColor: IBadge['borderColor'];
  private _textColor: IBadge['textColor'];
  private _font: IBadge['font'];
  private _borderRadius: number;
  private _borderWidth: number;
  private _height: number;
  private _isBadgeFirstLoad: boolean;
  private _isRTL: boolean;
  constructor(params: Partial<IBadge> = {}) {
    super(params);
  }
  protected createNativeObject(params: Partial<IBadge> = {}) {
    return params.nativeObject;
  }
  preConstruct(params: Partial<IBadge> = {}) {
    this._text = '';
    this._visible = false;
    this._borderWidth = 0;
    this._height = 0;
    this._backgroundColor = null;
    this._textColor = null;
    this._isBadgeFirstLoad = false;
    const semanticContent = __SF_UIView.viewAppearanceSemanticContentAttribute();
    const UILayoutDirection = __SF_UIApplication.sharedApplication().userInterfaceLayoutDirection;

    const isLTR = semanticContent === 0 ? UILayoutDirection === 0 : semanticContent === 3;
    this._isRTL = !isLTR;
    super.preConstruct(params);
  }
  get text(): IBadge['text'] {
    return this._text;
  }
  set text(value: IBadge['text']) {
    this._text = value;
    __SF_Dispatch.mainAsyncAfter(() => {
      this.nativeObject.pp_addBadgeWithText(value);
      if (!this._isBadgeFirstLoad) {
        // Re-invoke setters
        if (this._backgroundColor) {
          this.backgroundColor = this._backgroundColor;
        } else {
          this._backgroundColor = null;
        }
        if (this._textColor) {
          this.textColor = this._textColor;
        } else {
          this._textColor = null;
        }

        if (this._font) {
          this.font = this._font;
        } else {
          this._font = null;
        }

        if (this._borderColor) {
          this.borderColor = this._borderColor;
        } else {
          this._borderColor = null;
        }

        if (this._borderWidth) {
          this.borderWidth = this._borderWidth;
        } else {
          this._borderWidth = 0;
        }

        if (this._height) {
          this.height = this._height;
        } else {
          this._height = 0;
        }

        this._isRTL && (this.isRTL = this._isRTL);
      }
      this._isBadgeFirstLoad = true;
    }, 1);
  }
  get visible(): IBadge['visible'] {
    return this._visible;
  }
  set visible(value: IBadge['visible']) {
    this._visible = value;
    __SF_Dispatch.mainAsyncAfter(() => {
      if (this._visible) {
        this.nativeObject.pp_showBadge();
      } else {
        this.nativeObject.pp_hiddenBadge();
      }
    }, 1);
  }
  get backgroundColor(): IBadge['backgroundColor'] {
    return this._backgroundColor;
  }
  set backgroundColor(value: IBadge['backgroundColor']) {
    if (value instanceof Color) {
      this._backgroundColor = value;

      __SF_Dispatch.mainAsyncAfter(() => {
        const argIDBlock = new Invocation.Argument({
          type: 'IDBlock',
          value: (label: __SF_SMFUILabel) => {
            const argColor = new Invocation.Argument({
              type: 'NSObject',
              value: this._backgroundColor?.nativeObject
            });
            Invocation.invokeInstanceMethod(label, 'setBackgroundColor:', [argColor]);
          }
        });
        Invocation.invokeInstanceMethod(this.nativeObject, 'pp_setBadgeLabelAttributes:', [argIDBlock]);
      }, 1);
    }
  }
  get textColor(): IBadge['textColor'] {
    return this._textColor;
  }
  set textColor(value: IBadge['textColor']) {
    if (value instanceof Color) {
      this._textColor = value;

      __SF_Dispatch.mainAsyncAfter(() => {
        const argIDBlock = new Invocation.Argument({
          type: 'IDBlock',
          value: (label: __SF_SMFUILabel) => {
            const argColor = new Invocation.Argument({
              type: 'NSObject',
              value: value.nativeObject
            });
            Invocation.invokeInstanceMethod(label, 'setTextColor:', [argColor]);
          }
        });
        Invocation.invokeInstanceMethod(this.nativeObject, 'pp_setBadgeLabelAttributes:', [argIDBlock]);
      }, 1);
    }
  }
  get font(): IBadge['font'] {
    return this._font;
  }
  set font(value: IBadge['font']) {
    this._font = value;
    __SF_Dispatch.mainAsyncAfter(() => {
      const argIDBlock = new Invocation.Argument({
        type: 'IDBlock',
        value: (label: __SF_SMFUILabel) => {
          const argFont = new Invocation.Argument({
            type: 'NSObject',
            value: this._font
          });
          Invocation.invokeInstanceMethod(label, 'setFont:', [argFont]);
        }
      });
      Invocation.invokeInstanceMethod(this.nativeObject, 'pp_setBadgeLabelAttributes:', [argIDBlock]);
    }, 1);
  }

  get height(): number {
    return this._height;
  }
  set height(value: number) {
    this._height = value;

    __SF_Dispatch.mainAsyncAfter(() => {
      this.nativeObject.pp_setBadgeHeight(Number(this._height) || 0);
    }, 1);
  }
  get borderColor(): IBadge['borderColor'] {
    return this._borderColor;
  }
  set borderColor(value: IBadge['borderColor']) {
    if (value instanceof Color) {
      this._borderColor = value;

      __SF_Dispatch.mainAsyncAfter(() => {
        this.nativeObject.pp_setBorderColor(this._borderColor!.nativeObject);
      }, 1);
    }
  }
  get borderWidth(): IBadge['borderWidth'] {
    return this._borderWidth;
  }
  set borderWidth(value: IBadge['borderWidth']) {
    this._borderWidth = value;
    __SF_Dispatch.mainAsyncAfter(() => {
      this.nativeObject.pp_setBorderWidth(Number(this._borderWidth) || 0);
    }, 1);
  }

  get isRTL(): boolean {
    return this._isRTL;
  }
  set isRTL(value: boolean) {
    this._isRTL = value;
    __SF_Dispatch.mainAsyncAfter(() => {
      this.nativeObject.pp_setIsRTL(value);
    }, 1);
  }
  move(x: number, y: number): void {
    __SF_Dispatch.mainAsyncAfter(() => {
      this.nativeObject.pp_moveBadgeWithXY(x, y);
    }, 1);
  }
}
