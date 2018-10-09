const NativeTabLayout = requireClass("android.support.design.widget.TabLayout");
const NativeRelativeLayout = requireClass("android.widget.RelativeLayout");
const NativeYogaNode = requireClass('com.facebook.yoga.YogaNode');
const NativeGradientDrawable = requireClass("android.graphics.drawable.GradientDrawable");

const AndroidConfig = require("../../util/Android/androidconfig");
const extend = require('js-base/core/extend');
const Page = require('../page');
const Color = require('../color');
const SwipeView = require('../swipeview');
const Button = require('sf-core/ui/button');

function TabLayout() {
    this.nativeObject = new NativeTabLayout(AndroidConfig.activity);
    this.yogaNode = new NativeYogaNode();

    this.nativeObject.setLayoutParams(new NativeRelativeLayout.LayoutParams(-2, -2));
    this.divider = this.nativeObject.getChildAt(0);
    this.dividerDrawable;
    
    var _dividerWidth = 0;
    var _dividerColor = Color.BLACK;
    var _dividerPadding = 0;
    Object.defineProperties(this, {
        "dividerWidth": {
            get: function() {
                return _dividerWidth;
            },
            set: function(width) {
                _dividerWidth = width;
                // LinearLayout.SHOW_DIVIDER_MIDDLE = 2
                this.divider.setShowDividers(2);
                this.dividerDrawable = new NativeGradientDrawable();
                this.dividerDrawable.setColor(_dividerColor.nativeObject);
                this.dividerDrawable.setSize(width, 1);
                this.divider.setDividerPadding(_dividerPadding);
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
                    this.divider.setDividerPadding(_dividerPadding);
                }
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
        
        this.tabLayout.nativeObject.setBackgroundColor(Color.create(0, 0, 255).nativeObject);
        this.tabLayout.nativeObject.setTabTextColors(Color.WHITE.nativeObject, Color.BLUE.nativeObject);
        this.tabLayout.nativeObject.setSelectedTabIndicatorColor(Color.BLACK.nativeObject);
        this.tabLayout.nativeObject.setSelectedTabIndicatorHeight(15);
        
        var viewPager = new SwipeView({
            page: self,
            flexGrow: 1,
            onStateChanged: function(state) {
            },
            getItem: function(position) {
                console.log("getItem: " + position);
                (!pages[position]) && (pages[position] = new Page1());
                return pages[position];
            },
            getItemCount: function() {
                return 5;
            }
        });
        this.tabLayout.nativeObject.setupWithViewPager(viewPager.nativeObject);
        
        this.layout.addChild(this.tabLayout);
        this.layout.addChild(viewPager);
        
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