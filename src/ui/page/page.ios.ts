import { AbstractPage, IPage, LargeTitleDisplayMode, PageOrientation, PresentationStyle } from './page';
import Screen from '../../device/screen';
import { OrientationType } from '../../device/screen/screen';
import copyObjectPropertiesWithDescriptors from '../../util/copyObjectPropertiesWithDescriptors';
import Invocation from '../../util/iOS/invocation';
import HeaderBarItem from '../headerbaritem';
import { IController } from '../navigationcontroller/navigationcontroller';
import { HeaderBar } from '../navigationcontroller/headerbar';
import { PageEvents } from './page-events';
import FlexLayoutIOS from '../flexlayout/flexlayout.ios';
import { IFlexLayout } from '../flexlayout/flexlayout';
import StatusBar from '../../application/statusbar';
import { YGUnit } from '../shared/ios/yogaenums';

const NativeOrientation = {
  PORTRAIT: [PageOrientation.PORTRAIT],
  UPSIDEDOWN: [PageOrientation.PORTRAITUPSIDEDOWN],
  AUTOPORTRAIT: [PageOrientation.PORTRAIT, PageOrientation.PORTRAITUPSIDEDOWN],
  LANDSCAPELEFT: [PageOrientation.LANDSCAPELEFT],
  LANDSCAPERIGHT: [PageOrientation.LANDSCAPERIGHT],
  AUTOLANDSCAPE: [PageOrientation.LANDSCAPELEFT, PageOrientation.LANDSCAPERIGHT],
  AUTO: [PageOrientation.PORTRAIT, PageOrientation.PORTRAITUPSIDEDOWN, PageOrientation.LANDSCAPELEFT, PageOrientation.LANDSCAPERIGHT]
};

const NativeOrientationMapping = {
  [PageOrientation.PORTRAIT]: NativeOrientation.PORTRAIT,
  [PageOrientation.PORTRAITUPSIDEDOWN]: NativeOrientation.UPSIDEDOWN,
  [PageOrientation.AUTO]: NativeOrientation.AUTO,
  [PageOrientation.LANDSCAPELEFT]: NativeOrientation.LANDSCAPELEFT,
  [PageOrientation.LANDSCAPERIGHT]: NativeOrientation.LANDSCAPERIGHT,
  [PageOrientation.UNKNOWN]: NativeOrientation.AUTO,
  [PageOrientation.AUTOLANDSCAPE]: NativeOrientation.AUTOLANDSCAPE
};

