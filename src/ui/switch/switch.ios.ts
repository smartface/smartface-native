import { ISwitch } from './switch';
import UIControlEvents from '../../util/iOS/uicontrolevents';
import Color from '../color';
import ViewIOS from '../view/view.ios';
import { SwitchEvents } from './switch-events';

export default class SwitchIOS<TEvent extends string = SwitchEvents> extends ViewIOS<TEvent | SwitchEvents, __SF_UISwitch, ISwitch> {
  private _toggleOnColor: Color = Color.GREEN;
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
      this.triggerCallbackToJS()
    }, UIControlEvents.valueChanged);
    super.preConstruct(params);
  }

  private triggerCallbackToJS() {
    this.onToggleChanged?.(this.toggle);
      this.emit('toggleChanged', this.toggle);
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
      this.nativeObject.thumbTintColor = value.nativeObject;
    }
  }

  // TODO There is nothing related to thumbOffColor
  thumbOffColor: Color;

  get toggle(): boolean {
    return this.nativeObject.isOn;
  }
  set toggle(value: boolean) {
    this.nativeObject.setOnAnimated(value, true);
    this.triggerCallbackToJS()
  }

  get toggleOnColor(): Color {
    return this._toggleOnColor;
  }
  set toggleOnColor(value: Color) {
    this._toggleOnColor = value;
    this.nativeObject.onTintColor = value.nativeObject;
  }
}

import '@smartface/native';
