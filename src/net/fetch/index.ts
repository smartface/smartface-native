// from this MIT-licensed repo: https://github.com/github/fetch

import FormData from '../formdata';

const support = {
  searchParams: 'URLSearchParams' in global,
  iterable: 'Symbol' in global && 'iterator' in Symbol,
  blob: false,
  // 'FileReader' in global &&
  // 'Blob' in global &&
  // (function() {
  //   try {
  //     new Blob()
  //     return true
  //   } catch (e) {
  //     return false
  //   }
  // })(),
  formData: 'FormData' in global,
  arrayBuffer: 'ArrayBuffer' in global
};

function isDataView(obj: any): boolean {
  return obj && DataView.prototype.isPrototypeOf(obj);
}

const viewClasses = [
  '[object Int8Array]',
  '[object Uint8Array]',
  '[object Uint8ClampedArray]',
  '[object Int16Array]',
  '[object Uint16Array]',
  '[object Int32Array]',
  '[object Uint32Array]',
  '[object Float32Array]',
  '[object Float64Array]'
];

const isArrayBufferView = !support.arrayBuffer
  ? () => {}
  : ArrayBuffer.isView ||
    function (obj: any) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
    };

function normalizeName(name: string): string {
  if (typeof name !== 'string') {
    name = String(name);
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
    throw new TypeError('Invalid character in header field name: "' + name + '"');
  }
  return name.toLowerCase();
}

function normalizeValue(value: any): string {
  if (typeof value !== 'string') {
    value = String(value);
  }
  return value;
}

// Build a destructive iterator for the value list
function iteratorFor(items: any): any {
  const iterator = {
    next: () => {
      const value = items.shift();
      return { done: value === undefined, value: value };
    }
  };

  if (support.iterable) {
    iterator[Symbol.iterator] = () => {
      return iterator;
    };
  }

  return iterator;
}

export class Headers {
  map: any = {};
  constructor(headers: Headers | [] | any) {
    if (headers instanceof Headers) {
      headers.forEach((value: any, name: any) => {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach((header: any) => {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach((name: any) => {
        this.append(name, headers[name]);
      }, this);
    }
  }

  public append(name: any, value: any): void {
    name = normalizeName(name);
    value = normalizeValue(value);
    const oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  }

  public delete(name: any): void {
    delete this.map[normalizeName(name)];
  }

  public get(name: any): string {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null;
  }

  public has(name: any): boolean {
    return this.map.hasOwnProperty(normalizeName(name));
  }

  public set(name: any, value: any): void {
    this.map[normalizeName(name)] = normalizeValue(value);
  }

  public forEach(callback: any, thisArg: any): void {
    for (const name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  }

  public keys(): any {
    const items: any[] = [];
    this.forEach((value: any, name: any) => {
      items.push(name);
    }, undefined);
    return iteratorFor(items);
  }

  public values(): any {
    const items: any[] = [];
    this.forEach((value: any) => {
      items.push(value);
    }, undefined);
    return iteratorFor(items);
  }

  public entries = () => {
    const items: any[] = [];
    this.forEach((value: any, name: any) => {
      items.push([name, value]);
    }, undefined);
    return iteratorFor(items);
  };
}

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
}

function consumed(body: any): Promise<any> | undefined {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'));
  }
  body.bodyUsed = true;
}

function fileReaderReady(reader: any): Promise<any> {
  return new Promise(function (resolve, reject) {
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = function () {
      reject(reader.error);
    };
  });
}

function readBlobAsArrayBuffer(blob: any): Promise<any> {
  //@ts-ignore
  const reader = new FileReader();
  const promise = fileReaderReady(reader);
  reader.readAsArrayBuffer(blob);
  return promise;
}

function readBlobAsText(blob: any): Promise<any> {
  //@ts-ignore
  const reader = new FileReader();
  const promise = fileReaderReady(reader);
  reader.readAsText(blob);
  return promise;
}

function readArrayBufferAsText(buf: Buffer): string {
  const view = new Uint8Array(buf);
  const chars = new Array(view.length);

  for (let i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i]);
  }
  return chars.join('');
}

function bufferClone(buf: Buffer): Buffer | ArrayBufferLike {
  if (buf.slice) {
    return buf.slice(0);
  } else {
    const view = new Uint8Array(buf.byteLength);
    view.set(new Uint8Array(buf));
    return view.buffer;
  }
}

export class Body {
  bodyUsed: boolean;
  headers: Headers;
  _bodyInit: string | FormData | URLSearchParams | ArrayBuffer | any;
  _bodyText: string;
  _bodyBlob: any;
  _bodyFormData: FormData;
  _bodyArrayBuffer: Buffer | ArrayBufferLike;
  constructor() {
    this.bodyUsed = false;
  }

