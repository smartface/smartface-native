import { EventEmitter } from "./eventemitter";
import { INativeComponent } from "./inative-component";


export default class NativeEventEmitterComponent<TEvent extends string> extends EventEmitter<TEvent> implements INativeComponent<TEvent> {
  protected _nativeObject: any;

  get nativeObject(): any {
    return this._nativeObject;
  }

  set nativeObject(value: any) {
    this._nativeObject = value;
  }
}

