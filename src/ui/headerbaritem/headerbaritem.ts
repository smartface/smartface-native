import AttributedString from '../attributedstring';
import Image from '../image';
import Font from '../font';
import Color from '../color';
import Badge from '../badge';
import { Point2D } from '../../primitive/point2d';
import View from '../view';
import NativeComponent from '../../core/native-component';
import { INativeComponent } from '../../core/inative-component';
import { IImage } from '../image/image';

/**
 * Defines system-supplied images for bar button items. [Apple Documentation](https://developer.apple.com/documentation/uikit/uibarbuttonsystemitem?language=objc)
 *
 * @enum {Number} UI.HeaderBarItem.iOS.SystemItem
 * @since 3.2.1
 * @ios
 */
export enum SystemItem {
  /**
   * The system Done button. Localized.
   *
   * @property {Number} DONE
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  DONE = 0,
  /**
   * The system Cancel button. Localized.
   *
   * @property {Number} CANCEL
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  CANCEL = 1,
  /**
   * The system Edit button. Localized.
   *
   * @property {Number} EDIT
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  EDIT = 2,
  /**
   * The system Save button. Localized.
   *
   * @property {Number} SAVE
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  SAVE = 3,
  /**
   * The system plus button containing an icon of a plus sign.
   *
   * @property {Number} ADD
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  ADD = 4,
  /**
   * Blank space to add between other items. The space is distributed equally between the other items. Other item properties are ignored when this value is set.
   *
   * @property {Number} FLEXIBLESPACE
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  FLEXIBLESPACE = 5,
  /**
   * Blank space to add between other items. Only the width property is used when this value is set.
   *
   * @property {Number} FIXEDSPACE
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  FIXEDSPACE = 6,
  /**
   * The system compose button.
   *
   * @property {Number} COMPOSE
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  COMPOSE = 7,
  /**
   * The system reply button.
   *
   * @property {Number} REPLY
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  REPLY = 8,
  /**
   * The system action button.
   *
   * @property {Number} ACTION
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  ACTION = 9,
  /**
   * The system organize button.
   *
   * @property {Number} ORGANIZE
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  ORGANIZE = 10,
  /**
   * The system bookmarks button.
   *
   * @property {Number} BOOKMARKS
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  BOOKMARKS = 11,
  /**
   * The system search button.
   *
   * @property {Number} SEARCH
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  SEARCH = 12,
  /**
   * The system refresh button.
   *
   * @property {Number} REFRESH
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  REFRESH = 13,
  /**
   * The system stop button.
   *
   * @property {Number} STOP
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  STOP = 14,
  /**
   * The system camera button.
   *
   * @property {Number} CAMERA
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  CAMERA = 15,
  /**
   * The system trash button.
   *
   * @property {Number} TRASH
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  TRASH = 16,
  /**
   * The system play button.
   *
   * @property {Number} PLAY
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  PLAY = 17,
  /**
   * The system pause button.
   *
   * @property {Number} PAUSE
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  PAUSE = 18,
  /**
   * The system rewind button.
   *
   * @property {Number} REWIND
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  REWIND = 19,
  /**
   * The system fast forward button.
   *
   * @property {Number} FASTFORWARD
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  FASTFORWARD = 20,
  /**
   * The system undo button.
   *
   * @property {Number} UNDO
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  UNDO = 21,
  /**
   * The system redo button.
   *
   * @property {Number} REDO
   * @static
   * @ios
   * @readonly
   * @since 3.2.1
   */
  RED = 22
}

/**
 * @class UI.HeaderBarItem
 * @since 0.1
 *
 * HeaderBarItem is a button object that can be shown in header bar of a page.
 * Items set to header bar will be shown on the right side of header bar. You
 * can enable/disable items and listen press event.
 *
 *     @example
 *     import UI from '@smartface/native/ui';
 *     var myPage = new UI.Page();
 *     var myItem = new UI.HeaderBarItem({
 *         title: "Smartface",
 *         onPress: function() {
 *             console.log("Smartface item pressed!");
 *         }
 *     });
 *     myPage.headerBar.setItems([myItem]);
 */
