import Blob = require(".");

export =  BlobAndroid;
declare class BlobAndroid extends Blob {
	slice: (start: number, end: number) => Blob;
}
