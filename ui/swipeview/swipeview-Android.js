/*globals requireClass*/
const View = require('../view');
const AndroidConfig = require("../../util/Android/androidconfig");
const scrollableSuper = require("../../util/Android/scrollable");

const NativeView = requireClass("android.view.View");
const NativeViewPager = requireClass("io.smartface.android.sfcore.ui.swipeview.SFSwipeView");
const NativePagerAdapter = requireClass("io.smartface.android.SFCorePagerAdapter");
const NativeOnPageChangeListener = requireClass("androidx.viewpager.widget.ViewPager$OnPageChangeListener");

const fragmentManager = AndroidConfig.activity.getSupportFragmentManager();

SwipeView.prototype = Object.create(View.prototype);
function SwipeView(params) {
    var self = this;
    var _pages = [];
    var _lastIndex = -1;

    if (!self.nativeObject) {
        var callbacks = {
            getCount: function() {
                if (self.pageCount != null)
                    return self.pageCount;
                return self.pages.length;
            },
            getItem: function(position) {
                let pageNativeObject = self.getPageInstance(position);
                return pageNativeObject;
            }
        };
        this.pagerAdapter = new NativePagerAdapter(fragmentManager, callbacks);

        var viewID = NativeView.generateViewId();
        self.nativeObject = new NativeViewPager(AndroidConfig.activity);
        self.nativeObject.setId(viewID);
    }

    View.apply(self);
    scrollableSuper(this, this.nativeObject);

    var _page;
    var _pageInstances = [];
    var _callbackOnPageSelected;
    var _callbackOnPageStateChanged;
    var _callbackOnPageScrolled;
    var _onPageCreateCallback;
    var _pageCount;
    Object.defineProperties(self, {
        "page": {
            get: function() {
                return _page;
            },
            set: function(page) {
                _page = page;
            }
        },
        "onPageCreate": {
            get: function() {
                return _onPageCreateCallback;
            },
            set: function(callback) {
                _onPageCreateCallback = callback;
            },
            enumerable: true,
            configurable: true
        },
        "pageCount": {
            get: function() {
                return _pageCount;
            },
            set: function(count) {
                _pageCount = count;
            }
        },
        "pages": {
            get: function() {
                return _pages;
            },
            set: function(pages) {
                if (pages instanceof Array) {
                    if (pages.length < 1) {
                        throw new TypeError("Array parameter cannot be empty.");
                    }
                    _pages = pages;
                    this.pagerAdapter.notifyDataSetChanged();
                }
            },
            enumerable: true,
            configurable: true
        },
        "onPageSelected": {
            get: function() {
                return _callbackOnPageSelected;
            },
            set: function(callback) {
                if (typeof callback === "function") {
                    _callbackOnPageSelected = callback;
                }
            },
            enumerable: true,
            configurable: true
        },
        "onPageScrolled": {
            get: function() {
                return _callbackOnPageScrolled;
            },
            set: function(callback) {
                if (typeof callback === "function") {
                    _callbackOnPageScrolled = callback;
                }
            },
            enumerable: true,
            configurable: true
        },
        "onStateChanged": {
            get: function() {
                return _callbackOnPageStateChanged;
            },
            set: function(callback) {
                _callbackOnPageStateChanged = callback;
            }
        },
        "currentIndex": {
            get: function() {
                return self.nativeObject.getCurrentItem();
            },
            enumerable: true,
            configurable: true
        },
        "swipeToIndex": {
            value: function(index, animated) {
                animated = (animated) ? true : false; // not to pass null to native method
                self.nativeObject.setCurrentItem(index, animated);
            },
            enumerable: true,
            configurable: true
        },
        "pagingEnabled": {
            get: () => {
                return self.nativeObject.isUserInputEnabled();
            },
            set: (value) => {
                self.nativeObject.setIsUserInputEnabled(value);
            },
            enumerable: true,
            configurable: true
        },
        "_pageInstances": {
            value: _pageInstances
        },
        "_bypassPageSpecificProperties": {
            value: function(page) {
                page.headerBar.visible = false;
                Object.keys(page.headerBar).forEach(function(key) {
                    Object.defineProperty(page.headerBar, key, {
                        set: function() {},
                        get: function() {
                            return {};
                        },
                    });
                });
                page.isSwipeViewPage = true;
            }
        }
    });

    this.getPageInstance = function(position) {
        var pageInstance;
        if (this.onPageCreate) {
            pageInstance = this.onPageCreate(position);
        } else if (_pageInstances[position]) {
            return (_pageInstances[position]).nativeObject;
        } else {
            // For backward compatibility
            var pageClass = this.pages[position];
            pageInstance = new pageClass({
                skipDefaults: true
            });
        }
        _pageInstances[position] = pageInstance;
        this._bypassPageSpecificProperties(pageInstance);
        return pageInstance.nativeObject;
    }.bind(self);

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }

    // Use setAdapter method after constructor's parameters are assigned.
    self.nativeObject.setAdapter(self.pagerAdapter);
    var listener = NativeOnPageChangeListener.implement({
        onPageScrollStateChanged: function(state) {
            if (state === 0) { // SCROLL_STATE_IDLE
                self.onStateChanged && self.onStateChanged(SwipeView.State.IDLE);
            } else if (state === 1) { // SCROLL_STATE_DRAGGING
                self.onStateChanged && self.onStateChanged(SwipeView.State.DRAGGING);
            }
        },
        onPageSelected: function(position) {
            self.onPageSelected && self.onPageSelected(position, _pageInstances[position]);
        },
        onPageScrolled: function(position, positionOffset, positionOffsetPixels) {
            if (self.onPageScrolled) {
                var AndroidUnitConverter = require("../../util/Android/unitconverter");

                var offsetPixels = AndroidUnitConverter.pixelToDp(positionOffsetPixels);
                self.onPageScrolled(position, offsetPixels);
            }
            var intPosition = position;
            if (_lastIndex !== intPosition && positionOffset === 0 && positionOffsetPixels === 0) {
                _lastIndex = intPosition;
                // TODO: Hotfix for APC. Please investigate why _pageInstances[intPosition] is null.
                // Maybe this custom index propagation has logic error.
                if (!_pageInstances[intPosition]) return;
                _pageInstances[intPosition].__onShowCallback && _pageInstances[intPosition].__onShowCallback();
            }
        }
    });
    self.nativeObject.addOnPageChangeListener(listener);
}

SwipeView.State = require("./swipeviewState");

module.exports = SwipeView;