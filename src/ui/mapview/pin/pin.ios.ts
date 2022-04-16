import { IPin } from './pin';
import NativeEventEmitterComponent from '../../../core/native-event-emitter-component';
import ColorIOS from '../../color/color.ios';
import ImageiOS from '../../image/image.ios';
import { PinEvents } from './pin-events';
import { IImage } from '../../image/image';

export default class PinIOS<TEvent extends string = PinEvents> extends NativeEventEmitterComponent<TEvent | PinEvents, __SF_Annotation, IPin> implements IPin {
  constructor(params?: IPin) {
    super(params);
    this.nativeObject.onInfoPress = () => {
      this.onPress?.();
      this.emit('press');
    };

    this.nativeObject.onInfoPress = (state) => {
      this.onInfoWindowPress?.();
      this.emit('infoWindowPress', state);
    };
  }
  protected init(params?: Partial<Record<string, any>>): void {
    this.addIOSProps(this.getIOSProps());
    super.init(params);
  }
  protected createNativeObject() {
    return __SF_Annotation.createAnnotation();
  }
  get color(): ColorIOS {
    return new ColorIOS({
      color: this.nativeObject.color
    });
  }
  set color(value: ColorIOS) {
    this.nativeObject.color = value.nativeObject;
  }
  get id(): number {
    return this.nativeObject.tag;
  }
  set id(value: number) {
    this.nativeObject.tag = value;
  }
  get image(): IImage | null {
    if (this.nativeObject.image) {
      return ImageiOS.createFromImage(this.nativeObject.image);
    }
    return null;
  }
  set image(value: IImage | null) {
    if (value) this.nativeObject.image = value.nativeObject;
  }

  isClusterEnabled: boolean;
  get location() {
    return this.nativeObject.setCoordinate;
  }
  set location(value) {
    this.nativeObject.setCoordinate = value;
  }
  get title(): string {
    return this.nativeObject.title;
  }
  set title(value: string) {
    this.nativeObject.title = value;
  }
  get subtitle(): string {
    return this.nativeObject.subtitle;
  }
  set subtitle(value: string) {
    this.nativeObject.subtitle = value;
  }
  get visible(): boolean {
    return !this.nativeObject.visible;
  }
  set visible(value: boolean) {
    this.nativeObject.visible = value;
  }
  onPress: () => void;
  onInfoWindowPress: () => void;
  private getIOSProps() {
    const self = this;
    return {
      get enableInfoWindow(): IPin['ios']['enableInfoWindow'] {
        return self.nativeObject.enableInfoWindow;
      },
      set enableInfoWindow(value: IPin['ios']['enableInfoWindow']) {
        self.nativeObject.enableInfoWindow = value;
      }
    };
  }
}
