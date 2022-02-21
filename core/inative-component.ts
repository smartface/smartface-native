export type INativeComponent<T = any, P = {}>  =  {
  readonly nativeObject: T;
} & P;
