import Invocation from '../../util/iOS/invocation';
import { BarcodeScannerFormat, IBarcodeScanner } from './barcodescanner';

const AVCaptureFocusMode = {
  LOCKED: 0,
  AUTO_FOCUS: 1,
  CONTINOUS_AUTO_FOCUS: 2
};

const AVAuthorizationStatus = {
  NOT_DETERMINED: 0,
  RESTRICTED: 1,
  DENIED: 2,
  AUTHORIZED: 3
};

enum NativeBarcodeFormat {
  AZTEC,
  CODABAR,
  CODE_39,
  CODE_93,
  CODE_128,
  DATA_MATRIX,
  EAN_8,
  EAN_13,
  ITF,
  MAXICODE,
  PDF_417,
  QR_CODE,
  RSS_14,
  RSS_EXPANDED,
  UPC_A,
  UPC_E,
  UPC_EAN_EXTENSION
}

const BarcodeFormatMapping = {
  [NativeBarcodeFormat.AZTEC]: BarcodeScannerFormat.AZTEC,
  [NativeBarcodeFormat.CODABAR]: BarcodeScannerFormat.CODABAR,
  [NativeBarcodeFormat.CODE_39]: BarcodeScannerFormat.CODE_39,
  [NativeBarcodeFormat.CODE_93]: BarcodeScannerFormat.CODE_93,
  [NativeBarcodeFormat.CODE_128]: BarcodeScannerFormat.CODE_128,
  [NativeBarcodeFormat.DATA_MATRIX]: BarcodeScannerFormat.DATA_MATRIX,
  [NativeBarcodeFormat.EAN_8]: BarcodeScannerFormat.EAN_8,
  [NativeBarcodeFormat.EAN_13]: BarcodeScannerFormat.EAN_13,
  [NativeBarcodeFormat.ITF]: BarcodeScannerFormat.ITF,
  [NativeBarcodeFormat.MAXICODE]: BarcodeScannerFormat.MAXICODE,
  [NativeBarcodeFormat.PDF_417]: BarcodeScannerFormat.PDF_417,
  [NativeBarcodeFormat.QR_CODE]: BarcodeScannerFormat.QR_CODE,
  [NativeBarcodeFormat.RSS_14]: BarcodeScannerFormat.RSS_14,
  [NativeBarcodeFormat.RSS_EXPANDED]: BarcodeScannerFormat.RSS_EXPANDED,
  [NativeBarcodeFormat.UPC_A]: BarcodeScannerFormat.UPC_A,
  [NativeBarcodeFormat.UPC_E]: BarcodeScannerFormat.UPC_E,
  [NativeBarcodeFormat.UPC_EAN_EXTENSION]: BarcodeScannerFormat.UPC_EAN_EXTENSION
};

export default class BarcodeScannerIOS implements IBarcodeScanner {
  private _width: IBarcodeScanner['width'];
  private _height: IBarcodeScanner['height'];
  private _layout: IBarcodeScanner['layout'];
  private _capture: any;
  private _captureLayer: any;
  private _captureDelegate: any;
  cameraStarted = false;

  constructor(params: IBarcodeScanner) {
    if (!params.layout) throw new Error('layout parameter is required');
    if (!params.width) throw new Error('width parameter is required');
    if (!params.height) throw new Error('height parameter is required');
    this._layout = params.layout;
    this._width = params.width;
    this._height = params.height;
  }

  get layout() {
    return this._layout;
  }

  set layout(value) {
    this._layout = value;
  }

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  startCamera() {
    this.cameraStarted = true;
    Invocation.invokeInstanceMethod((this.layout as any).capture, 'start', []); //No idea what that capture method is
  }

