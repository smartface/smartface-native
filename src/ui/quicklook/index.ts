import { StatusBar } from '../../application/statusbar';
import { INativeComponent } from '../../core/inative-component';
import Color from '../color';
import Page from '../page';

export interface IQuickLook extends INativeComponent {
  /**
   * Gets/sets array of documents(paths) that will be shown on QuickLook.
   *     @example
   *     import QuickLook from '@smartface/native/ui/quicklook';
   *     const quicklook = new QuickLook();
   *     quicklook.document = ["images://.png","assests://.pdf"];
   * @ios
   * @since 0.1
   */
  document: string[];

  /**
   * Gets/sets headerBar color of QuickLook View.
   *     @example
   *     import QuickLook from '@smartface/native/ui/quicklook';
   *     const quicklook = new QuickLook();
   *     quicklook.barColor = UI.Color.BLACK;
   * @deprecated
   * @removed
   * @ios
   * @since 0.1
   */
  barColor: boolean;

  /**
   * Gets/sets title color of QuickLook View.
   *     @example
   *     import QuickLook from '@smartface/native/ui/quicklook';
   *     const quicklook = new QuickLook();
   *     quicklook.titleColor = UI.Color.GREEN;
   * @ios
   * @since 3.1.3
   */
  titleColor: Color;

  /**
   * Gets/sets color of items on header & footer of QuickLook view.
   *
   *     @example
   *     import QuickLook from '@smartface/native/ui/quicklook';
   *     const quicklook = new QuickLook();
   *     quicklook.itemColor = UI.Color.BLACK;
   *
   * @property {UI.Color} itemColor
   * @ios
   * @since 0.1
   */
  itemColor: Color | null;

  /**
   * Gets status bar object. This property is readonly, you can not set
   * status bar to a page but you can change properties of page's status bar.
   *
   * @property {UI.StatusBar} statusBar
   * @removed 4.0.0 Use {@link Application.statusBar} instead
   * @ios
   * @readonly
   * @since 0.1
   */
  statusBar: StatusBar | null;

  /**
   * This function shows QuickLook on the given UI.Page.
   * @ios
   * @method show
   * @since 0.1
   */
  show(page: Page): void;
}

export declare class QuickLookBase implements IQuickLook {
  constructor(params?: Partial<IQuickLook>);
  document: string[];
  barColor: boolean;
  titleColor: Color;
  itemColor: Color | null;
  statusBar: StatusBar | null;
  show(page: Page): void;
  
  nativeObject: any;
}

/**
 *
 * Quick Look lets people preview Keynote, Numbers, Pages, and PDF documents,
 * as well as images and other types of files, even if your app doesn't support those file formats.
 * For further information: https://developer.apple.com/ios/human-interface-guidelines/features/quick-look/
 * This class works only for IOS.
 *
 *     @example
 *     import QuickLook from '@smartface/native/ui/quicklook';
 *     const quickLook = new QuickLook();
 *     const testPDF = "assets://test.pdf";
 *     const testImage = "images://test.png";
 *     quickLook.document = [testPDF,testImage];
 *     quickLook.itemColor = Color.WHITE;
 *     quickLook.show(myPage);
 *
 * @since 0.1
 */
const QuickLook: typeof QuickLookBase = require(`./quicklook.${Device.deviceOS.toLowerCase()}`).default;
type QuickLook = QuickLookBase;

export default QuickLook;
