import { IEventEmitter } from '../../core/eventemitter';
import { INativeComponent } from '../../core/inative-component';
import { XHREvents } from './xhr-events';

export enum XMLHttpRequestResponseType {
  empty = '',
  text = 'text',
  json = 'json',
  blob = 'blob',
  arraybuffer = 'arraybuffer'
}

/**
 * XMLHttpRequestEventTarget is the interface that describes the event handlers shared on XMLHttpRequest and XMLHttpRequestUpload.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequestEventTarget
 */
export interface EventTarget {
  addEventListener(eventName: string, handler: (...args: any[]) => void): void;
  removeEventListener(eventName: string, toDetach: (...args: any[]) => void): void;
}

export interface XMLHttpRequestEventTarget extends EventTarget {
  /**
   * Fired when a request has been aborted, for example because the program called XMLHttpRequest.abort(). Also available via the onabort event handler property.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort_event
   */
  onabort: (...args: any[]) => void;
  /**
   * Fired when the request encountered an error. Also available via the onerror event handler property.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/error_event
   */
  onerror: (...args: any[]) => void;
  /**
   * Fired when an XMLHttpRequest transaction completes successfully. Also available via the onload event handler property.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/load_event
   */
  onload: (...args: any[]) => void;

  /**
   * Fired when a request has completed, whether successfully (after load) or unsuccessfully (after abort or error). Also available via the onloadend event handler property.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/loadend_event
   */
  onloadend: (...args: any[]) => void;
  /**
   * Fired when a request has started to load data. Also available via the onloadstart event handler property.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/loadstart_event
   */
  onloadstart: (...args: any[]) => void;
  /**
   * Fired periodically when a request receives more data. Also available via the onprogress event handler property.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/progress_event
   */
  onprogress: (...args: any[]) => void;
  /**
   * Fired whenever the readyState property changes. Also available via the onreadystatechange event handler property.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readystatechange_event
   */
  onreadystatechange: (...args: any[]) => void;
  /**
   * Fired when progress is terminated due to preset time expiring. Also available via the ontimeout event handler property.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout_event
   */
  ontimeout: (...args: any[]) => void;
}

export interface IXHRMethods {
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort
   */
  abort(): void;
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders
   */
  getAllResponseHeaders(): string;
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getResponseHeader
   */
  getResponseHeader(header: string): string | null;
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open
   */
  open(method: HTTPRequestMethods, url: string, async?: boolean, user?: string, password?: string): void;
  /**
   * Sends the request. If the request is asynchronous (which is the default), this method returns as soon as the request is sent.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send
   */
  send(data?: string | FormData): void;
  /**
   * Sets the value of an HTTP request header. You must call setRequestHeader() after open(), but before send().
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader
   */
  setRequestHeader(header: string, value: string): void;
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
 */
export interface IXHR extends IEventEmitter<XHREvents>, INativeComponent, IXHRMethods, XMLHttpRequestEventTarget {
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
   */
  readonly readyState: number;
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/response
   */
  readonly response: string | object | null;
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseText
   */
  readonly responseText: string;
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseURL
   */
  readonly responseURL?: string;
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status
   */
  readonly status: number;
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/statusText
   */
  readonly statusText: string;
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
   */
  responseType: XMLHttpRequestResponseType;
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload
   */
  readonly upload: XMLHttpRequestEventTarget;
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout
   */
  timeout: number;
}

export const statuses = {
  100: 'Continue',
  101: 'Switching Protocols',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non - Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Request Entity Too Large',
  414: 'Request - URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Requested Range Not Satisfiable',
  417: 'Expectation Failed',
  418: 'I am a Teapot',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported'
};
