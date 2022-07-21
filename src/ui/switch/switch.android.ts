/*globals requireClass*/
import { ISwitch } from './switch';
import AndroidConfig from '../../util/Android/androidconfig';
import ImageAndroid from '../image/image.android';
import { IImage } from '../image/image';
import ViewAndroid from '../view/view.android';
import { SwitchEvents } from './switch-events';
import ColorAndroid from '../color/color.android';
import { IColor } from '../color/color';

const NativeSwitch = requireClass('io.smartface.android.sfcore.ui.switchview.SFSwitch');

export default class SwitchAndroid<TEvent extends string = SwitchEvents> extends ViewAndroid<TEvent | SwitchEvents, any, ISwitch> {
  private _toggleOnColor: IColor;
  private _toggleOffColor: IColor;
  private _thumbOnColor: IColor;
  private _thumbOffColor: IColor;

  private _toggleImage: IImage;
  private _thumbImage: IImage;
  private _onToggleChangedCallback: (checked: boolean) => void;
  createNativeObject() {
    return new NativeSwitch(AndroidConfig.activity, {
      onToggleChanged: (isChecked: boolean) => {
        this._onToggleChangedCallback?.(isChecked);
        this.emit('toggleChanged', isChecked);
      }
    });
  }
  protected preConstruct(params?: Partial<ISwitch>): void {
    this.toggleOnColor = ColorAndroid.GREEN;
    this.toggleOffColor = ColorAndroid.create('#FAFAFF');
    this.thumbOnColor = ColorAndroid.WHITE;
    this.thumbOffColor = ColorAndroid.WHITE;
    super.preConstruct(params);
  }
  constructor(params?: Partial<ISwitch>) {
    super(params);

    const self = this;
    this.addAndroidProps({
      get toggleImage(): IImage {
        return self._toggleImage;
      },
      set toggleImage(value: IImage) {
        self._toggleImage = value;
        // TODO Recheck after build
        self._toggleImage = ImageAndroid.createImageFromPath(value);
        self.nativeObject.setTrackDrawable(self._toggleImage.nativeObject);
      },
      get thumbImage(): IImage {
        return self._thumbImage;
      },
      set thumbImage(value: IImage) {
        self._thumbImage = value;
        // TODO Recheck after build
        self._thumbImage = ImageAndroid.createImageFromPath(value);
        self.nativeObject.setThumbDrawable(self._thumbImage.nativeObject);
      },
      get toggleOffColor(): IColor {
        return self.getColorFromColorInt(self.nativeObject.getTrackOffColor());
      },
      set toggleOffColor(value: IColor) {
        self.nativeObject.setTrackOffColor(self.getColorIntFromColor(value));
      },
      get thumbOffColor(): IColor {
        return self.getColorFromColorInt(self.nativeObject.getThumbOffColor());
      },
      set thumbOffColor(value: IColor) {
        self.nativeObject.setThumbOffColor(self.getColorIntFromColor(value));
      }
    });
  }

  get thumbOnColor(): IColor {
    return this.getColorFromColorInt(this.nativeObject.getThumbOnColor());
  }
  set thumbOnColor(value: IColor) {
    this.nativeObject.setThumbOnColor(this.getColorIntFromColor(value));
  }

  get thumbOffColor(): IColor {
    return this.getColorFromColorInt(this.nativeObject.getThumbOffColor());
  }
  set thumbOffColor(value: IColor) {
    this.nativeObject.setThumbOffColor(this.getColorIntFromColor(value));
  }

  get toggle(): boolean {
    return this.nativeObject.isChecked();
  }
  set toggle(value: boolean) {
    this.nativeObject.setChecked(value);
  }

  get toggleOnColor(): IColor {
    return this.getColorFromColorInt(this.nativeObject.getTrackOnColor());
  }
  set toggleOnColor(value: IColor) {
    this.nativeObject.setTrackOnColor(this.getColorIntFromColor(value));
  }

  get toggleOffColor(): IColor {
    return this.getColorFromColorInt(this.nativeObject.getTrackOffColor());
  }
  set toggleOffColor(value: IColor) {
    this.nativeObject.setTrackOffColor(this.getColorIntFromColor(value));
  }

  get onToggleChanged(): (toggle: boolean) => void {
    return this._onToggleChangedCallback;
  }
  set onToggleChanged(value: (toggle: boolean) => void) {
    this._onToggleChangedCallback = value;
  }

  getColorIntFromColor(color: IColor): number {
    return color.nativeObject;
  }
  getColorFromColorInt(colorInt: number): IColor {
    return new ColorAndroid({ color: colorInt });
  }
}
