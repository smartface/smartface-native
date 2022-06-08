import { AbstractBlob } from './blob';

declare class BlobImpl extends AbstractBlob {
  get type(): string;
  get size(): number;
  toBase64(): string;
  toBase64Async(handlers: { onComplete: (base64: String) => void; onFailure?: (() => void) | undefined }): void;
  toString(): string;
  protected createNativeObject(params?: Partial<Record<string, any>>);
  constructor(parts?: Partial<AbstractBlob>, properties?: { type: string });
}

const Blob: typeof BlobImpl = require(`./blob.${Device.deviceOS.toLowerCase()}`).default;
type Blob = BlobImpl;

export default Blob;
