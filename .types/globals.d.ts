// Native mobile globals
declare function requireClass(className: string): any;
declare function defineClass(className: string, opts?: any): any;
declare var SMFApplication: typeof __SF_UIApplication; //ios global application from framework
declare var lang: Record<string, any>; //Old i18n polyfill, replace later

//android value converters. convert from js value to java values
declare function long(value: number): number;
declare function array(outerRadii: any, type?: string): any[];
declare function toJSArray(val: any): any[];
declare function float(val: any): number;
declare function int(val: any): number;
declare function release(value: any): any;
declare function arrayLength(array: any[]): number;

//javascript standard globals
declare function alert(params: string | AlertParams, title?: string): any;
declare function setTimeout(fn: () => void, time: number): Timeout;
declare function setInterval(fn: () => void, time: number): Timeout;
declare function clearInterval(intervalId: Timeout): void;
declare function clearTimeout(timeoutId: Timeout): void;
declare function fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;

//DOM Based globals
declare var XMLHttpRequest: ConstructorOf<IXMLHttpRequest>;
