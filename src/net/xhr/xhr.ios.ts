import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { MobileOSProps } from '../../core/native-mobile-component';
import FormData from '../formdata';
import { statuses, IXHR, XMLHttpRequestResponseType } from './xhr';
import { XHREvents } from './xhr-events';

class XHRIOS<TEvent extends string = XHREvents, TProps extends MobileOSProps = MobileOSProps> extends NativeEventEmitterComponent<TEvent | XHREvents, any, TProps> implements IXHR {
  static UNSENT = 0;
  static OPENED = 1;
  static HEADERS_RECEIVED = 2;
  static LOADING = 3;
  static DONE = 4;

  onabort: (...args: any[]) => void = () => {};
  onerror: (...args: any[]) => void = () => {};
  onload: (...args: any[]) => void = () => {};
  onloadend: (...args: any[]) => void = () => {};
  onloadstart: (...args: any[]) => void = () => {};
  onprogress: (...args: any[]) => void = () => {};
  onreadystatechange: (...args: any[]) => void = () => {};
  ontimeout: (...args: any[]) => void = () => {};

  private _requestID?: number;
  private _options: HttpRequestOptions;
  private _readyState: number;
  private _response: any;
  private _headers: any;
  private _errorFlag: boolean;
  private _sendFlag: boolean;
  private _responseType: XMLHttpRequestResponseType;
  private _responseURL?: string;
  private _status: number;

  private _listeners: Map<string, Array<Function>> = new Map<string, Array<Function>>();

  constructor() {
    super();
    this._readyState = XHRIOS.UNSENT;
    this._responseType = XMLHttpRequestResponseType.empty;
  }

  protected createNativeObject() {
    return new __SF_XMLHttpRequest();
  }

  get upload() {
    return this;
  }

  get readyState(): number {
    return this._readyState;
  }

  get response(): any {
    if (this._responseType === XMLHttpRequestResponseType.empty || this._responseType === XMLHttpRequestResponseType.text) {
      if (this._readyState !== XHRIOS.LOADING && this._readyState !== XHRIOS.DONE) {
        return '';
      } else {
        return this._response;
      }
    } else {
      if (this._readyState !== XHRIOS.DONE) {
        return null;
      } else {
        return this._response;
      }
    }
  }

  get responseText(): string {
    if (this._responseType !== XMLHttpRequestResponseType.empty && this._responseType !== XMLHttpRequestResponseType.text) {
      throw new Error(
        "Failed to read the 'responseText' property from 'XMLHttpRequest': " + "The value is only accessible if the object's 'responseType' is '' or 'text' " + `(was '${this._responseType}').`
      );
    }

    return this._response && !this._errorFlag ? this._response : '';
  }

  get responseType(): XMLHttpRequestResponseType {
    return this._responseType;
  }

  set responseType(value: XMLHttpRequestResponseType) {
    if (value === XMLHttpRequestResponseType.blob) {
      throw new Error(`Response type of '${value}' not supported.`);
    } else if (value === XMLHttpRequestResponseType.arraybuffer) {
      throw new Error(`Response type of '${value}' not supported.`);
    } else if (value === XMLHttpRequestResponseType.empty || value in XMLHttpRequestResponseType) {
      this._responseType = value;
    } else {
      throw new Error(`Response type of '${value}' not supported.`);
    }
  }

  get responseURL(): string | undefined {
    return this._responseURL;
  }

  get status(): number {
    return this._status;
  }

  get statusText(): string {
    if (this._readyState === XHRIOS.UNSENT || this._readyState === XHRIOS.OPENED || this._errorFlag) {
      return '';
    }

    return statuses[this._status];
  }

  get timeout(): number {
    if (this._options.timeout) return this._options.timeout;

    return 0;
  }

  set timeout(value: number) {
    if (this._readyState !== XHRIOS.OPENED || this._sendFlag) {
      throw new Error("Failed to set 'timeout' on 'XMLHttpRequest': " + "The object's state must be OPENED.");
    }

    this._options.timeout = value / 1000;
  }

