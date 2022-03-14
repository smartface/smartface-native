import { AbstractBlob } from './blob';

declare class BlobImpl extends AbstractBlob {
  constructor(params?: Partial<AbstractBlob>, properties?: { type: string });
  get type(): string;
  get size(): number;
  slice(start: number, end: number): AbstractBlob;
  toBase64(): string;
  toBase64Async(handlers: { onComplete: (base64: String) => void; onFailure?: (() => void) | undefined }): void;
  toString(): string;
}

const Blob: typeof BlobImpl = require(`./blob.${Device.deviceOS.toLowerCase()}`).default;
type Blob = BlobImpl;

export default Blob;
