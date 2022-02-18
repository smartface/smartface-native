import { BlobBase } from './blob';

const Blob: typeof BlobBase = require(`./blob.${Device.deviceOS.toLowerCase()}`).default;

export default Blob;
