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

export interface EventTarget {
  addEventListener(eventName: string, handler: (...args: any[]) => void): void;
  removeEventListener(eventName: string, toDetach: (...args: any[]) => void): void;
}

export interface XMLHttpRequestEventTarget extends EventTarget {
  onabort: (...args: any[]) => void;
  onerror: (...args: any[]) => void;
  onload: (...args: any[]) => void;
  onloadend: (...args: any[]) => void;
  onloadstart: (...args: any[]) => void;
  onprogress: (...args: any[]) => void;
  onreadystatechange: (...args: any[]) => void;
  ontimeout: (...args: any[]) => void;
}

export interface IXHRMethods {
  abort(): void;
  getAllResponseHeaders(): string;
  getResponseHeader(header: string): string | null;
  open(method: HTTPRequestMethods, url: string, async?: boolean, user?: string, password?: string): void;
  send(data?: string | FormData): void;
  setRequestHeader(header: string, value: string): void;
}

export interface IXHR extends IEventEmitter<XHREvents>, INativeComponent, IXHRMethods, XMLHttpRequestEventTarget {
  readonly readyState: number;
  readonly response: string | object | null;
  readonly responseText: string;
  readonly responseURL?: string;
  readonly status: number;
  readonly statusText: string;
  responseType: XMLHttpRequestResponseType;
  readonly upload: XMLHttpRequestEventTarget;
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
