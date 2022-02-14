import { EventEmitter } from "stream";
import { INativeComponent } from "./inative-component";


export default class NativeEventEmitterComponent extends EventEmitter implements INativeComponent {
  protected _nativeObject: any;

  get nativeObject(): any {
    return this._nativeObject;
  }

  set nativeObject(value: any) {
    this._nativeObject = value;
  }
}
