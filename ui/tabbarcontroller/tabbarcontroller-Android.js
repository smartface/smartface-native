/* globals requireClass */
const NativeTabLayout = requireClass("com.google.android.material.tabs.TabLayout");
const NativeRelativeLayout = requireClass("android.widget.RelativeLayout");
const NativeYogaNodeFactory = requireClass('com.facebook.yoga.YogaNodeFactory');
const NativeGradientDrawable = requireClass("android.graphics.drawable.GradientDrawable");
const PorterDuff = requireClass("android.graphics.PorterDuff");

const AndroidUnitConverter = require("../../util/Android/unitconverter.js");
const AndroidConfig = require("../../util/Android/androidconfig");
const Application = require("../../application");
const Page = require('../page');
const Color = require('../color');
const SwipeView = require('../swipeview');
const Events = require('./events');
const { EventEmitterCreator } = require("../../core/eventemitter/index.js");
TabBarController.Events = {...Page.Events, ...Events};

const ModeSRC_IN = PorterDuff.Mode.SRC_IN;

function DpToPixel(dp) {
    return AndroidUnitConverter.dpToPixel(dp);
}

function PixelToDp(px) {
    return AndroidUnitConverter.pixelToDp(px);
}

TabBarController.prototype = Object.create(Page.prototype);
function TabBarController(params) {
    var self = this;
    Page.apply(self);

    var _onPageCreateCallback,
        _onSelectedCallback;
    var _items = [];
    var _overScrollMode = 0;
    var _scrollEnabled = false;
    var _dividerWidth = 0,
        _dividerPadding = 0,
        _dividerColor = Color.BLACK;
    var _barColor = Color.WHITE,
        _textColor = Color.BLACK, // TODO: Get default value from native
        _iconColor;
    var _indicatorHeight,
        _indicatorColor = Color.create("#00A1F1");
    var _autoCapitalize = true;

    this.tabLayout = {};
    this.tabLayout.nativeObject = new NativeTabLayout(AndroidConfig.activity);
    this.tabLayout.yogaNode = NativeYogaNodeFactory.create();
    this.tabLayout.nativeObject.setLayoutParams(new NativeRelativeLayout.LayoutParams(-1, -2));
    this.divider = this.tabLayout.nativeObject.getChildAt(0);
    //Todo: When Google fixed its issue (https://issuetracker.google.com/issues/36973591), remove this line.
    this.tabLayout.nativeObject.setLayoutDirection(Application.LayoutDirection.LEFTTORIGHT);

    this.dividerDrawable;
    if (!this.swipeView) {
        this.swipeView = new SwipeView({
            page: self,
            flexGrow: 1,
            onPageCreate: function(position) {
                if (!self.onPageCreate) {
                    return null;
                }
                return self.onPageCreate(position);
            },
            // TODO: Remove params.items check later version
            pageCount: ((params && params.items) ? params.items.length : _items.length)
        });
    }
    this.android = {};

    this.tabLayout.nativeObject.setupWithViewPager(this.swipeView.nativeObject);
    this.layout.addChild(this.tabLayout);
    this.layout.addChild(this.swipeView);

    Object.defineProperties(this, {
        "onSelected": {
            get: function() {
                return _onSelectedCallback;
            },
            set: function(callback) {
                _onSelectedCallback = callback;
            },
            enumerable: true,
            configurable: true
        },
        "barHeight": {
            get: function() {
                return PixelToDp(this.tabLayout.nativeObject.getHeight());
            },
            set: function(height) {
                this.tabLayout.yogaNode.setHeight(DpToPixel(height));
            },
            enumerable: true,
            configurable: true
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
        "barColor": {
            get: function() {
                return _barColor;
            },
            set: function(color) {
                _barColor = color;
                this.tabLayout.nativeObject.setBackgroundColor(color.nativeObject);
            },
            enumerable: true,
            configurable: true
        },
        "textColor": {
            get: function() {
                return _textColor;
            },
            set: function(color) {
                _textColor = color;
                var normalColor = (color instanceof Color) ? color : color.normal;
                var selectedColor = (color instanceof Color) ? color : color.selected;
                this.tabLayout.nativeObject.setTabTextColors(normalColor.nativeObject, selectedColor.nativeObject);
            },
            enumerable: true,
            configurable: true
        },
        "iconColor": {
            get: function() {
                return _iconColor;
            },
            set: function(color) {
                _iconColor = color;
                var normalColor = (color instanceof Color) ? color : color.normal;
                var selectedColor = (color instanceof Color) ? color : color.selected;
                for (var i = 0; i < _items.length; i++) {
                    var tabIcon = this.tabLayout.nativeObject.getTabAt(i).getIcon();
                    if (i === this.selectedIndex) {
                        tabIcon && (tabIcon.setColorFilter(selectedColor.nativeObject, ModeSRC_IN));
                    } else {
                        tabIcon && (tabIcon.setColorFilter(normalColor.nativeObject, ModeSRC_IN));
                    }
                }
            },
            enumerable: true,
            configurable: true
        },
        "indicatorColor": {
            get: function() {
                return _indicatorColor;
            },
            set: function(color) {
                _indicatorColor = color;
                this.tabLayout.nativeObject.setSelectedTabIndicatorColor(_indicatorColor.nativeObject);
            },
            enumerable: true,
            configurable: true
        },
        "indicatorHeight": {
            get: function() {
                // native tabloayout doesn't have a getter for indicator height.
                return _indicatorHeight;
            },
            set: function(height) {
                _indicatorHeight = height;
                var px = DpToPixel(_indicatorHeight);
                this.tabLayout.nativeObject.setSelectedTabIndicatorHeight(px);
            },
            enumerable: true,
            configurable: true
        },
        "scrollEnabled": {
            get: function() {
                return _scrollEnabled;
            },
            set: function(value) {
                _scrollEnabled = value;
                if (value) {
                    this.tabLayout.nativeObject.setTabMode(0); // 0 = TabLayout.MODE_SCROLLABLE
                    this.tabLayout.nativeObject.setLayoutParams(new NativeRelativeLayout.LayoutParams(-2, -2));
                } else {
                    this.tabLayout.nativeObject.setTabMode(1); // 1 = TabLayout.MODE_FIXED
                    this.tabLayout.nativeObject.setLayoutParams(new NativeRelativeLayout.LayoutParams(-1, -2));
                }
            },
            enumerable: true,
            configurable: true
        },
        "selectedIndex": {
            get: function() {
                return self.swipeView.currentIndex;
            },
            enumerable: true,
            configurable: true
        },
        "items": {
            get: function() {
                return _items;
            },
            set: function(itemArray) {
                // TODO: We have updated UI.TabBarItem in Router v2.
                // After it will merge, title and icon must be updated dynamically.
                _items = itemArray;

                // TODO: Maybe later, swipeView pageCount can be set dynamically.
                // After that, use refreshData method like listview.
                this.swipeView.pageCount = _items.length;
                this.swipeView.pagerAdapter.notifyDataSetChanged();

                for (let i = 0; i < itemArray.length; i++) {
                    let item = itemArray[i],
                        itemTitle = item._attributedTitleBuilder ? item._attributedTitleBuilder : item.title;

                    item.tabBarItemParent = self;
                    item.nativeObject = this.tabLayout.nativeObject.getTabAt(i);
                    item.setProperties({
                        itemTitle,
                        itemIcon: item.icon,
                        systemIcon: item.android.systemIcon
                    });
                }
                if (!this.autoCapitalize)
                    self.setAllCaps(_items, this.tabLayout.nativeObject, this.autoCapitalize);
            },
            enumerable: true,
            configurable: true
        },
        "autoCapitalize": {
            get: function() {
                return _autoCapitalize;
            },
            set: function(value) {
                _autoCapitalize = value;
                if (this.items && (this.items.length > 0)) {
                    // TODO: If you set title or icon later, native tabLayout capitalizes title of tab item.
                    // Call this function after setting title.
                    self.setAllCaps(this.items, this.tabLayout.nativeObject, _autoCapitalize);
                }
            },
            enumerable: true,
            configurable: true
        },
        "pagingEnabled": {
            get: () => {
                return self.swipeView.pagingEnabled;
            },
            set: (value) => {
                self.swipeView.pagingEnabled = value;
            },
            enumerable: true,
            configurable: true
        }
    });

    Object.defineProperties(this.android, {
        "dividerWidth": {
            get: function() {
                return _dividerWidth;
            },
            set: function(width) {
                _dividerWidth = width;

                self.divider.setShowDividers(2); // 2 = LinearLayout.SHOW_DIVIDER_MIDDLE
                self.dividerDrawable = new NativeGradientDrawable();
                self.dividerDrawable.setColor(_dividerColor.nativeObject);

                var px = DpToPixel(_dividerWidth);
                self.dividerDrawable.setSize(px, 1);
                px = DpToPixel(_dividerPadding);
                self.divider.setDividerPadding(px);
                self.divider.setDividerDrawable(self.dividerDrawable);
            },
            enumerable: true,
            configurable: true
        },
        "dividerColor": {
            get: function() {
                return _dividerColor;
            },
            set: function(color) {
                _dividerColor = color;
                if (self.dividerDrawable) {
                    self.dividerDrawable.setColor(_dividerColor.nativeObject);
                }
            },
            enumerable: true,
            configurable: true
        },
        "dividerPadding": {
            get: function() {
                return _dividerPadding;
            },
            set: function(padding) {
                _dividerPadding = padding;
                if (self.dividerDrawable) {
                    var px = DpToPixel(_dividerPadding);
                    self.divider.setDividerPadding(px);
                }
            },
            enumerable: true,
            configurable: true
        },
        "overScrollMode": {
            get: function() {
                return _overScrollMode;
            },
            set: function(mode) {
                _overScrollMode = mode;
                self.swipeView.android.overScrollMode = mode;
                self.tabLayout.nativeObject.setOverScrollMode(mode);
            },
            enumerable: true,
            configurable: true
        },
    });

    const EventFunctions = {
        [Events.PageCreate]: function() {
            _onPageCreateCallback = (state) => {
                this.emitter.emit(Events.PageCreate, state);
            } 
        },

        [Events.Selected]: function() {
            _onSelectedCallback = (state) => {
                this.emitter.emit(Events.Selected, state);
            } 
        }
    }
    
    EventEmitterCreator(this, EventFunctions);
   
    this.setSelectedIndex = function(index, animated) {
        self.swipeView.swipeToIndex(index, animated);
    };
    this.createDividerDrawableIfNeeded = function() {
        if (!self.dividerDrawable) {
            self.dividerDrawable = new NativeGradientDrawable();
        }
    };

    this.setAllCaps = function(itemArray, nativeTabLayout, autoCapitalize) {
        const NativeTextView = requireClass("android.widget.TextView");
        let viewGroupOfTabLayout = nativeTabLayout.getChildAt(0);
        let tabsCount = viewGroupOfTabLayout.getChildCount();
        for (let i = 0; i < tabsCount; i++) {
            let viewGroupOfTab = viewGroupOfTabLayout.getChildAt(i);
            let tabChildsCount = viewGroupOfTab.getChildCount();
            for (let j = 0; j < tabChildsCount; j++) {
                let tabViewChild = viewGroupOfTab.getChildAt(j);
                let isAssignableFrom = NativeTextView.isAssignableFrom(tabViewChild.getClass());
                if (isAssignableFrom) {
                    tabViewChild.setAllCaps(autoCapitalize);
                    itemArray[i].nativeTextView = tabViewChild;
                }
            }
        }
    };

    var listener = NativeTabLayout.OnTabSelectedListener.implement({
        onTabSelected: function(tab) {
            self.onSelected && self.onSelected(tab.getPosition());
            if (!self.iconColor)
                return;

            var selectedColor = ((self.iconColor) instanceof Color) ? self.iconColor : self.iconColor.selected;
            var tabIcon = tab.getIcon();
            tabIcon && (tabIcon.setColorFilter(selectedColor.nativeObject, ModeSRC_IN));

        },
        onTabUnselected: function(tab) {
            if (!self.iconColor)
                return;

            var normalColor = ((self.iconColor) instanceof Color) ? self.iconColor : self.iconColor.normal;
            var tabIcon = tab.getIcon();
            tabIcon && (tabIcon.setColorFilter(normalColor.nativeObject, ModeSRC_IN));
        },
        onTabReselected: function(tab) {}
    });
    this.tabLayout.nativeObject.addOnTabSelectedListener(listener);

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = TabBarController;