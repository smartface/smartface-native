import Page, { AbstractPage, IPage, LargeTitleDisplayMode, Orientation, PageOrientation, PresentationStyle } from '.';
import Application from '../../application';
import Contacts from '../../device/contacts/contacts.android';
import MultimediaAndroid from '../../device/multimedia/multimedia.android';
import Screen from '../../device/screen';
import Notifications from '../../global/notifications';
import { AndroidConfig, LayoutParams, RequestCodes, SystemServices } from '../../util';
import Color from '../color';
import FlexLayout from '../flexlayout';
import HeaderBarItem from '../headerbaritem';
import { PageEvents } from './page-events';
import SoundAndroid from '../../device/sound/sound.android';
import WebViewAndroid from '../webview/webview.android';
import DocumentPickerAndroid from '../../device/documentpicker/documentpicker.android';
import EmailComposerAndroid from '../emailcomposer/emailcomposer.android';
import ViewController from '../../util/Android/transition/viewcontroller';
import FragmentTransaction from '../../util/Android/transition/fragmenttransition';
import Image from '../image';
import SearchView from '../searchview';
import AndroidUnitConverter from '../../util/Android/unitconverter';
import { StatusBar } from '../../application/statusbar';
import { HeaderBar } from '../navigationcontroller/headerbar';
import { IController } from '../navigationcontroller';

const PorterDuff = requireClass('android.graphics.PorterDuff');
const OrientationType = require('../../device/screen/orientationtype');
const NativeView = requireClass('android.view.View');
const NativeSFR = requireClass(AndroidConfig.packageName + '.R');
const NativeSupportR = requireClass('androidx.appcompat.R');
const SFFragment = requireClass('io.smartface.android.sfcore.SFPage');
const NativeSpannableStringBuilder = requireClass('android.text.SpannableStringBuilder');
const NativeLocalNotificationReceiver = requireClass('io.smartface.android.notifications.LocalNotificationReceiver');
const NativeRunnable = requireClass('java.lang.Runnable');
const ToolbarLayoutParams = requireClass('androidx.appcompat.widget.Toolbar$LayoutParams');
const NativeImageButton = requireClass('android.widget.ImageButton');
const NativeTextButton = requireClass('android.widget.Button');
const NativeRelativeLayout = requireClass('android.widget.RelativeLayout');

enum PageOrientationAndroid {
  PORTRAIT = 1,
  UPSIDEDOWN = 2,
  AUTOPORTRAIT = 3,
  LANDSCAPELEFT = 4,
  LANDSCAPERIGHT = 8,
  AUTOLANDSCAPE = 12,
  AUTO = 15
}

const NativeOrientationDictionary = {
  [PageOrientationAndroid.PORTRAIT]: 1,
  [PageOrientationAndroid.UPSIDEDOWN]: 9,
  [PageOrientationAndroid.AUTOPORTRAIT]: 7,
  [PageOrientation.LANDSCAPELEFT]: 0,
  [PageOrientation.LANDSCAPERIGHT]: 8,
  [PageOrientationAndroid.AUTOLANDSCAPE]: 6,
  [PageOrientationAndroid.AUTO]: 13
};

export default class PageAndroid<TEvent extends string = PageEvents, TNative = __SF_UIViewController, TProps extends IPage = IPage> extends AbstractPage<TEvent | PageEvents, TNative, TProps> {
  getCurrentController(): IController {
    throw new Error('Method not implemented.');
  }
  show(params: {
    // for better performance. Remove if statement.
    // RequestCodes.Contacts.PICK_REQUEST_CODE  // deprecated
    controller: IController;
    animated: any;
    isComingFromPresent?: boolean | undefined;
    onCompleteCallback?: (() => void) | undefined; // deprecated
  }) {
    throw new Error('Method not implemented.');
  }
  static iOS: {
    LargeTitleDisplayMode: typeof LargeTitleDisplayMode;
    PresentationStyle: typeof PresentationStyle;
  };
  static Orientation: typeof Orientation;

