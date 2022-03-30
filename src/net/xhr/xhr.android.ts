import { HTTPRequestMethods, IXHR } from '.';

import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { MobileOSProps } from '../../core/native-mobile-component';
import { FormData, ResponseTypes, statuses } from './common';
import { XHREventsEvents } from './xhr-events';

const NativeXMLHttpRequest = requireClass('io.smartface.android.sfcore.net.XMLHttpRequest');

export default class XHR<TEvent extends string = XHREventsEvents, TProps extends MobileOSProps = MobileOSProps>
  extends NativeEventEmitterComponent<TEvent | XHREventsEvents, any, TProps>
  implements IXHR
{
  public static UNSENT = 0;
  public static OPENED = 1;
  public static HEADERS_RECEIVED = 2;
  public static LOADING = 3;
  public static DONE = 4;

  public onabort: (...args: any[]) => void = ()=>{};
  public onerror: (...args: any[]) => void = ()=>{};
  public onload: (...args: any[]) => void = ()=>{};
  public onloadend: (...args: any[]) => void = ()=>{};
  public onloadstart: (...args: any[]) => void = ()=>{};
  public onprogress: (...args: any[]) => void = ()=>{};
  public onreadystatechange: (...args: any[]) => void = ()=>{};
  public ontimeout: (...args: any[]) => void = ()=>{};

  public timeout: number;
  public withCredentials: boolean;

  private _method: HTTPRequestMethods;
  private _url: string;
  private _readyState: number;
  private _status: number;
  private _response: object | null;
  private _headers: Map<string, object> | null;
  private _responseURL: string;
  private _overrideMimeType: string;
  private _responseType: ResponseTypes;

  private _sendFlag: boolean;
  private _errorFlag: boolean;
  private _aborted: boolean;
  private _timedOut: boolean;
  private _hasError: boolean;

  constructor() {
    super();
    this._reset();
    this._initialize();
  }

  public get readyState(): number {
    return this._readyState;
  }

  public get status(): number {
    return this._status;
  }

  public get statusText(): string {
    if (this._status) {
      return statuses[this._status];
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
    if (this.readyState < XHR.LOADING) {
      return '';
    }
    return this._response ? this._response.toString() : '';
  }

  get responseType(): ResponseTypes {
    return this._responseType;
  }

  set responseType(responseType: ResponseTypes) {
    this._responseType = responseType;
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
    this._setReadyState(XHR.OPENED);
  }

  public send(body?: string) {
    this._sendFlag = true;
    this._reset();
    this._nativeObject.sendRequest(this._method, this._url, body && '', this._headers || {}, this.timeout, this.withCredentials);
    this._emitEvent('loadstart');
  }

  public setRequestHeader(name: string, value: string) {
    if (this._readyState !== XHR.OPENED || this._sendFlag) {
      throw new Error('InvalidAccessError');
    }
    this._headers!![name] = value;
  }

  public abort() {
    this._nativeObject.abort();
    this._aborted = true;
    this._reset();
    if ((this._readyState === XHR.OPENED && this._sendFlag) || this._readyState === XHR.HEADERS_RECEIVED || this._readyState === XHR.LOADING) {
      this._errorFlag = true;
      this._sendFlag = false;
      this._emitEvent('abort');
    }
    if (this._readyState === XHR.DONE) {
      this._readyState = XHR.UNSENT;
    }
  }

  public getAllResponseHeaders(): string {
    if (this._readyState < XHR.HEADERS_RECEIVED || this._errorFlag) {
      return '';
    }
    let result = this.nativeObject.getAllResponseHeaders();
    return result.length >= 2 ? result.substr(0, result.length - 2) : result;
  }

  public getResponseHeader(header: string): string | null {
    if (this._readyState > XHR.OPENED || this._errorFlag) {
      header = header.toLowerCase();
      return this.nativeObject.getResponse().headers().get(header);
    }
    return null;
  }

  public overrideMimeType(mime: string) {
    if (this._readyState === XHR.LOADING || this._readyState === XHR.DONE) {
      throw new Error('InvalidStateError');
    }

    this._overrideMimeType = mime; // todo look later while impl. blob
  }

  public addEventListener(type: string, listener: () => void) {
    this.on(type, listener);
  }

  public removeEventListener(type: string, listener: () => void) {
    this.off(type, listener);
  }

  public dispatchEvent(event: string): boolean {
    this._emitEvent(event);
    return true;
  }

  protected createNativeObject() {
    const nativeObject = new NativeXMLHttpRequest();
    nativeObject.setCallbacks({
      onResponse: () => {
        const response = this._nativeObject.getResponse();
        this._status = response.code();
        this._responseURL = response ? response.request().url().toString() : '';
        this._setReadyState(XHR.HEADERS_RECEIVED);
        this._setReadyState(XHR.LOADING);
        this._response = this._nativeObject.getResponse().body().string();
        this._emitEvent('progress');
        this._sendFlag = false;
        this._setReadyState(XHR.DONE);
      },
      onFailure: (timeout: boolean, exception: object) => {
        this._timedOut = timeout;
        this._hasError = true;
        this._setReadyState(XHR.DONE);
      }
    });
    return nativeObject;
  }

  private _initialize() {
    this._readyState = XHR.UNSENT;
    //this.upload = ...
    this._responseURL = '';
    this.timeout = 0;
    this.withCredentials = true;
  }

  private _setReadyState(newState: number) {
    this._readyState = newState;
    this._emitEvent('readystatechange');
    if (newState === XHR.DONE) {
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

  private _emitEvent(event: string) {
    this['on' + event]?.();
    this.emit(event);
  }

  private _reset(): void {
    this._response = null;
    this._headers = null;
    this._status = 0;
    this._errorFlag = false;
    this.responseType = '';
  }
}