  public _initBody(body: string | FormData | URLSearchParams | ArrayBuffer | any) {
    /*
      fetch-mock wraps the Response object in an ES6 Proxy to
      provide useful test harness features such as flush. However, on
      ES5 browsers without fetch or Proxy support pollyfills must be used;
      the proxy-pollyfill is unable to proxy an attribute unless it exists
      on the object before the Proxy is created. This change ensures
      Response.bodyUsed exists on the instance, while maintaining the
      semantic of setting Request.bodyUsed in the constructor before
      _initBody is called.
    */
    this.bodyUsed = this.bodyUsed;
    this._bodyInit = body;
    if (!body) {
      this._bodyText = '';
    } else if (typeof body === 'string') {
      this._bodyText = body;
      //@ts-ignore
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body;
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body;
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString();
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer);
      // IE 10-11 can't handle a DataView body.
      //@ts-ignore
      this._bodyInit = new Blob([this._bodyArrayBuffer]);
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body);
    } else {
      this._bodyText = body = Object.prototype.toString.call(body);
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8');
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type);
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
      }
    }
  }

  public blob() {
    if (!support.blob) {
      throw new Error('Blob is not supported in current environment!');
    }
    const rejected = consumed(this);
    if (rejected) {
      return rejected;
    }

    if (this._bodyBlob) {
      return Promise.resolve(this._bodyBlob);
    } else if (this._bodyArrayBuffer) {
      //@ts-ignore
      return Promise.resolve(new Blob([this._bodyArrayBuffer]));
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as blob');
    } else {
      //@ts-ignore
      return Promise.resolve(new Blob([this._bodyText]));
    }
  }

  public arrayBuffer() {
    if (!support.blob) {
      throw new Error('Blob is not supported in current environment!');
    }
    if (this._bodyArrayBuffer) {
      const isConsumed = consumed(this);
      if (isConsumed) {
        return isConsumed;
      }
      if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
        return Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset, this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength));
      } else {
        return Promise.resolve(this._bodyArrayBuffer);
      }
    } else {
      return this.blob().then(readBlobAsArrayBuffer);
    }
  }

  public text() {
    const rejected = consumed(this);
    if (rejected) {
      return rejected;
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob);
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer as Buffer));
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text');
    } else {
      return Promise.resolve(this._bodyText);
    }
  }

  public formData() {
    if (!support.formData) {
      throw new Error('FormData is not supported in current environment!');
    }
    return this.text().then(decode);
  }

  public json() {
    return this.text().then(JSON.parse);
  }
}

// HTTP methods whose capitalization should be normalized
const methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

function normalizeMethod(method) {
  const upcased = method.toUpperCase();
  return methods.indexOf(upcased) > -1 ? upcased : method;
}

export class Request extends Body {
  options: any;
  bodyUsed: boolean;
  url: string;
  _bodyInit: any;
  credentials: any;
  headers: Headers;
  method: string;
  mode: any;
  signal: any;
  referrer: any;
  constructor(input: any, options: any) {
    super();
    this.options = options || {};
    this._initialize(input, this.options);
  }

  _initialize(input: any, options: any) {
    let body = this.options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal =
      options.signal ||
      this.signal ||
      (function () {
        if ('AbortController' in global) {
          const ctrl = new AbortController();
          return ctrl.signal;
        }
      })();
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }
    this._initBody(body);

