import { EventEmitter, EventListenerCallback, IEventEmitter } from './eventemitter';
import { NativeMobileComponent, WithMobileOSProps } from './native-mobile-component';

export default abstract class NativeEventEmitterComponent<TEvent extends string, TNative = any, TProps extends WithMobileOSProps = WithMobileOSProps>
  extends NativeMobileComponent<TNative, WithMobileOSProps<TProps>>
  implements IEventEmitter<TEvent>
{
  prependListener(eventName: TEvent, callback: EventListenerCallback): void {
    return this.emitter.prependListener(eventName, callback);
  }
  prependOnceListener(eventName: TEvent, callback: EventListenerCallback): void {
    return this.emitter.prependOnceListener(eventName, callback);
  }
  private emitter: EventEmitter<TEvent>;
  on(eventName: TEvent, callback: EventListenerCallback): () => void {
    return this.emitter.on(eventName, callback);
  }
  once(eventName: TEvent, callback: EventListenerCallback): () => void {
    return this.emitter.once(eventName, callback);
  }
  off(eventName: TEvent, callback: EventListenerCallback): void {
    return this.emitter.off(eventName, callback);
  }
  emit(event: TEvent, ...args: any[]): void {
    this.emitter.emit(event, ...args);
  }
  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this.emitter = new EventEmitter<TEvent>();
    super.preConstruct(params);
  }
}
