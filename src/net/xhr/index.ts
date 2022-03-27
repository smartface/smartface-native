import { ConstructorOf } from '../../core/constructorof';
import { IEventEmitter } from '../../core/eventemitter';
import { INativeComponent } from '../../core/inative-component';
import { XHREventsEvents } from './xhr.ios';

export type HTTPRequestMethods = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';

interface IXHRMethods {
    open(method: HTTPRequestMethods, url: string, async?: boolean, user?: string, password?: string);
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

}

const XHR: ConstructorOf<IXHR, Partial<IXHR>> = require(`./xhr.${Device.deviceOS.toLowerCase()}`).default;
type XHR = IXHR;

export default XHR;