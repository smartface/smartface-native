const View = require('../view');
const extend = require('js-base/core/extend');

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

const SwipeView = extend(View)(
     function (_super, params) {
        var self = this;
        var currentIndex = 0;
        var currentState = SwipeView.State.IDLE;
        
        if(!self.nativeObject){
            self.pageController = __SF_UIPageViewController.createWithTransitionStyleNavigationOrientation(UIPageViewControllerTransitionStyle.Scroll,UIPageViewControllerNavigationOrientation.Horizontal);
        }
        
        _super(this);
        
        self.pageController.onViewWillLayoutSubviews = function(){
            self.pageController.setViewFrame({x:0,y:0,width:self.nativeObject.frame.width,height:self.nativeObject.frame.height});
        }
        
        self.flexGrow = 1;
        self.nativeObject.addSubview(self.pageController.view);
        
        var _pageArray = [];
        var _pageNativeObjectArray = [];
        Object.defineProperty(self, 'pages', {
            get: function() {
                return _pageArray;
            },
            set: function(value) {
                if(!value instanceof Array || value.length < 1){
                    return;
                }
                _pageNativeObjectArray = [];
                for (var i = 0; i < value.length; i++) {
                    var page = new value[i]();
                    bypassPageSpecificProperties(page);
                    if (page.nativeObject.constructor.name === "SMFNative.SMFUIViewController"){
                        _pageNativeObjectArray.push(page.nativeObject);
                    }else{
                        return;
                    }
                }
                _pageArray = value;
                self.pageController.setViewControllerDirectionAnimatedCompletion([_pageNativeObjectArray[0]],UIPageViewControllerNavigationDirection.Forward,false,function(){});
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
                if(value instanceof require("sf-core/ui/page")){
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
                
        self.pageControllerDatasource.viewControllerBeforeViewController = function(e){
            var index = _pageNativeObjectArray.indexOf(e.viewController);
            if (index > 0){
                index--;
                return _pageNativeObjectArray[index];
            }
            return undefined;
        };
        
        self.pageControllerDatasource.viewControllerAfterViewController = function(e){
            var index = _pageNativeObjectArray.indexOf(e.viewController);
            if (index >= 0 && index < _pageNativeObjectArray.length - 1){
                index++;
                return _pageNativeObjectArray[index];
            }
            return undefined;
        };
        
        self.onPageSelectedHandler = function(e){
            if (typeof self.onPageSelected === "function"){
                var selectedIndex = _pageNativeObjectArray.indexOf(self.pageController.viewControllers[0]);
                if (currentIndex != selectedIndex){
                    currentIndex = selectedIndex;
                         self.onPageSelected(selectedIndex); 
                }
            }
        }
        
        self.onStateChangedHandler = function(e){
            if (typeof self.onStateChanged === "function"){
                if (currentState != e.state){
                    currentState = e.state;
                    __SF_Dispatch.mainAsync(function(){
                        self.onStateChanged(e.state);
                    });
                }
            }
        }
        
        var _isPageTransaction = false;
        self.swipeToIndex = function(value,animated){
            var _animated;
            if(typeof(animated) === "boolean"){
                _animated = animated;
            }else{
                _animated = false
            }
        if (value === currentIndex || _isPageTransaction){
                return;
            }
            if (_pageNativeObjectArray[value]){
                _isPageTransaction = true;
                if(value < currentIndex){  
                    __SF_Dispatch.mainAsync(function(){
                    self.pageController.scrollToPageDirectionAnimatedCompletion(_pageNativeObjectArray[value],UIPageViewControllerNavigationDirection.Reverse,_animated,function(){
                        _isPageTransaction = false;
                            __SF_Dispatch.mainAsync(function(){
                                self.onPageSelectedHandler();
                            });
                        });
                    });
                }else{
                    __SF_Dispatch.mainAsync(function(){
                        self.pageController.scrollToPageDirectionAnimatedCompletion(_pageNativeObjectArray[value],UIPageViewControllerNavigationDirection.Forward,_animated,function(){
                            _isPageTransaction = false;
                            __SF_Dispatch.mainAsync(function(){
                                self.onPageSelectedHandler();
                             });
                         });
                    });
                }
            }
        }
        
        self.pageControllerDelegate = new __SF_UIPageViewControllerDelegate();
                
        self.pageControllerDelegate.willTransitionToViewControllers = function(e){ //e.pendingViewControllers
            _isPageTransaction = true;
            self.onStateChangedHandler({state : SwipeView.State.DRAGGING});
        };
        
        self.pageControllerDelegate.didFinishAnimating = function(e){ //e.previousViewControllers
            __SF_Dispatch.mainAsyncAfter(function(){
                    _isPageTransaction = false;
                    self.onPageSelectedHandler();
                    self.onStateChangedHandler({state : SwipeView.State.IDLE});
            },50);
        };
        
        self.pageController.dataSource = self.pageControllerDatasource;
        self.pageController.delegate = self.pageControllerDelegate;
                
                 
        
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
});

function bypassPageSpecificProperties(page) {
    Object.keys(page.statusBar).forEach(function(key){
        Object.defineProperty(page.statusBar, key,{
            set: function() {},
            get: function() {},
        });
    });
    Object.keys(page.headerBar).forEach(function(key){
        Object.defineProperty(page.headerBar, key,{
            set: function() {},
            get: function() {},
        });
    });
}

  
SwipeView.State = require("./swipeviewState");
  
module.exports = SwipeView;