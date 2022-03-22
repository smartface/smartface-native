import StatusBar from '../../application/statusbar';
import { IEventEmitter } from '../../core/eventemitter';
import { INativeComponent } from '../../core/inative-component';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { MobileOSProps, WithMobileOSProps } from '../../core/native-mobile-component';
import FlexLayout, { IFlexLayout } from '../flexlayout';
import NavigationController, { IController } from '../navigationcontroller';
import { HeaderBar } from '../navigationcontroller/headerbar';
import TabBarController from '../tabbarcontroller';
import View, { IViewProps, ViewAndroidProps, ViewIOSProps } from '../view';
import { PageEvents } from './page-events';

export enum PageOrientation {
  UNKNOWN,
  PORTRAIT,
  PORTRAITUPSIDEDOWN,
  LANDSCAPELEFT,
  LANDSCAPERIGHT
}

export enum LargeTitleDisplayMode {
  AUTOMATIC,
  ALWAYS,
  NEVER
}
export enum PresentationStyle {
  COVERVERTICAL,
  FLIPHORIZONTAL,
  CROSSDISSOLVE,
  PARTIALCURL
}

export const Orientation = {
  PORTRAIT: [PageOrientation.PORTRAIT],
  UPSIDEDOWN: [PageOrientation.PORTRAITUPSIDEDOWN],
  AUTOPORTRAIT: [PageOrientation.PORTRAIT, PageOrientation.PORTRAITUPSIDEDOWN],
  LANDSCAPELEFT: [PageOrientation.LANDSCAPELEFT],
  LANDSCAPERIGHT: [PageOrientation.LANDSCAPERIGHT],
  AUTOLANDSCAPE: [PageOrientation.LANDSCAPELEFT, PageOrientation.LANDSCAPERIGHT],
  AUTO: [PageOrientation.PORTRAIT, PageOrientation.PORTRAITUPSIDEDOWN, PageOrientation.LANDSCAPELEFT, PageOrientation.LANDSCAPERIGHT]
};

export interface PageAndroidParams {
  /**
   * This event will be triggered when user clicks back button on the Device.
   *
   * @event onBackButtonPressed
   * @deprecated
   * @android
   * @since 0.1
   * @example
   * ````
   * import Page from '@smartface/native/ui/page';
   *
   * const page = new Page();
   * page.on(Page.Events.BackButtonPressed, () => {
   * 	console.info('backButtonPressed);
   * });
   * ````
   */
  onBackButtonPressed(): void;
  transitionViewsCallback?: {
    onTransitionStart: () => void;
    onTransitionEnd: () => void;
  };
}

interface ControllerParams {
  controller: IPage | NavigationController;
  animated: boolean;
  onComplete: () => void;
}

export interface PageIOSParams {
  /**
   * Sets padding values to page's layout.
   * This will override padding values of its layout. Padding values are defined by Apple for each orientation.
   *
   * @ios
   * @since 0.1
   */
  safeAreaLayoutMode?: boolean;
  /**
   * This event will be triggered when padding values of layout changed.
   *
   * @event onSafeAreaPaddingChange
   * @deprecated
   * @param {Object} paddingObject Includes top,left,right and bottom padding values.
   * @ios
   * @since 0.1
   * @example
   * ````
   * import Page from '@smartface/native/ui/page';
   *
   * const page = new Page();
   * page.on(Page.Events.SafeAreaPaddingChange, () => {
   * 	console.info('onSafeAreaPaddingChange');
   * });
   * ````
   */
  onSafeAreaPaddingChange: ((padding: { left: number; top: number; right: number; bottom: number }) => void) | undefined;
  present(params?: ControllerParams): void;
  presentationStyle: number;
  navigationItem: HeaderBar;
}

