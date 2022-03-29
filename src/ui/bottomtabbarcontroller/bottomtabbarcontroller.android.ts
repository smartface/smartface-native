import { IBottomTabBarController } from '.';
import { BottomTabbarControllerEvents } from './bottomtabbarcontroller-events';
import AndroidConfig from '../../util/Android/androidconfig';
import Application from '../../application';
import BottomTabBar from '../bottomtabbar';
import ViewController from '../../util/Android/transition/viewcontroller';
import NavigationController, { IController } from '../navigationcontroller';
import Page from '../page';
import FragmentTransaction from '../../util/Android/transition/fragmenttransition';
import { HeaderBar } from '../navigationcontroller/headerbar';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import BottomTabBarAndroid from '../bottomtabbar/bottomtabbar.android';
import TabbarItemAndroid from '../tabbaritem/tabbaritem.android';

const SPAN_EXCLUSIVE_EXCLUSIVE = 33;
const activity = AndroidConfig.activity;

const NativeBottomNavigationView = requireClass('com.google.android.material.bottomnavigation.BottomNavigationView');
const NativeSFR = requireClass(AndroidConfig.packageName + '.R');
const NativeForegroundColorSpan = requireClass('android.text.style.ForegroundColorSpan');

export default class BottomTabbarControllerAndroid extends NativeEventEmitterComponent<BottomTabbarControllerEvents> implements IBottomTabBarController {
  static Events = BottomTabbarControllerEvents;
  private _addedToActivity = false;
  private _disabledShiftingMode = false;
  private _menu: any;
  private _childControllers: IController[] = [];
  private _selectedIndex = 0;
  private _shouldSelectByIndexCallback: ({ index: number }) => boolean;
  private _didSelectByIndexCallback: (params: { index: number }) => void;
  private initializeOneTime = false;
  private cacheNativeBuilders = {};
  private __isActive: boolean;
  private __targetIndex: number;
  pageID: number;
  popupBackNavigator: any;
  isActive: boolean;
  parentController: IController;
  headerBar?: HeaderBar;
  isInsideBottomTabBar: boolean;
  constructor(params?: any) {
    super(params);
    Application.tabBar = new BottomTabBar();

    const listener = NativeBottomNavigationView.OnNavigationItemSelectedListener;
    this.tabBar.nativeObject.setOnNavigationItemSelectedListener(
      listener.implement({
        onNavigationItemSelected: (item: any) => {
          const index = item.getItemId();
          const result = this.shouldSelectByIndex?.({ index: index }) || true;
          this.emit(BottomTabbarControllerEvents.ShouldSelectByIndex, { index });
          if (!result) {
            return false;
          }

          this.controlAttributedTextColor(index, this.cacheNativeBuilders);

          // TODO: Add self property to controller class
          // use self property to show/hide bottom naviagtion view after controller transition
          this.childControllers[this._selectedIndex] && ViewController.deactivateController(this.childControllers[this._selectedIndex]);
          this.childControllers[index].isInsideBottomTabBar = true;
          this.childControllers[index].isActive = this.__isActive;
          this.push(this.childControllers[index]);
          this._selectedIndex = index;
          try {
            this.didSelectByIndex?.({
              index: index
            });
            this.emit(BottomTabbarControllerEvents.SelectByIndex, { index });
          } catch (e) {
            Application.onUnhandledError?.(e);
            Application.emit('unhandledError', e);
          }

          return true;
        }
      })
    );

    this.addTabBarToActivity();
  }
  protected createNativeObject(params?: Partial<Record<string, any>>) {
    return null;
  }

