import { ISwitch } from './switch';
import UIControlEvents from '../../util/iOS/uicontrolevents';
import Color from '../color';
import ViewIOS from '../view/view.ios';
import { SwitchEvents } from './switch-events';

export default class SwitchIOS<TEvent extends string = SwitchEvents> extends ViewIOS<TEvent | SwitchEvents, __SF_UISwitch, ISwitch> {
  private _toggleOnColor: Color = Color.GREEN;
  private _toggleOffColor: Color = Color.create('#FAFAFF');

  private _thumbOnColor: Color = Color.WHITE;
  private _thumbOffColor: Color = Color.WHITE;

  onToggleChanged: (toggle: boolean) => void;
  constructor(params?: Partial<ISwitch>) {
    super(params);
  }
  createNativeObject() {
    return new __SF_UISwitch();
  }
  protected preConstruct(params?: Partial<Record<string, any>>): void {
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

  get thumbOnColor(): Color | null {
    if (this.nativeObject.thumbTintColor === undefined) {
      return null;
    } else {
      return new Color({
        color: this.nativeObject.thumbTintColor
      });
    }
  }
  set thumbOnColor(value: Color | undefined | null) {
    if (value === null || value === undefined) {
      this.nativeObject.thumbTintColor = undefined;
    } else {
      this._thumbOnColor = value;
      this.nativeObject.thumbTintColor = value.nativeObject;
    }
  }

  // TODO There is nothing related to thumbOffColor
  get thumbOffColor(): Color {
    return this._thumbOffColor;
  }

  set thumbOffColor(value: Color) {
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

  // thumbOffColor: Color;

  get toggle(): boolean {
    return this.nativeObject.isOn;
  }
  set toggle(value: boolean) {
    this.nativeObject.setOnAnimated(value, true);
    this.triggerCallbackToJS();
  }

  get toggleOnColor(): Color {
    return this._toggleOnColor;
  }
  set toggleOnColor(value: Color) {
    this._toggleOnColor = value;
    this.nativeObject.onTintColor = value.nativeObject;
  }

  get toggleOffColor(): Color {
    return this._toggleOffColor;
  }

  set toggleOffColor(value: Color) {
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

import '@smartface/native';