  headerBar: HeaderBar;
  private _isShown: boolean;
  private _transitionViews: IPage['transitionViews'];
  private pageLayoutContainer: any;
  private toolbar: any;
  private isCreated = false;
  private optionsMenu: any = null;
  private actionBar: any = null;
  isSwipeViewPage = false;
  private _orientation: PageOrientation = PageOrientation.PORTRAIT;
  private rootLayout: FlexLayout;
  private _headerBarItems: HeaderBarItem[];
  private popUpBackPage: PageAndroid;
  private returnRevealAnimation: boolean;
  private _headerBarColor: Color;
  private _headerBarImage: Image;
  private _titleLayout?: HeaderBar['titleLayout'];
  private _onBackButtonPressed: IPage['android']['onBackButtonPressed'];
  private _transitionViewsCallback: IPage['android']['transitionViewsCallback'];
  private _borderVisibility = true;
  private _transparent = false;
  private _alpha = 1.0;
  private _headerBarTitleColor: Color;
  private _leftItemEnabled: boolean;
  private _leftItemColor = Color.WHITE;
  private _itemColor = Color.WHITE;
  private _headerBarLogo: Image;
  private _headerBarElevation: number;
  private _headerBarSubtitleColor: Color;
  private pageLayout: any;
  private _attributedTitle: any;
  private _attributedSubtitle: any;
  private _attributedTitleBuilder: any;
  private _attributedSubtitleBuilder: any;
  private _headerBarLogoEnabled = false;
  private _tag: any;
  private _headerBarLeftItem: HeaderBarItem | null = null;
  /**TProps
   * This is a workaround solution for swipeView-Android. The source is:
   * _pageInstances[intPosition].__onShowCallback?.();
   */
  __onShowCallback: IPage['onShow'];