  shouldSelectViewController(index: any) {
    return true;
  }
  didSelectViewController(index: any) {}
  get tabBar() {
    return Application.tabBar;
  }
  set tabBar(params: any) {
    Object.assign(Application.tabBar, params);
  }
  get childControllers() {
    return this._childControllers;
  }
  set childController(childrenArray: any[]) {
    this._childControllers = childrenArray;
    for (const index in this._childControllers) {
      try {
        const controller = this._childControllers[index];
        //TODO: navigation controller doesnt have parentController on typings.
        controller.parentController = this as any;
      } catch (e) {
        Application.onUnhandledError && Application.onUnhandledError(e);
      }
      //TODO: navigation controller doesnt support
      ViewController.setIsInsideBottomTabBarForAllChildren(this._childControllers[index]);
    }
  }
  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(index: number) {
    this.selectedIndex = index;
  }
  get didSelectByIndex() {
    return this._didSelectByIndexCallback;
  }
  set didSelectByIndex(callback: (params: { index: number }) => void) {
    this._didSelectByIndexCallback = callback;
  }
  get shouldSelectByIndex() {
    return this._shouldSelectByIndexCallback;
  }
  set shouldSelectByIndex(callback: ({ index: number }) => boolean) {
    this._shouldSelectByIndexCallback = callback;
  }
  toString() {
    return 'BottomTabBarController';
  }
  addTabBarToActivity() {
    if (!this._disabledShiftingMode) {
      this._disabledShiftingMode = this.disableShiftMode(this.tabBar);
    }

    if (!this._addedToActivity) {
      this._addedToActivity = true;
      const pageLayoutWrapper = activity.findViewById(NativeSFR.id.page_container_wrapper);
      this.tabBar.nativeObject.setVisibility(8); // GONE
      pageLayoutWrapper.addView(this.tabBar.nativeObject);
    }
  }
  push(childController: any) {
    if (!childController && !this.__isActive) {
      return;
    }

    ViewController.deactivateController(this.getCurrentController());

    // Don't remove this line to top of the page.
    // NavigationController requires BottomTabBarController.
    // TODO: should this be lazy import?
    // const NavigationController = import('../../ui/navigationcontroller');
    childController.isInsideBottomTabBar = true;
    if (childController instanceof Page) {
      //TODO: Page needs __isActive and pageID
      childController.isActive = true;
      if (!childController.pageID) {
        childController.pageID = FragmentTransaction.generatePageID();
      }
      FragmentTransaction.push({
        page: childController,
        animated: false
      });
    } else if (childController instanceof NavigationController) {
      childController.isActive = true;
      // first press
      if (childController.childControllers.length < 1) {
        if (!childController.childControllers[0])
          // Requested by Smartface Router Team
          return;
        childController.push({
          controller: childController.childControllers[0],
          animated: false
        });
      } else if (childController.childControllers.length >= 1) {
        const childControllerStack = childController.childControllers;
        const childControllerStackLenght = childControllerStack.length;

        // TODO: navigationController missing show method
        // show latest page or controller
        childController.show({
          controller: childControllerStack[childControllerStackLenght - 1],
          animated: false
        });
      }
    } else {
      throw new Error('BottomTabbarController item is not a Page instance or a NavigationController instance!');
    }
  }
  show() {
    this.addTabBarToActivity();
    this.setChecked();
    // TODO: check __isActive property
    // Comment out for: https://smartface.atlassian.net/browse/SUPDEV-1867
    // self.push(self.childControllers[_selectedIndex]);
  }
  setChecked() {
    this.initializeOnce();

    !this._menu && (this._menu = this.tabBar.nativeObject.getMenu());
    if (this._selectedIndex < 0) return;
    if (this.__targetIndex === this._selectedIndex) {
      this.push(this.childControllers[this._selectedIndex]);
      return;
    }
    // TODO: This check is added for https://smartface.atlassian.net/browse/SUPDEV-1867
    // setSelectedItemId triggers onNavigationItemSelected (deadlock)
    this.__targetIndex = this._selectedIndex;
    this.tabBar.nativeObject.setSelectedItemId(this._selectedIndex);
  }
  initializeOnce() {
    if (this.initializeOneTime === true) return;
    //Set normal color to attributed strings.
    this.setNormalColorToAttributed();
    this.controlAttributedTextColor(this._selectedIndex, this.cacheNativeBuilders);

    this.initializeOneTime = true;
  }
  getCurrentController() {
    const controller = this.childControllers[this._selectedIndex];
    if (!controller) return null;
    if (controller instanceof Page) return controller as IController;

    //TODO: navigation controller method missing
    return controller.getCurrentController();
  }
  setNormalColorToAttributed() {
    const tabBar = this.tabBar;

    const normalColorNO = tabBar.itemColor.normal.nativeObject;
    const tabBarItems = tabBar.items;
    for (let i = tabBarItems.length; i--; ) {
      if (i === this.selectedIndex) return;

      const tabBarItem = tabBarItems[i];
      if (!tabBarItem._attributedTitleBuilder) return;
      const nativeStringBuilder = this.attributedItemBuilder(tabBarItem, normalColorNO);
      tabBarItem.__setTitle(nativeStringBuilder);
    }
  }
  /*
  Over draws the given foreground color based on selected and normal color of tabbar item. 
  */
  controlAttributedTextColor(index: number, cache) {
    const tabBar = this.tabBar;
    const tabBarItem = tabBar.items[index];
    let nativeStringBuilder;

    if (tabBarItem._attributedTitleBuilder) {
      const selectedColorNO = tabBar.itemColor.selected.nativeObject;
      nativeStringBuilder = this.attributedItem(tabBarItem, selectedColorNO);
      tabBarItem.__setTitle(nativeStringBuilder);
    }
    if (cache.prevSelectedAttributedItem !== undefined && cache.prevSelectedAttributedItem !== index) {
      const i = cache.prevSelectedAttributedItem;
      const prevTabBarItem = tabBar.items[i];
      if (prevTabBarItem._attributedTitleBuilder) {
        const normalColorNO = tabBar.itemColor.normal.nativeObject;
        nativeStringBuilder = this.attributedItem(prevTabBarItem, normalColorNO);
        prevTabBarItem.__setTitle(nativeStringBuilder);
      }
    }
    cache.prevSelectedAttributedItem = index;
  }
  attributedItem(tabBarItem: TabbarItemAndroid, color) {
    return this.attributedItemBuilder(tabBarItem, color);
  }
  attributedItemBuilder(tabBarItem: TabbarItemAndroid, color) {
    const nativeForegroundSpan = new NativeForegroundColorSpan(color);
    const nativeStringBuilder = tabBarItem._attributedTitleBuilder;
    nativeStringBuilder.setSpan(nativeForegroundSpan, 0, nativeStringBuilder.length(), SPAN_EXCLUSIVE_EXCLUSIVE);

    return nativeStringBuilder;
  }
  disableShiftMode(bottomTabBar: BottomTabBarAndroid) {
    bottomTabBar.nativeObject.setLabelVisibilityMode(1);

    const menuView = bottomTabBar.nativeObject.getChildAt(0);
    const childCount = menuView.getChildCount();
    if (childCount === 0) return false;

    /* This is workarround to solve bug of material component https://github.com/material-components/material-components-android/issues/139 */
    for (let i = 0; i < childCount; i++) {
      const menuViewItem = menuView.getChildAt(i);
      //due to material component upgrade, arranged to be backward compatible with older smartface framework
      const activeLabel = menuViewItem.findViewById(NativeSFR.id.navigation_bar_item_large_label_view || NativeSFR.id.largeLabel);
      if (activeLabel) {
        activeLabel.setPadding(0, 0, 0, 0);
      }
    }
    return true;
  }
}
