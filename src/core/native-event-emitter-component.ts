import { EventEmitter, EventListenerCallback, IEventEmitter } from './eventemitter';
import { NativeMobileComponent, WithMobileOSProps } from './native-mobile-component';

export default abstract class NativeEventEmitterComponent<TEvent extends string, TNative extends Record<string, any> =  Record<string, any>, TProps extends WithMobileOSProps = {}>
  extends NativeMobileComponent<TNative, WithMobileOSProps<TProps>>
  implements IEventEmitter<TEvent>
{
  private emitter = new EventEmitter<TEvent>();
  on(eventName: TEvent, callback: EventListenerCallback): () => void {
    return this.emitter.on(eventName, callback);
  }
  once(eventName: TEvent, callback: EventListenerCallback): () => void {
    return this.emitter.once(eventName, callback);
  }
  off(eventName: TEvent, callback?: EventListenerCallback): void {
    return this.emitter.off(eventName, callback);
  }
  emit(event: TEvent, ...args: any[]): void {
    this.emitter.emit(event, ...args);
  }
}
