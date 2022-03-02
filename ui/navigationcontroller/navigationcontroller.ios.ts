import { Controller, INavigationController, OperationType } from '.';
import NativeComponent from '../../core/native-component';
import System from '../../device/system';
import Color from '../../ui/color';
import Image from '../../ui/image';
import Page from '../page';
import { default as IHeaderBar } from '../headerbar';
import Font from '../font';
import { ControllerParams } from '../../util/Android/transition/viewcontroller';
import View from '../view';
import { IHeaderBarItem } from '../headerbaritem';
import BottomTabbarController from '../bottomtabbarcontroller';
export default class NavigationControllerIOS extends NativeComponent implements INavigationController {
  private _android = {};
  private _ios = {};
  view: NavigationView;
  protected model: NavigationModel;
  private _headerBar: HeaderBar;
  constructor(params: Partial<INavigationController> & ControllerParams = { controller: undefined }) {
    super();
    const { ...restParams } = params;
    this.view = new NavigationView({ viewModel: this });
    this.model = new NavigationModel();
    this._headerBar = new HeaderBar({
      navigationController: this
    });
    this._headerBar.ios.translucent = false;

    this._nativeObject = this.view.nativeObject;
    Object.assign(this, restParams);
  }
  get android() {
    return this._android;
  }
  get ios() {
    return this._ios;
  }
  get childControllers(): INavigationController['childControllers'] {
    return this.model.childControllers;
  }
  set childControllers(value: INavigationController['childControllers']) {
    if (typeof value === 'object') {
      this.model.childControllers = value as any; //TODO: Fix typing issue

      const nativeChildPageArray = [];
      for (const i in this.model.childControllers) {
        this.model.childControllers[i].parentController = this;
        nativeChildPageArray.push(this.model.childControllers[i].nativeObject);
      }
      this.view.setNativeChildViewControllers(nativeChildPageArray);
    }
  }
  get headerBar(): HeaderBar {
    return this._headerBar;
  }
  set headerBar(value: HeaderBar) {
    Object.assign(this._headerBar, value);
  }
  parentController: INavigationController = undefined;
  isInsideBottomTabBar: boolean;
  push(params: { controller: Controller; animated?: boolean }): void {
    if (params?.controller instanceof NavigationControllerIOS) {
      this.view.push(params.controller, params.animated ? true : false);
      this.model.pushPage(params.controller);
      params.controller.parentController = this;
    }
  }
  pop(params?: { animated: boolean }): void {
    this.view.pop(!!params.animated);
    this.model.popPage();
  }
  popTo(params: { controller: Controller; animated?: boolean }): void {
    if (params?.controller instanceof NavigationControllerIOS) {
      this.view.popTo(params.controller, !!params.animated);
      this.model.popToPage(params.controller);
    }
  }
  willShow: (params: { controller: Controller; animated?: boolean }) => void;
  onTransition: (e: { controller?: Controller; operation: OperationType; currentController?: Controller; targetController?: Controller }) => void;
  present(params: { controller: Controller; animated: boolean; onComplete: () => void }): void {
    if (typeof params === 'object') {
      const controller = params.controller;
      const animation = params.animated;
      const onComplete = params.onComplete;

      if (controller instanceof NavigationControllerIOS) {
        const _animationNeed = animation;
        const _completionBlock = () => onComplete?.();

        let controllerToPresent;
        if (controller?.nativeObject) {
          controllerToPresent = controller.nativeObject;

          const currentPage = this.getVisiblePage(this.childControllers[this.childControllers.length - 1]);

          if (typeof currentPage.transitionViews !== 'undefined') {
            controllerToPresent.setValueForKey(true, 'isHeroEnabled');
          }
          this.view.present(controllerToPresent, _animationNeed, _completionBlock);
        }
      }
    }
  }
  dismiss(params: { onComplete: () => void; animated: boolean }): void {
    const onComplete = params.onComplete;
    const animation = params.animated;
    const _completionBlock = () => onComplete?.();
    this.view.dismiss(_completionBlock, animation);
  }
  private getVisiblePage(currentPage: Controller) {
    let retval = null;
    if (currentPage instanceof BottomTabbarController) {
      const controller = currentPage.childControllers[currentPage.selectedIndex] as NavigationControllerIOS;
      retval = this.getVisiblePage(controller);
    } else if (currentPage instanceof NavigationControllerIOS) {
      const controller = currentPage.childControllers[currentPage.childControllers.length - 1] as NavigationControllerIOS;
      retval = this.getVisiblePage(controller);
    } else if (currentPage instanceof Page) {
      retval = currentPage;
    }
    return retval;
  }
  private willShowViewController(index: number, animated?: boolean) {
    const page = this.model.pageForIndex(index);
    this.willShow?.({
      controller: page,
      animated: animated
    });
  }
  private didShowViewController(viewController: __SF_UIViewController, index: number, animated?: boolean) {
    let operation = 0;
    let fromIndex = 0;
    let toIndex = 0;
    if (this.model.pageToPush) {
      operation = 1;
      fromIndex = index - 1;
      toIndex = index;
      this.animationControllerForOperationFromViewControllerToViewController(operation, fromIndex, toIndex);
    } else if (this.view.nativeObject.viewControllers.length < this.model.childControllers.length) {
      operation = 2;
      fromIndex = this.model.childControllers.length - 1;
      toIndex = index;
      this.animationControllerForOperationFromViewControllerToViewController(operation, fromIndex, toIndex);
      this.model.popToIndex(index);
    }

    if (this.model.pageToPush) {
      this.model.pageToPush = null;
    }
  }
  private animationControllerForOperationFromViewControllerToViewController(operation: number, fromIndex: number, toIndex: number) {
    const fromController = this.model.childControllers[fromIndex];
    const toController = this.model.pageForIndex(toIndex);
    this.onTransition?.({
      currentController: fromController,
      targetController: toController,
      operation: operation
    });
  }
  static OperationType = OperationType;
}