  // protected _ios: PageIOSParams;
  // protected _android: PageAndroidParams & TNative;
  onLoad: () => void;
  onHide: () => void;
  onShow: () => void;
  onOrientationChange: (e: { orientation: PageOrientation[] }) => void;
  constructor(params?: Partial<TProps>) {
    super(params);

    this.pageLayoutContainer = AndroidConfig.activity.getLayoutInflater().inflate(NativeSFR.layout.page_container_layout, null);
    const pageLayout = this.pageLayoutContainer.findViewById(NativeSFR.id.page_layout);
    this.pageLayout = pageLayout;
    this.rootLayout = new FlexLayout({
      backgroundColor: Color.WHITE
    });
    (this.rootLayout as any).parent = this; //TODO: Might add parent as a member function
    pageLayout.addView(this.rootLayout.nativeObject);
    this.toolbar = this.pageLayoutContainer.findViewById(NativeSFR.id.toolbar);
    this.setCallbacks();
    this.isSwipeViewPage = false;
    this.headerBar = { android: {}, ios: {} } as any;
    this.__onShowCallback = () => {
      this.onShow?.();
      this.emit('show');
    };
    this.headerBarParams();
    this.nativeSpecificParams();
    this.layoutAssignments();
  }
  statusBar: StatusBar;
  parentController: IPage['parentController'];
  get orientation(): PageOrientation {
    return this._orientation;
  }
  set orientation(value: PageOrientation) {
    this._orientation = value;
    const nativeOrientation = NativeOrientationDictionary[this._orientation];
    if (typeof nativeOrientation !== 'number') {
      this._orientation = PageOrientation.PORTRAIT;
    }
    AndroidConfig.activity.setRequestedOrientation(nativeOrientation);
  }
  get layout(): IPage['layout'] {
    return this.rootLayout;
  }
  get isShown(): boolean {
    return this._isShown;
  }
  set isShown(value: boolean) {
    this._isShown = value;
  }
  get transitionViews(): IPage['transitionViews'] {
    return this._transitionViews;
  }
  set transitionViews(value: IPage['transitionViews']) {
    this._transitionViews = value;
  }
  present(params?: Parameters<IPage['present']>['0']) {
    if (!params) {
      return;
    }
    // TODO: Remove this custom implement to avoid smartafce Router bug!
    const controller = params;
    //@ts-ignore TODO: find a better fix
    params.__isPopupPage = true;

    ViewController.activateController(controller as any); //TODO: Check this out

    ViewController.setController({
      controller: controller as any, //params.controller,
      animation: !!params.animated,
      isComingFromPresent: true,
      onComplete: params.onComplete
    });
  }
  dismiss(params: Parameters<IPage['dismiss']>['0']) {
    const fragmentManager = AndroidConfig.activity.getSupportFragmentManager();
    if (!this.popUpBackPage) {
      return;
    }
    if (this.popUpBackPage.transitionViews) {
      this.popUpBackPage.returnRevealAnimation = true;
    }

    fragmentManager.popBackStack();
    if (!this.popUpBackPage.transitionViews) {
      const isPrevLayoutFocused = this.popUpBackPage.layout.nativeObject.isFocused();
      !isPrevLayoutFocused && this.popUpBackPage.layout.nativeObject.setFocusableInTouchMode(true); //This will control the back button press
      !isPrevLayoutFocused && this.popUpBackPage.layout.nativeObject.requestFocus();
    }
    FragmentTransaction.checkBottomTabBarVisible(this.popUpBackPage);
    (Application.currentPage as any) = this.popUpBackPage; //TODO: Find a better fix
    params?.onComplete();
  }
  private setCallbacks() {
    this._nativeObject = new SFFragment();
    this.nativeObject.setCallback({
      onCreate: () => {},
      onCreateView: () => {
        const layoutDirection = this.nativeObject.getResources().getConfiguration().getLayoutDirection();
        this.pageLayoutContainer.setLayoutDirection(layoutDirection);
        this.nativeObject.setHasOptionsMenu(true);
        AndroidConfig.activity.setSupportActionBar(this.toolbar);
        this.actionBar = AndroidConfig.activity.getSupportActionBar();
        if (!this.isCreated) {
          this.setHeaderBarDefaults();
          this.onLoad?.();
          this.emit('load');
          this.isCreated = true;
        }
        this.orientation = this._orientation;

        return this.pageLayoutContainer;
      },
      onViewCreated: (view: any, savedInstanceState: any) => {
        this.rootLayout.nativeObject.post(
          NativeRunnable.implement({
            run: () => {
              // TODO: isSwipeViewPage is never set to false. This will cause some unexpected behaviours.
              // Sample case: Add PageA to SwipeView. Remove PageA from SwipeView and push it to NavigationController.
              // onShow callback will never be triggered.
              if (this.isSwipeViewPage) {
                Application.currentPage = this as unknown as Page;
              }
              Application.registOnItemSelectedListener();

              if (!this.isSwipeViewPage) {
                this.onShow?.();
                this.emit('show');
              }

              const spratIntent = AndroidConfig.activity.getIntent();
              if (spratIntent.hasExtra(NativeLocalNotificationReceiver.NOTIFICATION_JSON) === true) {
                try {
                  const notificationJson = spratIntent.getStringExtra(NativeLocalNotificationReceiver.NOTIFICATION_JSON);
                  const parsedJson = JSON.parse(notificationJson);
                  Application.onReceivedNotification?.({
                    remote: parsedJson
                  });
                  Notifications.onNotificationClick?.(parsedJson);
                  //clears notification intent extras
                  spratIntent.removeExtra(NativeLocalNotificationReceiver.NOTIFICATION_JSON);
                  spratIntent.removeExtra(NativeLocalNotificationReceiver.NOTIFICATION_CLICKED);
                } catch (e) {
                  new Error('An error occured while getting notification json');
                }
              }
            }
          })
        );
      },
      onPause: () => {
        this.onHide?.();
        this.emit('hide');
      },
      onCreateOptionsMenu: (menu: any) => {
        if (!this.optionsMenu) {
          this.optionsMenu = menu;
        }
        if (this._headerBarItems.length > 0) {
          this.headerBar.setItems(this._headerBarItems);
        }
        return true;
      },
      onConfigurationChanged: () => {
        let tempOrientation: number[];
        switch (Screen.orientation) {
          case OrientationType.PORTRAIT:
            tempOrientation = Page.Orientation.PORTRAIT;
            break;
          case OrientationType.UPSIDEDOWN:
            tempOrientation = Page.Orientation.UPSIDEDOWN;
            break;
          case OrientationType.LANDSCAPELEFT:
            tempOrientation = Page.Orientation.LANDSCAPELEFT;
            break;
          case OrientationType.LANDSCAPERIGHT:
            tempOrientation = Page.Orientation.LANDSCAPERIGHT;
            break;
          default:
            tempOrientation = Page.Orientation.PORTRAIT;
        }
        this.onOrientationChange?.({ orientation: tempOrientation });
      },
      onCreateContextMenu: (menu: any) => {
        const items = this.contextMenu.items;
        const headerTitle = this.contextMenu.headerTitle;
        if (this.contextMenu.headerTitle !== '') {
          menu.setHeaderTitle(headerTitle);
        }
        for (let i = 0; i < items.length; i++) {
          const menuTitle = items[i].android.spanTitle();
          menu.add(0, i, 0, menuTitle);
        }
      },
      onContextItemSelected: (itemId: number) => {
        const items = this.contextMenu.items;
        if (items && itemId >= 0) {
          items[itemId].onSelected();
          return true;
        }
      },
      onActivityResult: (nativeRequestCode: number, nativeResultCode: number, data: any) => {
        const requestCode = nativeRequestCode;
        const resultCode = nativeResultCode;
        // todo: Define a method to register request and its callback
        // for better performance. Remove if statement.
        // RequestCodes.Contacts.PICK_REQUEST_CODE  // deprecated
        if (RequestCodes.Contacts.PICK_REQUEST_CODE === requestCode || RequestCodes.Contacts.PICKFROM_REQUEST_CODE === requestCode) {
          Contacts.onActivityResult(requestCode, resultCode, data);
        } else if (
          requestCode === RequestCodes.Multimedia.PICK_FROM_GALLERY ||
          requestCode === RequestCodes.Multimedia.CAMERA_REQUEST ||
          requestCode === RequestCodes.Multimedia.CropImage.CROP_CAMERA_DATA_REQUEST_CODE ||
          requestCode === RequestCodes.Multimedia.CropImage.CROP_GALLERY_DATA_REQUEST_CODE ||
          requestCode === RequestCodes.Multimedia.PICK_MULTIPLE_FROM_GALLERY
        ) {
          MultimediaAndroid.onActivityResult(requestCode, resultCode, data);
        } else if (requestCode === RequestCodes.Sound.PICK_SOUND) {
          SoundAndroid.onActivityResult(requestCode, resultCode, data);
        } else if (requestCode === RequestCodes.WebView.REQUEST_CODE_LOLIPOP || requestCode === RequestCodes.WebView.RESULT_CODE_ICE_CREAM) {
          WebViewAndroid.onActivityResult(requestCode, resultCode, data);
        } else if (requestCode === RequestCodes.EmailComposer.EMAIL_REQUESTCODE) {
          EmailComposerAndroid.onActivityResult(requestCode, resultCode, data);
        } else if (requestCode === RequestCodes.DocumentPicker.PICK_DOCUMENT_CODE) {
          DocumentPickerAndroid.onActivityResult(requestCode, resultCode, data);
        }
      }
    });
  }

