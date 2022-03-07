import { ISwitch } from '.';
import { WithMobileOSProps } from '../../core/native-mobile-component';
import UIControlEvents from '../../util/iOS/uicontrolevents';
import Color from '../color';
import ViewIOS from '../view/view.ios';
import { SwitchEvents } from './switch-events';

export default class SwitchIOS<TEvent extends string = SwitchEvents> extends ViewIOS<
  TEvent | SwitchEvents,
  any,
  WithMobileOSProps<Partial<ISwitch>, Partial<ISwitch['ios']>, Partial<ISwitch['android']>>
> {
  private _toggleOnColor: Color = Color.GREEN;
  private _onToggleChanged: (toggle: boolean) => void;

  constructor(params: Partial<ISwitch> = {}) {
    super(params);

    if (!this.nativeObject) {
      this._nativeObject = new __SF_UISwitch();
    }

    if (__SF_UIView.viewAppearanceSemanticContentAttribute() == 3) {
      this.nativeObject.setValueForKey(3, 'semanticContentAttribute');
    } else if (__SF_UIView.viewAppearanceSemanticContentAttribute() == 4) {
      this.nativeObject.setValueForKey(4, 'semanticContentAttribute');
    }

    this.nativeObject.layer.masksToBounds = false;

    const onToggleChangedHandler = (toggle: boolean) => {
      this._onToggleChanged(toggle);
      this.emit(SwitchEvents.ToggleChanged, toggle);
    };
    this.nativeObject.addJSTarget(onToggleChangedHandler, UIControlEvents.valueChanged);
  }

  get enabled(): boolean {
    return this.nativeObject.setEnabled;
  }
  set enabled(value: boolean) {
    this.nativeObject.setEnabled = value;
  }

  get thumbOnColor(): Color {
    if (this.nativeObject.thumbTintColor === undefined) {
      return null;
    } else {
      return new Color({
        color: this.nativeObject.thumbTintColor
      });
    }
  }
  set thumbOnColor(value: Color) {
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
  }

  get toggleOnColor(): Color {
    return this._toggleOnColor;
  }
  set toggleOnColor(value: Color) {
    this._toggleOnColor = value;
    this.nativeObject.onTintColor = value.nativeObject;
  }

  get onToggleChanged(): (toggle: boolean) => void {
    return this._onToggleChanged;
  }
  set onToggleChanged(value: (toggle: boolean) => void) {
    this._onToggleChanged = value;
  }
}
