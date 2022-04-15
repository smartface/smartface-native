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

// Native mobile globals
declare function requireClass(className: string): any;
declare function defineClass(className: string, opts?: any): any;
declare const SMFApplication: typeof __SF_UIApplication; //ios global application from framework
declare const Application: any; //Android global application from framework

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

declare module NodeJS {
  interface Global {
    // Native mobile globals
    requireClass(className: string): any;
    defineClass(className: string, opts?: any): any;
    SMFApplication: typeof __SF_UIApplication; //ios global application from framework
    Application: any; //Android global application from framework
    Device: Device;
    XMLHttpRequest: ConstructorOf<IXMLHttpRequest, Partial<IXMLHttpRequest>>;

    lang: Record<string, any>; //Old i18n polyfill, replace later
  }
}

declare var global: NodeJS.Global & typeof globalThis;
