import { IPin } from '.';
import NativeEventEmitterComponent from '../../../core/native-event-emitter-component';
import TypeUtil from '../../../util/type';
import ColorAndroid from '../../color/color.android';
import { IImage } from '../../image';
import ImageAndroid from '../../image/image.android';
import { PinEvents } from './pin-events';

const NativeDescriptorFactory = requireClass('com.google.android.gms.maps.model.BitmapDescriptorFactory');
const NativeLatLng = requireClass('com.google.android.gms.maps.model.LatLng');

const HueDic = {
  [ColorAndroid.BLUE.nativeObject]: NativeDescriptorFactory.HUE_BLUE,
  [ColorAndroid.CYAN.nativeObject]: NativeDescriptorFactory.HUE_CYAN,
  [ColorAndroid.GREEN.nativeObject]: NativeDescriptorFactory.HUE_GREEN,
  [ColorAndroid.MAGENTA.nativeObject]: NativeDescriptorFactory.HUE_MAGENTA,
  [ColorAndroid.RED.nativeObject]: NativeDescriptorFactory.HUE_RED,
  [ColorAndroid.YELLOW.nativeObject]: NativeDescriptorFactory.HUE_YELLOW
};

export default class PinAndroid<TEvent extends string = PinEvents> extends NativeEventEmitterComponent<TEvent | PinEvents, any> implements IPin {
  private _color: ColorAndroid;
  private _image: ImageAndroid | null = null;
  private _location: IPin['location'];
  private _clusterColor: ColorAndroid | null = null;
  private _subtitle = '';
  private _title = '';
  private _visible = true;
  private _id = 0;
  /**
   * nativeObject will be taken from constructor as parameter since pin is created on mapview.
   */
  constructor(params?: IPin) {
    super(params);
    // this.nativeObject = nativeObject; //Pin nativeObject is added from outside. write a setter for it when nativeObject any problem is fixed
  }
  get color(): ColorAndroid {
    return this._color;
  }
  set color(value: ColorAndroid) {
    this._color = value;

    if (this.nativeObject && !this.isClusterEnabled && value instanceof ColorAndroid) {
      const colorHUE = HueDic[value.nativeObject];
      const colorDrawable = NativeDescriptorFactory.defaultMarker(colorHUE);
      this.nativeObject.setIcon(colorDrawable);
    } else if (value instanceof ColorAndroid) {
      const clusterItemColorHUE = HueDic[value.nativeObject];
      const clusterItemColorDrawable = NativeDescriptorFactory.defaultMarker(clusterItemColorHUE);
      this._clusterColor = clusterItemColorDrawable;
    }
  }
  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  get image(): IImage | null {
    return this._image as IImage;
  }
  set image(value: IImage | null) {
    this._image = value as ImageAndroid;
    if (this.nativeObject && !this.isClusterEnabled && value instanceof ImageAndroid) {
      const iconBitmap = value.nativeObject.getBitmap();
      const icon = NativeDescriptorFactory.fromBitmap(iconBitmap);

      this.nativeObject.setIcon(icon);
    }
  }

  isClusterEnabled: boolean;
  get location() {
    return this._location;
  }
  set location(value) {
    this._location = value;

    if (!value || !TypeUtil.isNumeric(value.latitude) || !TypeUtil.isNumeric(value.longitude)) {
      throw new Error('location property must be on object includes latitude and longitude keys.');
    }
    this._location = value;
    if (this.nativeObject && !this.isClusterEnabled) {
      const position = new NativeLatLng(value.latitude, value.longitude);
      this.nativeObject.setPosition(position);
    }
  }
  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
    if (this.nativeObject && !this.isClusterEnabled) {
      this.nativeObject.setTitle(this);
    }
  }
  get subtitle(): string {
    return this._subtitle;
  }
  set subtitle(value: string) {
    this._subtitle = value;
    if (this.nativeObject && !this.isClusterEnabled) {
      this.nativeObject.setSnippet(value);
    }
  }
  get visible(): boolean {
    return this._visible;
  }
  set visible(value: boolean) {
    this._visible = value;
    if (this.nativeObject && !this.isClusterEnabled) {
      this.nativeObject.setVisible(value);
    }
  }
  get clusterColor(): ColorAndroid | null {
    return this._clusterColor;
  }
  set clustercolor(value: ColorAndroid | null) {
    this._clusterColor = value;
  }
  onPress: () => void;
  onInfoWindowPress: () => void;
}