export declare interface IPage<TEvent extends string = PageEvents, TMobile extends MobileOSProps<PageIOSParams, PageAndroidParams> = MobileOSProps<PageIOSParams, PageAndroidParams>, TNative = any>
  extends IEventEmitter<TEvent | PageEvents>,
    IController<TNative> {
  contextMenu: {
    items: any[];
    headerTitle: string;
  };
  android: TMobile['android'];
  ios: TMobile['ios'];
  isInsideBottomTabBar: boolean;
  /**
   * This event is called once when page is created.
   * You can create views and add them to page in this callback.
   *
   * @android
   * @ios
   * @example
   * ````
   * import Page from '@smartface/native/ui/page';
   *
   * const page = new Page();
   * page.on(Page.Events.Load, () => {
   * 	console.info('onLoad');
   * });
   * ````
   */
  onLoad: () => void;
  /**
   * Gets/sets custom transition views. Used with custom transitions to map a {@link UI.View View}
   * from a removed or hidden {@link UI.Page Page} to a {@link UI.View View} from a shown or added {@link UI.Page Page}.
   *
   *     @example
   *     import Page from '@smartface/native/ui/page';
   *     var myPage = new Page({
   *         var page = this;
   *         onShow: function() {
   *             page.headerBar.visible = true;
   *
   *             page.imageView1.transitionID = "view1";
   *             page.imageView2.transitionID = "view2";
   *
   *             page.transitionViews = [page.imageView1, page.imageView2];
   *         }
   *     });
   *
   *     var myDetailPage = new Page({
   *         var page = this;
   *         onShow: function() {
   *             page.headerBar.visible = true;
   *         }
   *
   *         page.imageView1.transitionID = "view2";
   *         page.imageView2.transitionID = "view1";
   *     });
   *
   * @property {UI.View[]} transitionViews
   * @android
   * @ios
   * @readonly
   * @since 3.2.0
   */
  transitionViews: View[];
  /**
   * Gets the main layout of Page which is an instance of UI.FlexLayout. You
   * should add views to the layout of the page.
   *
   * @property {UI.FlexLayout} layout
   * @android
   * @ios
   * @readonly
   * @since 0.1
   */
  readonly layout: IFlexLayout;

  /**
   * This event is called when a page appears on the screen (everytime).
   * It will be better to set headerBar and statusBar properties in this callback.
   *
   *     @example
   *     import Page from '@smartface/native/ui/page';
   *     import Application from '@smartface/native/application';
   *     var myPage = new Page({
   *         onShow: function() {
   *             this.headerBar.visible = true;
   *         }
   *         Application.statusBar.visible = true;
   *     });
   *
   * @android
   * @ios
   * @example
   * ````
   * import Page from '@smartface/native/ui/page';
   *
   * const page = new Page();
   * page.on(Page.Events.Show, () => {
   * 	console.info('onShow');
   * });
   * ````
   */
  onShow: () => void;
  /**
   * This event is called when a page disappears from the screen.
   *
   * @event onHide
   * @android
   * @ios
   * @example
   * ````
   * import Page from '@smartface/native/ui/page';
   *
   * const page = new Page();
   * page.on(Page.Events.Hide, () => {
   * 	console.info('onHide');
   * });
   * ````
   */
  onHide: () => void;
  /**
   * This function shows up the pop-up page. Pop-up pages behave exactly as UI.Page .
   *
   *     @example
   *     const self = this; //Current page
   *     import Color from '@smartface/native/ui/color';
   *
   *     var popuPage = new Page();
   *     popuPage.layout.backgroundColor = Color.BLUE;
   *
   *     import Button from '@smartface/native/ui/button';
   *     var myButton = new Button({
   *     width: 150,
   *     height: 80,
   *     text: "Smartface Button",
   *     onPress: function() {
   *      self.dismiss(function() {
   *      console.log("dismiss")
   *      });
   *     }
   *     });
   *     popuPage.layout.addChild(myButton);
   *
   *     self.popupBtn.onPress = function() {
   *         self.present({
   *             controller: popuPage,
   *             animated: true,
   *             onComplete: function() {
   *                 console.log("Page3 presented...");
   *             };
   *         });
   *     }
   *
   *
   * @method present
   * @param {Object} params
   * @param {UI.Page|UI.NavigationController} params.controller
   * @param {Boolean} params.animated
   * @param {Function} params.onComplete
   * @android
   * @ios
   * @deprecated
   * @since 3.1.1
   *
   */
  present(params?: ControllerParams): void;
  /**
   * This function dismiss presently shown pop-up page.
   *
   * @method dismiss
   * @param {Object} params
   * @param {Function} params.onComplete
   * @android
   * @ios
   * @since 3.1.1
   * @deprecated
   */
  dismiss(params?: { onComplete: () => void; animated?: boolean }): void;
  /**
   * Gets status bar object. This property is readonly, you can not set
   * status bar to a page but you can change properties of page's status bar.
   *
   * @property {UI.StatusBar} statusBar
   * @android
   * @ios
   * @readonly
   * @removed 4.0.0 Use {@link Application.statusBar} instead
   * @since 0.1
   */
  statusBar: typeof StatusBar;
  /**
   * Gets header bar object of a  page. This property is readonly, you can not
   * set header bar to a page but you can change properties of page's header bar.
   * In Android, header bar properties should be implemented in onLoad or onShow of page.
   * Otherwise given settings might be losed.
   *
   * @property {UI.HeaderBar} headerBar
   * @android
   * @ios
   * @readonly
   * @since 0.1
   */
  readonly headerBar?: HeaderBar;
  /**
   * Gets/sets the orientation of the Page. This property must be set as constructor parameter.
   * {@link UI.Page.Orientation Orientation} constants can use with bitwise or operator. The default value of the
   * orientation defined in project.json.
   *
   *     @example
   *     import Page from '@smartface/native/ui/page';
   *     var myPage1 = new Page({
   *          orientation: Page.Orientation.LANDSCAPELEFT
   *     });
   *
   * @property {UI.Page.Orientation} [orientation = UI.Page.Orientation.PORTRAIT]
   * @android
   * @ios
   * @since 0.1
   */
  orientation: PageOrientation;
  /**
   * This event will be called when orientation of the Page changes.
   * iOS fires this event before orientation changed but Android fires after changed.
   *
   *
   * @event onOrientationChange
   * @deprecated
   * @param {Object} e
   * @param {UI.Page.Orientation} e.orientation
   * @android
   * @ios
   * @since 0.1
   * @example
   * ````
   * import Page from '@smartface/native/ui/page';
   *
   * const page = new Page();
   * page.on(Page.Events.OrientationChange, (params) => {
   * 	console.info('onOrientationChange', params);
   * });
   * ````
   */
  onOrientationChange(e: { orientation: PageOrientation[] }): void;
  skipDefaults?: boolean;
  parentController: IController;
}

