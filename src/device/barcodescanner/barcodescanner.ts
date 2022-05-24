import { IViewGroup } from '../../ui/viewgroup/viewgroup';

interface BarcodeResultReturn {
  barcode: {
    text: string;
    format: keyof typeof BarcodeScannerFormat;
  };
}

export interface IBarcodeScanner {
  layout: IViewGroup | undefined;
  width: number;
  height: number;
  checkPermission(): Promise<void>;
  show(): Promise<BarcodeResultReturn>;
  hide(): void;
  startCamera(): void;
  stopCamera(): void;
}

export const BarcodeScannerFormat = {
  AZTEC: 'AZTEC',
  CODABAR: 'CODABAR',
  CODE_39: 'CODE_39',
  CODE_93: 'CODE_93',
  CODE_128: 'CODE_128',
  DATA_MATRIX: 'DATA_MATRIX',
  EAN_8: 'EAN_8',
  EAN_13: 'EAN_13',
  ITF: 'ITF',
  MAXICODE: 'MAXICODE',
  PDF_417: 'PDF_417',
  QR_CODE: 'QR_CODE',
  RSS_14: 'RSS_14',
  RSS_EXPANDED: 'RSS_EXPANDED',
  UPC_A: 'UPC_A',
  UPC_E: 'UPC_E',
  UPC_EAN_EXTENSION: 'UPC_EAN_EXTENSION'
};