  abort() {
    if (this._requestID) {
      const isRemovedTask = this.nativeObject.removeDataTask(this._requestID);
      if (isRemovedTask) {
        this._response = null;
        this._headers = '';
        this._status = 0;

        if ((this._readyState === XHRIOS.OPENED && this._sendFlag) || this._readyState === XHRIOS.HEADERS_RECEIVED || this._readyState === XHRIOS.LOADING) {
          this._errorFlag = true;
          this._sendFlag = false;
          this._setRequestError('abort');
        }

        if (this._readyState === XHRIOS.DONE) {
          this._readyState = XHRIOS.UNSENT;
        }
      }
    } else {
      //TODO: What are we going to do when request can not be aborted.
    }
  }

  getAllResponseHeaders(): string {
    if (this._readyState < XHRIOS.HEADERS_RECEIVED || this._errorFlag) {
      return '';
    }

    let result = '';

    for (const i in this._headers) {
      result += i + ': ' + this._headers[i] + '\r\n';
    }

    return result.substr(0, result.length - 2);
  }

  getResponseHeader(header: string): string | null {
    if (typeof header === 'string' && this._readyState > XHRIOS.OPENED && this._headers && !this._errorFlag) {
      header = header.toLowerCase();
      for (const i in this._headers) {
        if (i.toLowerCase() === header) {
          return this._headers[i];
        }
      }
    }

    return null;
  }

  open(method: HTTPRequestMethods, url: string, async?: boolean, user?: string, password?: string) {
    if (typeof async === 'boolean' && !async) {
      throw new Error('Every request must be asynchronous');
    } else if (typeof method !== 'string' && typeof url !== 'string') {
      throw new Error('Method and URL must be string');
    }

    this._options = { method: method, url: url };
    this._options.headers = {};

    if (typeof user === 'string') {
      this._options.headers['user'] = user;
    }
    if (typeof password === 'string') {
      this._options.headers['password'] = password;
    }

    this._setReadyState(XHRIOS.OPENED);
  }

  private getRequestTypeBasedOnData(data?: any) {
    if (typeof data === 'string') {
      return 'string';
    } else if (data instanceof FormData) {
      return 'formData';
    }
  }

  private convertFormDataToJSON(data: FormData) {
    let params: any = [];

    data._parts.map(([name, value]) => {
      if (typeof value === 'object' && value) {
        params.push({ key: name, file: { uri: value.uri, name: value.name, type: value.type } });
      } else {
        params.push({ key: name, value: value });
      }
    });
    return params;
  }

  send(data?: any) {
    this.resetLocalStates();

    if (this._readyState !== XHRIOS.OPENED || this._sendFlag) {
      throw new Error("Failed to execute 'send' on 'XMLHttpRequest': " + "The object's state must be OPENED.");
    }

    //TODO: add FormData, Blob, ArrayBuffer support
    if (typeof data === 'string' && this._options.method !== 'GET') {
      this._options.content = data;
    } else if (data instanceof FormData) {
      this._options.content = JSON.stringify(this.convertFormDataToJSON(data));
    }

    this._sendFlag = true;
    this.emitEvent('loadstart');

    const params = {
      url: this._options.url,
      method: this._options.method,
      headers: this._options.headers && Object.keys(this._options.headers).length > 0 ? this._options.headers : undefined,
      timeout: this._options.timeout ? this._options.timeout : undefined,
      responseType: this.responseType,
      requestType: this.getRequestTypeBasedOnData(data)
    };

    const taskID = this.nativeObject.createTask(
      JSON.stringify(params),
      this._options.content,
      (response: HttpResponse) => {
        this._handleResponse(response);
        this.nativeObject.removeDataTask(taskID);
      },
      (error: HttpErrorResponse) => {
        this._errorFlag = true;
        this._sendFlag = false;

        // -1004 apple specific code for timeout error
        if (error.errorCode === -1004 || error.errorCode === -1001) {
          this.emitEvent('timeout');
        }
        this._setRequestError('error', error);
        this.nativeObject.removeDataTask(taskID);
      }
    );
    this._requestID = taskID;
  }

