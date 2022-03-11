import { StatusBar } from '../../application/statusbar';
import { IEventEmitter } from '../../core/eventemitter';
import { INativeComponent } from '../../core/inative-component';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { MobileOSProps } from '../../core/native-mobile-component';
import FlexLayout, { IFlexLayout } from '../flexlayout';
import NavigationController, { IController } from '../navigationcontroller';
import { HeaderBar } from '../navigationcontroller/headerbar';
import TabBarController from '../tabbarcontroller';
import View from '../view';
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
  onSafeAreaPaddingChange?(padding: { left: number; top: number; right: number; bottom: number }): void;
  present?(): void;
  presentationStyle: number;
  navigationItem: HeaderBar & HeaderBar['ios'];
}

export declare interface IPage<TEvent extends string = PageEvents, TMobile extends MobileOSProps<PageIOSParams, PageAndroidParams> = MobileOSProps<PageIOSParams, PageAndroidParams>, TNative = any>
  extends INativeComponent<TNative>,
    IEventEmitter<TEvent | PageEvents> {
  contextMenu: {
    items: any[];
    headerTitle: string;
  }
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
   *     const Page = require('@smartface/native/ui/page');
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
   *     const Page = require('@smartface/native/ui/page');
   *     const Application = require('@smartface/native/application');
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
   *     const Color = require('@smartface/native/ui/color');
   *
   *     var popuPage = new Page();
   *     popuPage.layout.backgroundColor = Color.BLUE;
   *
   *     const Button = require('@smartface/native/ui/button');
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
  present(params: ControllerParams): void;
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
  dismiss(params?: ControllerParams): void;
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
  statusBar: StatusBar;
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
  readonly headerBar: HeaderBar;
  /**
   * Gets/sets the orientation of the Page. This property must be set as constructor parameter.
   * {@link UI.Page.Orientation Orientation} constants can use with bitwise or operator. The default value of the
   * orientation defined in project.json.
   *
   *     @example
   *     const Page = require('@smartface/native/ui/page');
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
  readonly parentController: IController;
}

export class PageBase<TEvent extends string = PageEvents, TNative = any, TProps extends IPage = IPage>
  extends NativeEventEmitterComponent<TEvent | PageEvents, TNative, TProps>
  implements IController, IPage
{
  headerBar?: HeaderBar;
  tabBar?: TabBarController;
  private _skipDefaults: boolean;

  public get skipDefaults(): boolean {
    return this._skipDefaults;
  }
  public set skipDefaults(value: boolean) {
    this._skipDefaults = value;
  }

  getCurrentController(): IController {
    throw new Error('Method not implemented.');
  }
  show(params: { controller: IController; animated: any; isComingFromPresent?: boolean; onCompleteCallback?: () => void }) {
    throw new Error('Method not implemented.');
  }
  parentController: IController;
  childControllers?: IController[] = [];
  pageID: number;
  popupBackNavigator: any;
  isActive: boolean = false;
  static iOS: {
    LargeTitleDisplayMode: typeof LargeTitleDisplayMode;
    PresentationStyle: typeof PresentationStyle;
  };
  static Orientation: typeof Orientation;
  isInsideBottomTabBar: boolean = false;
}

export declare class AbstractPage<TEvent extends string = PageEvents, TProps extends IPage = IPage, TNative = any>
  extends NativeEventEmitterComponent<TEvent, TNative, TProps>
  implements IPage<TEvent | PageEvents, TProps, TNative>, IController
{
  constructor(params?: Partial<IPage>);
  contextMenu: { items: any[]; headerTitle: string; };
  skipDefaults?: boolean | undefined;
  childControllers?: IController[];
  tabBar?: TabBarController;
  getCurrentController(): IController;
  show(params: { controller: IController; animated: any; isComingFromPresent?: boolean; onCompleteCallback?: () => void });
  parentController: IController;
  pageID: number;
  popupBackNavigator: any;
  isActive: boolean;
  isInsideBottomTabBar: boolean;
  orientation: PageOrientation;
  transitionViews: View[];
  onOrientationChange(e: { orientation: PageOrientation[] }): void;
  onLoad: () => void;
  onShow: () => void;
  onHide: () => void;
  present(params?: ControllerParams): void;
  dismiss(params?: ControllerParams): void;
  readonly layout: FlexLayout;
  readonly statusBar: StatusBar;
  readonly headerBar: HeaderBar;

  static iOS: {
    LargeTitleDisplayMode: typeof LargeTitleDisplayMode;
    PresentationStyle: typeof PresentationStyle;
  };
  static Orientation: typeof Orientation;
}

const Page: typeof AbstractPage = require(`./page.${Device.deviceOS.toLowerCase()}`).default;
type Page = AbstractPage;
export default Page;
