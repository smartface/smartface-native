import { HTTPRequestMethods, IXHR } from ".";

import NativeEventEmitterComponent from "../../core/native-event-emitter-component";
import { MobileOSProps } from "../../core/native-mobile-component";
import { XHREventsEvents } from "./xhr-events";

export type XHREventsEvents = ExtractValues<typeof XHREventsEvents>;
class XHR<TEvent extends string = XHREventsEvents, TProps extends MobileOSProps = MobileOSProps> extends NativeEventEmitterComponent<TEvent | XHREventsEvents, any, TProps> implements IXHR {
    public static UNSENT = 0;
    public static OPENED = 1;
    public static DONE = 4;

    public onload: (...args: any[]) => void;
	public onloadend: (...args: any[]) => void;
	public onreadystatechange: (...args: any[]) => void;

    private _options: HttpRequestOptions;
    private _readyState: number;

    private _listeners: Map<string, Array<Function>> = new Map<string, Array<Function>>();


    protected createNativeObject() {
        this._readyState = XHR.UNSENT;
        return new __SF_XMLHttpRequest();
    }

    public open(method: HTTPRequestMethods, url: string, async?: boolean, user?: string, password?: string) {
        if (typeof async === 'boolean' && !async) {
            throw new Error('Every request must be asynchronous')
        }
        else if (typeof method !== 'string' && typeof url !== 'string') {
            throw new Error("Method and URL must be string");
        }

        this._options = { method: method, url: url }
        this._options.headers = {};

        if (typeof user === 'string') {
            this._options.headers['user'] = user;
        }
        if (typeof password === 'string') {
            this._options.headers['password'] = password;
        }

        this._setReadyState(XHR.OPENED);
    }

    /* HELPER Functions */
    
    private _setReadyState(value: number) {
        if (this._readyState !== value) {
            this._readyState = value;
            this.emitEvent('readystatechange');

        }

        if (this._readyState === XHR.DONE) {
            this.emitEvent('load');
            this.emitEvent('loadend');
        }
    }

    private emitEvent(eventName: XHREventsEvents, ...args: Array<any>) {
        this.emit(eventName)

        if (typeof this['on' + eventName] === 'function') {
            this['on' + eventName](...args);
        }

        const handlers = this._listeners.get(eventName) || [];
        handlers.forEach((handler) => {
            handler(...args);
        });
    }
};



export type Headers = { [key: string]: string | string[] };
export interface HttpRequestOptions {
    url: string;
    method: string;
    headers?: Headers;
    content?: string | FormData | ArrayBuffer;
    timeout?: number;
}

export class FormData {
    private _data: Map<string, any>;

    constructor() {
        this._data = new Map<string, any>();
    }

    append(name: string, value: any) {
        this._data.set(name, value);
    }

    toString(): string {
        const arr = new Array<string>();

        this._data.forEach(function (value, name, map) {
            arr.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
        });

        return arr.join('&');
    }
}

export default XHR;