    if (this.method === 'GET' || this.method === 'HEAD') {
      if (options.cache === 'no-store' || options.cache === 'no-cache') {
        // Search for a '_' parameter in the query string
        const reParamSearch = /([?&])_=[^&]*/;
        if (reParamSearch.test(this.url)) {
          // If it already exists then set the value with the current time
          this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime());
        } else {
          // Otherwise add a new '_' parameter to the end with the current time
          const reQueryString = /\?/;
          this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime();
        }
      }
    }
  }

  public clone(): Request {
    return new Request(this, { body: this._bodyInit });
  }
}

function decode(body) {
  const form = new FormData();
  body
    .trim()
    .split('&')
    .forEach(function (bytes) {
      if (bytes) {
        const split = bytes.split('=');
        const name = split.shift().replace(/\+/g, ' ');
        const value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
  return form;
}

function parseHeaders(rawHeaders: string): Headers {
  const headers = new Headers(undefined);
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  const preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
  // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
  // https://github.com/github/fetch/issues/748
  // https://github.com/zloirock/core-js/issues/751
  preProcessedHeaders
    .split('\r')
    .map(function (header) {
      return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header;
    })
    .forEach(function (line) {
      const parts = line.split(':');
      const key = parts.shift()?.trim();
      if (key) {
        const value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
  return headers;
}

const redirectStatuses = [301, 302, 303, 307, 308];

export class Response extends Body {
  type: string;
  status: number;
  ok: boolean;
  statusText: string;
  url: string;
  constructor(bodyInit: any, options: any) {
    super();
    if (!options) {
      options = {};
    }
    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = options.statusText === undefined ? '' : '' + options.statusText;
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  public clone(): Response {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  }

  public error(): Response {
    const response = new Response(null, { status: 0, statusText: '' });
    response.type = 'error';
    return response;
  }

  public redirect(url: any, status: number): Response {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }

    return new Response(null, { status: status, headers: { location: url } });
  }
}

export const DOMException = global.DOMException;
try {
  new DOMException();
} catch (err) {
  DOMException = function (message, name) {
    this.message = message;
    this.name = name;
    const error = Error(message);
    this.stack = error.stack;
  };
  DOMException.prototype = Object.create(Error.prototype);
  DOMException.prototype.constructor = DOMException;
}

export function fetch(input: any, init: any): Promise<Response> {
  return new Promise(function (resolve, reject) {
    const request = new Request(input, init);

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'));
    }

    const xhr = new XMLHttpRequest();

    function abortXhr() {
      xhr.abort();
    }

    xhr.onload = function () {
      const options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      };
      //@ts-ignore
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
      const body = 'response' in xhr ? xhr.response : xhr.responseText;
      setTimeout(function () {
        resolve(new Response(body, options));
      }, 0);
    };

    xhr.onerror = function () {
      setTimeout(function () {
        reject(new TypeError('Network request failed'));
      }, 0);
    };

    xhr.ontimeout = function () {
      setTimeout(function () {
        reject(new TypeError('Network request failed'));
      }, 0);
    };

    xhr.onabort = function () {
      setTimeout(function () {
        reject(new DOMException('Aborted', 'AbortError'));
      }, 0);
    };

    function fixUrl(url) {
      try {
        return url === '' && global.location.href ? global.location.href : url;
      } catch (e) {
        return url;
      }
    }

    //@ts-ignore
    xhr.open(request.method, fixUrl(request.url), true);

    if (request.credentials === 'include') {
      //@ts-ignore
      xhr.withCredentials = true;
    } else if (request.credentials === 'omit') {
      //@ts-ignore
      xhr.withCredentials = false;
    }

    if ('responseType' in xhr) {
      if (support.blob) {
        //@ts-ignore
        xhr.responseType = 'blob';
      } else if (support.arrayBuffer && request.headers.get('Content-Type') && request.headers.get('Content-Type').indexOf('application/octet-stream') !== -1) {
        //@ts-ignore
        xhr.responseType = 'arraybuffer';
      }
    }

    if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers)) {
      Object.getOwnPropertyNames(init.headers).forEach(function (name) {
        xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
      });
    } else {
      request.headers.forEach(function (value, name) {
        xhr.setRequestHeader(name, value);
      }, undefined);
    }

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr);

      xhr.onreadystatechange = function () {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr);
        }
      };
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
  });
}

fetch.polyfill = true;
