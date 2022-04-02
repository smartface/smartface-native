import { HTTPRequestMethods, IXHR, XMLHttpRequestEventTarget } from '.';

import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { MobileOSProps } from '../../core/native-mobile-component';
import { ResponseTypes, statuses, XMLHttpRequestResponseType } from './common';
import { FormData } from './formdata';
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

  public onabort: (...args: any[]) => void = () => {};
  public onerror: (...args: any[]) => void = () => {};
  public onload: (...args: any[]) => void = () => {};
  public onloadend: (...args: any[]) => void = () => {};
  public onloadstart: (...args: any[]) => void = () => {};
  public onprogress: (...args: any[]) => void = () => {};
  public onreadystatechange: (...args: any[]) => void = () => {};
  public ontimeout: (...args: any[]) => void = () => {};

  private _timeout: number;
  public withCredentials: boolean;

  private _method: HTTPRequestMethods;
  private _url: string;
  private _readyState: number;
  private _status: number;
  private _response: object | null;
  private _headers: Map<string, object> | null;
  private _responseURL: string;
  private _responseType: ResponseTypes;

  private _sendFlag: boolean;
  private _errorFlag: boolean;
  private _aborted: boolean;
  private _timedOut: boolean;
  private _listeners: Map<string, Array<Function>> = new Map<string, Array<Function>>();

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

  public get timeout(): number {
    return this._timeout;
  }

  public set timeout(value: number) {
    if (this._readyState !== XHR.OPENED || this._sendFlag) {
      throw new Error("Failed to set 'timeout' on 'XMLHttpRequest': " + "The object's state must be OPENED.");
    }
    this._timeout = value;
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
      throw new Error(
        "Failed to read the 'responseText' property from 'XMLHttpRequest': " + "The value is only accessible if the object's 'responseType' is '' or 'text' " + `(was '${this._responseType}').`
      );
    }
    if (this.readyState < XHR.LOADING) {
      return '';
    }
    return this._response ? this._response.toString() : '';
  }

  get responseType(): ResponseTypes {
    return this._responseType;
  }

  set responseType(value: ResponseTypes) {
    if (value === XMLHttpRequestResponseType.empty || value in XMLHttpRequestResponseType) {
      this._responseType = value;
    } else {
      throw new Error(`Response type of '${value}' not supported.`);
    }
  }

  public get upload(): XMLHttpRequestEventTarget {
    return this;
  }

  public open(method: HTTPRequestMethods, url: string, async?: boolean, user?: string, password?: string) {
    if (typeof async === 'boolean' && !async) {
      throw new Error('Every request must be asynchronous');
    }
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

  public send(body?: string | FormData) {
    this._reset();
    if (this._readyState !== XHR.OPENED || this._sendFlag) {
      throw new Error("Failed to execute 'send' on 'XMLHttpRequest': " + "The object's state must be OPENED.");
    }
    this._sendFlag = true;
    const headers = this._headers || {};
    if (body instanceof FormData) {
      const data = body.getParts();
      this._nativeObject.sendRequestWithFormData(this._method, this._url, data || null, headers, this._timeout, this.withCredentials);
    } else {
      const data = body === '' || body ? body : null;
      this._nativeObject.sendRequest(this._method, this._url, data, headers, this._timeout, this.withCredentials);
    }
    this._emitEvent('loadstart');
  }

  public setRequestHeader(name: string, value: string) {
    if (this._readyState !== XHR.OPENED || this._sendFlag) {
      throw new Error("Failed to execute 'setRequestHeader' on 'XMLHttpRequest': " + "The object's state must be OPENED.");
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

  public addEventListener(eventName: XHREventsEvents, handler: () => void) {
    const handlers = this._listeners.get(eventName) || [];
    handlers.push(handler);
    this._listeners.set(eventName, handlers);
  }

  public removeEventListener(eventName: XHREventsEvents, toDetach: () => void) {
    let handlers = this._listeners.get(eventName) || [];
    handlers = handlers.filter((handler) => handler !== toDetach);
    this._listeners.set(eventName, handlers);
  }

  public dispatchEvent(event: XHREventsEvents): boolean {
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
    this._timeout = 0;
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

  private _emitEvent(eventName: XHREventsEvents, ...args: Array<any>) {
    this['on' + eventName]?.(...args);
    const handlers = this._listeners.get(eventName) || [];
    handlers.forEach((handler) => {
      handler(...args);
    });
  }

  private _reset(): void {
    this._response = null;
    this._headers = null;
    this._status = 0;
    this._errorFlag = false;
    this.responseType = '';
  }
}