class HeaderBar extends NativeComponent<__SF_UINavigationBar> implements IHeaderBar {
  appearance: __SF_UINavigationBarAppearance = undefined;
  navigationController: NavigationControllerIOS;
  private _android: IHeaderBar['android'] = {};
  private _ios: IHeaderBar['ios'] = {};
  private _transparent = false;
  private _transparentEmptyImage: __SF_UIImage;
  private _titleColor: Color;
  private _visible = true;
  private _prefersLargeTitles = false;
  private _backIndicatorImage: Image;
  private _backIndicatorTransitionMaskImage: Image;
  private _titleFont: Font = undefined;
  private _borderVisibility: boolean;
  leftItemEnabled: boolean;
  titleLayout: View<any, {}, {}>;
  title: string;
  setItems(items: IHeaderBarItem[]): void {}
  setLeftItem(item: IHeaderBarItem): void {}
  constructor(params: Partial<IHeaderBar> & { navigationController?: NavigationControllerIOS }) {
    super();
    const { ios, android, ...restParams } = params;

    if (params.navigationController) {
      this.nativeObject = params.navigationController.view.nativeObject.navigationBar;
      // Xcode 13.1 background bug fixes [NTVE-398]
      if (Number(System.OSVersion) >= 15) {
        this.appearance = new __SF_UINavigationBarAppearance();
        this.appearance.configureWithOpaqueBackground();
        this.nativeObject.standardAppearance = this.appearance;
        this.nativeObject.scrollEdgeAppearance = this.appearance;
      }
    }
    this.navigationController = params.navigationController;
    this.iosProperties();

    Object.assign(this._ios, ios);
    Object.assign(this._android, android);
    Object.assign(this, restParams);
  }
  get ios() {
    return this._ios;
  }
  get android() {
    return this._android;
  }

