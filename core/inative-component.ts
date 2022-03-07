export type INativeComponent<T extends {[key: string]: any} = {[key: string]: any}>  =  {
  readonly nativeObject: T;
};
