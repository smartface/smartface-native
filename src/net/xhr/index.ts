import { ConstructorOf } from '../../core/constructorof';
import { IEventEmitter } from '../../core/eventemitter';
import { INativeComponent } from '../../core/inative-component';
import { XHREventsEvents } from './xhr.ios';

export type HTTPRequestMethods = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';

interface IXHRMethods {
    open(method: HTTPRequestMethods, url: string, async?: boolean, user?: string, password?: string);

    onload: (...args: any[]) => void;
    onloadend: (...args: any[]) => void;
    onreadystatechange: (...args: any[]) => void;
    
}

export interface IXHR extends IEventEmitter<XHREventsEvents>, INativeComponent, IXHRMethods {

}

const XHR: ConstructorOf<IXHR, Partial<IXHR>> = require(`./xhr.${Device.deviceOS.toLowerCase()}`).default;
type XHR = IXHR;

export default XHR;