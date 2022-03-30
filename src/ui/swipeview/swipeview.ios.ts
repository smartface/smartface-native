import { ISwipeView, SwipeViewState } from '.';
import { IPage } from '../page/page';
import PageIOS from '../page/page.ios';
import OverScrollMode from '../shared/android/overscrollmode';
import ViewIOS from '../view/view.ios';
import { SwipeViewEvents } from './swipeview-events';
import Invocation from '../../util/iOS/invocation';
import { YGUnit } from '../shared/ios/yogaenums';
import Exception from '../../util/exception';
import type Page from '../page';

enum UIPageViewControllerTransitionStyle {
  PageCurl,
  Scroll
}

enum UIPageViewControllerNavigationOrientation {
  Horizontal,
  Vertical
}

enum UIPageViewControllerNavigationDirection {
  Forward,
  Reverse
}

export default class SwipeViewIOS<TEvent extends string = SwipeViewEvents, TNative = any, TProps extends ISwipeView = ISwipeView>
  extends ViewIOS<TEvent | SwipeViewEvents, TNative, TProps>
  implements ISwipeView
{
  private _currentIndex: number = 0;
  private _page: IPage;
  private currentState = SwipeViewState.IDLE;
  private pageController: __SF_UIPageViewController;
  private transactionIndex = 0;
  private pendingViewControllerIndex = 0;
  private previousViewControllerIndex = 0;
  private pageControllerDatasource: __SF_UIPageViewControllerDatasource;
  private _pageArray: any[] = []; //TODO: PageIOS and PageBase isn't compatible
  private _instanceArray: IPage[] = [];
  private _pageNativeObjectArray: any[] = [];
  private _pagingEnabled = true;
  private _isPageTransaction = false;
  private pageControllerDelegate: __SF_UIPageViewControllerDelegate;
  overScrollMode: OverScrollMode;
  createNativeObject() {
    return null;
  }
  init(params?: TProps) {
    super.init(params);
    this.setPageController();

    this.flexGrow = 1;
    this.nativeObject.addSubview(this.pageController.view);
    this.setPageControllerDataSource();
    this.setViewControllerDelegate();
  }
  constructor(params?: TProps) {
    super(params);
  }
  onPageSelected: (index: number, page: IPage) => void;
  onPageScrolled: (index: number, offset: number) => void;
  onStateChanged: (state: SwipeViewState) => void;
  onPageCreate: (position: number) => Page;
  pageCount: number;
  pagerAdapter: { notifyDataSetChanged: () => void };

  private setPageControllerDataSource() {
    this.pageControllerDatasource = new __SF_UIPageViewControllerDatasource();

    this.pageControllerDatasource.viewControllerBeforeViewController = (e) => {
      let index = this._pageNativeObjectArray.indexOf(e.viewController);
      this.transactionIndex = index;
      if (index > 0 && this._pagingEnabled) {
        index--;
        return this._pageNativeObjectArray[index];
      }
      return undefined;
    };

    this.pageControllerDatasource.viewControllerAfterViewController = function (e) {
      let index = this._pageNativeObjectArray.indexOf(e.viewController);
      this.transactionIndex = index;
      if (index >= 0 && index < this._pageNativeObjectArray.length - 1 && this._pagingEnabled) {
        index++;
        return this._pageNativeObjectArray[index];
      }
      return undefined;
    };
  }
  swipeToIndex(value: number, animated: boolean): void {
    const semanticContent = __SF_UIView.viewAppearanceSemanticContentAttribute();
    const isLTR = semanticContent === 0 ? __SF_UIApplication.sharedApplication().userInterfaceLayoutDirection === 0 : semanticContent === 3;
    const pageNative = this._pageNativeObjectArray[value];
    if (value === this.currentIndex || this._isPageTransaction || !pageNative) {
      return;
    }
    this._isPageTransaction = true;
    this.pendingViewControllerIndex = value;
    __SF_Dispatch.mainAsync(() => {
      let direction = isLTR && value < this.currentIndex ? UIPageViewControllerNavigationDirection.Reverse : UIPageViewControllerNavigationDirection.Forward;
      direction = isLTR && value >= this.currentIndex ? UIPageViewControllerNavigationDirection.Forward : UIPageViewControllerNavigationDirection.Reverse;
      this.pageController.scrollToPageDirectionAnimatedCompletion(pageNative, direction, !!animated, () => {
        this._isPageTransaction = false;
        __SF_Dispatch.mainAsync(() => {
          this.onPageSelectedHandler({
            completed: true,
            index: value
          });
        });
      });
    });
  }
  private setViewControllerDelegate() {
    this.pageControllerDelegate = new __SF_UIPageViewControllerDelegate();

    this.pageControllerDelegate.willTransitionToViewControllers = (e) => {
      //e.pendingViewControllers
      this.pendingViewControllerIndex = this._pageNativeObjectArray.indexOf(e.pendingViewControllers[0]);
      this._isPageTransaction = true;
      this.onStateChangedHandler({
        state: SwipeViewIOS.State.DRAGGING
      });
    };

    this.pageControllerDelegate.didFinishAnimating = (e) => {
      //e.previousViewControllers
      this.previousViewControllerIndex = this._pageNativeObjectArray.indexOf(e.previousViewControllers[0]);
      __SF_Dispatch.mainAsyncAfter(() => {
        this._isPageTransaction = false;
        this.onPageSelectedHandler(e);
        this.onStateChangedHandler({
          state: SwipeViewIOS.State.IDLE
        });
      }, 50);
    };

    this.pageController.dataSource = this.pageControllerDatasource;
    this.pageController.delegate = this.pageControllerDelegate;
  }
  private setPageController() {
    if (!this.nativeObject) {
      this.pageController = __SF_UIPageViewController.createWithTransitionStyleNavigationOrientation(UIPageViewControllerTransitionStyle.Scroll, UIPageViewControllerNavigationOrientation.Horizontal);
    }
    this.pageController.view.onTouch = (e) => {
      const params = {
        x: e?.point?.x || 0,
        y: e?.point?.y || 0
      };
      this.onTouch?.(params);
      this.emit('touch', params);
    };
    this.pageController.view.onTouchEnded = (e) => {
      const x = e?.point?.x;
      const y = e?.point?.y;
      const w = this.nativeObject.frame.width;
      const h = this.nativeObject.frame.height;
      const isInside = !(x > w || x < 0 || y > h || y < 0);
      const params = {
        x,
        y
      };
      this.onTouchEnded?.(isInside, params);
      this.emit('touchEnded', isInside, params);
    };

    this.pageController.view.didScroll = () => {
      if (!this.pageController.scrollView) {
        return;
      }
      const point = Invocation.invokeInstanceMethod(this.pageController.scrollView, 'contentOffset', [], 'CGPoint') as __SF_NSRect;
      let x = point.x - this.nativeObject.frame.width;
      let index = this.transactionIndex;
      if (x < 0) {
        index = this.transactionIndex - 1;
        x += this.nativeObject.frame.width;
      }
      if (point.x === 0 || point.x === this.nativeObject.frame.width * 2) {
        this.transactionIndex = this.pendingViewControllerIndex;
      }
      this.onPageScrolled?.(index, x);
      this.emit('pageScrolled', index, x);
    };

    this.pageController.onViewWillLayoutSubviews = () => {
      this.pageController.setViewFrame({
        x: 0,
        y: 0,
        width: this.nativeObject.frame.width,
        height: this.nativeObject.frame.height
      });
    };
  }
  private onPageSelectedHandler(e: any) {
    let selectedIndex;
    if (e.index !== undefined) {
      selectedIndex = e.index;
    } else if (e.completed) {
      selectedIndex = this.pendingViewControllerIndex;
    } else {
      selectedIndex = this.previousViewControllerIndex;
    }

    if (selectedIndex !== this.currentIndex) {
      this._currentIndex = selectedIndex;
      this._instanceArray[this.currentIndex] && this.onPageSelected?.(this.currentIndex, this._instanceArray[this.currentIndex]);
      this.emit('pageSelected', this.currentIndex, this._instanceArray[this.currentIndex]);
    }
  }
  private onStateChangedHandler(e: any) {
    if (typeof this.onStateChanged === 'function') {
      if (this.currentState !== e.state) {
        this.currentState = e.state;
        __SF_Dispatch.mainAsync(() => {
          this.onStateChanged?.(e.state);
          this.emit('stateChanged', e.state);
        });
      }
    }
  }
  get pages() {
    return this._pageArray;
  }
  set pages(value) {
    if (value.length < 1) {
      throw new TypeError('Array parameter cannot be empty.');
    }

    this._pageNativeObjectArray = [];
    this._instanceArray = [];
    value.forEach((Page) => {
      const page = new Page();
      bypassPageSpecificProperties(page);
      if (page.nativeObject.constructor.name !== 'SMFUIViewController') {
        return;
      }
      page.orientation = PageIOS.Orientation.AUTO as any; //TODO: Type issue on Orientation being array or not
      this._instanceArray.push(page);
      this._pageNativeObjectArray.push(page.nativeObject);
    });
    this._pageArray = value;
    this.pageController.setViewControllerDirectionAnimatedCompletion([this._pageNativeObjectArray[0]], UIPageViewControllerNavigationDirection.Forward, false, function () {});
    this._currentIndex = 0;
  }
  get page() {
    return this._page;
  }
  set page(value) {
    if (value instanceof PageIOS) {
      this._page = value;
      this._page.nativeObject.addChildViewController(this.pageController);
    }
  }
  get currentIndex() {
    return this._currentIndex;
  }
  get width(): ISwipeView['width'] {
    return this.nativeObject.frame.width;
  }
  set width(value: ISwipeView['width']) {
    if (typeof value === 'number') {
      this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, 'width');
      this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, 'maxWidth');
      this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, 'minWidth');
    } else {
      throw new TypeError(Exception.TypeError.NUMBER);
    }
  }
  get height(): ISwipeView['height'] {
    return this.nativeObject.frame.width;
  }
  set height(value: ISwipeView['height']) {
    if (typeof value === 'number') {
      this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, 'height');
      this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, 'maxHeight');
      this.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, 'minHeight');
    } else {
      throw new TypeError(Exception.TypeError.NUMBER);
    }
  }
  get pagingEnabled() {
    return this._pagingEnabled;
  }
  set pagingEnabled(value) {
    this._pagingEnabled = value;
  }

  static State = SwipeViewState;
}

function bypassPageSpecificProperties(page: PageIOS) {
  page.headerBar &&
    Object.keys(page.headerBar).forEach(function (key) {
      Object.defineProperty(page.headerBar, key, {
        set: function () {},
        get: function () {
          return {};
        }
      });
    });
}