// export class PageBase<TEvent extends string = PageEvents, TNative = any, TProps extends IPage = IPage>
//   extends NativeEventEmitterComponent<TEvent | PageEvents, TNative, TProps>
//   implements IController, IPage
// {
//   contextMenu: { items: any[]; headerTitle: string; };
//   onLoad: () => void;
//   transitionViews: View<'touch' | 'touchCancelled' | 'touchEnded' | 'touchMoved', { [key: string]: any; }, WithMobileOSProps<IViewProps<MobileOSProps<ViewIOSProps, ViewAndroidProps>>, ViewIOSProps, ViewAndroidProps>>[];
//   layout: IFlexLayout<'touch' | 'touchCancelled' | 'touchEnded' | 'touchMoved' | 'interceptTouchEvent' | 'viewAdded' | 'viewRemoved', MobileOSProps<Partial<ViewIOSProps>, FlexLayoutAndroidProps>>;
//   onShow: () => void;
//   onHide: () => void;
//   present(params: ControllerParams): void {
//     throw new Error('Method not implemented.');
//   }
//   dismiss(params?: ControllerParams): void {
//     throw new Error('Method not implemented.');
//   }
//   statusBar: StatusBar;
//   orientation: PageOrientation;
//   onOrientationChange(e: { orientation: PageOrientation[]; }): void {
//     throw new Error('Method not implemented.');
//   }
//   headerBar?: HeaderBar;
//   tabBar?: TabBarController;

//   getCurrentController(): IController {
//     throw new Error('Method not implemented.');
//   }
//   show(params: { controller: IController; animated: any; isComingFromPresent?: boolean; onCompleteCallback?: () => void }) {
//     throw new Error('Method not implemented.');
//   }
//   parentController: IController;
//   childControllers?: IController[] = [];
//   pageID: number;
//   popupBackNavigator: any;
//   isActive: boolean = false;
//   static iOS: {
//     LargeTitleDisplayMode: typeof LargeTitleDisplayMode;
//     PresentationStyle: typeof PresentationStyle;
//   };
//   static Orientation: typeof Orientation;
//   isInsideBottomTabBar: boolean = false;
// }

export abstract class AbstractPage<TEvent extends string = PageEvents, TNative = any, TProps extends IPage = IPage>
  extends NativeEventEmitterComponent<TEvent | PageEvents, TNative, TProps>
  implements IController, IPage
{
  private _skipDefaults: boolean = false;
  protected createNativeObject() {}
  public get skipDefaults(): boolean {
    return this._skipDefaults;
  }
  public set skipDefaults(value: boolean) {
    this._skipDefaults = value;
  }

  constructor(params?: Partial<TProps>) {
    super(params);
  }
  childControllers: IController<any>[] = [];
  contextMenu: { items: any[]; headerTitle: string };
  tabBar?: TabBarController;
  abstract getCurrentController(): IController;
  abstract show(params: { controller: IController; animated: any; isComingFromPresent?: boolean; onCompleteCallback?: () => void });
  parentController: IController;
  pageID: number;
  popupBackNavigator: any;
  isActive: boolean;
  isInsideBottomTabBar: boolean;
  abstract orientation: PageOrientation;
  abstract transitionViews: View[];
  abstract onOrientationChange(e: { orientation: PageOrientation[] }): void;
  abstract onLoad(): void;
  abstract onShow(): void;
  abstract onHide(): void;
  abstract present(params?: ControllerParams): void;
  abstract dismiss(params?: { onComplete: () => void }): void;
  abstract readonly layout: FlexLayout;
  abstract readonly statusBar: typeof StatusBar;
  abstract readonly headerBar?: HeaderBar;

  static iOS: {
    LargeTitleDisplayMode: typeof LargeTitleDisplayMode;
    PresentationStyle: typeof PresentationStyle;
  };
  static Orientation: typeof Orientation;
}

declare class PageImpl extends AbstractPage implements IPage {
  protected createNativeObject();
  onLoad(): void;
  onShow(): void;
  onHide(): void;
  orientation: PageOrientation;
  transitionViews: View[];
  layout: FlexLayout;
  statusBar: typeof StatusBar;
  headerBar?: HeaderBar | undefined;
  getCurrentController(): IController;
  show(params: { controller: IController; animated: any; isComingFromPresent?: boolean | undefined; onCompleteCallback?: (() => void) | undefined });
  onOrientationChange(e: { orientation: PageOrientation[] }): void;
  present(params?: ControllerParams): void;
  dismiss(params?: ControllerParams): void;
}

const Page: typeof PageImpl = require(`./page.${Device.deviceOS.toLowerCase()}`).default;
type Page = PageImpl;
export default Page;
