import { IBottomTabBarController } from './bottomtabbarcontroller';
import NativeComponent from '../../core/native-component';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import BottomTabBar from '../bottomtabbar';
import { IController, INavigationController } from '../navigationcontroller/navigationcontroller';
import { HeaderBar } from '../navigationcontroller/headerbar';
import { IPage } from '../page/page';
import PageIOS from '../page/page.ios';
import { BottomTabbarControllerEvents } from './bottomtabbarcontroller-events';
import copyObjectPropertiesWithDescriptors from '../../util/copyObjectPropertiesWithDescriptors';
import NavigationControllerIOS from '../navigationcontroller/navigationcontroller.ios';

export default class BottomTabbarControllerIOS extends NativeEventEmitterComponent<BottomTabbarControllerEvents> implements IBottomTabBarController {
  static Events = BottomTabbarControllerEvents;
  private view: any;
  private model: BottomTabBarModel;
  private _tabBar: BottomTabBar;
  private _shouldSelectByIndex: IBottomTabBarController['shouldSelectByIndex'];
  private _didSelectByIndex: IBottomTabBarController['didSelectByIndex'] | undefined;
  private _shouldSelectViewController: IBottomTabBarController['shouldSelectViewController'];
  private _didSelectViewController: IBottomTabBarController['didSelectViewController'];
  private viewModel: any;
  private nativeObjectDelegate: any;
  private currentIndex: number;
  parentController: IController;
  pageID: number;
  popupBackNavigator: any;
  isActive: boolean;
  headerBar?: HeaderBar;
  isInsideBottomTabBar: boolean = false;

  constructor(params?: Partial<IBottomTabBarController & { viewModel?: any }>) {
    super(params as any); //TODO: Fix as any
    // From View's Delegate
    this.shouldSelectViewController = (index) => {
      this.emit(BottomTabbarControllerEvents.ShouldSelectByIndex, { index });
      return (
        this.shouldSelectByIndex?.({
          index: index
        }) ?? true
      );
    };

    this.didSelectViewController = (index) => {
      if (typeof this.didSelectByIndex === 'function') {
        this.didSelectByIndex?.({
          index: index
        });
        this.emit(BottomTabbarControllerEvents.SelectByIndex, { index });
      }
    };
  }

  protected createNativeObject(params) {
    if (params?.viewModel) {
      this.viewModel = params.viewModel;
    }
    const nativeObject = SF.requireClass('UITabBarController').new();
    this.nativeObjectDelegate = SF.defineClass('TabBarControllerDelegate : NSObject <UITabBarControllerDelegate>', {
      tabBarControllerShouldSelectViewController: (tabBarController, viewController) => {
        const index = this.nativeObject.viewControllers.indexOf(viewController);
        return this.viewModel.shouldSelectViewController(index);
      },
      tabBarControllerDidSelectViewController: (tabBarController, viewController) => {
        const index = this.nativeObject.viewControllers.indexOf(viewController);
        this.viewModel.didSelectViewController(index);
      }
    }).new();
    nativeObject.delegate = this.nativeObjectDelegate;

    return nativeObject;
  }
  protected init(params?: Partial<Record<string, any>>): void {
    this.currentIndex = 0;
    this.view = new BottomTabBarView({
      viewModel: this
    });

    // Model
    this.model = new BottomTabBarModel();
    this._tabBar = new BottomTabBar({
      nativeObject: this.view.nativeObject.tabBar
    });

    this.didSelectByIndex = undefined;
    this.shouldSelectByIndex = undefined;
    super.init(params);
  }
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

      const nativeChildPageArray = this.model.childControllers.map((controller) => {
        controller.parentController = this;
        return controller.nativeObject;
      });
      this.view.setNativeChildViewControllers(nativeChildPageArray);
    }
  }
  get tabBar() {
    return this._tabBar;
  }
  set tabBar(value) {
    copyObjectPropertiesWithDescriptors(this._tabBar, value);
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

        if (currentPage instanceof PageIOS && currentPage.transitionViews) {
          controllerToPresent.setValueForKey(true, 'isHeroEnabled');
        }

        this.view.present(controllerToPresent, _animationNeed, _completionBlock);
      }
    }
  }
  getVisiblePage(currentController: BottomTabbarControllerIOS | NavigationControllerIOS | PageIOS): NavigationControllerIOS | PageIOS | BottomTabbarControllerIOS {
    let retval: NavigationControllerIOS | PageIOS | BottomTabbarControllerIOS;
    if (currentController instanceof BottomTabbarControllerIOS) {
      const controller = currentController.childControllers[currentController.selectedIndex];
      retval = this.getVisiblePage(controller as NavigationControllerIOS | PageIOS);
    } else if (currentController instanceof NavigationControllerIOS) {
      const controller = currentController.childControllers[currentController.childControllers.length - 1];
      retval = this.getVisiblePage(controller as NavigationControllerIOS | PageIOS);
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
  childControllers: (INavigationController | IPage)[] = [];
  currentIndex = 0;
  constructor(childControllers: (INavigationController | IPage)[] = [], currentIndex = 0) {
    this.childControllers = childControllers;
    this.currentIndex = currentIndex;
  }
}

class BottomTabBarView extends NativeComponent {
  viewModel: any;
  nativeObjectDelegate: any;
  constructor(params?: Partial<{ viewModel: any }>) {
    super(params);
  }
  protected init(params?: Partial<Record<string, any>>): void {
    if (params?.viewModel) {
      this.viewModel = params.viewModel;
    }

    this.nativeObjectDelegate = SF.defineClass('TabBarControllerDelegate : NSObject <UITabBarControllerDelegate>', {
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
  }

  protected createNativeObject() {
    return SF.requireClass('UITabBarController').new();
  }
  setIndex(index: number) {
    this.nativeObject.selectedIndex = index;
  }
  present(controllerToPresent, animationNeed, completionBlock) {
    this.nativeObject.presentViewController(controllerToPresent, completionBlock, animationNeed);
  }
  dismiss(onComplete: () => void) {
    this.nativeObject.dismissViewController(onComplete);
  }
  setNativeChildViewControllers(nativeChildPageArray) {
    this.nativeObject.viewControllers = nativeChildPageArray;

    if (nativeChildPageArray.length > 0) {
      this.viewModel.tabBar.tabBarControllerItemsDidChange();
    }
  }
}
