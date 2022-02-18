import { INativeComponent } from '../../core/inative-component';

interface ISecureData extends INativeComponent {
  save(params: { value: string }): Promise<void>;
  read(): Promise<any>;
  delete(): Promise<void>;
  readonly key: string;
  readonly service?: string;
}

export class SecureDataBase implements ISecureData {
  protected _key: string;
  protected _service?: string;
  save(params: { value: string }): Promise<void> {
    throw new Error('Method not implemented.');
  }
  read(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public get key(): string {
    throw new Error('Method not implemented.');
  }
  public set key(value: string) {
    throw new Error('Method not implemented.');
  }
  public get service(): string {
    throw new Error('Method not implemented.');
  }
  public set service(value: string) {
    throw new Error('Method not implemented.');
  }
  nativeObject: any;
}

export default ISecureData;
