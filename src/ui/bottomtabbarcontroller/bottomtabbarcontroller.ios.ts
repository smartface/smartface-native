import BottomTabbarController, { IBottomTabBarController } from '.';
import NativeComponent from '../../core/native-component';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import BottomTabBar from '../bottomtabbar';
import NavigationController, { IController, INavigationController } from '../navigationcontroller';
import { HeaderBar } from '../navigationcontroller/headerbar';
import Page, { IPage } from '../page';
import { BottomTabbarControllerEvents } from './bottomtabbarcontroller-events';

export default class BottomTabbarControllerIOS extends NativeEventEmitterComponent<BottomTabbarControllerEvents> implements IBottomTabBarController {
  static Events = BottomTabbarControllerEvents;
  private view;
  private model: BottomTabBarModel;
  private _tabBar;
  private _shouldSelectByIndex;
  private _didSelectByIndex;
  private _shouldSelectViewController;
  private _didSelectViewController;
  private viewModel;
  private nativeObjectDelegate;
  private currentIndex: number;
  parentController: IController;
  pageID: number;
  popupBackNavigator: any;
  isActive: boolean;
  headerBar?: HeaderBar;
  isInsideBottomTabBar: boolean = false;

  constructor(params?: Partial<IBottomTabBarController & { viewModel?: any }>) {
    super();

    this.view = new BottomTabBarView({
      viewModel: this
    });

    // NativeObjectDirectAccess
    this.nativeObject = this.view.nativeObject;

    // Model
    this.model = new BottomTabBarModel();
    this._tabBar = new BottomTabBar({
      nativeObject: this.view.nativeObject.tabBar
    });

    // From View's Delegate
    this.shouldSelectByIndex = undefined;
    this.shouldSelectViewController = (index) => {
      let retval = true;
      if (typeof this.shouldSelectByIndex === 'function') {
        retval = this.shouldSelectByIndex?.({
          index: index
        });
        this.emit(BottomTabbarControllerEvents.ShouldSelectByIndex, { index });
      }
      return retval;
    };

    this.didSelectByIndex = undefined;
    this.didSelectViewController = (index) => {
      if (typeof this.didSelectByIndex === 'function') {
        this.didSelectByIndex?.({
          index: index
        });
        this.emit(BottomTabbarControllerEvents.SelectByIndex, { index });
      }
    };

    params && Object.assign(this, params);

    this.viewModel = undefined;

    if (params?.viewModel) {
      this.viewModel = params.viewModel;
    }

    this.nativeObject = __SF_UITabBarController.new();
    this.nativeObjectDelegate = defineClass('TabBarControllerDelegate : NSObject <UITabBarControllerDelegate>', {
      tabBarControllerShouldSelectViewController: (tabBarController, viewController) => {
        const index = this.nativeObject.viewControllers.indexOf(viewController);
        return this.viewModel.shouldSelectViewController(index);
      },
      tabBarControllerDidSelectViewController: (tabBarController, viewController) => {
        const index = this.nativeObject.viewControllers.indexOf(viewController);
        this.viewModel.didSelectViewController(index);
      }
    }).new();
    this.nativeObject.delegate = this.nativeObjectDelegate;

    this.childControllers = [];
    this.currentIndex = 0;
  }
  // TODO: not implemented yet
  getCurrentController(): IController | null {
    if (this.childControllers.length > 0) {
      return this.childControllers[this.childControllers.length - 1];
    }

    return null;
  }
  get didSelectByIndex() {
    return this._didSelectByIndex;
  }
  set didSelectByIndex(value: any) {
    this._didSelectByIndex = value;
  }
  get shouldSelectByIndex() {
    return this._shouldSelectByIndex;
  }
  set shouldSelectByIndex(value: any) {
    this._shouldSelectByIndex = value;
  }
  get shouldSelectViewController() {
    return this._shouldSelectViewController;
  }
  set shouldSelectViewController(value: any) {
    this._shouldSelectViewController = value;
  }
  get didSelectViewController() {
    return this._didSelectViewController;
  }
  set didSelectViewController(value: any) {
    this._didSelectViewController = value;
  }
  get childControllers() {
    return this.model.childControllers;
  }
  set childControllers(childControllers) {
    if (typeof childControllers === 'object') {
      this.model.childControllers = childControllers;

      const nativeChildPageArray: any[] = [];
      for (const i in this.model.childControllers) {
        this.model.childControllers[i].parentController = this;
        nativeChildPageArray.push(this.model.childControllers[i].nativeObject);
      }
      this.view.setNativeChildViewControllers(nativeChildPageArray);
    }
  }
  get tabBar() {
    return this._tabBar;
  }
  set tabBar(value) {
    if (typeof value === 'object') {
      Object.assign(this._tabBar, value);
    }
  }
  get selectedIndex() {
    return this.model.currentIndex;
  }
  set selectedIndex(value) {
    if (typeof value === 'number') {
      this.model.currentIndex = value;
    }
  }
  show() {
    this.view.setIndex(this.model.currentIndex);
  }
  present(params?: any) {
    if (typeof params === 'object') {
      const controller = params.controller;
      const animation = params.animated;
      const onComplete = params.onComplete;

      const _animationNeed = animation ? animation : true;
      const _completionBlock = onComplete?.() || undefined;
      let controllerToPresent: __SF_UIViewController;
      if (controller?.nativeObject) {
        controllerToPresent = controller.nativeObject;

        const currentPage = this.getVisiblePage(this.childControllers[this.selectedIndex] as any);

        if (currentPage instanceof Page && currentPage.transitionViews) {
          controllerToPresent.setValueForKey(true, 'isHeroEnabled');
        }

        this.view.present(controllerToPresent, _animationNeed, _completionBlock);
      }
    }
  }
  getVisiblePage(currentController: BottomTabbarController | NavigationController | Page): NavigationController | Page | BottomTabbarController {
    let retval: NavigationController | Page | BottomTabbarController;
    if (currentController instanceof BottomTabbarController) {
      const controller = currentController.childControllers[currentController.selectedIndex];
      retval = this.getVisiblePage(controller as NavigationController | Page);
    } else if (currentController instanceof NavigationController) {
      const controller = currentController.childControllers[currentController.childControllers.length - 1];
      retval = this.getVisiblePage(controller as NavigationController | Page);
    } else {
      retval = currentController;
    }
    return retval;
  }
  dismiss(params) {
    if (typeof params === 'object') {
      const onComplete = params.onComplete;
      const _completionBlock = onComplete?.() || undefined;
      this.view.dismiss(_completionBlock);
    }
  }
}

