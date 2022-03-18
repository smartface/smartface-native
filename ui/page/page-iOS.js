const FlexLayout = require('../../ui/flexlayout');
const Screen = require('../../device/screen');
const OrientationType = require('../../device/screen/orientationtype');
const Invocation = require('../../util').Invocation;
const HeaderBarItem = require('../../ui/headerbaritem');

const {
    EventEmitterCreator
  } = require("../../core/eventemitter");

const Events = require('./events');
Page.Events = {...Events};

const UIInterfaceOrientation = {
    unknown: 0,
    portrait: 1, // Device oriented vertically, home button on the bottom
    portraitUpsideDown: 2, // Device oriented vertically, home button on the top
    landscapeLeft: 3, // Device oriented horizontally, home button on the right
    landscapeRight: 4
}

function Page(params) {
    var self = this;

    self.routerPath = null;

    if (!self.nativeObject) {
        self.nativeObject = new __SF_UIViewController();
    }

    self.pageView = new FlexLayout();

    self.pageView.nativeObject.addObserver(function() {
        self.layout.nativeObject.endEditing(true);
    }, __SF_UIApplicationWillResignActiveNotification);

    self.nativeObject.automaticallyAdjustsScrollViewInsets = false;

    var _safeAreaPaddingObject = {
        "top": 0,
        "bottom": 0,
        "left": 0,
        "right": 0
    };

    function calculateSafeAreaPaddings(paddingObject) {
        self.pageView.paddingTop = paddingObject.top;
        self.pageView.paddingBottom = paddingObject.bottom;
        self.pageView.paddingLeft = paddingObject.left;
        self.pageView.paddingRight = paddingObject.right;
        self.calculatePosition();
    }

    self.ios = {};
    var _safeAreaLayoutMode = false;
    Object.defineProperty(self.ios, 'safeAreaLayoutMode', {
        get: function() {
            return _safeAreaLayoutMode;
        },
        set: function(value) {
            if (_safeAreaLayoutMode !== value) { // Prevents unnecessary applyLayout() calls.
                _safeAreaLayoutMode = value;
                if (_safeAreaLayoutMode === true) {
                    calculateSafeAreaPaddings(_safeAreaPaddingObject);
                } else {
                    calculateSafeAreaPaddings({
                        "top": 0,
                        "bottom": 0,
                        "left": 0,
                        "right": 0
                    });
                }
                self.layout.applyLayout();
            }
        },
        enumerable: true
    });

    self.nativeObject.onViewSafeAreaInsetsDidChange = function(e) {
        _safeAreaPaddingObject = e;
        if (_safeAreaLayoutMode) {
            calculateSafeAreaPaddings(_safeAreaPaddingObject);
        }

        if (typeof self.ios.onSafeAreaPaddingChange === "function") {
            self.ios.onSafeAreaPaddingChange(_safeAreaPaddingObject);
        }
    }

    var _transitionViews;
    Object.defineProperty(self, 'transitionViews', {
        get: function() {
            return _transitionViews;
        },
        set: function(value) {
            if (typeof value === "object") {
                _transitionViews = value;
            }
        },
        enumerable: true
    });

    self.present = function(params) {
        if (typeof params === "object") {
            var controller = params.controller;
            var animation = params.animated;
            var onComplete = params.onComplete;

            if (typeof controller === "object") {
                var _animationNeed = animation;
                var _completionBlock = onComplete ? function() {
                    onComplete();
                } : undefined;

                var controllerToPresent;
                if (controller && controller.nativeObject) {
                    controllerToPresent = controller.nativeObject;

                    if (typeof self.transitionViews !== "undefined") {
                        controllerToPresent.setValueForKey(true, "isHeroEnabled");
                    }

                    self.nativeObject.presentViewController(controllerToPresent, _completionBlock, _animationNeed);
                }
            }
        }
    };

    var _presentationStyle = 0;
    Object.defineProperty(self.ios, 'presentationStyle', {
        get: function() {
            return _presentationStyle;
        },
        set: function(value) {
            if (typeof value === "number") {
                _presentationStyle = value;
                self.nativeObject.modalTransitionStyle = _presentationStyle;
            }
        },
        enumerable: true
    });

    self.dismiss = function(params) {
        if (typeof params === "object") {
            var onComplete = params.onComplete;
            var animation = params.animated;
            var _completionBlock = onComplete ? function() {
                onComplete();
            } : undefined;
            self.nativeObject.dismissViewController(_completionBlock, animation);
        }
    };

    self.calculatePosition = function() {
        self.layout.applyLayout();
    }

    self.nativeObject.onViewLoad = function() {
        self.pageView.nativeObject.backgroundColor = __SF_UIColor.whiteColor();
        return self.pageView.nativeObject;
    }

    self.nativeObject.onViewLayoutSubviews = function() {
        self.calculatePosition();
    }

    self.nativeObject.onViewDidAppear = function() {
        if (self.nativeObject.navigationController) { //COR-1627 for iOS 11 badge
            var subviews = Invocation.invokeInstanceMethod(self.nativeObject.navigationController.navigationBar, "subviews", [], "id");
            for (var i = 0; i < subviews.length; i++) {
                if (subviews[i].constructor.name == "_UINavigationBarContentView") {
                    var argConstant = new Invocation.Argument({
                        type: "BOOL",
                        value: false
                    });
                    Invocation.invokeInstanceMethod(subviews[i], "setClipsToBounds:", [argConstant]);
                    break;
                }
            }
        }
    }

    var onOrientationChange = (params) => {
        if(typeof this.onOrientationChange === "function"){
            this.onOrientationChange(params);
        }
        this.emitter.emit(Events.OrientationChange, params);
    };

    self.onOrientationChangeHandler = function() {
        if (typeof self.onOrientationChange === "function") {
            var tempOrientation;
            switch (Screen.orientation) {
                case OrientationType.PORTRAIT:
                    tempOrientation = Page.Orientation.PORTRAIT;
                    break;
                case OrientationType.UPSIDEDOWN:
                    tempOrientation = Page.Orientation.UPSIDEDOWN;
                    break;
                case OrientationType.LANDSCAPELEFT:
                    tempOrientation = Page.Orientation.LANDSCAPELEFT;
                    break;
                case OrientationType.LANDSCAPERIGHT:
                    tempOrientation = Page.Orientation.LANDSCAPERIGHT;
                    break;
                default:
                    tempOrientation = Page.Orientation.PORTRAIT;
            }
            onOrientationChange({
                orientation: tempOrientation
            });
        }
    }

    self.nativeObject.viewWillTransition = self.onOrientationChangeHandler;

    Object.defineProperty(self, 'layout', {
        get: function() {
            return self.pageView;
        },
        enumerable: true
    });

    self.layout.applyLayout = function() {
        self.layout.nativeObject.yoga.applyLayoutPreservingOrigin(true);
    }

    self.nativeObject.onLoad = () => {
        if (this.onLoad instanceof Function) {
            this.onLoad();
        }
        this.emitter.emit(Events.Load);
    }

    self.checkOrientation = function() {
        var currentOrientation = __SF_UIApplication.sharedApplication().statusBarOrientation;
        if (self.orientation.indexOf(currentOrientation) === -1) {
            __SF_UIDevice.changeOrientation(currentOrientation); //Workaround for IOS-2580
            __SF_UIDevice.changeOrientation(self.orientation[0]);
            self.layout.applyLayout();
        }

    };

    self.ios.onSafeAreaPaddingChange = (state) => {
        this.emitter.emit(Events.SafeAreaPaddingChange, state)
    }

    const EventFunctions = {
        [Events.BackButtonPressed]: function() {
            //Android only
        }
    }
    
    EventEmitterCreator(this, EventFunctions);

    Object.defineProperty(this, 'currentOrientation', {
        get: function() {
            var tempOrientation;
            switch (__SF_UIApplication.sharedApplication().statusBarOrientation) {
                case 1:
                    tempOrientation = Page.Orientation.PORTRAIT;
                    break;
                case 2:
                    tempOrientation = Page.Orientation.UPSIDEDOWN;
                    break;
                case 3:
                    tempOrientation = Page.Orientation.LANDSCAPELEFT;
                    break;
                case 4:
                    tempOrientation = Page.Orientation.LANDSCAPERIGHT;
                    break;
                default:
                    tempOrientation = Page.Orientation.PORTRAIT;
            }
            return tempOrientation;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'orientation', {
        get: function() {
            return self.nativeObject.orientations;
        },
        set: function(orientation) {
            self.nativeObject.orientations = orientation;
        },
        enumerable: true
    });

    self.orientation = [UIInterfaceOrientation.portrait]; // Default Portrait
    self.nativeObject.onShow = () => {
        __SF_UIView.animation(0, 0, function() {
            self.layout.nativeObject.endEditing(true);
        }, {});
        self.checkOrientation();
        if (typeof this.onShow === 'function') {
            this.onShow(this.__pendingParameters);
        }
        this.emitter.emit(Events.Show, this.__pendingParameters);
        delete this.__pendingParameters;
    };

    self.nativeObject.onHide = () => {
        __SF_UIView.animation(0, 0, () => {
            this.layout.nativeObject && this.layout.nativeObject.endEditing(true);
        }, {});

        if (typeof this.onHide === "function") {
            this.onHide();
        }
        this.emitter.emit(Events.Hide);
    };

    self.nativeObject.dismissComplete = () => {
        this.emitter.emit(Events.DimissComplete, { target: "bottomSheet" });
    }

    self.nativeObject.dismissStart = () => {
        this.emitter.emit(Events.DismissStart, { target: "bottomSheet" });
    }
    
    self.nativeObject.dismissCancel = () => {
        this.emitter.emit(Events.DismissCancel, { target: "bottomSheet" });
    }

    function getParentViewController(controller) {
        var parent = Invocation.invokeInstanceMethod(controller, "parentViewController", [], "NSObject");
        if (parent) {
            return getParentViewController(parent);
        } else {
            return controller;
        }
    }

    // Prevent undefined is not an object error
    this.android = {};

    // Deprecated
    self.headerBar = {};
    self.headerBar.android = {};
    self.headerBar.ios = {};

    // New one
    self.ios.navigationItem = {};

    // Deprecated
    Object.defineProperty(self.headerBar, 'title', {
        get: function() {
            return self.nativeObject.navigationItem.title;
        },
        set: function(value) {
            self.nativeObject.navigationItem.title = value;
        },
        enumerable: true,
        configurable: true
    });

    // New one
    Object.defineProperty(self.ios.navigationItem, 'title', {
        get: function() {
            return self.nativeObject.navigationItem.title;
        },
        set: function(value) {
            self.nativeObject.navigationItem.title = value;
        },
        enumerable: true,
        configurable: true
    });

    var _titleView = true;

    function checkIfSearchviewIsSubview(nativeObject) { //Workaround Bug : IOS-2707
        for (var index in nativeObject.subviews) {
            if (nativeObject.subviews[index].constructor.name === "SMFUISearchBar") {
                return true;
            }
            if (checkIfSearchviewIsSubview(nativeObject.subviews[index])) {
                return true;
            }
        }
        return false;
    }
    // Deprecated
    Object.defineProperty(self.headerBar, 'titleLayout', {
        get: function() {
            return _titleView;
        },
        set: function(value) {
            if (typeof value === "object") {
                _titleView = value;
                _titleView.applyLayout();

                // These calls may need for different cases.
                if (checkIfSearchviewIsSubview(_titleView.nativeObject)) { //Workaround Bug : IOS-2707
                    _titleView.nativeObject.layoutIfNeeded();
                }
                // _titleView.nativeObject.translatesAutoresizingMaskIntoConstraints = true;
                _titleView.nativeObject.sizeToFit();

                self.nativeObject.navigationItem.titleView = _titleView.nativeObject;
            } else {

                self.nativeObject.navigationItem.titleView = undefined;
            }
        },
        enumerable: true,
        configurable: true
    });

    // New one
    Object.defineProperty(self.ios.navigationItem, 'titleLayout', {
        get: function() {
            return _titleView;
        },
        set: function(value) {
            if (typeof value === "object") {
                _titleView = value;
                _titleView.applyLayout();

                // These calls may need for different cases.
                if (checkIfSearchviewIsSubview(_titleView.nativeObject)) { //Workaround Bug : IOS-2707
                    _titleView.nativeObject.layoutIfNeeded();
                }
                // _titleView.nativeObject.translatesAutoresizingMaskIntoConstraints = true;
                _titleView.nativeObject.sizeToFit();

                self.nativeObject.navigationItem.titleView = _titleView.nativeObject;
            } else {

                self.nativeObject.navigationItem.titleView = undefined;
            }
        },
        enumerable: true,
        configurable: true
    });

    // Deprecated
    Object.defineProperty(self.headerBar, 'leftItemEnabled', {
        get: function() {
            return !self.nativeObject.navigationItem.hidesBackButton;
        },
        set: function(value) {
            self.nativeObject.navigationItem.hidesBackButton = !value;
            if (value) {
                if (_leftItem) {
                    self.nativeObject.navigationItem.leftBarButtonItem = _leftItem;
                }
            } else {
                self.nativeObject.navigationItem.leftBarButtonItem = undefined;
            }
        },
        enumerable: true,
        configurable: true
    });

    // New one
    Object.defineProperty(self.ios.navigationItem, 'leftItemEnabled', {
        get: function() {
            return !self.nativeObject.navigationItem.hidesBackButton;
        },
        set: function(value) {
            self.nativeObject.navigationItem.hidesBackButton = !value;
            if (value) {
                if (_leftItem) {
                    self.nativeObject.navigationItem.leftBarButtonItem = _leftItem;
                }
            } else {
                self.nativeObject.navigationItem.leftBarButtonItem = undefined;
            }
        },
        enumerable: true,
        configurable: true
    });

    // Deprecated
    self.headerBar.setItems = function(value) {
        var nativeObjectArray = [];

        for (var i = value.length - 1; i >= 0; i--) { //Bug : IOS-2399
            nativeObjectArray.push(value[i].nativeObject);
        }

        self.nativeObject.navigationItem.rightBarButtonItems = nativeObjectArray;
    };

    // New one
    self.ios.navigationItem.setItems = function(value) {
        var nativeObjectArray = [];

        for (var i = value.length - 1; i >= 0; i--) { //Bug : IOS-2399
            nativeObjectArray.push(value[i].nativeObject);
        }

        self.nativeObject.navigationItem.rightBarButtonItems = nativeObjectArray;
    };

    var _leftItem;
    // Deprecated
    self.headerBar.setLeftItem = function(value) {
        if (value) {
            if (value instanceof HeaderBarItem) {
                if (self.ios.navigationItem.leftItemEnabled) {
                    self.nativeObject.navigationItem.leftBarButtonItem = value.nativeObject;
                }
                _leftItem = value.nativeObject;
            } else {
                throw new Error("leftItem must be null or an instance of UI.HeaderBarItem");
            }
        } else {
            self.nativeObject.navigationItem.leftBarButtonItem = null;
        }
    };
    // New one
    self.ios.navigationItem.setLeftItem = function(value) {
        if (value) {
            if (value instanceof HeaderBarItem) {
                if (self.ios.navigationItem.leftItemEnabled) {
                    self.nativeObject.navigationItem.leftBarButtonItem = value.nativeObject;
                }
                _leftItem = value.nativeObject;
            } else {
                throw new Error("leftItem must be null or an instance of UI.HeaderBarItem");
            }
        } else {
            self.nativeObject.navigationItem.leftBarButtonItem = null;
        }
    };

    var _largeTitleDisplayMode = 0;
    // Deprecated
    Object.defineProperty(self.headerBar.ios, 'largeTitleDisplayMode', {
        get: function() {
            return _largeTitleDisplayMode;
        },
        set: function(value) {
            if (typeof value === 'number') {
                const UINavigationItem = SF.requireClass("UINavigationItem");
                if (UINavigationItem.instancesRespondToSelector("largeTitleDisplayMode")) {
                    _largeTitleDisplayMode = value;
                    self.nativeObject.navigationItem.largeTitleDisplayMode = _largeTitleDisplayMode;
                }
            }
        },
        enumerable: true
    });
    // New one
    Object.defineProperty(self.ios.navigationItem, 'largeTitleDisplayMode', {
        get: function() {
            return _largeTitleDisplayMode;
        },
        set: function(value) {
            if (typeof value === 'number') {
                const UINavigationItem = SF.requireClass("UINavigationItem");
                if (UINavigationItem.instancesRespondToSelector("largeTitleDisplayMode")) {
                    _largeTitleDisplayMode = value;
                    self.nativeObject.navigationItem.largeTitleDisplayMode = _largeTitleDisplayMode;
                }
            }
        },
        enumerable: true
    });

    // Deprecated
    Object.defineProperty(self.headerBar.ios, 'backBarButtonItem', {
        get: function() {
            var retval = undefined;

            var nativeObject = self.nativeObject.navigationItem.backBarButtonItem;

            if (nativeObject) {
                var backBarButtonItem = new HeaderBarItem();
                backBarButtonItem.nativeObject = nativeObject;
                backBarButtonItem.nativeObject.target = nativeObject;
                retval = backBarButtonItem;
            }

            return retval;
        },
        set: function(value) {
            if (typeof value === 'object') {
                self.nativeObject.navigationItem.backBarButtonItem = value.nativeObject;
            }
        },
        enumerable: true
    });

    // New one
    Object.defineProperty(self.ios.navigationItem, 'backBarButtonItem', {
        get: function() {
            var retval = undefined;

            var nativeObject = self.nativeObject.navigationItem.backBarButtonItem;

            if (nativeObject) {
                var backBarButtonItem = new HeaderBarItem();
                backBarButtonItem.nativeObject = nativeObject;
                backBarButtonItem.nativeObject.target = nativeObject;
                retval = backBarButtonItem;
            }

            return retval;
        },
        set: function(value) {
            if (typeof value === 'object') {
                self.nativeObject.navigationItem.backBarButtonItem = value.nativeObject;
            }
        },
        enumerable: true
    });

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

Page.Orientation = {};
Object.defineProperty(Page.Orientation, "PORTRAIT", {
    value: [UIInterfaceOrientation.portrait]
});
Object.defineProperty(Page.Orientation, "UPSIDEDOWN", {
    value: [UIInterfaceOrientation.portraitUpsideDown]
});
Object.defineProperty(Page.Orientation, "AUTOPORTRAIT", {
    value: [UIInterfaceOrientation.portrait, UIInterfaceOrientation.portraitUpsideDown]
});
Object.defineProperty(Page.Orientation, "LANDSCAPELEFT", {
    value: [UIInterfaceOrientation.landscapeLeft]
});
Object.defineProperty(Page.Orientation, "LANDSCAPERIGHT", {
    value: [UIInterfaceOrientation.landscapeRight]
});
Object.defineProperty(Page.Orientation, "AUTOLANDSCAPE", {
    value: [UIInterfaceOrientation.landscapeLeft, UIInterfaceOrientation.landscapeRight]
});
Object.defineProperty(Page.Orientation, "AUTO", {
    value: [UIInterfaceOrientation.portrait, UIInterfaceOrientation.portraitUpsideDown, UIInterfaceOrientation.landscapeLeft, UIInterfaceOrientation.landscapeRight]
});

Page.iOS = {};
Page.iOS.LargeTitleDisplayMode = {};
Object.defineProperty(Page.iOS.LargeTitleDisplayMode, "AUTOMATIC", {
    value: 0
});
Object.defineProperty(Page.iOS.LargeTitleDisplayMode, "ALWAYS", {
    value: 1
});
Object.defineProperty(Page.iOS.LargeTitleDisplayMode, "NEVER", {
    value: 2
});

Page.iOS = {};
Page.iOS.PresentationStyle = {};
Object.defineProperty(Page.iOS.PresentationStyle, "COVERVERTICAL", {
    value: 0
});
Object.defineProperty(Page.iOS.PresentationStyle, "FLIPHORIZONTAL", {
    value: 1
});
Object.defineProperty(Page.iOS.PresentationStyle, "CROSSDISSOLVE", {
    value: 2
});
Object.defineProperty(Page.iOS.PresentationStyle, "PARTIALCURL", {
    value: 3
});

module.exports = Page;