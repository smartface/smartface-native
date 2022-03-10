import { BlobBase } from './blob';

const Blob: typeof BlobBase = require(`./blob.${Device.deviceOS.toLowerCase()}`).default;
type Blob = BlobBase;

export default Blob;