  setRequestHeader(header: string, value: string) {
    if (this._readyState !== XHRIOS.OPENED || this._sendFlag) {
      throw new Error("Failed to execute 'setRequestHeader' on 'XMLHttpRequest': " + "The object's state must be OPENED.");
    }

    if (typeof header === 'string' && typeof value === 'string' && this._options.headers) {
      this._options.headers[header] = value;
    }
  }

  addEventListener(eventName: XHREvents, handler: Function) {
    if (Object.values(XHREvents).indexOf(eventName) === -1) {
      throw new Error('Argument `eventName` type does not match');
    }

    const handlers = this._listeners.get(eventName) || [];
    handlers.push(handler);
    this._listeners.set(eventName, handlers);
  }

  removeEventListener(eventName: XHREvents, toDetach: Function) {
    if (Object.values(XHREvents).indexOf(eventName) === -1) {
      throw new Error('Argument `eventName` type does not match');
    }

    let handlers = this._listeners.get(eventName) || [];
    handlers = handlers.filter((handler) => handler !== toDetach);
    this._listeners.set(eventName, handlers);
  }

  /* HELPER Functions */

  _handleResponse(response: HttpResponse) {
    this._status = response.statusCode;
    this._headers = response.headers;
    this._responseURL = response.responseURL;

    this._setReadyState(XHRIOS.HEADERS_RECEIVED);
    this._setReadyState(XHRIOS.LOADING);

    //TODO: add Blob, ArrayBuffer support
    if (this._responseType === XMLHttpRequestResponseType.text || this._responseType === XMLHttpRequestResponseType.empty) {
      this._response = response.content;
    } else if (this._responseType === XMLHttpRequestResponseType.json) {
      if (response.content) {
        this._response = JSON.parse(response.content);
      } else {
        this._response = 'Error while convertion to JSON';
        throw new Error('Error while convertion to JSON');
      }
    }

    this.emitEvent('progress');
    this._sendFlag = false;
    this._setReadyState(XHRIOS.DONE);
  }

  private _setReadyState(value: number) {
    if (this._readyState !== value) {
      this._readyState = value;
      this.emitEvent('readystatechange');
    }

    if (this._readyState === XHRIOS.DONE) {
      this.emitEvent('load');
      this.emitEvent('loadend');
    }
  }

  private _setRequestError(eventName: XHREvents, error?: any) {
    this._readyState = XHRIOS.DONE;
    this._response = error;

    this.emitEvent('readystatechange');
    this.emitEvent(eventName, error);
    this.emitEvent('loadend');
  }

  private emitEvent(eventName: XHREvents, ...args: Array<any>) {
    // If eventName is error, an error occurs in the events dependency used by the event emitter.
    try {
      this.emit(eventName);
    } catch (error) {}

    if (typeof this['on' + eventName] === 'function') {
      this['on' + eventName](...args);
    }

    const handlers = this._listeners.get(eventName) || [];
    handlers.forEach((handler) => {
      handler(...args);
    });
  }

  private resetLocalStates() {
    this._requestID = undefined;
    this._response = null;
    this._responseURL = undefined;
    this._status = 0;
    this._headers = null;
  }
}

type Headers = { [key: string]: string | string[] };
interface HttpRequestOptions {
  url: string;
  method: string;
  headers?: Headers;
  content?: string | FormDataPart[] | ArrayBuffer;
  timeout?: number;
}

interface HttpResponse {
  statusCode: number;
  headers: Headers;
  //TODO: Add JSON, Blob, ArrayBuffer support
  content?: string;
  responseURL?: string;
}

interface HttpErrorResponse {
  errorCode: number;
  errorMessage: string;
}

export default XHRIOS;
