import File from '../../io/file';
import Color from '../../ui/color';
import Application from '../../application';
import { IQuickLook } from '.';
import Page from '../page';
import NativeComponent from '../../core/native-component';
import StatusBar from '../../application/statusbar';

export default class QuickLookIOS extends NativeComponent implements IQuickLook {
  protected createNativeObject() {
    return new __SF_QLPreviewController();
  }
  private _document: string[] = [];
  barColor: boolean;
  statusBar: typeof StatusBar | null;

  constructor(params?: Partial<IQuickLook>) {
    super(params);

    //Deprecated use Application.statusBar
    this.statusBar = Application.statusBar;
  }

  get document(): string[] {
    return this._document;
  }
  set document(value: string[]) {
    this._document = value;
    const uRLArray: __SF_NSURL[] = [];
    for (let i = 0; i < value.length; i++) {
      const filePath = new File({
        path: value[i]
      });
      const actualPath = filePath.nativeObject.getActualPath();
      if (!actualPath) {
        throw Error('"' + this._document[i] + '"' + '\nFile does not exist');
      }
      uRLArray.push(__SF_NSURL.fileURLWithPath(actualPath));
    }
    this.nativeObject.document = uRLArray;
  }

  get titleColor(): Color {
    return new Color({
      color: this.nativeObject.titleColor
    });
  }
  set titleColor(value: Color) {
    this.nativeObject.titleColor = value.nativeObject;
  }

  get itemColor(): Color {
    return new Color({
      color: this.nativeObject.itemColor
    });
  }
  set itemColor(value: Color) {
    this.nativeObject.itemColor = value.nativeObject;
  }

  show(page: Page) {
    page.nativeObject.presentViewController(this.nativeObject);
  }
}
