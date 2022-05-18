export interface INativeComponent<T extends { [key: string]: any } = { [key: string]: any }> {
  nativeObject: T;
}