export interface IHeaderBarItem extends INativeComponent {
  /**
   * Gets/sets title of header bar item. If image is not set, title will be
   * shown in the header bar.
   *
   * Title won't show if item is set as left item to header bar.
   *
   * @property {String} title
   * @android
   * @ios
   * @since 0.1
   */
  title: string;
  /**
   * Gets/sets size of header bar item. Size must be obtained life cycle of page. Otherwise returning value will be undefined.
   *
   * @property {Object} size
   * @property {Number} size.width
   * @property {Number} size.height
   * @readonly
   * @android
   * @ios
   * @since 4.0.1
   */
  readonly size:
    | {
        readonly width: number;
        readonly height: number;
      }
    | undefined;
  android: Partial<{
    /**
     * Gets/sets attributed title of header bar item. If image is not set, attributed title will be
     * shown in the header bar.
     *
     * Attributed title won't show if item is set as left item to header bar.
     *
     * @property {UI.AttributedString} attributedTitle
     * @android
     * @since 4.0.0
     */
    attributedTitle: AttributedString;

    /**
     * Gets/sets the system icon  of header bar item. Built-in icons can be set with the corresponding systemIcon value.
     *
     *     @example
     *     var myItem = new HeaderBarItem({
     *         android: {
     *             systemIcon: 17301545   // OR 'ic_dialog_email'
     *         },
     *         color: Color.RED,
     *         onPress: function() {
     *             console.log("You pressed Done item!");
     *         }
     *     });
     *     this.headerBar.setItems([myItem]);
     *
     * @property {Number | String} systemIcon
     * @android
     * @see https://developer.android.com/reference/android/R.drawable
     * @since 4.0.2
     */
    systemIcon: number | string;
    /**
		 * Gets/sets elevation of the header bar.
		 * @android
		 * @example
		 * ```import Page from '@smartface/native/ui/page';
					const myPage = new Page();
					myPage.headerBar.android.elevation = 10;
					```
		 */
    elevation: number;
    /**
     * Gets/sets the content inset of headerbar. Minimum API Level 21 required.
     * The content inset affects the valid area for Headerbar content other than the navigation button and menu.
     * Insets define the minimum margin for these custom views like titleLayout and can be used to effectively align HeaderBar content along well-known gridlines.
     */
    contentInset: { left: number; right: number };
    /**
     * Gets/sets the logo visibility of the HeaderBar. If logo is disable, logo image will newer shown. This property will work only for Android.
     * @default false
     * @android
     */
    logoEnabled: boolean;
    /**
           * Gets/sets subtitle of the header bar. If not set subtitle will not show. This property will work only for Android.
           * @example
           * ```import Page from '@smartface/native/ui/page';
              const myPage = new Page();
              myPage.headerBar.android.subtitle = 'Hello from HeaderBar Subtitle!';
              ```
           */
    subtitle: string;
    /**
     * Gets/sets titleFont of header bar subtitle.
     * @android
     */
    subtitleFont: Font;
  }>;
  ios: Partial<{
    /**
     * Gets systemItem of header bar item. SystemItem only set in constructor of headerBarItem.
     *
     *     @example
     *     var myItem = new HeaderBarItem({
     *         ios:{
     *             systemItem : HeaderBarItem.iOS.SystemItem.TRASH
     *         },
     *         onPress: function() {
     *             console.log("You pressed TRASH item!");
     *         }
     *     });
     *     this.headerBar.setItems([myItem]);
     *
     * @property {UI.HeaderBarItem.iOS.SystemItem} systemItem
     * @readonly
     * @ios
     * @since 3.2.1
     */
    systemItem: SystemItem;
    /**
     * Gets/sets font of header bar item.
     *
     * @property {UI.Font} font
     * @ios
     * @since 4.0.0
     */
    font: Font;
    /**
     * A Boolean value that indicates whether the header bar is translucent. For iOS, you should access this property from page.parentController.
     * @ios
     * @default false
     */
    translucent: boolean;
    /**
     * Gets/sets titleFont of header bar title. You should access this property from page.parentController.
     */
    titleFont: Font;
    /**
     * Gets/sets backBarButtonItem of the header bar. When it set, it will change the next page's back button appearance.
     * This change can be observed only on the pages that added to navigator style router.
     * Default value is undefined, it gets title value from previous page's header bar title property.
     * Setting onPress callback of HeaderBarItem will not effect backBarButtonItem's onPress behaviour.
     * This property will work only for iOS. You should access this property from page.parentController
     */
    backBarButtonItem: IHeaderBarItem;
  }>;
  /**
   * Gets/sets Image Object or Image Path of header bar item. Image is set to null as default.
   *
   * If image is already set on HeaderBarItem, title should not be set for some native behaviours.
   *
   * @property {UI.Image | String} image
   * @android
   * @ios
   * @since 0.1
   */
  image: IImage | string | null;
  /**
   * Gets/sets customView of header bar item. Default is undefined. In Android, customView cannot be assigned as {@link UI.HeaderBar#setLeftItem left item}.
   * Given customView overrides following HeaderBarItem properties; image, title, font, systemIcon and systemItem.
   *
   * @property {UI.View} customView
   * @android
   * @ios
   * @since 4.1.5
   */
  customView: View | undefined;
  /**
   * Gets/sets enabled status of header bar item. Enabled is set to true as
   * default.
   *
   * @property {Boolean} enabled
   * @android
   * @ios
   * @since 0.1
   */
  enabled: boolean;
  /**
   * This method returns an object that defines view location on screen.
   *
   * @method getScreenLocation
   * @return {Object} location
   * @return {Number} location.x
   * @return {Number} location.y
   * @android
   * @ios
   * @since 3.2.0
   */
  getScreenLocation(): Point2D;
  /**
   * Gets/sets callback for press event. If enabled property is set to false
   * press callback won't be called.
   *
   * @property {Function} onPress
   * @android
   * @ios
   * @since 0.1
   */
  onPress: (() => void) | null;
  /**
   * Gets/sets color of the item's text/image.
   *
   * @property {UI.Color} color
   * @android
   * @ios
   * @since 0.1
   */
  color: Color | null;
  /**
   * Gets badge of header bar item. Badge that is displayed in the upper-right corner of the item with a surrounding red oval. Badge should not be given in constructor. In Android,
   * badge does not appear when assigned to {@link UI.HeaderBar#setLeftItem left item} of HeaderBar.
   *
   *     @example
   *     var headerBarItem = new HeaderBarItem();
   *     headerBarItem.title = "Item";
   *     headerBarItem.badge.text = "5";
   *     headerBarItem.badge.visible = true;
   *     page.headerBar.setItems([headerBarItem]);
   *
   * @property {UI.Badge} badge
   * @android
   * @ios
   * @readonly
   * @since 3.0.0
   */
  badge: Badge;
  /**
   * A content description briefly describes the view. VoiceOver will read this string when a user selects the associated element.
   *
   * @property {String} accessibilityLabel
   * @android
   * @ios
   * @member UI.HeaderBarItem
   * @since 4.4.1
   */
  accessibilityLabel: string;
}

export declare class AbstractHeaderBarItem extends NativeComponent implements IHeaderBarItem {
  protected createNativeObject();
  constructor(params?: Partial<AbstractHeaderBarItem>);
  title: string;
  readonly size: {
    readonly width: number;
    readonly height: number;
  };
  android: Partial<{
    attributedTitle: AttributedString;
    systemIcon: number | string;
    elevation: number;
    contentInset: { left: number; right: number };
    logoEnabled: boolean;
    subtitle: string;
    subtitleFont: Font;
  }>;
  ios: Partial<{
    systemItem: SystemItem;
    font: Font;
    translucent: boolean;
    titleFont: Font;
    backBarButtonItem: IHeaderBarItem;
  }>;
  static iOS: {
    SystemItem: typeof SystemItem;
  };
  image: IImage | string | null;
  customView: View;
  enabled: boolean;
  getScreenLocation(): Point2D;
  onPress: (() => void) | null;
  color: Color | null;
  badge: Badge;
  accessibilityLabel: string;
}
