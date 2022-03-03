import { EventEmitter } from './eventemitter';
import { INativeComponent } from './inative-component';

export default class NativeEventEmitterComponent<TEvent extends string, TNative = any> extends EventEmitter<TEvent> implements INativeComponent<TNative> {
  protected _nativeObject: TNative;

  get nativeObject(): TNative {
    return this._nativeObject;
  }

  set nativeObject(value: TNative) {
    this._nativeObject = value;
  }
}
