import { IBarcodeScanner } from './barcodescanner';

const BarcodeScanner: ConstructorOf<IBarcodeScanner> = require(`./barcodescanner.${Device.deviceOS.toLowerCase()}`).default;
type BarcodeScanner = IBarcodeScanner;

export default BarcodeScanner;
