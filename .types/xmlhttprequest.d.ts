declare type HTTPRequestMethods = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';

declare enum XMLHttpRequestResponseType {
  empty = '',
  text = 'text',
  json = 'json',
  blob = 'blob',
  arraybuffer = 'arraybuffer'
}

declare interface EventTarget {
  addEventListener(eventName: string, handler: (...args: any[]) => void): void;
  removeEventListener(eventName: string, toDetach: (...args: any[]) => void): void;
}

declare interface XMLHttpRequestEventTarget extends EventTarget {
  onabort: (...args: any[]) => void;
  onerror: (...args: any[]) => void;
  onload: (...args: any[]) => void;
  onloadend: (...args: any[]) => void;
  onloadstart: (...args: any[]) => void;
  onprogress: (...args: any[]) => void;
  onreadystatechange: (...args: any[]) => void;
  ontimeout: (...args: any[]) => void;
}

interface IXHRMethods {
  abort(): void;
  getAllResponseHeaders(): string;
  getResponseHeader(header: string): string | null;
  open(method: HTTPRequestMethods, url: string, async?: boolean, user?: string, password?: string): void;
  send(data?: string | FormData): void;
  setRequestHeader(header: string, value: string): void;

  on(eventName: 'abort' | 'error' | 'load' | 'loadend' | 'loadstart' | 'progress' | 'readystatechange' | 'timeout', callback: (...args: any) => void): () => void;
  once(eventName: 'abort' | 'error' | 'load' | 'loadend' | 'loadstart' | 'progress' | 'readystatechange' | 'timeout', callback: (...args: any) => void): () => void;
  off(eventName: 'abort' | 'error' | 'load' | 'loadend' | 'loadstart' | 'progress' | 'readystatechange' | 'timeout', callback?: (...args: any) => void): void;
  emit(event: 'abort' | 'error' | 'load' | 'loadend' | 'loadstart' | 'progress' | 'readystatechange' | 'timeout', ...args: any[]): void;
}

declare interface IXMLHttpRequest extends IXHRMethods, XMLHttpRequestEventTarget {
  readonly readyState: number;
  readonly response: string | object | null;
  readonly responseText: string;
  readonly upload: XMLHttpRequestEventTarget;
  readonly responseURL?: string;
  readonly status: number;
  readonly statusText: string;
  timeout: number;
  responseType: XMLHttpRequestResponseType;
  nativeObject: { [key: string]: any };
}

declare interface FormData {
  append(key: string, value: FormDataValue): void;
  getParts(): Array<FormDataPart>;
}

declare type FormDataValue = string | { name?: string; type?: string; uri: string };
declare type FormDataNameValuePair = [string, FormDataValue];

declare type FormDataPart =
  | {
      string: string;
      fieldName: string;
    }
  | {
      uri: string;
      name?: string;
      type?: string;
      fieldName: string;
    };
