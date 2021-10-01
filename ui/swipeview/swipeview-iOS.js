const View = require('../view');
const Exception = require("../../util").Exception;
const Page = require("../../ui/page");
const YGUnit = require('../../util').YogaEnums.YGUnit;
const Invocation = require('../../util/iOS/invocation.js');

const UIPageViewControllerTransitionStyle = {
    PageCurl: 0,
    Scroll: 1
};

const UIPageViewControllerNavigationOrientation = {
    Horizontal: 0,
    Vertical: 1
};

const UIPageViewControllerNavigationDirection = {
    Forward: 0,
    Reverse: 1
};

// const SwipeView = extend(View)(
SwipeView.prototype = Object.create(View.prototype);
function SwipeView(params) {
    var self = this;
    var currentIndex = 0;
    var currentState = SwipeView.State.IDLE;

    if (!self.nativeObject) {
        self.pageController = __SF_UIPageViewController.createWithTransitionStyleNavigationOrientation(UIPageViewControllerTransitionStyle.Scroll, UIPageViewControllerNavigationOrientation.Horizontal);
    }

    View.apply(this);
    
    var _onTouch;
    Object.defineProperty(self, 'onTouch', {
        get: function() {
            return _onTouch;
        },
        set: function(value) {
            if (typeof value === 'function') {
                _onTouch = value;
                var onTouchHandler = function(e) {
                    if (e && e.point) {
                        var object = {
                            x:e.point.x,
                            y:e.point.y
                        };
                        return value.call(this,object);
                    }else{
                        return value.call(this);
                    }
                };
                self.pageController.view.onTouch = onTouchHandler.bind(this);
            }
        },
        enumerable: true
    });

    var _onTouchEnded;
    Object.defineProperty(self, 'onTouchEnded', {
        get: function() {
            return _onTouchEnded;
        },
        set: function(value) {
            if (typeof value === 'function') {
                _onTouchEnded = value;
                var onTouchEndedHandler = function(e) {
                    if (e && e.point) {
                        var inside = function(frame,point) {
                            var x = point.x;
                            var y = point.y;
                            var w = frame.width;
                            var h = frame.height;
                            return !(x > w || x < 0 || y > h || y < 0);
                        }(self.nativeObject.frame, e.point)
                        
                        var object = {
                            isInside: inside,
                            x:e.point.x,
                            y:e.point.y
                        };
                        return value.call(this,inside,object);
                    } else {
                        return value.call(this);
                    }
                };
                self.pageController.view.onTouchEnded = onTouchEndedHandler.bind(this);
            }
        },
        enumerable: true
    });

    self.didScrollHandler = function(e) {
        if (this.pageController.scrollView) {
            var point = Invocation.invokeInstanceMethod(this.pageController.scrollView, "contentOffset", [], "CGPoint");
            var x = point.x - self.nativeObject.frame.width;
            var index;
            if (x >= 0) {
                index = transactionIndex;
            } else {
                index = transactionIndex - 1;
                x += self.nativeObject.frame.width;
            }
            if (point.x == 0 || point.x == self.nativeObject.frame.width * 2) {
                transactionIndex = pendingViewControllerIndex
            }
            if (typeof self.onPageScrolled === 'function') {
                self.onPageScrolled(index, x);
            }
        }
    }

    self.pageController.didScroll = self.didScrollHandler.bind(this);

    self.pageController.onViewWillLayoutSubviews = function() {
        self.pageController.setViewFrame({
            x: 0,
            y: 0,
            width: self.nativeObject.frame.width,
            height: self.nativeObject.frame.height
        });
    }

    self.flexGrow = 1;
    self.nativeObject.addSubview(self.pageController.view);

    var _pageArray = [];
    var _instanceArray = [];
    var _pageNativeObjectArray = [];
    var _pagingEnabled = true;
    Object.defineProperty(self, 'pages', {
        get: function() {
            return _pageArray;
        },
        set: function(value) {
            if (!(value instanceof Array)) {
                return;
            }
            if (value.length < 1) {
                throw new TypeError("Array parameter cannot be empty.");
            }
            _pageNativeObjectArray = [];
            _instanceArray = [];
            for (var i = 0; i < value.length; i++) {
                var page = new value[i]();
                bypassPageSpecificProperties(page);
                if (page.nativeObject.constructor.name === "SMFUIViewController") {
                    page.orientation = Page.Orientation.AUTO;
                    _instanceArray.push(page);
                    _pageNativeObjectArray.push(page.nativeObject);
                } else {
                    return;
                }
            }
            _pageArray = value;
            self.pageController.setViewControllerDirectionAnimatedCompletion([_pageNativeObjectArray[0]], UIPageViewControllerNavigationDirection.Forward, false, function() {});
            currentIndex = 0;
        },
        enumerable: true
    });

    var _page;
    Object.defineProperty(self, 'page', {
        get: function() {
            return _page;
        },
        set: function(value) {
            if (value instanceof require("../../ui/page")) {
                _page = value;
                _page.nativeObject.addChildViewController(self.pageController);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'currentIndex', {
        get: function() {
            return currentIndex;
        },
        enumerable: true
    });

    self.pageControllerDatasource = new __SF_UIPageViewControllerDatasource();

    var transactionIndex = 0;
    self.pageControllerDatasource.viewControllerBeforeViewController = function(e) {
        var index = _pageNativeObjectArray.indexOf(e.viewController);
        transactionIndex = index;
        if (index > 0 && _pagingEnabled) {
            index--;
            return _pageNativeObjectArray[index];
        }
        return undefined;
    };

    self.pageControllerDatasource.viewControllerAfterViewController = function(e) {
        var index = _pageNativeObjectArray.indexOf(e.viewController);
        transactionIndex = index;
        if (index >= 0 && index < _pageNativeObjectArray.length - 1 && _pagingEnabled) {
            index++;
            return _pageNativeObjectArray[index];
        }
        return undefined;
    };

    self.onPageSelectedHandler = function(e) {
        var selectedIndex;
        if (e.index !== undefined) {
            selectedIndex = e.index;
        } else if (e.completed) {
            selectedIndex = pendingViewControllerIndex;
        } else {
            selectedIndex = previousViewControllerIndex;
        }

        if (selectedIndex != currentIndex) {
            currentIndex = selectedIndex;
            if (typeof self.onPageSelected === "function") {
                self.onPageSelected(currentIndex, _instanceArray[currentIndex]);
            }
        }
    }

    self.onStateChangedHandler = function(e) {
        if (typeof self.onStateChanged === "function") {
            if (currentState != e.state) {
                currentState = e.state;
                __SF_Dispatch.mainAsync(function() {
                    self.onStateChanged(e.state);
                });
            }
        }
    }

    var _isPageTransaction = false;
    self.swipeToIndex = function(value, animated) {
        var isLTR = (__SF_UIView.viewAppearanceSemanticContentAttribute() == 0) ? (__SF_UIApplication.sharedApplication().userInterfaceLayoutDirection == 0) : (__SF_UIView.viewAppearanceSemanticContentAttribute() == 3);
        var _animated;
        if (typeof(animated) === "boolean") {
            _animated = animated;
        } else {
            _animated = false
        }
        if (value === currentIndex || _isPageTransaction) {
            return;
        }
        if (_pageNativeObjectArray[value]) {
            _isPageTransaction = true;
            if (value < currentIndex) {
                __SF_Dispatch.mainAsync(function() {
                    pendingViewControllerIndex = value;
                    self.pageController.scrollToPageDirectionAnimatedCompletion(_pageNativeObjectArray[value], isLTR ? UIPageViewControllerNavigationDirection.Reverse : UIPageViewControllerNavigationDirection.Forward, _animated, function() {
                        _isPageTransaction = false;
                        __SF_Dispatch.mainAsync(function() {
                            self.onPageSelectedHandler({
                                completed: true,
                                index: value
                            });
                        });
                    });
                });
            } else {
                __SF_Dispatch.mainAsync(function() {
                    pendingViewControllerIndex = value;
                    self.pageController.scrollToPageDirectionAnimatedCompletion(_pageNativeObjectArray[value], isLTR ? UIPageViewControllerNavigationDirection.Forward : UIPageViewControllerNavigationDirection.Reverse, _animated, function() {
                        _isPageTransaction = false;
                        __SF_Dispatch.mainAsync(function() {
                            self.onPageSelectedHandler({
                                completed: true,
                                index: value
                            });
                        });
                    });
                });
            }
        }
    }


    const EventFunctions = {
        [Events.PageScrolled]: function() {
            self.onPageScrolled = function (state) {
                this.emitter.emit(Events.PageScrolled, state);
            } 
        },
        [Events.PageSelected]: function() {
            self.onPageSelected = function (state) {
                this.emitter.emit(Events.PageSelected, state);
            } 
        },
        [Events.StateSelected]: function() {
            self.onStateChanged = function (state) {
                this.emitter.emit(Events.StateSelected, state);
            } 
        }
    }
    
    const parentOnFunction = this.on;
    Object.defineProperty(this, 'on', {
        value: (event, callback) => {
            if (typeof EventFunctions[event] === 'function') {
                EventFunctions[event].call(this);
                this.emitter.on(event, callback);
            }
            else {
                parentOnFunction(event, callback);
            }
        },
        configurable: true
    });

    self.pageControllerDelegate = new __SF_UIPageViewControllerDelegate();

    var pendingViewControllerIndex;
    self.pageControllerDelegate.willTransitionToViewControllers = function(e) { //e.pendingViewControllers
        pendingViewControllerIndex = _pageNativeObjectArray.indexOf(e.pendingViewControllers[0]);
        _isPageTransaction = true;
        self.onStateChangedHandler({
            state: SwipeView.State.DRAGGING
        });
    };

    var previousViewControllerIndex;
    self.pageControllerDelegate.didFinishAnimating = function(e) { //e.previousViewControllers
        previousViewControllerIndex = _pageNativeObjectArray.indexOf(e.previousViewControllers[0]);
        __SF_Dispatch.mainAsyncAfter(function() {
            _isPageTransaction = false;
            self.onPageSelectedHandler(e);
            self.onStateChangedHandler({
                state: SwipeView.State.IDLE
            });
        }, 50);
    };

    self.pageController.dataSource = self.pageControllerDatasource;
    self.pageController.delegate = self.pageControllerDelegate;

    Object.defineProperty(self, 'width', {
        get: function() {
            return self.nativeObject.frame.width;
        },
        set: function(value) {
            if (typeof value === "number") {
                self.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "width");
                self.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "maxWidth");
                self.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "minWidth");
            } else {
                throw new TypeError(Exception.TypeError.NUMBER);
            }
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(self, 'pagingEnabled', {
        get: function() {
            return _pagingEnabled;
        },
        set: function(value) {
            _pagingEnabled = value;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(self, 'height', {
        get: function() {
            return self.nativeObject.frame.height;
        },
        set: function(value) {
            if (typeof value === "number") {
                self.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "height");
                self.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "maxHeight");
                self.nativeObject.yoga.setYGValueUnitForKey(value, YGUnit.Point, "minHeight");
            } else {
                throw new TypeError(Exception.TypeError.NUMBER);
            }
        },
        enumerable: true,
        configurable: true
    });


    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

function bypassPageSpecificProperties(page) {
    Object.keys(page.headerBar).forEach(function(key) {
        Object.defineProperty(page.headerBar, key, {
            set: function() {},
            get: function() {
                return {};
            },
        });
    });
}


SwipeView.State = require("./swipeviewState");

module.exports = SwipeView;