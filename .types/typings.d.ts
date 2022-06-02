declare interface Timer {
  hasRef(): boolean;
  ref(): this;
  refresh(): this;
  unref(): this;
}

declare interface Immediate {
  hasRef(): boolean;
  ref(): this;
  unref(): this;
  _onImmediate: () => void; // to distinguish it from the Timeout class
}

declare interface Timeout extends Timer {
  hasRef(): boolean;
  ref(): this;
  refresh(): this;
  unref(): this;
}

declare interface ErrorType {
  message: string;
  stack: string;
}

type ConstructorOf<I, P = any> = new (params?: P) => I;

declare type ExtractValue<T extends { [key: string]: any }> = T extends {
  [key: string]: any;
}
  ? T[keyof T]
  : T;
declare type ExtractValues<T extends { [key: string]: any }> = T extends {
  [key: string]: any;
}
  ? ExtractValue<T[keyof T]>
  : never;

declare interface Error {
  type: string;
  message: string;
  stack?: string;
}

interface UnhandledError extends Error {}

declare type DeviceOS = 'Android' | 'iOS';
declare type XMLHttpRequest = IXMLHttpRequest;

declare class Device {
  static deviceOS: DeviceOS;
}

type AlertParams = {
  title?: string;
  message?: string;
  buttons?: {
    text: string;
    type: number;
    onClick?: () => void;
  }[];
};

// The fetch API and related typings
// from this Apache-2.0-licensed repo: https://github.com/Microsoft/TypeScript
type RequestCredentials = 'include' | 'omit' | 'same-origin';
type RequestCache = 'default' | 'force-cache' | 'no-cache' | 'no-store' | 'only-if-cached' | 'reload';
type XMLHttpRequestBodyInit = FormData | URLSearchParams | string;
type BodyInit = XMLHttpRequestBodyInit;
type ResponseType = 'basic' | 'cors' | 'default' | 'error' | 'opaque' | 'opaqueredirect';
type HeadersInit = string[][] | Record<string, string> | Headers;
/** This Fetch API interface allows you to perform various actions on HTTP request and response headers. These actions include retrieving, setting, adding to, and removing. A Headers object has an associated header list, which is initially empty and consists of zero or more name and value pairs.  You can add to this using methods like append() (see Examples.) In all methods of this interface, header names are matched by case-insensitive byte sequence. */
interface Headers {
  append(name: string, value: string): void;
  delete(name: string): void;
  get(name: string): string | null;
  has(name: string): boolean;
  set(name: string, value: string): void;
  forEach(callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void;
}
declare var Headers: {
  prototype: Headers;
  new (init?: HeadersInit): Headers;
};
interface Body {
  readonly body: any | null;
  readonly bodyUsed: boolean;
  arrayBuffer(): Promise<ArrayBuffer>;
  blob(): Promise<any>;
  formData(): Promise<FormData>;
  json(): Promise<any>;
  text(): Promise<string>;
}
/** This Fetch API interface represents the response to a request. */
interface Response extends Body {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
}
declare var Response: {
  prototype: Response;
  new (body?: BodyInit | null, init?: ResponseInit): Response;
  error(): Response;
  redirect(url: string | URL, status?: number): Response;
};
interface ResponseInit {
  headers?: HeadersInit;
  status?: number;
  statusText?: string;
}
/** This Fetch API interface represents a resource request. */
interface Request extends Body {
  /** Returns the cache mode associated with request, which is a string indicating how the request will interact with the browser's cache when fetching. */
  readonly cache: RequestCache;
  /** Returns the credentials mode associated with request, which is a string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. */
  readonly credentials: RequestCredentials;
  /** Returns a Headers object consisting of the headers associated with request. Note that headers added in the network layer by the user agent will not be accounted for in this object, e.g., the "Host" header. */
  readonly headers: Headers;
  /** Returns request's subresource integrity metadata, which is a cryptographic hash of the resource being fetched. Its value consists of multiple hashes separated by whitespace. [SRI] */
  readonly integrity: string;
  /** Returns a boolean indicating whether or not request can outlive the global in which it was created. */
  readonly keepalive: boolean;
  /** Returns request's HTTP method, which is "GET" by default. */
  readonly method: string;
  /** Returns the referrer of request. Its value can be a same-origin URL if explicitly set in init, the empty string to indicate no referrer, and "about:client" when defaulting to the global's default. This is used during fetching to determine the value of the `Referer` header of the request being made. */
  readonly referrer: string;
  /** Returns the signal associated with request, which is an AbortSignal object indicating whether or not request has been aborted, and its abort event handler. */
  readonly signal: AbortSignal;
  /** Returns the URL of request as a string. */
  readonly url: string;
  clone(): Request;
}
declare var Request: {
  prototype: Request;
  new (input: RequestInfo, init?: RequestInit): Request;
};
interface RequestInit {
  /** A BodyInit object or null to set request's body. */
  body?: BodyInit | null;
  /** A string indicating how the request will interact with the browser's cache to set request's cache. */
  cache?: RequestCache;
  /** A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials. */
  credentials?: RequestCredentials;
  /** A Headers object, an object literal, or an array of two-item arrays to set request's headers. */
  headers?: HeadersInit;
  /** A string to set request's method. */
  method?: string;
  /** An AbortSignal to set request's signal. */
  signal?: AbortSignal | null;
  /** Can only be null. Used to disassociate request from any Window. */
  window?: null;
}
type RequestInfo = Request | string;

// Native mobile globals
declare function requireClass(className: string): any;
declare function defineClass(className: string, opts?: any): any;
declare const SMFApplication: typeof __SF_UIApplication; //ios global application from framework

//android value converters. convert from js value to java values
declare function long(value: number): number;
declare function array(outerRadii: any, type?: string): any[];
declare function toJSArray(val: any): any[];
declare function float(val: any): number;
declare function int(val: any): number;
declare function release(value: any): any;
declare function arrayLength(array: any[]): number;

//javascript standard globals
declare function alert(params: string | AlertParams): void;
declare function setTimeout(fn: () => void, time: number): Timeout;
declare function setInterval(fn: () => void, time: number): Timeout;
declare function clearInterval(intervalId: Timeout): void;
declare function clearTimeout(timeoutId: Timeout): void;
declare function fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
declare const XMLHttpRequest: ConstructorOf<IXMLHttpRequest, Partial<IXMLHttpRequest>>;
declare const FormData: ConstructorOf<FormData, Partial<FormData>>;

declare module NodeJS {
  interface Global {
    // Native mobile globals
    requireClass(className: string): any;
    defineClass(className: string, opts?: any): any;
    SMFApplication: typeof __SF_UIApplication; //ios global application from framework
    Device: Device;
    XMLHttpRequest: ConstructorOf<IXMLHttpRequest, Partial<IXMLHttpRequest>>;
    FormData: ConstructorOf<FormData, Partial<FormData>>;
    fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;

    lang: Record<string, any>; //Old i18n polyfill, replace later
  }
}

declare var global: NodeJS.Global & typeof globalThis;