  private setHeaderBarDefaults() {
    if (!this.skipDefaults) {
      this.headerBar.backgroundColor = Color.create('#00A1F1');
      this.headerBar.leftItemEnabled = true;
      this.headerBar.android.logoEnabled = false;
      this.headerBar.titleColor = Color.WHITE;
      this.headerBar.android.subtitleColor = Color.WHITE;
      this.headerBar.visible = true;
      this.headerBar.android.padding = { top: 0, bottom: 0, left: 0, right: 4 };
      this.headerBar.android.contentInsetStartWithNavigation = 0;
    }
  }

  private nativeSpecificParams() {
    const self = this;
    this.addAndroidProps({
      get onBackButtonPressed(): IPage['android']['onBackButtonPressed'] {
        return self._onBackButtonPressed;
      },
      set onBackButtonPressed(value: IPage['android']['onBackButtonPressed']) {
        self._onBackButtonPressed = value?.bind(self);
      },
      get transitionViewsCallback(): IPage['android']['transitionViewsCallback'] {
        return self._transitionViewsCallback;
      },
      set transitionViewsCallback(value: IPage['android']['transitionViewsCallback']) {
        self._transitionViewsCallback = value;
      }
    });
  }

  /**
   * TODO: Consider moving this whole headerbar to its own class
   */
  private headerBarParams() {
    const self = this;
    const headerbarParams = {
      get backgroundColor(): HeaderBar['backgroundColor'] {
        return self._headerBarColor;
      },
      set backgroundColor(value: HeaderBar['backgroundColor']) {
        self.toolbar.setBackgroundColor(value.nativeObject);
      },
      get backgroundImage(): HeaderBar['backgroundImage'] {
        return self._headerBarImage;
      },
      set backgroundImage(value: HeaderBar['backgroundImage']) {
        self._headerBarImage = value;
        self.toolbar.setBackground(value.nativeObject);
      },
      get titleLayout(): HeaderBar['titleLayout'] {
        return self._titleLayout;
      },
      set titleLayout(value: HeaderBar['titleLayout']) {
        if (self._titleLayout) {
          self.toolbar.removeView(self._titleLayout.nativeObject);
        }
        const toolbarParams = new ToolbarLayoutParams(8388611); // Gravity.START

        value && self.toolbar.addView(value.nativeObject, toolbarParams);
      },
      get borderVisibility(): HeaderBar['borderVisibility'] {
        return self._borderVisibility;
      },
      set borderVisibility(value: HeaderBar['borderVisibility']) {
        self._borderVisibility = value;
        self.actionBar.setElevation(value ? AndroidUnitConverter.dpToPixel(4) : 0);
      },
      get alpha(): HeaderBar['alpha'] {
        return self._alpha;
      },
      set alpha(value: HeaderBar['alpha']) {
        self._alpha = value;
        self.toolbar.setAlpha(value);
      },
      get transparent(): HeaderBar['transparent'] {
        return self._transparent;
      },
      set transparent(value: HeaderBar['transparent']) {
        if (value === self._transparent) {
          return;
        }
        const pageLayoutParams = self.pageLayout.getLayoutParams();
        if (self._transparent) {
          pageLayoutParams.removeRule(3); // 3 = RelativeLayout.BELOW
          self.headerBar.backgroundColor = Color.TRANSPARENT;
        } else {
          pageLayoutParams.addRule(3, NativeSFR.id.toolbar);
        }
        pageLayoutParams && self.pageLayout.setLayoutParams(pageLayoutParams);
      },
      get leftItemEnabled(): HeaderBar['leftItemEnabled'] {
        return self._leftItemEnabled;
      },
      set leftItemEnabled(value: HeaderBar['leftItemEnabled']) {
        self._leftItemEnabled = value;
        self.actionBar.setDisplayHomeAsUpEnabled(self._leftItemEnabled);
      },
      get height(): number {
        const resources = AndroidConfig.activityResources;
        return AndroidUnitConverter.pixelToDp(resources.getDimension(NativeSupportR.dimen.abc_action_bar_default_height_material));
      },
      get title(): HeaderBar['title'] {
        return self.toolbar.getTitle();
      },
      set title(value: HeaderBar['title']) {
        self.toolbar.setTitle(value || '');
      },
      get titleColor(): HeaderBar['titleColor'] {
        return self._headerBarTitleColor;
      },
      set titleColor(value: HeaderBar['titleColor']) {
        self._headerBarTitleColor = value;
        self.toolbar.setTitleTextColor(value.nativeObject);
      },
      get leftItemColor(): Color {
        return self._leftItemColor;
      },
      set leftItemColor(value: Color) {
        const drawable = self.toolbar.getNavigationIcon();
        drawable?.setColorFilter(value.nativeObject, PorterDuff.Mode.SRC_ATOP);
      },

      get itemColor(): HeaderBar['itemColor'] {
        return self._itemColor;
      },
      set itemColor(value: HeaderBar['itemColor']) {
        (self.headerBar as any).leftItemColor = value; //TODO: lefItemColor is an internal value. Consider opening it back.
        for (let i = 0; i < self._headerBarItems.length; i++) {
          self._headerBarItems[i].color = value;
        }
        (HeaderBarItem as any).itemColor = value; //TODO: itemColor is an internal property of HeaderBarItem. Consider moving it in HeaderBarItem.
      },
      get visible(): HeaderBar['visible'] {
        // View.VISIBLE
        return self.toolbar.getVisibility() === 0;
      },
      set visible(value: HeaderBar['visible']) {
        self.toolbar.setVisibility(value ? 0 : 8); // 0=View.VISIBLE 8=View.GONE
      },
      /**
       * Implemented for just SearchView
       */
      addViewToHeaderBar(view: SearchView) {
        self._headerBarItems.unshift(
          new HeaderBarItem({
            //@ts-ignore TODO: Add searchView as member property
            searchView: view,
            title: 'Search'
          })
        );
        self.headerBar.setItems(self._headerBarItems);
      },
      /**
       * Implemented for just SearchView
       */
      removeViewFromHeaderBar() {
        //TODO: Add searchView as member property to headerBar
        if (self._headerBarItems.length > 0 && (self._headerBarItems[0] as any).searchView) {
          self._headerBarItems = self._headerBarItems.splice(1, self._headerBarItems.length);
          self.headerBar.setItems(self._headerBarItems);
        }
      },
      setItems(items: HeaderBarItem[]) {
        if (!(items instanceof Array)) {
          return;
        } else if (items === null) {
          self.optionsMenu.clear();
          return;
        }
        self._headerBarItems = items;
        if (self.optionsMenu === null) {
          return;
        }
        // to fix supportRTL padding bug, we should set this manually.
        // @todo this values are hard coded. Find typed arrays

        self.optionsMenu.clear();
        let itemID = 1;
        // TODO: Type all this after HeaderBarItem is done.
        items.forEach((item: HeaderBarItem & Record<string, any>) => {
          let itemView: any;
          if (item.searchView) {
            itemView = item.searchView.nativeObject;
          } else {
            const badgeButtonLayoutParams = new NativeRelativeLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
            const nativeBadgeContainer = new NativeRelativeLayout(AndroidConfig.activity);
            nativeBadgeContainer.setLayoutParams(badgeButtonLayoutParams);
            if (item.customView) {
              const customViewContainer = new FlexLayout();
              const cParent = item.customView.getParent();
              if (cParent !== null) {
                (cParent as FlexLayout).removeAll(); //TODO: getParent should not return View
              }
              customViewContainer.addChild(item.customView);
              item.nativeObject = customViewContainer.nativeObject;
            } else if (item.image instanceof Image && (item.image?.nativeObject || (item.android as any).systemIcon)) {
              item.nativeObject = new NativeImageButton(AndroidConfig.activity);
            } else {
              item.nativeObject = new NativeTextButton(AndroidConfig.activity);
            }

            nativeBadgeContainer.addView(item.nativeObject);
            item.nativeObject.setBackground(null); // This must be set null in order to prevent unexpected size
            item.nativeBadgeContainer = nativeBadgeContainer;

            if (item.isBadgeEnabled !== false) {
              item.assignRules(item.badge);
              item.addToHeaderView(item.badge);
            }
            itemView = nativeBadgeContainer;
            item.itemView = itemView;
            item.setValues();
            item.nativeObject.setContentDescription(item.accessibilityLabel);
          }
          if (itemView) {
            item.menuItem = self.optionsMenu.add(0, itemID++, 0, item.title);
            item.menuItem.setEnabled(item.enabled);
            item.menuItem.setShowAsAction(2); // MenuItem.SHOW_AS_ACTION_ALWAYS

            // TODO: Beautify this implementation
            if (item.searchView) {
              itemView.setIconifiedByDefault(true);
              itemView.clearFocus();
            }

            item.menuItem.setActionView(itemView);
          }
        });
      },
      setLeftItem(leftItem: HeaderBarItem) {
        if (!leftItem || !(leftItem instanceof HeaderBarItem)) {
          throw new Error('leftItem must be null or an instance of UI.HeaderBarItem');
        }

        if (leftItem.image) {
          self._headerBarLeftItem = leftItem;
          //TODO: check out after headerbaritem is complete
          (self._headerBarLeftItem as any).isLeftItem = true;
          (self._headerBarLeftItem as any).actionBar = self.actionBar;
          if (self._headerBarLeftItem.image instanceof Image) {
            self.actionBar.setHomeAsUpIndicator(self._headerBarLeftItem.image.nativeObject);
          }
          self.actionBar.setHomeActionContentDescription(self._headerBarLeftItem.accessibilityLabel);
        } else {
          // null or undefined
          if (self._headerBarLeftItem) {
            (self._headerBarLeftItem as any).isLeftItem = false;
            (self._headerBarLeftItem as any).actionBar = null;
          }
          self._headerBarLeftItem = null;
          self.actionBar.setHomeActionContentDescription(null);
          self.actionBar.setHomeAsUpIndicator(null);
        }
      }
    };
    const headerBarAndroid = {
      get elevation(): HeaderBar['android']['elevation'] {
        return self._headerBarElevation === null ? AndroidUnitConverter.pixelToDp(self.actionBar.getElevation()) : self._headerBarElevation;
      },
      set elevation(value: HeaderBar['android']['elevation']) {
        if (value) {
          self._headerBarElevation = value;
          self.actionBar.setElevation(AndroidUnitConverter.dpToPixel(value));
        }
      },
      get subtitle(): HeaderBar['android']['subtitle'] {
        return self.toolbar.getSubTitle();
      },
      set subtitle(value: HeaderBar['android']['subtitle']) {
        self.toolbar.setSubTitle(value || '');
      },
      get subtitleColor(): HeaderBar['android']['subtitleColor'] {
        return self._headerBarSubtitleColor;
      },
      set subtitleColor(value: HeaderBar['android']['subtitleColor']) {
        value && self.toolbar.setSubtitleTextColor(value.nativeObject);
      },
      get logo(): HeaderBar['android']['logo'] {
        return self._headerBarLogo;
      },
      set logo(value: HeaderBar['android']['logo']) {
        if (value) {
          self._headerBarLogo = value;
          self.actionBar.setLogo(value.nativeObject);
        }
      },
      get contentInset(): HeaderBar['android']['contentInset'] {
        return {
          left: AndroidUnitConverter.pixelToDp(self.toolbar.getContentInsetStart()),
          right: AndroidUnitConverter.pixelToDp(self.toolbar.getContentInsetEnd())
        };
      },
      set contentInset(value: HeaderBar['android']['contentInset']) {
        // API Level 21+
        const cotentInsetStart = value?.left === undefined ? AndroidUnitConverter.pixelToDp(self.toolbar.getContentInsetStart()) : value.left;
        const cotentInsetEnd = value?.right === undefined ? AndroidUnitConverter.pixelToDp(self.toolbar.getContentInsetEnd()) : value.right;

        self.toolbar.setContentInsetsRelative(AndroidUnitConverter.dpToPixel(cotentInsetStart), AndroidUnitConverter.dpToPixel(cotentInsetEnd));
      },
      get contentInsetStartWithNavigation(): number {
        return AndroidUnitConverter.pixelToDp(self.toolbar.getContentInsetStartWithNavigation());
      },
      set contentInsetStartWithNavigation(value: number) {
        // API Level 24+
        self.toolbar.setContentInsetStartWithNavigation(AndroidUnitConverter.dpToPixel(value));
      },
      get padding(): HeaderBar['android']['padding'] {
        const top = AndroidUnitConverter.pixelToDp(self.toolbar.getPaddingTop());
        const left = AndroidUnitConverter.pixelToDp(self.toolbar.getPaddingLeft());
        const right = AndroidUnitConverter.pixelToDp(self.toolbar.getPaddingRight());
        const bottom = AndroidUnitConverter.pixelToDp(self.toolbar.getPaddingBottom());
        return { top, left, right, bottom };
      },
      set padding(value: HeaderBar['android']['padding']) {
        const _top = self.toolbar.getPaddingTop();
        const _left = self.toolbar.getPaddingLeft();
        const _right = self.toolbar.getPaddingRight();
        const _bottom = self.toolbar.getPaddingBottom();
        let { top, left, right, bottom } = value || {};
        top = top ? AndroidUnitConverter.dpToPixel(top) : _top;
        left = left ? AndroidUnitConverter.dpToPixel(left) : _left;
        right = right ? AndroidUnitConverter.dpToPixel(right) : _right;
        bottom = bottom ? AndroidUnitConverter.dpToPixel(bottom) : _bottom;
        self.toolbar.setPadding(left, top, right, bottom);
      },

      get attributedTitle(): HeaderBar['android']['attributedTitle'] {
        return self._attributedTitle;
      },
      set attributedTitle(value: HeaderBar['android']['attributedTitle']) {
        self._attributedTitle = value;
        if (!value) {
          return;
        }
        if (self._attributedTitleBuilder) {
          self._attributedTitleBuilder.clear();
        } else {
          self._attributedTitleBuilder = new NativeSpannableStringBuilder();
        }

        self._attributedTitle.setSpan(self._attributedTitleBuilder);
        self.toolbar.setTitle(self._attributedTitleBuilder);
      },

      get attributedSubtitle(): HeaderBar['android']['attributedSubtitle'] {
        return self._attributedSubtitle;
      },
      set attributedSubtitle(value: HeaderBar['android']['attributedSubtitle']) {
        if (!value) {
          return;
        }
        if (self._attributedSubtitleBuilder) {
          self._attributedSubtitleBuilder.clear();
        } else {
          self._attributedSubtitleBuilder = new NativeSpannableStringBuilder();
        }
        self._attributedSubtitleBuilder.setSpan(self._attributedSubtitleBuilder);
        self.toolbar.setSubtitle(self._attributedSubtitleBuilder);
      },
      get logoEnabled(): HeaderBar['android']['logoEnabled'] {
        return self._headerBarLogoEnabled;
      },
      set logoEnabled(value: HeaderBar['android']['logoEnabled']) {
        if(value)
          self._headerBarLogoEnabled = value;
        self.actionBar.setDisplayUseLogoEnabled(self._headerBarLogoEnabled);
      },
      get tag(): any {
        return self._tag;
      },
      set tag(value: any) {
        self._tag = value;
      }
    };

    this.headerBar = Object.assign(this.headerBar, headerbarParams);
    Object.assign(this.headerBar.android, headerBarAndroid);
  }

  private layoutAssignments() {
    // Added to solve AND-2713 bug.
    this.layout.nativeObject.setOnLongClickListener(
      NativeView.OnLongClickListener.implement({
        onLongClick: function () {
          return true;
        }
      })
    );

    this.layout.nativeObject.setOnFocusChangeListener(
      NativeView.OnFocusChangeListener.implement({
        onFocusChange: function (view, hasFocus) {
          if (hasFocus) {
            const focusedView = AndroidConfig.activity.getCurrentFocus();
            if (!focusedView) {
              return;
            }
            const windowToken = focusedView.getWindowToken();

            const inputMethodManager = AndroidConfig.getSystemService(SystemServices.INPUT_METHOD_SERVICE, SystemServices.INPUT_METHOD_MANAGER);
            inputMethodManager.hideSoftInputFromWindow(windowToken, 0);
          }
        }
      })
    );
    this.layout.nativeObject.setFocusable(true);
    this.layout.nativeObject.setFocusableInTouchMode(true);
  }
}
