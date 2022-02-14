declare class SecureData extends NativeComponent {
  save(params: { value: string }): typeof Promise;
  read(): typeof Promise;
  delete(): typeof Promise;
  readonly key: string;
  readonly service?: string;
}
export = SecureData;
