import StatusBar from '../../application/statusbar';
import { IEventEmitter } from '../../core/eventemitter';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { INativeMobileComponent, MobileOSProps } from '../../core/native-mobile-component';
import MenuItem from '../menuitem';
import { IController, AbstractNavigationController } from '../navigationcontroller/navigationcontroller';
import { HeaderBar } from '../navigationcontroller/headerbar';
import TabBarController from '../tabbarcontroller';
import { IView } from '../view/view';
import { PageEvents } from './page-events';
import { IFlexLayout } from '../flexlayout/flexlayout';

export enum PageOrientation {
  UNKNOWN,
  PORTRAIT,
  PORTRAITUPSIDEDOWN,
  LANDSCAPELEFT,
  LANDSCAPERIGHT,
  AUTO,
  AUTOLANDSCAPE
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

export interface PageAndroidParams {
  /**
   * This event will be triggered when user clicks back button on the Device.
   *
   * @event onBackButtonPressed
   * @deprecated
   * @android
   * @since 0.1
   * @example
   * ```
   * import Page from '@smartface/native/ui/page';
   *
   * const page = new Page();
   * page.on(Page.Events.BackButtonPressed, () => {
   * 	console.info('backButtonPressed);
   * });
   * ```
   */
  onBackButtonPressed(): void;
  transitionViewsCallback?: {
    onTransitionStart: () => void;
    onTransitionEnd: () => void;
  };
}

interface ControllerParams {
  controller: IPage | AbstractNavigationController;
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
   * ```
   * import Page from '@smartface/native/ui/page';
   *
   * const page = new Page();
   * page.on(Page.Events.SafeAreaPaddingChange, () => {
   * 	console.info('onSafeAreaPaddingChange');
   * });
   * ```
   */
  onSafeAreaPaddingChange: ((padding: { left: number; top: number; right: number; bottom: number }) => void) | undefined;
  /**
   * This method is used to push the current page. Used internally.
   * @private
   * @ios
   */
  present(params?: ControllerParams): void;
  /**
   *
   * This property is used to determine which style (modal, sheet or normal) the page is gonna be pushed. Used internally.
   * @private
   * @ios
   */
  presentationStyle: number;
  /**
   * Native equivelant of headerbar on iOS. Use page.headerBar (or parentController) instead.
   * @ios
   * @private
   */
  navigationItem: HeaderBar;
}

export declare interface IPage<TEvent extends string = PageEvents, TMobile extends MobileOSProps<PageIOSParams, PageAndroidParams> = MobileOSProps<PageIOSParams, PageAndroidParams>, TNative = any>
  extends IEventEmitter<TEvent | PageEvents>,
    INativeMobileComponent<TNative, TMobile>,
    IController<TNative> {
  contextMenu: {
    items: any[];
    headerTitle: string;
  };
  isInsideBottomTabBar: boolean;
  /**
   * This event is called once when page is created.
   * You can create views and add them to page in this callback.
   *
   * @android
   * @ios
   * @example
   * ```
   * import Page from '@smartface/native/ui/page';
   *
   * const page = new Page();
   * page.on(Page.Events.Load, () => {
   * 	console.info('onLoad');
   * });
   * ```
   */
  onLoad(): void;
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
  transitionViews: IView[];
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
   * @android
   * @ios
   * @example
   * ```
   * import Page from '@smartface/native/ui/page';
   *
   * const page = new Page();
   * page.on('show', () => {
   * 	console.info('onShow');
   * });
   * ```
   */
  onShow(): void;
  /**
   * This event is called when a page disappears from the screen.
   *
   * @event onHide
   * @android
   * @ios
   * @example
   * ```
   * import Page from '@smartface/native/ui/page';
   *
   * const page = new Page();
   * page.on(Page.Events.Hide, () => {
   * 	console.info('onHide');
   * });
   * ```
   */
  onHide(): void;
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
   * ```
   * import Page from '@smartface/native/ui/page';
   *
   * const page = new Page();
   * page.on(Page.Events.OrientationChange, (params) => {
   * 	console.info('onOrientationChange', params);
   * });
   * ```
   */
  onOrientationChange(e: { orientation: PageOrientation }): void;
  /**
   * Determines if default configurations should be skipped or not. Only can be passed on constructor. Internal use only.
   * @private
   */
  skipDefaults?: boolean;
  /**
   * Gets/sets the parentcontroller(viewcontroller etc.) of the current page on iOS.
   * You should access headerbar values through parentcontroller on iOS.
   */
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
//   onOrientationChange(e: { orientation: PageOrientation; }): void {
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
  /**
   * Holds the controller classes which this page has. Used internally.
   * @private
   */
  childControllers: IController<any>[] = [];
  /**
   * For Android, holds the native menu instance which will open next. Used internally.
   * @private
   */
  contextMenu: { items: MenuItem[]; headerTitle: string };

  /**
   * For Android, TabbarController pages will be used like this. Used internally.
   * @private
   */
  tabBar?: TabBarController;

  /**
   * Gets the open controller. Internal use only.
   * @private
   */
  abstract getCurrentController(): IController;

  /**
   * Shows(pushes) the given controller. Internal use only.
   * @private
   */
  abstract show(params: { controller: IController; animated: any; isComingFromPresent?: boolean; onCompleteCallback?: () => void });
  /**
   * Shows(pushes) the given controller. Internal use only.
   * @private
   */
  parentController: IController;
  /**
   * (Android) Holds the underlying page when modal is opened. Used internally.
   * @private
   */
  popUpBackPage?: IPage;
  /**
   * Unique page ID. Used internally.
   * @private
   */
  pageID: number;
  popupBackNavigator: any;
  /**
   * On BottomTabBar/TopTabBar, this variable holds if the current page is the active page of pages. Used internally.
   * @private
   */
  isActive: boolean;
  isInsideBottomTabBar: boolean;
  abstract orientation: PageOrientation;
  abstract transitionViews: IView[];
  abstract onOrientationChange(e: { orientation: PageOrientation }): void;
  abstract onLoad(): void;
  abstract onShow(): void;
  abstract onHide(): void;
  abstract present(params?: ControllerParams): void;
  abstract dismiss(params?: { onComplete: () => void }): void;
  abstract readonly layout: IFlexLayout;
  abstract readonly statusBar: typeof StatusBar;
  abstract readonly headerBar?: HeaderBar;

  static iOS: {
    LargeTitleDisplayMode: typeof LargeTitleDisplayMode;
    PresentationStyle: typeof PresentationStyle;
  };
  static Orientation: typeof PageOrientation;
}

export declare class PageImpl extends AbstractPage {
  protected createNativeObject(): any;
  constructor(params?: Partial<AbstractPage>);
  onLoad(): void;
  onShow(): void;
  onHide(): void;
  orientation: PageOrientation;
  transitionViews: IView[];
  layout: IFlexLayout;
  statusBar: typeof StatusBar;
  headerBar?: HeaderBar | undefined;
  getCurrentController(): IController;
  show(params: { controller: IController; animated: any; isComingFromPresent?: boolean | undefined; onCompleteCallback?: (() => void) | undefined }): void;
  onOrientationChange(e: { orientation: PageOrientation }): void;
  present(params?: ControllerParams): void;
  dismiss(params?: ControllerParams): void;
  static iOS: {
    LargeTitleDisplayMode: typeof LargeTitleDisplayMode;
    PresentationStyle: typeof PresentationStyle;
  };
  static Orientation: typeof PageOrientation;
}