  get transparent(): IHeaderBar['transparent'] {
    return this._transparent;
  }
  set transparent(value: IHeaderBar['transparent']) {
    if (value) {
      if (!this.nativeObject.backgroundImage) {
        const _transparentEmptyImage = __SF_UIImage.getInstance();
        this.nativeObject.backgroundImage = _transparentEmptyImage;
      }
      this.nativeObject.shadowImage = __SF_UIImage.getInstance();
      this.nativeObject.translucent = true;
      this.nativeObject.backgroundColor = Color.TRANSPARENT.nativeObject;
      this._borderVisibility = false;
    } else {
      if (this.nativeObject.backgroundImage === this._transparentEmptyImage) {
        this.nativeObject.backgroundImage = undefined;
      }
      this.nativeObject.shadowImage = undefined;
      this.nativeObject.translucent = false;
      this._borderVisibility = true;
    }
    this._transparent = value;
  }
  get alpha(): IHeaderBar['alpha'] {
    return this.nativeObject.alpha;
  }
  set alpha(value: IHeaderBar['alpha']) {
    if (typeof value === 'number') {
      SF.dispatch_async(SF.dispatch_get_main_queue(), () => {
        this.nativeObject.alpha = value;
      });
    }
  }
  get titleColor(): IHeaderBar['titleColor'] {
    return this.titleColor;
  }
  set titleColor(value: IHeaderBar['titleColor']) {
    this.titleColor = value;
    this.__updateTitleTextAttributes();
  }
  get visible(): IHeaderBar['visible'] {
    return this._visible;
  }
  set visible(value: IHeaderBar['visible']) {
    this._visible = value;
    this.navigationController.nativeObject.setNavigationBarHiddenAnimated(!value, true);
  }
  get itemColor(): IHeaderBar['itemColor'] {
    return new Color({
      color: this.nativeObject.tintColor
    });
  }
  set itemColor(value: IHeaderBar['itemColor']) {
    this.nativeObject.tintColor = value.nativeObject;
  }
  get backgroundColor(): IHeaderBar['backgroundColor'] {
    return new Color({
      color: this.nativeObject.barTintColor
    });
  }
  set backgroundColor(value: IHeaderBar['backgroundColor']) {
    if (value instanceof Color) {
      // Xcode 13.1 background bug fixes [NTVE-398]
      if (parseInt(System.OSVersion) >= 15) {
        this.appearance.backgroundColor = value.nativeObject;
        this.nativeObject.standardAppearance = this.appearance;
        this.nativeObject.scrollEdgeAppearance = this.appearance;
      } else {
        if (this.transparent) {
          this.nativeObject.backgroundColor = value.nativeObject;
        } else {
          this.nativeObject.barTintColor = value.nativeObject;
        }
      }
    }
  }
  get backgroundImage(): IHeaderBar['backgroundImage'] {
    return Image.createFromImage(this.nativeObject.backgroundImage);
  }
  set backgroundImage(value: IHeaderBar['backgroundImage']) {
    this.nativeObject.backgroundImage = value.nativeObject;
  }
  get height(): IHeaderBar['height'] {
    return this.nativeObject.frame.height;
  }
  get borderVisibility(): IHeaderBar['borderVisibility'] {
    return this._borderVisibility;
  }
  set borderVisibility(value: IHeaderBar['borderVisibility']) {
    this._borderVisibility = value;
    this.nativeObject.shadowImage = value ? undefined : __SF_UIImage.getInstance();
  }
  private __updateTitleTextAttributes() {
    const titleTextAttributes = {
      NSFont: __SF_UIFont,
      NSColor: __SF_UIColor
    };
    if (this._titleColor instanceof Color) {
      titleTextAttributes['NSColor'] = this._titleColor.nativeObject;
    }
    if (this._titleFont instanceof Font) {
      titleTextAttributes['NSFont'] = this._titleFont as any; //TODO: There's something wrong with font types. Talk to Guven about the correct type.
    }

    // Xcode 13.1 background bug fixes [NTVE-398]
    if (parseInt(System.OSVersion) >= 15) {
      this.appearance.titleTextAttributes = titleTextAttributes;

      this.nativeObject.standardAppearance = this.appearance;
      this.nativeObject.scrollEdgeAppearance = this.appearance;
    } else {
      this.nativeObject.titleTextAttributes = titleTextAttributes;
    }
  }
  private iosProperties() {
    const self = this;
    const ios = {
      get translucent(): IHeaderBar['ios']['translucent'] {
        return self.nativeObject.translucent;
      },
      set translucent(value: IHeaderBar['ios']['translucent']) {
        self.nativeObject.translucent = value;
      },
      get titleFont(): IHeaderBar['ios']['titleFont'] {
        return self._titleFont;
      },
      set titleFont(value: IHeaderBar['ios']['titleFont']) {
        self._titleFont = value;
        self.__updateTitleTextAttributes();
      },
      get prefersLargeTitles(): IHeaderBar['ios']['prefersLargeTitles'] {
        return self._prefersLargeTitles;
      },
      set prefersLargeTitles(value: IHeaderBar['ios']['prefersLargeTitles']) {
        self._prefersLargeTitles = value;
        self.nativeObject.prefersLargeTitles = self._prefersLargeTitles;
      },
      get backIndicatorImage(): IHeaderBar['ios']['backIndicatorImage'] {
        return self._backIndicatorImage;
      },
      set backIndicatorImage(value: IHeaderBar['ios']['backIndicatorImage']) {
        if (value instanceof Image) {
          self._backIndicatorImage = value;
          self.nativeObject.backIndicatorImage = self._backIndicatorImage.nativeObject;

          // General use
          self.ios.backIndicatorTransitionMaskImage = value;
        }
      },
      get backIndicatorTransitionMaskImage(): IHeaderBar['ios']['backIndicatorTransitionMaskImage'] {
        return self._backIndicatorTransitionMaskImage;
      },
      set backIndicatorTransitionMaskImage(value: IHeaderBar['ios']['backIndicatorTransitionMaskImage']) {
        if (value instanceof Image) {
          self._backIndicatorTransitionMaskImage = value;
          self.nativeObject.backIndicatorTransitionMaskImage = self._backIndicatorTransitionMaskImage.nativeObject;
        }
      },
      setVisible(visible: boolean, animated?: boolean) {
        if (typeof visible === 'boolean') {
          self._visible = visible;
          const _animated = !!animated;
          self.navigationController.nativeObject.setNavigationBarHiddenAnimated(!self._visible, _animated);
        }
      }
    };
    this._ios = Object.assign(this._ios, ios);
  }
}

