/*globals requireClass*/
const extend                        = require('js-base/core/extend');
const View                          = require('../view');
const AndroidConfig                 = require("../../util/Android/androidconfig");
const NativeView                    = requireClass("android.view.View");
const NativeViewPager               = requireClass("android.support.v4.view.ViewPager");
const NativePagerAdapter            = requireClass("io.smartface.android.SFCorePagerAdapter");
const NativeOnPageChangeListener    = requireClass("android.support.v4.view.ViewPager$OnPageChangeListener");

const fragmentManager = AndroidConfig.activity.getSupportFragmentManager();

const SwipeView = extend(View)(
    function (_super, params) {
        var self = this;
        var pagerAdapter = new NativePagerAdapter(fragmentManager);
        
        var _lastIndex = -1;
        if(!self.nativeObject) {
            var viewID = NativeView.generateViewId();
            self.nativeObject = new NativeViewPager(AndroidConfig.activity);
            self.nativeObject.setId(viewID);
            self.nativeObject.setAdapter(pagerAdapter);
            self.nativeObject.addOnPageChangeListener(NativeOnPageChangeListener.implement({
                onPageScrollStateChanged: function(state) {
                    if (state === 0) { // SCROLL_STATE_IDLE
                        _callbackOnPageStateChanged && _callbackOnPageStateChanged(SwipeView.State.IDLE);
                    } else if (state === 1) { // SCROLL_STATE_DRAGGING
                        _callbackOnPageStateChanged && _callbackOnPageStateChanged(SwipeView.State.DRAGGING);
                    }
                },
                onPageSelected: function(position) {
                    _callbackOnPageSelected && _callbackOnPageSelected(position,_pageInstances[position]);
                },
                onPageScrolled: function(position, positionOffset, positionOffsetPixels) {
                    if(_callbackOnPageScrolled) {
                        var AndroidUnitConverter = require("sf-core/util/Android/unitconverter");
                        
                        var offsetPixels = AndroidUnitConverter.pixelToDp(positionOffsetPixels);
                        _callbackOnPageScrolled(position, offsetPixels);
                    }
                    var intPosition = position;
                    if (_lastIndex !== intPosition && positionOffset === 0 && positionOffsetPixels === 0) {
                        _lastIndex = intPosition;
                        _pageInstances[intPosition].onShowSwipeView && _pageInstances[intPosition].onShowSwipeView();
                    }
                }
            }));
        }
        _super(self);

        var _page;
        var _pages = [];
        var _pageInstances = [];
        var _callbackOnPageSelected;
        var _callbackOnPageStateChanged;
        var _callbackOnPageScrolled;
        Object.defineProperties(self, {
            "page": {
                get: function() {
                    return _page;
                },
                set: function(page) {
                    _page = page;
                }
            },
            "pages": {
                get: function() {
                    return _pages;
                },
                set: function(pages) {
                    if (pages instanceof Array) {
                        if(pages.length < 1){
                            throw new TypeError("Array parameter cannot be empty.");
                        }
                        _pages = pages;
                        
                        var nativeFragments = [];
                        pages.forEach(function(page){
                            var pageInstance = new page({
                                skipDefaults: true
                            });
                            bypassPageSpecificProperties(pageInstance);
                            _pageInstances.push(pageInstance);
                            nativeFragments.push(pageInstance.nativeObject);
                        });
  
                        pagerAdapter = new NativePagerAdapter(fragmentManager);
                        pagerAdapter.setFragments(array(nativeFragments));
                        self.nativeObject.setAdapter(pagerAdapter);
                    }
                }
            },
            "onPageSelected" : {
                get: function() {
                    return _callbackOnPageSelected;
                },
                set: function(callback) {
                    if (typeof callback === "function") {
                        _callbackOnPageSelected = callback;
                    }
                }
            },
            "onPageScrolled" : {
                get: function() {
                    return _callbackOnPageScrolled;
                },
                set: function(callback) {
                    if (typeof callback === "function") {
                        _callbackOnPageScrolled = callback;
                    }
                }
            },
            "onStateChanged" : {
                get: function() {
                    return _callbackOnPageStateChanged;
                },
                set: function(callback) {
                    _callbackOnPageStateChanged = callback;
                }
            },
            "currentIndex" : {
                get: function() {
                    return self.nativeObject.getCurrentItem();
                }
            },
            "swipeToIndex": {
                value: function(index, animated) {
                    animated = (animated)? true : false; // not to pass null to native method
                    self.nativeObject.setCurrentItem(index, animated);
                }
            }
        });
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

function bypassPageSpecificProperties(page) {
    Object.keys(page.statusBar).forEach(function(key){
        Object.defineProperty(page.statusBar, key,{
            set: function() {},
            get: function() {},
        });
    });
    page.headerBar.visible = false;
    Object.keys(page.headerBar).forEach(function(key){
        Object.defineProperty(page.headerBar, key,{
            set: function() {},
            get: function() {},
        });
    });
    page.onShowSwipeView = page.onShow;
    page.onShow = function() {};
}

SwipeView.State = require("./swipeviewState");

module.exports = SwipeView;