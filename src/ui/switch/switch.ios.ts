import { ISwitch } from './switch';
import UIControlEvents from '../../util/iOS/uicontrolevents';
import ColorIOS from '../color/color.ios';
import ViewIOS from '../view/view.ios';
import { SwitchEvents } from './switch-events';
import { IColor } from '../color/color';

export default class SwitchIOS<TEvent extends string = SwitchEvents> extends ViewIOS<TEvent | SwitchEvents, __SF_UISwitch, ISwitch> {
  private _toggleOnColor: IColor;
  private _toggleOffColor: IColor;
  private _thumbOnColor: IColor;
  private _thumbOffColor: IColor;

  onToggleChanged: (toggle: boolean) => void;
  constructor(params?: Partial<ISwitch>) {
    super(params);
  }
  createNativeObject() {
    return new __SF_UISwitch();
  }
  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this.toggleOnColor = ColorIOS.GREEN;
    this.toggleOffColor = ColorIOS.create('#FAFAFF');
    this.thumbOnColor = ColorIOS.WHITE;
    this.thumbOffColor = ColorIOS.WHITE;
    if (__SF_UIView.viewAppearanceSemanticContentAttribute() === 3) {
      this.nativeObject.setValueForKey(3, 'semanticContentAttribute');
    } else if (__SF_UIView.viewAppearanceSemanticContentAttribute() === 4) {
      this.nativeObject.setValueForKey(4, 'semanticContentAttribute');
    }

    this.nativeObject.layer.masksToBounds = false;

    this.nativeObject.addJSTarget(() => {
      this.triggerCallbackToJS();
    }, UIControlEvents.valueChanged);
    super.preConstruct(params);
  }

  private triggerCallbackToJS() {
    this.onToggleChanged?.(this.toggle);
    this.emit('toggleChanged', this.toggle);

    this.thumbOffColor = this._thumbOffColor;
    this.toggleOffColor = this._toggleOffColor;
  }

  get enabled(): boolean {
    return this.nativeObject.setEnabled;
  }
  set enabled(value: boolean) {
    this.nativeObject.setEnabled = value;
  }

  get thumbOnColor(): IColor | null {
    if (this.nativeObject.thumbTintColor === undefined) {
      return null;
    } else {
      return new ColorIOS({
        color: this.nativeObject.thumbTintColor
      });
    }
  }
  set thumbOnColor(value: IColor | undefined | null) {
    if (value === null || value === undefined) {
      this.nativeObject.thumbTintColor = undefined;
    } else {
      this._thumbOnColor = value;
      this.nativeObject.thumbTintColor = value.nativeObject;
    }
  }

  // TODO There is nothing related to thumbOffColor
  get thumbOffColor(): IColor {
    return this._thumbOffColor;
  }

  set thumbOffColor(value: IColor) {
    if (!value) return;

    this._thumbOffColor = value;
    if (!this.nativeObject.isOn) {
      this.nativeObject.thumbTintColor = value.nativeObject;
    } else {
      if (this._thumbOnColor) {
        this.nativeObject.thumbTintColor = this._thumbOnColor.nativeObject;
      }
    }
  }

  // thumbOffColor: IColor;

  get toggle(): boolean {
    return this.nativeObject.isOn;
  }
  set toggle(value: boolean) {
    this.nativeObject.setOnAnimated(value, true);
    this.triggerCallbackToJS();
  }

  get toggleOnColor(): IColor {
    return this._toggleOnColor;
  }
  set toggleOnColor(value: IColor) {
    this._toggleOnColor = value;
    this.nativeObject.onTintColor = value.nativeObject;
  }

  get toggleOffColor(): IColor {
    return this._toggleOffColor;
  }

  set toggleOffColor(value: IColor) {
    if (!value) return;

    this._toggleOffColor = value;
    if (!this.nativeObject.isOn) {
      this.nativeObject.setOffColor(value.nativeObject);
    } else {
      if (this._toggleOnColor) {
        this.nativeObject.onTintColor = this._toggleOnColor.nativeObject;
      }
    }
  }
}