class NavigationView extends NativeComponent<__SF_UINavigationController> {
  viewModel = undefined;
  private __navigationControllerDelegate: __SF_SMFNavigationControllerDelegate;
  constructor(params?: { viewModel?: any }) {
    super();
    this.viewModel = params.viewModel;
    this._nativeObject = new __SF_UINavigationController();
    this.__navigationControllerDelegate = new __SF_SMFNavigationControllerDelegate();
    this.__navigationControllerDelegate.navigationControllerWillShowViewControllerAnimated = (navigationController, viewController, animated) => {
      const index = this.nativeObject.viewControllers.indexOf(viewController);
      this.viewModel.willShowViewController(index, animated);
    };

    this.__navigationControllerDelegate.navigationControllerDidShowViewControllerAnimated = (navigationController, viewController, animated) => {
      const index = this.nativeObject.viewControllers.indexOf(viewController);
      this.viewModel.didShowViewController(viewController, index, animated);
    };

    this.nativeObject.delegate = this.__navigationControllerDelegate;
  }
  push(page: NavigationControllerIOS, animated?: boolean) {
    if (page.nativeObject) {
      this.nativeObject.pushViewControllerAnimated(page.nativeObject, animated);
    }
  }
  pop(animated?: boolean) {
    this.nativeObject.popViewControllerAnimated(animated);
  }

  popTo(page: NavigationControllerIOS, animated?: boolean) {
    if (page.nativeObject) {
      this.nativeObject.popToViewControllerAnimated(page.nativeObject, animated);
    }
  }

  present(controllerToPresent: __SF_UIViewController, animated?: boolean, completionBlock?: () => void) {
    this.nativeObject.presentViewController(controllerToPresent, completionBlock, animated);
  }

  dismiss(completionBlock: () => void, animated?: boolean) {
    this.nativeObject.dismissViewController(completionBlock, animated);
  }

  setNativeChildViewControllers(nativeChildPageArray: __SF_UIViewController[]) {
    this.nativeObject.viewControllers = nativeChildPageArray;
  }
}

class NavigationModel {
  pageToPush: NavigationControllerIOS = undefined;
  childControllers: NavigationControllerIOS[];
  pushPage(page: NavigationControllerIOS) {
    this.pageToPush = page;
    this.childControllers.push(page);
  }
  popPage() {
    const poppedPage = this.childControllers.pop();
    poppedPage.parentController = null;
  }
  popToPage(page: NavigationControllerIOS) {
    const index = this.childControllers.indexOf(page);
    if (index >= 0) {
      this.popToIndex(index);
    }
  }
  popToIndex(index: number) {
    for (let i = this.childControllers.length - 1; i > index; --i) {
      const poppedPage = this.childControllers.pop();
      poppedPage.parentController = null;
    }
  }
  pageForIndex(index: number) {
    return index >= 0 ? this.childControllers[index] : this.pageToPush;
  }
}
