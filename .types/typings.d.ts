export {};

declare global {
  type Optional<T> = { [P in keyof T]?: T[P] };
  type DeviceOS = 'Android' | 'iOS';
  class Device {
    static deviceOS: DeviceOS;
  }

  const SMFApplication: any;

  function long(value: number): number;
  function array(outerRadii: any, type?: string): any[];
  function toJSArray(val: any): any[];
  function float(val: any): number;
  function int(val: any): number;
  function release(value: any): any;
  function arrayLength(array: any[]): number;
  function alert(
    params:
      | string
      | {
          title?: string;
          message?: string;
          buttons?: {
            text: string;
            type: number;
            onClick?: () => void;
          }[];
        }
  ): void;

  function requireClass(className: string): any;
  function defineClass(className: string, opts?: any): any;

  interface ErrorType {
    message: string;
    stack: string;
  }

  type ExtractValue<T extends { [key: string]: any }> = T extends {
    [key: string]: any;
  }
    ? T[keyof T]
    : T;
  type ExtractValues<T extends { [key: string]: any }> = T extends {
    [key: string]: any;
  }
    ? ExtractValue<T[keyof T]>
    : never;
  interface Error {
    type: string;
    message: string;
    stack?: string;
  }

  interface UnhandledError extends Error {}

  // namespace console {
  // 	function info(...params: any[]): void;
  // 	function log(...params: any[]): void;
  // 	function error(...params: any[]): void;
  // 	function warn(...params: any[]): void;
  // }

  function setTimeout(fn: () => void, time: number): Timeout;
  function setInterval(fn: () => void, time: number): Timeout;
  function clearInterval(intervalId: Timeout): void;
  function clearTimeout(timeoutId: Timeout): void;

  interface Timer {
    hasRef(): boolean;
    ref(): this;
    refresh(): this;
    unref(): this;
  }

  class Immediate {
    hasRef(): boolean;
    ref(): this;
    unref(): this;
    _onImmediate: () => void; // to distinguish it from the Timeout class
  }

  class Timeout implements Timer {
    hasRef(): boolean;
    ref(): this;
    refresh(): this;
    unref(): this;
  }
}
