//Generated for handling ios view

import { IQuickLook, QuickLookBase } from '.';
import Page from '../page';

export default class QuickLookAndroid extends QuickLookBase {
  constructor(params?: Partial<IQuickLook>) {
    super(params);

    this.nativeObject = null;
    this.document = null;
    this.barColor = null;
    this.itemColor = null;
    this.document = null;
    this.statusBar = null;

    // Assign parameters given in constructor
    for (const param in params) {
      this[param] = params[param];
    }
  }

  toString() {
    return 'QuickLook';
  }

  show(page: Page): void {}
}
