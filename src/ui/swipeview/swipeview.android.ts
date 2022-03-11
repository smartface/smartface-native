import { ISwipeView, SwipeViewState } from '.';
import { AndroidConfig, UnitConverter } from '../../util';
import Page from '../page';
import PageAndroid from '../page/page.android';
import OverScrollMode from '../shared/android/overscrollmode';
import { ViewAndroid } from '../view/view.android';
import { SwipeViewEvents } from './swipeview-events';

const NativeView = requireClass('android.view.View');
const NativeViewPager = requireClass('io.smartface.android.sfcore.ui.swipeview.SFSwipeView');
const NativePagerAdapter = requireClass('io.smartface.android.SFCorePagerAdapter');
const NativeOnPageChangeListener = requireClass('androidx.viewpager.widget.ViewPager$OnPageChangeListener');

const fragmentManager = AndroidConfig.activity.getSupportFragmentManager();

export default class SwipeViewAndroid<TEvent extends string = SwipeViewEvents, TNative = any, TProps extends ISwipeView = ISwipeView>
  extends ViewAndroid<TEvent | SwipeViewEvents, TNative, TProps>
  implements ISwipeView
{
  onPageSelected: (index: number, page: PageAndroid) => void;
  onPageScrolled: (index: number, offset: number) => void;
  onStateChanged: (state: SwipeViewState) => void;
  onPageCreate: (position: number) => PageAndroid;
  swipeToIndex(index: number, animated: boolean): void {
    animated = animated ? true : false; // not to pass null to native method
    this.nativeObject.setCurrentItem(index, animated);
  }
  private _page: PageAndroid;
  private _pages: PageAndroid[];
  private _lastIndex = -1;
  private _pageCount: number;
  private _pageInstances: PageAndroid[] = [];
  private _callbackOnPageSelected;
  private _callbackOnPageStateChanged;
  private _callbackOnPageScrolled;
  private _onPageCreateCallback;
  constructor(params?: TProps) {
    super(params);
    if (!this.nativeObject) {
      const callbacks = {
        getCount: () => {
          return this.pageCount !== null ? this.pageCount : this.pages.length;
        },
        getItem: (position: number) => {
          return this.getPageInstance(position);
        }
      };
      this.pagerAdapter = new NativePagerAdapter(fragmentManager, callbacks);

      const viewID = NativeView.generateViewId();
      this.nativeObject = new NativeViewPager(AndroidConfig.activity);
      this.nativeObject.setId(viewID);
      this.addAndroidProps(this.getAndroidProps());

      this.nativeObject.setAdapter(this.pagerAdapter);
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
          const offsetPixels = UnitConverter.pixelToDp(positionOffsetPixels);
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
    }
  }

  private getPageInstance(position: number) {
    let pageInstance: PageAndroid;
    if (this.onPageCreate) {
      pageInstance = this.onPageCreate?.(position);
    } else if (this._pageInstances[position]) {
      return this._pageInstances[position].nativeObject;
    } else {
      // For backward compatibility
      const PageClass = this.pages[position];
      //@ts-ignore TODO: skipDefaults Type
      pageInstance = new PageClass({
        skipDefaults: true
      });
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

  private bypassPageSpecificProperties(page: PageAndroid) {
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
  get pages(): Page[] {
    return this._pages as Page[]; //TODO: PageBase and PageAndroid no overlap
  }
  set pages(value) {
    if (Array.isArray(value)) {
      if (value.length < 1) {
        throw new TypeError('Array parameter cannot be empty.');
      }
      this._pages = value as any; //TODO: PageBase and PageAndroid no overlap
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
  static State: SwipeViewState & typeof ViewAndroid.State;
}