export default class PageIOS<TEvent extends string = PageEvents, TNative extends { [key: string]: any } = __SF_UIViewController, TProps extends IPage = IPage>
  extends AbstractPage<TEvent | PageEvents, TNative, TProps>
  implements IPage<TEvent | PageEvents>
{
  headerBar?: HeaderBar | undefined;
  private routerPath: any;
  protected pageView: IFlexLayout;
  private _safeAreaLayoutMode: IPage['ios']['safeAreaLayoutMode'];
  private _safeAreaPaddingObject: { top: number; bottom: number; left: number; right: number };
  private _transitionViews: IPage['transitionViews'];
  private _titleView: HeaderBar['titleLayout'];
  private _presentationStyle: number;
  private _largeTitleDisplayMode: number;
  private _leftItem: any;
  private _orientationNative: PageOrientation[];
  private _orientation: PageOrientation;
  private _formerSafeAreaPaddingTop: number;
  private _formerSafeAreaPaddingBottom: number;
  private _formerSafeAreaPaddingLeft: number;
  private _formerSafeAreaPaddingRight: number;
  constructor(params?: Partial<TProps>) {
    super(params);
    this.nativeObject.automaticallyAdjustsScrollViewInsets = false;
    this.setNativeParams();
    this.initPageNativeEvents();
    this.initPageEvents();

    this.pageView.applyLayout = () => {
      this.pageView.nativeObject.yoga.applyLayoutPreservingOrigin(true);
    };
  }

  protected createNativeObject() {
    return new __SF_UIViewController();
  }
  getCurrentController(): IController {
    throw new Error('Method not implemented.');
  }
  show(params: { controller: IController; animated: any; isComingFromPresent?: boolean | undefined; onCompleteCallback?: (() => void) | undefined }) {
    throw new Error('Method not implemented.');
  }
  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this._safeAreaPaddingObject = { top: 0, bottom: 0, left: 0, right: 0 };
    this._presentationStyle = 0;
    this._largeTitleDisplayMode = 0;
    this.orientation = PageOrientation.PORTRAIT;
    this.pageView = new FlexLayoutIOS();
    this.setLayoutParams();
    this.routerPath = null;
    this.statusBar = StatusBar;
    this._formerSafeAreaPaddingRight = 0;
    this._formerSafeAreaPaddingBottom = 0;
    this._formerSafeAreaPaddingLeft = 0;
    this._formerSafeAreaPaddingTop = 0;
    super.preConstruct(params);
    this.headerBarProperties();
  }
  onLoad(): void {}
  onShow(): void {}
  onHide: () => void;
  onOrientationChange: (e: { orientation: PageOrientation }) => void;

  parentController: IPage['parentController'];

  get layout(): IPage['layout'] {
    return this.pageView;
  }
  statusBar: IPage['statusBar'];

  get orientation() {
    return this._orientation;
  }
  set orientation(value) {
    this._orientation = value;
    this._orientationNative = NativeOrientationMapping[value];
    this.nativeObject.orientations = NativeOrientationMapping[value];
  }
  get transitionViews(): IPage['transitionViews'] {
    return this._transitionViews;
  }
  set transitionViews(value: IPage['transitionViews']) {
    this._transitionViews = value;
  }

  present(params?: Parameters<IPage['present']>['0']): void {
    if (typeof params === 'object') {
      const controller = params.controller;
      const animation = params.animated;
      const onComplete = params.onComplete;

      if (typeof controller === 'object') {
        const _animationNeed = animation;
        const _completionBlock = onComplete;

        const controllerToPresent = (controller as any)?.nativeObject;
        if (controllerToPresent) {
          if (typeof this.transitionViews !== 'undefined') {
            controllerToPresent.setValueForKey(true, 'isHeroEnabled');
          }

          this.nativeObject.presentViewController(controllerToPresent, _completionBlock, _animationNeed);
        }
      }
    }
  }

  dismiss(params?: Parameters<IPage['dismiss']>['0']) {
    if (typeof params === 'object') {
      const onComplete = params.onComplete;
      const animation = params?.animated;
      const _completionBlock = onComplete;
      this.nativeObject.dismissViewController(_completionBlock, animation);
    }
  }

  private checkOrientation() {
    const currentOrientation = __SF_UIApplication.sharedApplication().statusBarOrientation;
    if (this._orientationNative.indexOf(currentOrientation) === -1) {
      __SF_UIDevice.changeOrientation(currentOrientation); //Workaround for IOS-2580
      __SF_UIDevice.changeOrientation(this.orientation[0]);
      this.layout.applyLayout();
    }
  }

  /**
   * Here, this method is always triggered by the native side and it manipulates the paddingLeft etc..
   * Therefore, we hold all the padding values before and subtract them beforehand so that
   * padding wouldn't always increase. Then we increase our padding relative to the safearea(notch etc.).
   * */
  private calculateSafeAreaPaddings(paddingObject: PageIOS['_safeAreaPaddingObject']) {
    let currentPaddingTop = this.pageView.paddingTop || 0;
    let currentPaddingBottom = this.pageView.paddingBottom || 0;
    let currentPaddingLeft = this.pageView.paddingLeft || 0;
    let currentPaddingRight = this.pageView.paddingRight || 0;

    currentPaddingTop = currentPaddingTop - this._formerSafeAreaPaddingTop + paddingObject.top;
    currentPaddingBottom = currentPaddingBottom - this._formerSafeAreaPaddingBottom + paddingObject.bottom;
    currentPaddingLeft = currentPaddingLeft - this._formerSafeAreaPaddingLeft + paddingObject.left;
    currentPaddingRight = currentPaddingRight - this._formerSafeAreaPaddingRight + paddingObject.right;

    this.pageView.paddingTop = currentPaddingTop;
    this.pageView.paddingBottom = currentPaddingBottom;
    this.pageView.paddingLeft = currentPaddingLeft;
    this.pageView.paddingRight = currentPaddingRight;

    this._formerSafeAreaPaddingTop = paddingObject.top;
    this._formerSafeAreaPaddingBottom = paddingObject.bottom;
    this._formerSafeAreaPaddingLeft = paddingObject.left;
    this._formerSafeAreaPaddingRight = paddingObject.right;

    this.calculatePosition();
  }

  private calculatePosition() {
    this.layout.applyLayout();
  }

  private getParentViewController(controller: __SF_UIViewController) {
    const parent = Invocation.invokeInstanceMethod(controller, 'parentViewController', [], 'NSObject') as __SF_UIViewController;
    return parent ? this.getParentViewController(parent) : controller;
  }

  private setLayoutParams() {
    const pageLayout = this.pageView;
    const layoutParams = {
      get padding() {
        return pageLayout.nativeObject.yoga.getYGValueForKey('padding');
      },
      set padding(value: number) {
        pageLayout.paddingTop = pageLayout.paddingTop ?? value;
        pageLayout.paddingBottom = pageLayout.paddingBottom ?? value;
        pageLayout.paddingLeft = pageLayout.paddingLeft ?? value;
        pageLayout.paddingRight = pageLayout.paddingRight ?? value;
        pageLayout.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, 'padding');
      }
    };
    copyObjectPropertiesWithDescriptors(pageLayout, layoutParams);
  }

  private setNativeParams() {
    const self = this;
    const ios: IPage['ios'] = {
      get safeAreaLayoutMode(): IPage['ios']['safeAreaLayoutMode'] {
        return self._safeAreaLayoutMode;
      },
      set safeAreaLayoutMode(value: IPage['ios']['safeAreaLayoutMode']) {
        if (self._safeAreaLayoutMode !== value) {
          // Prevents unnecessary applyLayout() calls.
          self._safeAreaLayoutMode = value;
          if (self._safeAreaLayoutMode === true) {
            self.calculateSafeAreaPaddings(self._safeAreaPaddingObject);
          } else {
            self.calculateSafeAreaPaddings({
              top: 0,
              bottom: 0,
              left: 0,
              right: 0
            });
          }
          self.layout.applyLayout();
        }
      },
      get presentationStyle(): IPage['ios']['presentationStyle'] {
        return self._presentationStyle;
      },
      set presentationStyle(value: IPage['ios']['presentationStyle']) {
        if (value) {
          self._presentationStyle = value;
          self.nativeObject.modalTransitionStyle = value;
        }
      },
      onSafeAreaPaddingChange: undefined
    };
    this.addIOSProps(ios);
  }

  private initPageNativeEvents() {
    this.pageView.nativeObject.addObserver(() => {
      this.layout.nativeObject.endEditing(true);
    }, __SF_UIApplicationWillResignActiveNotification);
    this.nativeObject.onViewSafeAreaInsetsDidChange = (e) => {
      this._safeAreaPaddingObject = e;
      if (this._safeAreaLayoutMode) {
        this.calculateSafeAreaPaddings(this._safeAreaPaddingObject);
      }
      this.emit('safeAreaPaddingChange', this._safeAreaPaddingObject);
      this.ios.onSafeAreaPaddingChange?.(this._safeAreaPaddingObject);
    };

    this.nativeObject.onViewLoad = () => {
      this.pageView.nativeObject.backgroundColor = __SF_UIColor.whiteColor();
      return this.pageView.nativeObject;
    };

    this.nativeObject.onViewLayoutSubviews = () => {
      this.calculatePosition();
    };

    this.nativeObject.onViewDidAppear = () => {
      if (this.nativeObject.navigationController) {
        //COR-1627 for iOS 11 badge
        const subviews: any[] = Invocation.invokeInstanceMethod(this.nativeObject.navigationController.navigationBar, 'subviews', [], 'id') as unknown as any[];
        for (let i = 0; i < subviews.length; i++) {
          if (subviews[i].constructor.name === '_UINavigationBarContentView') {
            const argConstant = new Invocation.Argument({
              type: 'BOOL',
              value: false
            });
            Invocation.invokeInstanceMethod(subviews[i], 'setClipsToBounds:', [argConstant]);
            break;
          }
        }
      }
    };
  }

  private initPageEvents() {
    this.nativeObject.viewWillTransition = () => {
      let tempOrientation: PageOrientation;
      switch (Screen.orientation) {
        case OrientationType.PORTRAIT:
          tempOrientation = PageOrientation.PORTRAIT;
          break;
        case OrientationType.UPSIDEDOWN:
          tempOrientation = PageOrientation.PORTRAITUPSIDEDOWN;
          break;
        case OrientationType.LANDSCAPELEFT:
          tempOrientation = PageOrientation.LANDSCAPELEFT;
          break;
        case OrientationType.LANDSCAPERIGHT:
          tempOrientation = PageOrientation.LANDSCAPERIGHT;
          break;
        default:
          tempOrientation = PageOrientation.UNKNOWN;
      }
      const callbackParam = {
        orientation: tempOrientation
      };
      this.emit('orientationChange', callbackParam);
      this.onOrientationChange?.(callbackParam);
    };
    this.nativeObject.onLoad = () => {
      this.onLoad?.();
      this.emit('load');
    };

    this.nativeObject.onShow = () => {
      __SF_UIView.animation(0, 0, () => {
        this.layout.nativeObject?.endEditing(true);
      });
      this.checkOrientation();
      this.onShow?.();

      this.emit('show');
    };

    this.nativeObject.onHide = () => {
      __SF_UIView.animation(0, 0, () => {
        this.layout.nativeObject?.endEditing(true);
      });
      this.onHide?.();
      this.emit('hide');
    };

    this.nativeObject.dismissStart = () => {
      this.emit('dismissStart', { target: 'bottomSheet' });
    };
    this.nativeObject.dismissComplete = () => {
      this.emit('dismissComplete', { target: 'bottomSheet' });
    };

    this.nativeObject.dismissCancel = () => {
      this.emit('dismissCancel', { target: 'bottomSheet' });
    };
  }

  private checkIfSearchviewIsSubview(nativeObject: any) {
    //Workaround Bug : IOS-2707
    for (const index in nativeObject.subviews) {
      if (nativeObject.subviews[index].constructor.name === 'SMFUISearchBar') {
        return true;
      }
      if (this.checkIfSearchviewIsSubview(nativeObject.subviews[index])) {
        return true;
      }
    }
    return false;
  }

  /**
   * TODO: Kind of messy code but couldn't find a better way.
   * It basically re-uses everything this.headerBar has in this.ios.navigationItem
   * Also iOS only properties are unified in this one.
   */
  private headerBarProperties() {
    const self = this;
    const headerBar = {
      get title(): HeaderBar['title'] {
        return self.nativeObject.navigationItem.title;
      },
      set title(value: HeaderBar['title']) {
        self.nativeObject.navigationItem.title = value;
      },
      get titleLayout(): HeaderBar['titleLayout'] {
        return self._titleView;
      },
      set titleLayout(value: HeaderBar['titleLayout']) {
        if (typeof value === 'object') {
          self._titleView = value;
          self._titleView.applyLayout();

          // These calls may need for different cases.
          if (self.checkIfSearchviewIsSubview(self._titleView.nativeObject)) {
            //Workaround Bug : IOS-2707
            self._titleView.nativeObject.layoutIfNeeded();
          }
          // _titleView.nativeObject.translatesAutoresizingMaskIntoConstraints = true;
          self._titleView.nativeObject.sizeToFit();
          self.nativeObject.navigationItem.titleView = self._titleView.nativeObject;
        } else {
          self.nativeObject.navigationItem.titleView = undefined;
        }
      },
      get leftItemEnabled(): HeaderBar['leftItemEnabled'] {
        return !self.nativeObject.navigationItem.hidesBackButton;
      },
      set leftItemEnabled(value: HeaderBar['leftItemEnabled']) {
        self.nativeObject.navigationItem.hidesBackButton = !value;
        self.nativeObject.navigationItem.leftBarButtonItem = self._leftItem;
      },
      setItems(value: Parameters<HeaderBar['setItems']>['0']) {
        //Bug : IOS-2399 for reverse
        const nativeObjectArray: any[] = value.map((item) => item.nativeObject).reverse();
        self.nativeObject.navigationItem.rightBarButtonItems = nativeObjectArray;
      },
      setLeftItem(value: Parameters<HeaderBar['setLeftItem']>['0']) {
        if (value instanceof HeaderBarItem) {
          if (self.ios.navigationItem?.leftItemEnabled) {
            self.nativeObject.navigationItem.leftBarButtonItem = value.nativeObject;
          }
          self._leftItem = value.nativeObject;
        } else {
          self.nativeObject.navigationItem.leftBarButtonItem = null;
        }
      }
    };
    const headerBarIOS = {
      get largeTitleDisplayMode(): HeaderBar['ios']['largeTitleDisplayMode'] {
        return self._largeTitleDisplayMode;
      },
      set largeTitleDisplayMode(value: HeaderBar['ios']['largeTitleDisplayMode']) {
        if (__SF_UINavigationItem.instancesRespondToSelector('largeTitleDisplayMode')) {
          if (value) {
            self._largeTitleDisplayMode = value;
            self.nativeObject.navigationItem.largeTitleDisplayMode = self._largeTitleDisplayMode;
          }
        }
      },
      get backBarButtonItem(): HeaderBar['ios']['backBarButtonItem'] {
        let retval: HeaderBarItem | undefined = undefined;

        const nativeObject = self.nativeObject.navigationItem.backBarButtonItem;

        if (nativeObject) {
          const backBarButtonItem = new HeaderBarItem();
          backBarButtonItem.nativeObject = nativeObject;
          backBarButtonItem.nativeObject.target = nativeObject;
          retval = backBarButtonItem;
        }

        return retval;
      },
      set backBarButtonItem(value: HeaderBar['ios']['backBarButtonItem']) {
        if (typeof value === 'object') {
          self.nativeObject.navigationItem.backBarButtonItem = value.nativeObject;
        }
      }
    };
    self.headerBar = {
      ios: {},
      android: {}
    } as HeaderBar;
    self.ios.navigationItem = {} as any;
    copyObjectPropertiesWithDescriptors(self.headerBar, headerBar);
    self.headerBar?.ios && copyObjectPropertiesWithDescriptors(self.headerBar?.ios, headerBarIOS);
    self.ios.navigationItem && copyObjectPropertiesWithDescriptors(self.ios.navigationItem, headerBar);
    self.ios.navigationItem && copyObjectPropertiesWithDescriptors(self.ios.navigationItem, headerBarIOS);
  }

  static iOS = {
    LargeTitleDisplayMode: LargeTitleDisplayMode,
    PresentationStyle: PresentationStyle
  };
  static Orientation = PageOrientation;
}
