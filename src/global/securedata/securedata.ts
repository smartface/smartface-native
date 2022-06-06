import { INativeComponent } from '../../core/inative-component';

interface ISecureData extends INativeComponent {
  save(params: { value: string }): Promise<void>;
  read(): Promise<any>;
  delete(): Promise<void>;
  readonly key: string;
}

export default ISecureData;
