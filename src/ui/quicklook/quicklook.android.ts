//Generated for handling ios view

import { IQuickLook } from './quicklook';
import StatusBar from '../../application/statusbar';
import NativeComponent from '../../core/native-component';
import Color from '../color';
import { IColor } from '../color/color';
import { IPage } from '../page/page';

export default class QuickLookAndroid extends NativeComponent implements IQuickLook {
  protected createNativeObject() {
    return null;
  }
  document: string[] = [];
  barColor: boolean = false;
  titleColor = Color.TRANSPARENT;
  itemColor: IColor | null = null;
  statusBar: typeof StatusBar | null = null;

  constructor(params?: Partial<IQuickLook>) {
    super(params);
  }

  toString() {
    return 'QuickLook';
  }

  show(page: IPage): void {}
}
