import View from "../view";
import FlexLayout from "../flexlayout";
import NavigationController from "../navigationcontroller";
import StatusBar from "../../application/statusbar";
import HeaderBar from "../headerbar";
import { IFlexLayout } from "../../primitive/iflexlayout";
import { IEventEmitter } from "core/eventemitter";

declare enum PageEvents {
	/**
	 * This event will be triggered when user clicks back button on the Device.
	 *
	 * @event onBackButtonPressed
	 * @android
	 * @since 0.1
	 */
  BackButtonPressed = "backButtonPressed",
	/**
	 * This event is called when a page disappears from the screen.
	 *
	 * @event onHide
	 * @android
	 * @ios
	 */
  Hide = "hide",
	/**
	 * This event is called once when page is created.
	 * You can create views and add them to page in this callback.
	 *
	 * @event onLoad
	 * @android
	 * @ios
	 */
  Load = "load",
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
	* @event onShow
	* @param {Object} parameters Parameters passed from Router.go function
	* @android
	* @ios
	*/
  Show = "show",
	/**
	 * This event will be called when orientation of the Page changes.
	 * iOS fires this event before orientation changed but Android fires after changed.
	 * 
	 *
	 * @event onOrientationChange
	 * @param {Object} e
	 * @param {UI.Page.Orientation} e.orientation 
	 * @android
	 * @ios
	 * @since 0.1
	 */
  OrientationChange = "orientationChange",
	/**
	 * This event will be triggered when padding values of layout changed.
	 *
	 * @event onSafeAreaPaddingChange
	 * @param {Object} paddingObject Includes top,left,right and bottom padding values. 
	 * @ios
	 * @since 0.1
	 */
  SafeAreaPaddingChange = "safeAreaPaddingChange"
}

declare enum UIInterfaceOrientation {
	unknown = 0,
	portrait = 1,
	portraitUpsideDown = 2,
	landscapeLeft = 3,
	landscapeRight = 4
}
/**
 * @class UI.Page
 * @since 0.1
 *
 * Page class stands for showing different user interfaces. Every page has its own lifecycle: load,
 * show and hide. Application should have at least one page otherwise what user will see is just
 * a black screen.
 *
 * Page has an embedded layout inside which you can use for adding views into page.
 *
 * Please refer to guides for best practices of page usages and page navigation.
 *
 *
 *     @example
 *     const extend = require("js-base/core/extend");
 *     const Page = require('@smartface/native/ui/page');
 *     var page1 = new extend(Page)(
 *         function(_super,params)
 *         {
 *             var self = this;
 *             _super(this,{
 *                 onShow: function() {
 *                     this.headerBar.title = "Smartface Page";
 *                 },
 *                 onLoad: function(){
 *                     const Button = require('@smartface/native/ui/button');
 *                     var myButton = new Button({
 *                         width: 150,
 *                         height: 80,
 *                         text: "Smartface Button"
 *                     });
 *                     this.layout.addChild(myButton);
 *                 }
 *             });
 *         }
 *     );
 * 
 * @see https://github.com/smartface/router#push-a-new-page
 */
declare namespace Page {
	const Orientation: {
		PORTRAIT: [UIInterfaceOrientation.portrait];
		UPSIDEDOWN: [UIInterfaceOrientation.portraitUpsideDown];
		AUTOPORTRAIT: [
			UIInterfaceOrientation.portrait,
			UIInterfaceOrientation.portraitUpsideDown
		];
		LANDSCAPELEFT: [UIInterfaceOrientation.landscapeLeft];
		LANDSCAPERIGHT: [UIInterfaceOrientation.landscapeRight];
		AUTOLANDSCAPE: [
			UIInterfaceOrientation.landscapeLeft,
			UIInterfaceOrientation.landscapeRight
		];
		AUTO: [
			UIInterfaceOrientation.portrait,
			UIInterfaceOrientation.portraitUpsideDown,
			UIInterfaceOrientation.landscapeLeft,
			UIInterfaceOrientation.landscapeRight
		];
	};
	type Orientation = ExtractValue<typeof Orientation>;
	namespace iOS {
		enum LargeTitleDisplayMode {
			AUTOMATIC = 0,
			ALWAYS = 1,
			NEVER = 2
		}
		enum PresentationStyle {
			COVERVERTICAL = 0,
			FLIPHORIZONTAL = 1,
			CROSSDISSOLVE = 2,
			PARTIALCURL = 3
		}
	}

  const Events: typeof PageEvents & typeof View.Events
  type Events = typeof Events
}


declare class Page extends NativeComponent implements IFlexLayout, IEventEmitter<PageEvents> {
	constructor(params?: any);
	on(eventName: PageEvents, callback: (...args: any) => void): () => void;
	off(eventName: PageEvents, callback?: (...args: any) => void): void;
	emit(event: PageEvents, detail?: any[]): void;
	/**
	 * This event is called once when page is created.
	 * You can create views and add them to page in this callback.
	 *
	 * @event onLoad
	 * @deprecated
	 * @android
	 * @ios
	 */
    public onLoad(): void;
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
    public transitionViews: View[];
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
    public readonly layout: FlexLayout;

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
 * @event onShow
 * @deprecated
 * @param {Object} parameters Parameters passed from Router.go function
 * @android
 * @ios
 */
    public onShow(): void;
/**
 * This event is called when a page disappears from the screen.
 *
 * @deprecated
 * @event onHide
 * @android
 * @ios
 */
	public onHide(): void;
	public readonly android: {
/**
 * This event will be triggered when user clicks back button on the Device.
 *
 * @event onBackButtonPressed
 * @deprecated
 * @android
 * @since 0.1
 */
		onBackButtonPressed?(): void;
		transitionViewsCallback?:{
			onTransitionStart: () => void;
			onTransitionEnd: () => void;
		};
	};
	public readonly ios: {
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
 */
		onSafeAreaPaddingChange?(padding: {
			left: number;
			top: number;
			right: number;
			bottom: number;
        }): void;
		present?(): void;
	};
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
    public present(params: { controller: Page | NavigationController }): void;
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
    public dismiss(params: { onComplete: () => void }): void;
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
    public readonly statusBar: StatusBar;
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
    public readonly headerBar: HeaderBar;
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
    public orientation: Page.Orientation;
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
 */
	public onOrientationChange(e: { orientation: Page.Orientation }): void;
}

// declare type OrientationType =
// 	| Page.Orientation["AUTO"]
// 	| Page.Orientation["AUTOLANDSCAPE"]
// 	| Page.Orientation["AUTOPORTRAIT"]
// 	| Page.Orientation["LANDSCAPELEF"]
// 	| Page.Orientation["LANDSCAPERIGHT"]
// 	| Page.Orientation["PORTRAIT"]
// 	| Page.Orientation["UPSIDEDOWN"];

export = Page;
