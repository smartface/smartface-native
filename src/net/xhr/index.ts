import { ConstructorOf } from '../../core/constructorof';
import { IEventEmitter } from '../../core/eventemitter';
import { INativeComponent } from '../../core/inative-component';
import { ResponseTypes } from './common';
import { FormData } from './formdata';
import { XHREventsEvents } from './xhr-events';

export type HTTPRequestMethods = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';

export interface EventTarget {
    addEventListener(eventName: string, handler: Function)
    removeEventListener(eventName: string, toDetach: Function)
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

interface IXHRMethods {
    abort();
    getAllResponseHeaders(): string;
    getResponseHeader(header: string): string | null;
    open(method: HTTPRequestMethods, url: string, async?: boolean, user?: string, password?: string);
    send(data?: string | FormData);
    setRequestHeader(header: string, value: string);
}

export interface IXHR extends IEventEmitter<XHREventsEvents>, INativeComponent, IXHRMethods, XMLHttpRequestEventTarget {
    readonly readyState: number;
    readonly response: string | object | null;
    readonly responseText: string;
    responseType: ResponseTypes;
    readonly responseURL?: string;
    readonly status: number;
    readonly statusText: string;
    timeout: number;
    readonly upload : XMLHttpRequestEventTarget;
}

const XHR: ConstructorOf<IXHR, Partial<IXHR>> = require(`./xhr.${Device.deviceOS.toLowerCase()}`).default;
type XHR = IXHR;

export default XHR;