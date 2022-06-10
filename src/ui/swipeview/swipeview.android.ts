import { ISwipeView, SwipeViewState } from './swipeview';
import AndroidConfig from '../../util/Android/androidconfig';
import AndroidUnitConverter from '../../util/Android/unitconverter';
import { IPage, PageAndroidParams, PageIOSParams } from '../page/page';
import PageAndroid from '../page/page.android';
import OverScrollMode from '../shared/android/overscrollmode';
import ViewAndroid from '../view/view.android';
import { SwipeViewEvents } from './swipeview-events';
import type Page from '../page';
import { MobileOSProps } from '../../core/native-mobile-component';

const NativeView = requireClass('android.view.View');
const NativeViewPager = requireClass('io.smartface.android.sfcore.ui.swipeview.SFSwipeView');
const NativePagerAdapter = requireClass('io.smartface.android.SFCorePagerAdapter');
const NativeOnPageChangeListener = requireClass('androidx.viewpager.widget.ViewPager$OnPageChangeListener');

const fragmentManager = AndroidConfig.activity.getSupportFragmentManager();

export default class SwipeViewAndroid<TEvent extends string = SwipeViewEvents, TNative = any, TProps extends ISwipeView = ISwipeView>
  extends ViewAndroid<TEvent | SwipeViewEvents, TNative, TProps>
  implements ISwipeView
{
  private _onPageSelected: (index: number, page: IPage) => void;
  private _onPageScrolled: (index: number, offset: number) => void;
  onStateChanged: (state: SwipeViewState) => void;
  onPageCreate: (position: number) => Page;
  protected _page: PageAndroid;
  protected _pages: IPage[];
  protected _lastIndex: number;
  protected _pageCount: number;
  protected _pageInstances: PageAndroid[];
  constructor(params?: Partial<TProps>) {
    super(params);
  }
  /**
   * Those are done this way because rtl-swipe needs them as setter.
   */
  get onPageSelected() {
    return this._onPageSelected;
  }
  set onPageSelected(value) {
    this._onPageSelected = value;
  }
  /**
   * Those are done this way because rtl-swipe needs them as setter.
   */
  get onPageScrolled() {
    return this._onPageScrolled;
  }
  set onPageScrolled(value) {
    this._onPageScrolled = value;
  }

  createNativeObject() {
    const callbacks = {
      getCount: () => {
        return this.pageCount ?? (this.pages?.length || 0);
      },
      getItem: (position: number) => {
        return this.getPageInstance(position);
      }
    };
    this.pagerAdapter = new NativePagerAdapter(fragmentManager, callbacks);
    const nativeObject = new NativeViewPager(AndroidConfig.activity);
    const viewID = NativeView.generateViewId();
    nativeObject.setAdapter(this.pagerAdapter);
    nativeObject.setId(viewID);
    return nativeObject;
  }
  preConstruct(params?: Partial<TProps>) {
    this._lastIndex = -1;
    this._pageInstances = [];
    this._pages = [];
    const listener = NativeOnPageChangeListener.implement({
      onPageScrollStateChanged: (state: SwipeViewState) => {
        this.onStateChanged?.(state);
        this.emit('stateChanged', state);
      },
      onPageSelected: (position: number) => {
        this.onPageSelected?.(position, this._pageInstances[position]);
        this.emit('pageSelected', position, this._pageInstances[position]);
      },
      onPageScrolled: (position: number, positionOffset: number, positionOffsetPixels: number) => {
        const offsetPixels = AndroidUnitConverter.pixelToDp(positionOffsetPixels);
        this.onPageScrolled?.(position, offsetPixels);
        this.emit('pageScrolled', position, offsetPixels);
        const intPosition = position;
        if (this._lastIndex !== intPosition && positionOffset === 0 && positionOffsetPixels === 0) {
          this._lastIndex = intPosition;
          // TODO: Hotfix for APC. Please investigate why _pageInstances[intPosition] is null.
          // Maybe this custom index propagation has logic error.
          if (!this._pageInstances[intPosition]) {
            return;
          }
          /**
           * Check page-Android.js for the variable assignment.
           */
          this._pageInstances[intPosition]?.__onShowCallback();
        }
      }
    });
    this.nativeObject.addOnPageChangeListener(listener);
    this.addAndroidProps(this.getAndroidProps());
    super.preConstruct(params);
  }
  swipeToIndex(index: number, animated: boolean): void {
    animated = !!animated; // not to pass null to native method
    this.nativeObject.setCurrentItem(index, animated);
  }
  private getPageInstance(position: number) {
    let pageInstance: PageAndroid;
    if (this.onPageCreate) {
      pageInstance = this.onPageCreate(position) as unknown as PageAndroid;
    } else if (this._pageInstances[position]) {
      return this._pageInstances[position].nativeObject;
    } else {
      // For backward compatibility
      const PageClass = this.pages[position] as unknown as typeof PageAndroid;
      pageInstance = new PageClass();
    }
    this._pageInstances[position] = pageInstance;
    this.bypassPageSpecificProperties(pageInstance);
    return pageInstance.nativeObject;
  }

  private getAndroidProps() {
    const self = this;
    return {
      get overScrollMode() {
        return self._overScrollMode;
      },
      set overScrollMode(mode: OverScrollMode) {
        self.nativeObject.setOverScrollMode(mode);
        self._overScrollMode = mode;
      }
    };
  }

  protected bypassPageSpecificProperties(page: PageAndroid) {
    page.headerBar.visible = false;
    Object.keys(page.headerBar).forEach(function (key) {
      Object.defineProperty(page.headerBar, key, {
        set: function () {},
        get: function () {
          return {};
        }
      });
    });
    page.isSwipeViewPage = true;
  }

  pagerAdapter: any;
  get page() {
    return this._page;
  }
  set page(value) {
    this._page = value;
  }
  get pages(): IPage[] {
    return this._pages;
  }
  set pages(value) {
    if (Array.isArray(value)) {
      if (value.length < 1) {
        throw new TypeError('Array parameter cannot be empty.');
      }
      this._pages = value;
      this.pagerAdapter.notifyDataSetChanged();
    }
  }
  get pageCount() {
    return this._pageCount;
  }
  set pageCount(value) {
    this._pageCount = value;
  }
  get currentIndex() {
    return this.nativeObject.getCurrentItem();
  }
  get pagingEnabled() {
    return this.nativeObject.isUserInputEnabled();
  }
  set pagingEnabled(value) {
    this.nativeObject.setIsUserInputEnabled(value);
  }
  static State = { ...SwipeViewState, ...ViewAndroid.State };
}
