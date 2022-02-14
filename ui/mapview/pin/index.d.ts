import { IEventEmitter } from 'core/eventemitter';
import Color from '../../../ui/color';
import Image from '../../../ui/image';

declare enum PinEvets {
  InfoWindowPress = 'infoWindowPress',
  /**
   * This event will be fired when the pin is touched.
   *
   * @event onPress
   * @android
   * @ios
   * @since 1.1.2
   */
  Press = 'press'
}
declare class Pin implements IEventEmitter<PinEvets> {
  constructor(params?: Partial<Pin>);
  on(eventName: PinEvets, callback: (...args: any) => void): () => void;
  once(eventName: PinEvets, callback: (...args: any) => void): () => void;
  off(eventName: PinEvets, callback?: (...args: any) => void): void;
  emit(event: PinEvets, detail?: any[]): void;
  location: {
    latitude: number;
    longitude: number;
  };
  title: string;
  subtitle: string;
  color: Color;
  id: number;
  image: Image;
  visible: boolean;

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
  static Events: typeof PinEvets;
}

export = Pin;
