/* globals requireClass */
const NativeTabLayout = requireClass("android.support.design.widget.TabLayout");
const NativeRelativeLayout = requireClass("android.widget.RelativeLayout");
const NativeYogaNode = requireClass('com.facebook.yoga.YogaNode');
const NativeGradientDrawable = requireClass("android.graphics.drawable.GradientDrawable");

const AndroidUnitConverter = require("../../util/Android/unitconverter.js");
const AndroidConfig = require("../../util/Android/androidconfig");
const Page = require('../page');
const Color = require('../color');
const SwipeView = require('../swipeview');
const extend = require('js-base/core/extend');
const Button = require('sf-core/ui/button');

function TabLayout() {
    this.nativeObject = new NativeTabLayout(AndroidConfig.activity);
    this.yogaNode = new NativeYogaNode();

    this.nativeObject.setLayoutParams(new NativeRelativeLayout.LayoutParams(-1, -2));
    this.divider = this.nativeObject.getChildAt(0);
    this.dividerDrawable;
    
    var _dividerWidth = 0;
    var _dividerColor = Color.BLACK;
    var _dividerPadding = 0;
    var _backgroundColor = Color.WHITE;
    var _textColor = Color.BLACK; // TODO: Get default value from native
    var _indicatorColor = Color.create("#00A1F1");
    var _indicatorHeight;
    
    Object.defineProperties(this, {
        "dividerWidth": {
            get: function() {
                return _dividerWidth;
            },
            set: function(width) {
                _dividerWidth = width;
                
                this.divider.setShowDividers(2); // 2 = LinearLayout.SHOW_DIVIDER_MIDDLE
                this.dividerDrawable = new NativeGradientDrawable();
                this.dividerDrawable.setColor(_dividerColor.nativeObject);
                
                var px = AndroidUnitConverter.dpToPixel(_dividerWidth);
                this.dividerDrawable.setSize(px, 1);
                px = AndroidUnitConverter.dpToPixel(_dividerPadding);
                this.divider.setDividerPadding(px);
                this.divider.setDividerDrawable(this.dividerDrawable);
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
                if (this.dividerDrawable) {
                    this.dividerDrawable.setColor(_dividerColor.nativeObject);
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
                console.log("Set divider size");
                _dividerPadding = padding;
                if (this.dividerDrawable) {
                    var px = AndroidUnitConverter.dpToPixel(_dividerPadding);
                    this.divider.setDividerPadding(px);
                }
            },
            enumerable: true,
            configurable: true
        },
        "backgroundColor": {
            get: function() {
                return _backgroundColor;
            },
            set: function(color) {
                _backgroundColor = color;
                this.nativeObject.setBackgroundColor(color.nativeObject);
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
                var normalColor;
                var selectedColor;
                if(color instanceof Color) {
                    normalColor = color;
                    selectedColor = color;
                } else {
                    normalColor = color.normal;
                    selectedColor = color.selected;
                }
                this.nativeObject.setTabTextColors(normalColor.nativeObject, selectedColor.nativeObject);
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
                this.nativeObject.setSelectedTabIndicatorColor(_indicatorColor.nativeObject);
            },
            enumerable: true,
            configurable: true
        },
        "indicatorHeight": {
            get: function() {
                return _indicatorHeight;
            },
            set: function(height) {
                _indicatorHeight = height;
                var px = AndroidUnitConverter.dpToPixel(_indicatorHeight);
                this.nativeObject.setSelectedTabIndicatorHeight(px);
            },
            enumerable: true,
            configurable: true
        }         
    });
}

const TopTabBar = extend(Page)(
    function(_super, params) {
        var self = this;
        _super(self);

        this.tabLayout = new TabLayout();
        
        // TODO: Remove these assignment
        this.tabLayout.indicatorColor = Color.BLACK;
        this.tabLayout.indicatorHeight = 15;
        
        var viewPager = new SwipeView({
            page: self,
            flexGrow: 1,
            // pages = [],
            onStateChanged: function(state) {
            },
            // onPageScrolled
            onPageCreate: function(position) {
                console.log("getItem: " + position);
                (!pages[position]) && (pages[position] = new Page1());
                
                return pages[position];
            },
            pageCount: 6
            // onPageCount: function() {
            //     return 8;
            // }
        });
        this.tabLayout.nativeObject.setupWithViewPager(viewPager.nativeObject);
        
        this.layout.addChild(this.tabLayout);
        this.layout.addChild(viewPager);
        
        var _scrollEnabled = false;
        var _selectedIndex = 0;
        Object.defineProperties(this, {
            "dividerWidth": {
                get: function() {
                    return this.tabLayout.dividerWidth;
                },
                set: function(width) {
                    this.tabLayout.dividerWidth = width;
                },
                enumerable: true,
                configurable: true
            },
            "dividerColor": {
                get: function() {
                    return this.tabLayout.dividerColor;
                },
                set: function(color) {
                    this.tabLayout.dividerColor = color;
                },
                enumerable: true,
                configurable: true
            },
            "dividerPadding": {
                get: function() {
                    return this.tabLayout.dividerPadding;
                },
                set: function(padding) {
                    this.tabLayout.dividerPadding = padding;
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
                    if(value) {
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
                    return _selectedIndex;
                },
                set: function(index) {
                    _selectedIndex = index;
                    viewPager.swipeToIndex(_selectedIndex);
                },
                enumerable: true,
                configurable: true
            }
        });
        
        this.createDividerDrawableIfNeeded = function() {
            if(!self.tabLayout.dividerDrawable) {
                self.tabLayout.dividerDrawable = new NativeGradientDrawable();
            }
        };
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

var pages = [];
var Page1 = extend(Page)(
    function(_super, params) {
        _super(this, params);
        this.onLoad = function() {
            this.layout.backgroundColor = Color.GREEN;
            
            var button = new Button({
                text: "Sample text",
                width: 150,
                height: 70
            });
            this.layout.addChild(button);
        }.bind(this);
    }
);

module.exports = TopTabBar;