  show(): ReturnType<IBarcodeScanner['show']> {
    return new Promise((resolve, reject) => {
      const alloc = Invocation.invokeClassMethod('ZXCapture', 'alloc', [], 'id');
      if (alloc) {
        this._capture = Invocation.invokeInstanceMethod(alloc, 'init', [], 'id');
      }
      const argCaptureFramesPerSec = new Invocation.Argument({
        type: 'CGFloat',
        value: 100
      });
      Invocation.invokeInstanceMethod(this._capture, 'setCaptureFramesPerSec:', [argCaptureFramesPerSec]);
      this._captureLayer = Invocation.invokeInstanceMethod(this._capture, 'layer', [], 'NSObject');

      const argCaptureLayer = new Invocation.Argument({
        type: 'NSObject',
        value: this._captureLayer
      });
      const argSublayerIndex = new Invocation.Argument({
        type: 'NSUInteger',
        value: 0
      });
      Invocation.invokeInstanceMethod(this.layout?.nativeObject.layer, 'insertSublayer:atIndex:', [argCaptureLayer, argSublayerIndex]);

      const argCaptureFrame = new Invocation.Argument({
        type: 'CGRect',
        value: {
          x: 0,
          y: 0,
          width: this.width,
          height: this.height
        }
      });
      Invocation.invokeInstanceMethod(this._captureLayer, 'setFrame:', [argCaptureFrame]);

      const argCaptureBack = new Invocation.Argument({
        type: 'NSInteger',
        value: Invocation.invokeInstanceMethod(this._capture, 'back', [], 'NSInteger')
      });
      Invocation.invokeInstanceMethod(this._capture, 'setCamera:', [argCaptureBack]);

      const argFocusMode = new Invocation.Argument({
        type: 'NSInteger',
        value: AVCaptureFocusMode.CONTINOUS_AUTO_FOCUS
      });
      Invocation.invokeInstanceMethod(this._capture, 'setFocusMode:', [argFocusMode]);
      const CaptureDelegate = SF.defineClass('CaptureDelegate : NSObject <ZXCaptureDelegate>', {
        captureResultResult: (capture: any, result: any) => {
          if (!this.cameraStarted) {
            return;
          }
          const text = Invocation.invokeInstanceMethod(result, 'text', [], 'NSString');
          const format = Invocation.invokeInstanceMethod(result, 'barcodeFormat', [], 'int');
          resolve({
            barcode: {
              text,
              format: BarcodeFormatMapping[format]
            }
          });
        },
        captureCameraIsReady: function (capture: any) {},
        captureSizeWidthHeight: function (capture: any, width: number, height: number) {}
      });
      this._captureDelegate = CaptureDelegate.new();
      const argCaptureDelegate = new Invocation.Argument({
        type: 'NSObject',
        value: this._captureDelegate
      });
      Invocation.invokeInstanceMethod(this._capture, 'setDelegate:', [argCaptureDelegate]);
      this.applyOrientationParentView();
      this.cameraStarted = true;
    });
  }

  hide() {
    this._captureLayer?.removeFromSuperlayer();
    this._captureLayer = undefined;
    this._captureDelegate = undefined;
    this._capture = undefined;
    this.layout = undefined;
  }

  stopCamera() {
    this.cameraStarted = false;
    Invocation.invokeInstanceMethod(this._capture, 'hard_stop', []);
  }

  toString() {
    return 'BarcodeScanner';
  }

  applyOrientationParentView() {
    const argCapture = new Invocation.Argument({
      type: 'NSObject',
      value: this._capture
    });
    Invocation.invokeClassMethod('ZXingObjcHelper', 'applyOrientation:', [argCapture]);
  }

  checkPermission(): Promise<void> {
    return new Promise((resolve, reject) => {
      const argMediaType = new Invocation.Argument({
        type: 'NSString',
        value: 'vide'
      });
      const authStatus = Invocation.invokeClassMethod('AVCaptureDevice', 'authorizationStatusForMediaType:', [argMediaType], 'NSInteger');
      if (authStatus === AVAuthorizationStatus.AUTHORIZED) {
        resolve();
      } else if (authStatus === AVAuthorizationStatus.DENIED) {
        reject();
      } else if (authStatus === AVAuthorizationStatus.RESTRICTED) {
        reject();
      } else if (authStatus === AVAuthorizationStatus.NOT_DETERMINED) {
        const argCompHandler = new Invocation.Argument({
          type: 'BoolBlock',
          value: (granted: any) => {
            __SF_Dispatch.mainAsync(() => (granted ? resolve() : reject()));
          }
        });
        Invocation.invokeClassMethod('AVCaptureDevice', 'requestAccessForMediaType:completionHandler:', [argMediaType, argCompHandler]);
      } else {
        reject();
      }
    });
  }
}
