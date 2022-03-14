declare class BlobImpl extends AbstraBlo {
}

const Blob: typeof BlobImpl = require(`./blob.${Device.deviceOS.toLowerCase()}`).default;
type Blob = BlobImpl;

export default Blob;
