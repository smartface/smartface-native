/*globals requireClass*/
import { ISwitch } from './switch';
import AndroidConfig from '../../util/Android/androidconfig';
import Color from '../color';
import ImageAndroid from '../image/image.android';
import Image from '../image';
import ViewAndroid from '../view/view.android';
import { SwitchEvents } from './switch-events';
import ColorAndroid from '../color/color.android';

const NativeSwitch = requireClass('io.smartface.android.sfcore.ui.switchview.SFSwitch');

export default class SwitchAndroid<TEvent extends string = SwitchEvents> extends ViewAndroid<TEvent | SwitchEvents, any, ISwitch> {
  private _toggleImage: Image;
  private _thumbImage: Image;
  private _onToggleChangedCallback: (checked: boolean) => void;
  createNativeObject() {
    return new NativeSwitch(AndroidConfig.activity, {
      onToggleChanged: (isChecked: boolean) => {
        this._onToggleChangedCallback?.(isChecked);
        this.emit('toggleChanged', isChecked);
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
        return self.getColorFromColorInt(self.nativeObject.getTrackOffColor());
      },
      set toggleOffColor(value: Color) {
        self.nativeObject.setTrackOffColor(self.getColorIntFromColor(value));
      },
      get thumbOffColor(): Color {
        return self.getColorFromColorInt(self.nativeObject.getThumbOffColor());
      },
      set thumbOffColor(value: Color) {
        self.nativeObject.setThumbOffColor(self.getColorIntFromColor(value));
      }
    });
  }

  get thumbOnColor(): Color {
    return this.getColorFromColorInt(this.nativeObject.getThumbOnColor());
  }
  set thumbOnColor(value: Color) {
    this.nativeObject.setThumbOnColor(this.getColorIntFromColor(value));
  }

  get thumbOffColor(): Color {
    return this.getColorFromColorInt(this.nativeObject.getThumbOffColor());
  }
  set thumbOffColor(value: Color) {
    this.nativeObject.setThumbOffColor(this.getColorIntFromColor(value));
  }

  get toggle(): boolean {
    return this.nativeObject.isChecked();
  }
  set toggle(value: boolean) {
    this.nativeObject.setChecked(value);
  }

  get toggleOnColor(): Color {
    return this.getColorFromColorInt(this.nativeObject.getTrackOnColor());
  }
  set toggleOnColor(value: Color) {
    this.nativeObject.setTrackOnColor(this.getColorIntFromColor(value));
  }

  get onToggleChanged(): (toggle: boolean) => void {
    return this._onToggleChangedCallback;
  }
  set onToggleChanged(value: (toggle: boolean) => void) {
    this._onToggleChangedCallback = value;
  }

  getColorIntFromColor(color: Color): number {
    return color.nativeObject;
  }
  getColorFromColorInt(colorInt: number): Color {
    return new ColorAndroid({color : colorInt});
  }
}
