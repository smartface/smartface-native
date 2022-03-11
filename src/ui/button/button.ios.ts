import { IButton } from '.';
import Color from '../color';
import { IViewState } from '../view';
import LabelIOS from '../label/label.ios';
import { ButtonEvents } from './button-events';
import Image from '../image';
import { UIControlEvents } from '../../util';

enum ButtonState {
  NORMAL,
  DISABLED,
  SELECTED,
  PRESSED,
  FOCUSED
}

const TextColorsInitial: IViewState<Color> = {
  normal: Color.BLACK,
  disabled: Color.BLACK,
  selected: Color.BLACK,
  pressed: Color.BLACK,
  focused: Color.BLACK
};

const BackgroundColorsInitial: IViewState<Color> = {
  normal: Color.TRANSPARENT,
  disabled: Color.TRANSPARENT,
  selected: Color.TRANSPARENT,
  pressed: Color.TRANSPARENT,
  focused: Color.TRANSPARENT
};

const BackgroundImagesInitial: IViewState<Image> = {
  normal: undefined,
  disabled: undefined,
  selected: undefined,
  pressed: undefined,
  focused: undefined
};
export default class ButtonIOS<TEvent extends string = ButtonEvents> extends LabelIOS<ButtonEvents> implements IButton<TEvent> {
  protected _backgroundImage: IButton['backgroundImage'] = BackgroundImagesInitial;
  protected _textColor: IButton['textColor'] = TextColorsInitial;
  protected _backgroundColor: IButton['backgroundColor'] = BackgroundColorsInitial;
  protected _nativeObject: __SF_UIButton;
  protected _text: IButton['text'];
  private gradientColorObject: Record<string, any>;
  private _onPressFunc: IButton['onPress'];
  constructor(params: Partial<IButton> = {}) {
    super(params);

    if (!this.nativeObject) {
      this._nativeObject = new __SF_UIButton();
    }

    this.nativeObject.addJSTarget(() => {
      this.emit('press');
      this.onPress?.();
    }, UIControlEvents.touchUpInside);
  }
  onLongPress: () => void;

  get nativeObject() {
    return this._nativeObject;
  }
  get enabled(): IButton['enabled'] {
    return this.nativeObject.setEnabled;
  }
  set enabled(value: IButton['enabled']) {
    this.nativeObject.setEnabled = value;
  }
  get text(): IButton['text'] {
    return this._text;
  }
  set text(value: IButton['text']) {
    this._text = value;
    this.nativeObject.setTitle(value, ButtonState.NORMAL);
  }
  get textAlignment(): IButton['textAlignment'] {
    return this.nativeObject.textAlignmentNumber;
  }
  set textAlignment(value: IButton['textAlignment']) {
    let vertical = 2;
    let horizontal = 2;
    if (Math.floor(value / 3) === 0) {
      vertical = 1;
    } else if (Math.floor(value / 3) === 1) {
      vertical = 0;
    }

    if (value % 3 === 0) {
      horizontal = 1;
    } else if (value % 3 === 1) {
      horizontal = 0;
    }

    this.nativeObject.contentVerticalAlignment = vertical;
    this.nativeObject.contentHorizontalAlignment = horizontal;
  }

  get textColor(): IButton['textColor'] {
    return this._textColor;
  }

  set textColor(value: IButton['textColor']) {
    this._textColor = value;
    if (value instanceof Color) {
      this.nativeObject.setTitleColor(value.nativeObject, ButtonState.NORMAL);
    } else {
      value.normal && this.nativeObject.setTitleColor(value.normal.nativeObject, ButtonState.NORMAL);
      value.disabled && this.nativeObject.setTitleColor(value.disabled.nativeObject, ButtonState.DISABLED);
      value.selected && this.nativeObject.setTitleColor(value.selected.nativeObject, ButtonState.SELECTED);
      value.pressed && this.nativeObject.setTitleColor(value.pressed.nativeObject, ButtonState.PRESSED);
      value.focused && this.nativeObject.setTitleColor(value.focused.nativeObject, ButtonState.FOCUSED);
    }
  }

  get backgroundColor(): IButton['backgroundColor'] {
    return this._backgroundColor;
  }
  set backgroundColor(value: IButton['backgroundColor']) {
    this._backgroundColor = value;
    if (value instanceof Color) {
      this.checkAndSetBackground(value, ButtonState.NORMAL);
    } else {
      value.normal && this.checkAndSetBackground(value.normal, ButtonState.NORMAL);
      value.disabled && this.checkAndSetBackground(value.disabled, ButtonState.DISABLED);
      value.selected && this.checkAndSetBackground(value.selected, ButtonState.SELECTED);
      value.pressed && this.checkAndSetBackground(value.pressed, ButtonState.PRESSED);
      value.focused && this.checkAndSetBackground(value.focused, ButtonState.FOCUSED);
    }
  }

  private checkAndSetBackground(value: Color | Image, state: ButtonState) {
    if (value.nativeObject.constructor.name === 'CAGradientLayer') {
      if (Object.keys(this.gradientColorObject).length === 0) {
        this.nativeObject.addFrameObserver();
        this.nativeObject.frameObserveHandler = (e) => {
          if (this.nativeObject.frame.width === 0 || this.nativeObject.frame.height === 0) {
            return;
          }
          for (const state in this.gradientColorObject) {
            const color = this.gradientColorObject[state];
            color.nativeObject.frame = e.frame;
            const layerColor = color.nativeObject.layerToImage();
            this.nativeObject.setBackgroundImage(layerColor, state);
          }
        };
      }
      this.gradientColorObject[state] = value;
      if (this.nativeObject.frame.width === 0 || this.nativeObject.frame.height === 0) {
        return;
      }
      value.nativeObject.frame = this.nativeObject.frame;
      const layerColor = value.nativeObject.layerToImage();
      this.nativeObject.setBackgroundImage(layerColor, state);
    } else {
      if (Object.keys(this.gradientColorObject).length !== 0 && this.gradientColorObject[state]) {
        delete this.gradientColorObject[state];
        if (Object.keys(this.gradientColorObject).length === 0) {
          this.nativeObject.removeFrameObserver();
        }
      }
      if (value instanceof Color) {
        this.nativeObject.setBackgroundColor(value.nativeObject, state);
      } else if (value instanceof Image) {
        this.nativeObject.setBackgroundImage(value.nativeObject, state);
      }
    }
  }

  get backgroundImage(): IButton['backgroundImage'] {
    return this._backgroundImage;
  }
  set backgroundImage(value: IButton['backgroundImage']) {
    this._backgroundImage = value;
    if (value instanceof Image) {
      this.checkAndSetBackground(value, ButtonState.NORMAL);
    } else {
      value.normal && this.checkAndSetBackground(value.normal, ButtonState.NORMAL);
      value.disabled && this.checkAndSetBackground(value.disabled, ButtonState.DISABLED);
      value.selected && this.checkAndSetBackground(value.selected, ButtonState.SELECTED);
      value.pressed && this.checkAndSetBackground(value.pressed, ButtonState.PRESSED);
      value.focused && this.checkAndSetBackground(value.focused, ButtonState.FOCUSED);
    }
  }

  get onPress(): IButton['onPress'] {
    return this._onPressFunc;
  }

  set onPress(value: IButton['onPress']) {
    this._onPressFunc = value;
  }
  get font(): IButton['font'] {
    return this.nativeObject.titleLabel.font as IButton['font'];
  }

  set font(value: IButton['font']) {
    this.nativeObject.titleLabel.font = value;
  }
}
