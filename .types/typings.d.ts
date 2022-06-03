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

declare type ConstructorOf<I, P = any> = new (params?: P) => I;

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

declare interface UnhandledError extends Error {}

declare type DeviceOS = 'Android' | 'iOS';

declare class Device {
  static deviceOS: DeviceOS;
  static language: string;
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
