//Generated for handling ios view

import { IQuickLook } from '.';
import { StatusBar } from '../../application/statusbar';
import NativeComponent from '../../core/native-component';
import Color from '../color';
import Page from '../page';

export default class QuickLookAndroid extends NativeComponent implements IQuickLook {
  document: string[] = [];
  barColor: boolean = false;
  titleColor: Color = Color.TRANSPARENT;
  itemColor: Color | null = null;
  statusBar: StatusBar | null = null;
  
  constructor(params?: Partial<IQuickLook>) {
    super(params);
  }

  toString() {
    return 'QuickLook';
  }

  show(page: Page): void {}
}