class BottomTabBarModel {
  constructor(public childControllers: (INavigationController | IPage)[] = [], public currentIndex: number = 0) {}
}

class BottomTabBarView extends NativeComponent {
  viewModel: any;
  nativeObjectDelegate: any;
  constructor(params?: Partial<{ viewModel: any }>) {
    super();
    const self = this;
    self.viewModel = undefined;

    if (params?.viewModel) {
      self.viewModel = params.viewModel;
    }

    self.nativeObject = __SF_UITabBarController.new();
    self.nativeObjectDelegate = defineClass('TabBarControllerDelegate : NSObject <UITabBarControllerDelegate>', {
      tabBarControllerShouldSelectViewController: function (tabBarController, viewController) {
        const index = self.nativeObject.viewControllers.indexOf(viewController);
        return self.viewModel.shouldSelectViewController(index);
      },
      tabBarControllerDidSelectViewController: function (tabBarController, viewController) {
        const index = self.nativeObject.viewControllers.indexOf(viewController);
        self.viewModel.didSelectViewController(index);
      }
    }).new();
    self.nativeObject.delegate = self.nativeObjectDelegate;
  }
  setIndex(index) {
    this.nativeObject.selectedIndex = index;
  }
  present(controllerToPresent, animationNeed, completionBlock) {
    this.nativeObject.presentViewController(controllerToPresent, completionBlock, animationNeed);
  }
  dismiss(onComplete) {
    this.nativeObject.dismissViewController(onComplete);
  }
  setNativeChildViewControllers(nativeChildPageArray) {
    this.nativeObject.viewControllers = nativeChildPageArray;

    if (nativeChildPageArray.length > 0) {
      this.viewModel.tabBar.tabBarControllerItemsDidChange();
    }
  }
}
