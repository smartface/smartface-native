import { INativeComponent } from '../../core/inative-component';
import NativeComponent from '../../core/native-component';

interface ISecureData extends INativeComponent {
  save(params: { value: string }): Promise<void>;
  read(): Promise<any>;
  delete(): Promise<void>;
  readonly key: string;
}

export abstract class AbstractSecureData extends NativeComponent implements ISecureData {
  protected _key: string;
  protected _service?: string;
  abstract save(params: { value: string }): Promise<void>;
  abstract read(): Promise<any>;
  abstract delete(): Promise<void>;
  abstract key: string;
  abstract ios?: { service?: string };
}

export default ISecureData;
