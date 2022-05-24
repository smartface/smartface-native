import Application from '../../application';
import { IView } from '../../ui/view/view';
import ViewAndroid from '../../ui/view/view.android';
import { IViewGroup } from '../../ui/viewgroup/viewgroup';
import AndroidConfig from '../../util/Android/androidconfig';
import { IBarcodeScanner } from './barcodescanner';
const ZXingScannerView = requireClass('me.dm7.barcodescanner.zxing.ZXingScannerView');

export default class BarcodeScannerAndroid implements IBarcodeScanner {
  private _scannerView?: IView;
  private _layout: IViewGroup;

  constructor(params: IBarcodeScanner) {
    if (!params.layout) {
      throw new Error('layout parameter is required');
    }
    this._layout = params.layout;
  }
  width = 0;
  height = 0;

  get layout() {
    return this._layout;
  }

  set layout(value) {
    this._layout = value;
  }

  startCamera = () => {
    this._scannerView?.nativeObject.startCamera();
  };

  show(): ReturnType<IBarcodeScanner['show']> {
    return new Promise((resolve, reject) => {
      this._scannerView = new ViewAndroid({ flexGrow: 1 });
      this._scannerView.nativeObject = new ZXingScannerView(AndroidConfig.activity);
      const resultHandler = ZXingScannerView.ResultHandler.implement({
        handleResult: (rawResult: any) => {
          resolve({
            barcode: {
              text: rawResult.getText(),
              format: rawResult.getBarcodeFormat().toString()
            }
          });
        }
      });
      this._scannerView.nativeObject.setResultHandler(resultHandler);
      this._scannerView.nativeObject.resumeCameraPreview(resultHandler);
      this.layout.addChild(this._scannerView);
    });
  }

  hide() {
    this.layout.removeAll();
  }

  stopCamera() {
    this._scannerView?.nativeObject.stopCamera();
  }

  toString() {
    return 'BarcodeScanner';
  }
  applyOrientationParentView() {}

  checkPermission(): Promise<void> {
    const CAMERA_PERMISSION_CODE = 1002;
    return new Promise((resolve, reject) => {
      if (Application.android.checkPermission?.(Application.Android.Permissions.CAMERA)) {
        resolve();
      } else {
        Application.android.requestPermissions?.(CAMERA_PERMISSION_CODE, Application.Android.Permissions.CAMERA);
      }
      Application.android.onRequestPermissionsResult = (e) => {
        if (e.requestCode === CAMERA_PERMISSION_CODE && e.result) {
          resolve();
        } else {
          reject();
        }
      };
    });
  }
}
