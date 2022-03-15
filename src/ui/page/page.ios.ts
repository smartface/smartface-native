import { AbstractPage, IPage, LargeTitleDisplayMode, Orientation, PageOrientation, PresentationStyle } from '.';
import Screen, { OrientationType } from '../../device/screen';
import copyObjectPropertiesWithDescriptors from '../../util/copyObjectPropertiesWithDescriptors';
import Invocation from '../../util/ios/invocation';
import FlexLayout from '../flexlayout';
import HeaderBarItem from '../headerbaritem';
import { IController } from '../navigationcontroller';
import { HeaderBar } from '../navigationcontroller/headerbar';
import { PageEvents } from './page-events';

const UINavigationItem = requireClass('UINavigationItem');

export default class PageIOS<TEvent extends string = PageEvents, TNative extends { [key: string]: any } = __SF_UIViewController, TProps extends IPage = IPage>
  extends AbstractPage<TEvent | PageEvents, TNative, TProps>
  implements IPage<TEvent | PageEvents>
{
  layout: FlexLayout;
  headerBar?: HeaderBar | undefined;

  getCurrentController(): IController {
    throw new Error('Method not implemented.');
  }
  show(params: { controller: IController; animated: any; isComingFromPresent?: boolean | undefined; onCompleteCallback?: (() => void) | undefined }) {
    throw new Error('Method not implemented.');
  }
  static iOS: {
    LargeTitleDisplayMode: typeof LargeTitleDisplayMode;
    PresentationStyle: typeof PresentationStyle;
  };
  static Orientation: typeof Orientation;

  private routerPath: any = null;
  private pageView = new FlexLayout();
  private _safeAreaLayoutMode: IPage['ios']['safeAreaLayoutMode'];
  private _safeAreaPaddingObject = { top: 0, bottom: 0, left: 0, right: 0 };
  private _transitionViews: IPage['transitionViews'];
  private _titleView: HeaderBar['titleLayout'];
  private _presentationStyle = 0;
  private _largeTitleDisplayMode = 0;
  private _leftItem: any;
  private _orientationNative: PageOrientation[] = [PageOrientation.PORTRAIT];
  constructor(params?: Partial<TProps>) {
    super(params);

    const { ios, android, ...restParams } = params || {};
    if (!this.nativeObject) {
      this._nativeObject = new __SF_UIViewController();
    }

    this.nativeObject.automaticallyAdjustsScrollViewInsets = false;

    this.setNativeParams();
    this.initPageNativeEvents();
    this.initPageEvents();
    this.headerBarProperties();

    this.pageView.applyLayout = () => {
      this.pageView.nativeObject.yoga.applyLayoutPreservingOrigin(true);
    };

    // this.headerBar = {} as any;
    // this.headerBar.android = {};
    // this.headerBar.ios = {};
  }

  onLoad: () => void;
  onShow: () => void;
  onHide: () => void;
  onOrientationChange: (e: { orientation: PageOrientation[] }) => void;

  orientation: IPage['orientation'] = PageOrientation.PORTRAIT;
  parentController: IPage['parentController'];

  // get layout(): IPage['layout'] {
  //   return this.pageView;
  // }
  statusBar: IPage['statusBar'];

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

  private calculateSafeAreaPaddings(paddingObject: PageIOS['_safeAreaPaddingObject']) {
    this.pageView.paddingTop = paddingObject.top;
    this.pageView.paddingBottom = paddingObject.bottom;
    this.pageView.paddingLeft = paddingObject.left;
    this.pageView.paddingRight = paddingObject.right;
    this.calculatePosition();
  }

  private calculatePosition() {
    this.layout.applyLayout();
  }

  private getParentViewController(controller: __SF_UIViewController) {
    const parent = Invocation.invokeInstanceMethod(controller, 'parentViewController', [], 'NSObject') as __SF_UIViewController;
    return parent ? this.getParentViewController(parent) : controller;
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
            self.calculateSafeAreaPaddings(this._safeAreaPaddingObject);
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

    this.nativeObject.onViewDidAppear = function () {
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
      if (typeof this.onOrientationChange === 'function') {
        let tempOrientation: PageOrientation[];
        switch (Screen.orientation) {
          case OrientationType.PORTRAIT:
            tempOrientation = PageIOS.Orientation.PORTRAIT;
            break;
          case OrientationType.UPSIDEDOWN:
            tempOrientation = PageIOS.Orientation.UPSIDEDOWN;
            break;
          case OrientationType.LANDSCAPELEFT:
            tempOrientation = PageIOS.Orientation.LANDSCAPELEFT;
            break;
          case OrientationType.LANDSCAPERIGHT:
            tempOrientation = PageIOS.Orientation.LANDSCAPERIGHT;
            break;
          default:
            tempOrientation = PageIOS.Orientation.PORTRAIT;
        }
        const callbackParam = {
          orientation: tempOrientation
        };
        this.emit('orientationChange', callbackParam);
        this.onOrientationChange?.(callbackParam);
      }
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
        const nativeObjectArray: any[] = [];

        for (let i = value.length - 1; i >= 0; i--) {
          //Bug : IOS-2399
          nativeObjectArray.push(value[i].nativeObject);
        }

        self.nativeObject.navigationItem.rightBarButtonItems = nativeObjectArray;
      },
      setLeftItem(value: Parameters<HeaderBar['setLeftItem']>['0']) {
        if (value) {
          if (value instanceof HeaderBarItem) {
            if (self.ios.navigationItem?.leftItemEnabled) {
              self.nativeObject.navigationItem.leftBarButtonItem = value.nativeObject;
            }
            self._leftItem = value.nativeObject;
          }
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
        if (UINavigationItem.instancesRespondToSelector('largeTitleDisplayMode')) {
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

    self.headerBar && copyObjectPropertiesWithDescriptors(self.headerBar, headerBar);
    self.headerBar?.ios && copyObjectPropertiesWithDescriptors(self.headerBar?.ios, headerBarIOS);
    self.ios.navigationItem && copyObjectPropertiesWithDescriptors(self.ios.navigationItem, headerBar);
    self.ios.navigationItem && copyObjectPropertiesWithDescriptors(self.ios.navigationItem, headerBarIOS);
  }
}
