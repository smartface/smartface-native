import { HTTPRequestMethods, IXHR } from '.';

import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { MobileOSProps } from '../../core/native-mobile-component';
import { getStatusTextByCode, UNSENT, OPENED, HEADERS_RECEIVED, LOADING, DONE } from './util';
import { XHREventsEvents } from './xhr-events';

const NativeXMLHttpRequest = requireClass('io.smartface.android.sfcore.net.XMLHttpRequest');

export default class XHR<TEvent extends string = XHREventsEvents, TProps extends MobileOSProps = MobileOSProps>
  extends NativeEventEmitterComponent<TEvent | XHREventsEvents, any, TProps>
  implements IXHR
{
  public timeout: number;
  public withCredentials: boolean;

  private _method: HTTPRequestMethods;
  private _url: string;
  private _readyState: number;
  private _status: number | null;
  private _response: object | null;
  private _headers: Map<string, object> | null;
  private _responseURL: string;
  private _overrideMimeType: string;
  private _responseType: string;

  private _sendFlag: boolean;
  private _errorFlag: boolean;
  private _aborted: boolean;
  private _timedOut: boolean;
  private _hasError: boolean;

  constructor() {
    super();
    this._initialize();
  }

  public get readyState(): number {
    return this._readyState;
  }

  public get status(): number | null {
    return this._status;
  }

  public get statusText(): string {
    if (this._status) {
      return getStatusTextByCode(this._status);
    } else {
      return '';
    }
  }

  public get responseURL(): string {
    return this._responseURL;
  }

  public get response(): string | null {
    if (this._hasError) {
      return null;
    }
    return this._response ? this._response.toString() : null;
  }

  public get responseText(): string {
    if (this._responseType !== '' && this._responseType !== 'text') {
      throw new Error('InvalidStateError');
    }
    if (this.readyState < LOADING) {
      return '';
    }
    return this._response ? this._response.toString() : '';
  }

  public open(method: HTTPRequestMethods, url: string, async?: boolean, user?: string, password?: string) {
    this._method = method;
    this._url = url;
    this._headers = new Map<string, object>();
    if (user) {
      this._headers['user'] = user;
    }
    if (password) {
      this._headers['password'] = password;
    }
    this._setReadyState(OPENED);
  }

  public send(body?: string) {
    this._sendFlag = true;
    this._reset();
    this._nativeObject.sendRequest(this._method, this._url, body && '', this._headers || {}, this.timeout, this.withCredentials);
    this._emitEvent('loadstart');
  }

  public setRequestHeader(name: string, value: string) {
    if (this._readyState !== OPENED || this._sendFlag) {
      throw new Error('InvalidAccessError');
    }
    this._headers!![name] = value;
  }

  public abort() {
    this._nativeObject.abort();
    this._aborted = true;
    this._reset();
    if ((this._readyState === OPENED && this._sendFlag) || this._readyState === HEADERS_RECEIVED || this._readyState === LOADING) {
      this._errorFlag = true;
      this._sendFlag = false;
      this.emit('abort');
    }
    if (this._readyState === DONE) {
      this._readyState = UNSENT;
    }
  }

  public getAllResponseHeaders(): string {
    if (this._readyState < HEADERS_RECEIVED || this._errorFlag) {
      return '';
    }
    let result = this.nativeObject.getAllResponseHeaders();
    return result.length >= 2 ? result.substr(0, result.length - 2) : result;
  }

  public getResponseHeader(header: string): string | null {
    if (this._readyState > OPENED || this._errorFlag) {
      header = header.toLowerCase();
      return this.nativeObject.getResponse().headers().get(header);
    }
    return null;
  }

  public overrideMimeType(mime: string) {
    if (this._readyState === LOADING || this._readyState === DONE) {
      throw new Error('InvalidStateError');
    }

    this._overrideMimeType = mime; // todo look later while impl. blob
  }

  public addEventListener(type: TEvent, listener: () => void) {
    this.on(type, listener);
  }

  public removeEventListener(type: TEvent, listener: () => void) {
    this.off(type, listener);
  }

  public dispatchEvent(event: TEvent): boolean {
    this.emit(event);
    return true;
  }

  protected createNativeObject() {
    const nativeObject = new NativeXMLHttpRequest();
    nativeObject.setCallbacks({
      onResponse: () => {
        const response = this._nativeObject.getResponse();
        this._status = response.code();
        this._responseURL = response ? response.request().url().toString() : '';
        this._setReadyState(HEADERS_RECEIVED);
        this._setReadyState(LOADING);
        this._response = this._nativeObject.getResponse().body().string();
        this.emit('progress');
        this._sendFlag = false;
        this._setReadyState(DONE);
      },
      onFailure: (timeout: boolean, exception: object) => {
        this._timedOut = timeout;
        this._hasError = true;
        this._setReadyState(DONE);
      }
    });
    return nativeObject;
  }

  private _initialize() {
    this._readyState = UNSENT;
    //this.upload = ... 
    this._responseURL = '';
    this.timeout = 0;
    this.withCredentials = true;
  }

  private _setReadyState(newState: number) {
    this._readyState = newState;
    this._emitEvent('readystatechange');
    if (newState === DONE) {
      if (this._aborted) {
        this._emitEvent('abort');
      } else if (this._hasError) {
        if (this._timedOut) {
          this._emitEvent('timeout');
        } else {
          this._emitEvent('error');
        }
      } else {
        this._emitEvent('load');
      }
      this._emitEvent('loadend');
    }
  }

  private _emitEvent(event: XHREventsEvents) {
    this.emit(event);
  }

  private _reset(): void {
    this._response = null;
    this._headers = null;
    this._status = null;
    this._errorFlag = false;
  }
}
