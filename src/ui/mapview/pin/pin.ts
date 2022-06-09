import { IEventEmitter } from '../../../core/eventemitter';
import { INativeComponent } from '../../../core/inative-component';
import { MobileOSProps } from '../../../core/native-mobile-component';
import Color from '../../../ui/color';
import { IImage } from '../../image/image';
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
  image: IImage | null;
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
   * ```
   * import Pin from '@smartface/native/ui/mapview/pin';
   *
   * const pin = new Pin();
   * pin.on(Pin.Events.Press, () => {
   *  console.info('onPress');
   * });
   * ```
   */
  onPress: () => void;

  /**
   * @deprecated
   * @example
   * ```
   * import Pin from '@smartface/native/ui/mapview/pin';
   *
   * const pin = new Pin();
   * pin.on(Pin.Events.InfoWindowPress, () => {
   *  console.info('onInfoWindowPress');
   * });
   * ```
   */
  onInfoWindowPress: () => void;

  on(eventName: 'infoWindowPress', callback: () => void): () => void;
  on(eventName: 'press', callback: (state: object) => void): () => void;
  on(eventName: PinEvents, callback: (...args: any[]) => void): () => void;

  off(eventName: 'infoWindowPress', callback: () => void): void;
  off(eventName: 'press', callback: (state: object) => void): void;
  off(eventName: PinEvents, callback: (...args: any[]) => void): void;

  emit(eventName: 'infoWindowPress'): void;
  emit(eventName: 'press'): void;
  emit(eventName: PinEvents, ...args: any[]): void;

  once(eventName: 'infoWindowPress', callback: () => void): () => void;
  once(eventName: 'press', callback: (state: object) => void): () => void;
  once(eventName: PinEvents, callback: (...args: any[]) => void): () => void;

  prependListener(eventName: 'infoWindowPress', callback: () => void): void;
  prependListener(eventName: 'press', callback: (state: object) => void): void;
  prependListener(eventName: PinEvents, callback: (...args: any[]) => void): void;

  prependOnceListener(eventName: 'infoWindowPress', callback: () => void): void;
  prependOnceListener(eventName: 'press', callback: (state: object) => void): void;
  prependOnceListener(eventName: PinEvents, callback: (...args: any[]) => void): void;
}
