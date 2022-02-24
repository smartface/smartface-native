import File from '../../io/file';
import Color from '../../ui/color';
import Application from '../../application';
import { IQuickLook, QuickLookBase } from '.';
import Page from '../page';

export default class QuickLookIOS extends QuickLookBase {
  private _document: string[] = [];
  constructor(params?: Partial<IQuickLook>) {
    super(params);

    if (!this.nativeObject) {
      this.nativeObject = new __SF_QLPreviewController();
    }

    // Assign parameters given in constructor
    for (const param in params) {
      this[param] = params[param];
    }

    //Deprecated use Application.statusBar
    this.statusBar = Application.statusBar;
  }

  get document(): string[] {
    return this._document;
  }
  set document(value: string[]) {
    this._document = value;
    const uRLArray = [];
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
