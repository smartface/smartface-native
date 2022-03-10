import { ConstructorOf } from '../../../core/constructorof';
import { IEventEmitter } from '../../../core/eventemitter';
import { INativeComponent } from '../../../core/inative-component';
import { MobileOSProps } from '../../../core/native-mobile-component';
import Color from '../../../ui/color';
import Image from '../../../ui/image';
import { PinEvents } from './pin-events';

type IPinIOS = {
  enableInfoWindow: boolean;
};

export interface IPin<TEvent extends string = PinEvents, TMobile extends MobileOSProps<IPinIOS, {}> = MobileOSProps<IPinIOS, {}>> extends INativeComponent, IEventEmitter<TEvent | PinEvents> {
  location: {
    latitude: number;
    longitude: number;
  };
  android: TMobile['android'];
  ios: TMobile['ios'];
  title: string;
  subtitle: string;
  color: Color;
  id: number;
  image: Image | null;
  visible: boolean;
  isClusterEnabled: boolean;
  /**
   * This event will be fired when the pin is touched.
   *
   * @event onPress
   * @deprecated
   * @android
   * @ios
   * @since 1.1.2
   * @example
   * ````
   * import Pin from '@smartface/native/ui/mapview/pin';
   *
   * const pin = new Pin();
   * pin.on(Pin.Events.Press, () => {
   *  console.info('onPress');
   * });
   * ````
   */
  onPress: () => void;

  /**
   * @deprecated
   * @example
   * ````
   * import Pin from '@smartface/native/ui/mapview/pin';
   *
   * const pin = new Pin();
   * pin.on(Pin.Events.InfoWindowPress, () => {
   *  console.info('onInfoWindowPress');
   * });
   * ````
   */
  onInfoWindowPress: () => void;
}

const Pin: ConstructorOf<IPin, Partial<IPin>> = require(`./pin.${Device.deviceOS.toLowerCase()}`).default;
type Pin = IPin;
export default Pin;
