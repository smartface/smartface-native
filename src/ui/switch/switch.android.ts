/*globals requireClass*/
import { ISwitch } from '.';
import AndroidConfig from '../../util/Android/androidconfig';
import Color from '../color';
import ImageAndroid from '../image/image.android';
import Image from '../image';
import ViewAndroid from '../view/view.android';
import { SwitchEvents } from './switch-events';

const NativeSwitch = requireClass('io.smartface.android.sfcore.ui.switchview.SFSwitch');
const NativePorterDuff = requireClass('android.graphics.PorterDuff');

export default class SwitchAndroid<TEvent extends string = SwitchEvents> extends ViewAndroid<TEvent | SwitchEvents, any, ISwitch> {
  private _thumbOnColor: Color;
  private _thumbOffColor: Color;
  private _toggleOnColor: Color;
  private _toggleOffColor: Color;
  private _toggleImage: Image;
  private _thumbImage: Image;
  private _onToggleChangedCallback: (checked: boolean) => void;
  createNativeObject() {
    return new NativeSwitch(AndroidConfig.activity, {
      onToggleChanged: (isChecked: boolean) => {
        this.setThumbColor();
        this.setTrackColor();
        this._onToggleChangedCallback?.(isChecked);
        this.emit(SwitchEvents.ToggleChanged, isChecked);
      }
    });
  }
  constructor(params?: Partial<ISwitch>) {
    super(params);

    const self = this;
    this.addAndroidProps({
      get toggleImage(): Image {
        return self._toggleImage;
      },
      set toggleImage(value: Image) {
        self._toggleImage = value;
        // TODO Recheck after build
        self._toggleImage = ImageAndroid.createImageFromPath(value);
        self.nativeObject.setTrackDrawable(self._toggleImage.nativeObject);
      },
      get thumbImage(): Image {
        return self._thumbImage;
      },
      set thumbImage(value: Image) {
        self._thumbImage = value;
        // TODO Recheck after build
        self._thumbImage = ImageAndroid.createImageFromPath(value);
        self.nativeObject.setThumbDrawable(self._thumbImage.nativeObject);
      },
      get toggleOffColor(): Color {
        return self._toggleOffColor;
      },
      set toggleOffColor(value: Color) {
        self._toggleOffColor = value;
        self.setTrackColor();
      },
      get thumbOffColor(): Color {
        return self._thumbOffColor;
      },
      set thumbOffColor(value: Color) {
        self._thumbOffColor = value;
        self.setThumbColor();
      }
    });
  }

  get thumbOnColor(): Color {
    return this._thumbOnColor;
  }
  set thumbOnColor(value: Color) {
    this._thumbOnColor = value;
    this.setThumbColor();
  }

  get thumbOffColor(): Color {
    return this._thumbOffColor;
  }
  set thumbOffColor(value: Color) {
    this._thumbOffColor = value;
    this.setThumbColor();
  }

  get toggle(): boolean {
    return this.nativeObject.isChecked();
  }
  set toggle(value: boolean) {
    this.nativeObject.setChecked(value);
  }

  get toggleOnColor(): Color {
    return this._toggleOnColor;
  }
  set toggleOnColor(value: Color) {
    this._toggleOnColor = value;
    this.setTrackColor();
  }

  get onToggleChanged(): (toggle: boolean) => void {
    return this._onToggleChangedCallback;
  }
  set onToggleChanged(value: (toggle: boolean) => void) {
    this._onToggleChangedCallback = value;
  }

  setThumbColor() {
    if (this.toggle && this.thumbOnColor) {
      this.nativeObject.getThumbDrawable().setColorFilter(this.thumbOnColor.nativeObject, NativePorterDuff.Mode.MULTIPLY);
    } else if (this.thumbOffColor) {
      this.nativeObject.getThumbDrawable().setColorFilter(this.thumbOffColor.nativeObject, NativePorterDuff.Mode.MULTIPLY);
    }
  }

  setTrackColor() {
    if (this.toggle) {
      this.toggleOnColor && this.nativeObject.getTrackDrawable().setColorFilter(this.toggleOnColor.nativeObject, NativePorterDuff.Mode.SRC_ATOP);
    } else {
      this.android.toggleOffColor && this.nativeObject.getTrackDrawable().setColorFilter(this.android.toggleOffColor.nativeObject, NativePorterDuff.Mode.SRC_ATOP);
    }
  }
}
