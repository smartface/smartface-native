import { EventEmitter, EventListenerCallback, IEventEmitter } from './eventemitter';
import { NativeMobileComponent, WithMobileOSProps } from './native-mobile-component';

export default class NativeEventEmitterComponent<TEvent extends string, TNative = any, TMobile extends WithMobileOSProps = {}>
  extends NativeMobileComponent<TNative, TMobile>
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
  protected _nativeObject: TNative;

  get nativeObject(): TNative {
    return this._nativeObject;
  }

  set nativeObject(value: TNative) {
    this._nativeObject = value;
  }
}
