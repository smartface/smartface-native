import { ConstructorOf } from '../../core/constructorof';
import { IEventEmitter } from '../../core/eventemitter';
import { INativeComponent } from '../../core/inative-component';
import { ResponseTypes } from './common';
import { FormData } from './formdata';
import { XHREventsEvents } from './xhr-events';

export type HTTPRequestMethods = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';

interface IXHRMethods {
    abort()
    getResponseHeaders(): string
    getResponseHeader(header: string): string | null
    open(method: HTTPRequestMethods, url: string, async?: boolean, user?: string, password?: string);
    send(data?: string | FormData)
    setRequestHeader(header: string, value: string);


    onabort: (...args: any[]) => void;
    onerror: (...args: any[]) => void;
    onload: (...args: any[]) => void;
    onloadend: (...args: any[]) => void;
    onloadstart: (...args: any[]) => void;
    onprogress: (...args: any[]) => void;
    onreadystatechange: (...args: any[]) => void;
    ontimeout: (...args: any[]) => void;

    addEventListener(eventName: XHREventsEvents, handler: Function)
    removeEventListener(eventName: XHREventsEvents, toDetach: Function)

}

export interface IXHR extends IEventEmitter<XHREventsEvents>, INativeComponent, IXHRMethods {
    readyState: number
    response: String
    responseText: String
    responseType: ResponseTypes
    responseURL?: string
    status: number
    statusText: string
    timeout: number
}

const XHR: ConstructorOf<IXHR, Partial<IXHR>> = require(`./xhr.${Device.deviceOS.toLowerCase()}`).default;
type XHR = IXHR;

export default XHR;