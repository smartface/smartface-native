/* globals requireClass array */
const attributedTitleSuper = require("../../util/Android/attributedtitle.js");
const BottomTabBar = require("../bottomtabbar");
const TabBarController = require("../tabbarcontroller");

function TabBarItem(params) {
    this.ios = {};

    let _title, _icon, _badgeObj = undefined,
        _systemIcon;

    this.nativeObject = null; // this property should be set at runtime.
    this.tabBarItemParent = null; // this property assigned while adding item.
    this.index = null;
    this.badgeAdded = false;
    const self = this;
    Object.defineProperties(this, {
        'title': {
            get: function() {
                return _title;
            },
            set: function(title) {
                _title = title;
                self.__setTitle(title);
            },
            enumerable: true
        },
        'icon': {
            get: function() {
                return _icon;
            },
            set: function(value) {
                const Image = require("../image");
                const NativeDrawable = requireClass("android.graphics.drawable.Drawable");

                _icon = value;
                var EmptyImage = {
                    nativeObject: NativeDrawable.createFromPath(null)
                };

                let icon = value;
                if (icon.constructor === String) { //IDE requires this implementation.
                    icon = Image.createImageFromPath(icon);
                } else if (icon instanceof Object) {
                    icon.normal = Image.createImageFromPath(icon.normal);
                    icon.selected = Image.createImageFromPath(icon.selected);
                } else {
                    throw new Error("icon should be an instance of Image or given icon path should be properly.");
                }

                if (icon instanceof Object) {
                    // TODO: Refactor this implemenation. Discuss with ios team.
                    if (icon.normal instanceof Image && icon.selected instanceof Image) {
                        icon = makeSelector(icon.normal, icon.selected);
                    } else if (icon.normal instanceof Image) {
                        icon = makeSelector(icon.normal, EmptyImage);
                    } else if (icon.selected instanceof Image) {
                        icon = makeSelector(EmptyImage, icon.selected);
                    }
                }
                self.nativeObject && (self.nativeObject.setIcon(icon.nativeObject));
            },
            enumerable: true
        },
        'badge': {
            get: function() {
                const Badge = require("../../ui/badge");
                if (_badgeObj === undefined)
                    _badgeObj = new Badge();
                _badgeObj.nativeObject.getParent() === undefined && setBadgeToTabarItem.call(self, _badgeObj);

                return _badgeObj;
            },
            enumerable: true
        },
        'toString': {
            value: function() {
                return 'TabBarItem';
            },
            enumerable: true,
            configurable: true
        }
    });

    let _android = {};
    Object.defineProperty(self, 'android', {
        get: function() {
            return _android;
        },
        set: function(value) {
            Object.assign(self.android, value || {});
        }
    });

    Object.defineProperties(self.android, {
        'systemIcon': {
            get: function() {
                return _systemIcon;
            },
            set: function(systemIcon) {
                _systemIcon = systemIcon;
                const Image = require("../image");
                self.nativeObject && (self.nativeObject.setIcon(Image.systemDrawableId(_systemIcon)));
            },
            enumerable: true
        }
    });

    /*
    Applies common properties of items.
    */
    attributedTitleSuper(self);

    this.__setTitle = function(title) {
        if (!self.nativeObject)
            return;

        if (self.tabBarItemParent instanceof TabBarController)
            self.nativeObject.setText(title);
        else if (self.tabBarItemParent instanceof BottomTabBar)
            self.nativeObject.setTitle(title);
    };

    this.setProperties = function(params = {}) {
        const {
            itemTitle,
            itemIcon,
            systemIcon
        } = params;

        if (itemTitle)
            self.title = itemTitle;
        if (itemIcon)
            self.icon = itemIcon;
        if (systemIcon)
            self.android.systemIcon = systemIcon;
    };


    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }

    function setBadgeToTabarItem(badgeObj) {
        const self = this;
        self.badgeAdded = true;
        if (self.tabBarItemParent !== null && self.index !== null) {
            const NativeFrameLayout = requireClass("android.widget.FrameLayout");
            const AndroidUnitConverter = require("../../util/Android/unitconverter.js");

            const TOP_CENTERHORIZANTAL = 1 | 48;
            const WRAP_CONTENT = -2;
            let layoutParams = new NativeFrameLayout.LayoutParams(WRAP_CONTENT, WRAP_CONTENT, TOP_CENTERHORIZANTAL);
            badgeObj.layoutParams = layoutParams;
            layoutParams.setMarginStart(AndroidUnitConverter.dpToPixel(12));
            badgeObj.nativeObject.setLayoutParams(badgeObj.layoutParams);

            let nativeBottomTabarMenuView = self.tabBarItemParent.nativeObject.getChildAt(0);
            let nativeMenuItem = nativeBottomTabarMenuView.getChildAt(self.index);
            nativeMenuItem.addView(badgeObj.nativeObject);
        }
    }

    function makeSelector(normalImage, selectedImage) {
        const NativeStateListDrawable = requireClass("android.graphics.drawable.StateListDrawable");
        const NativeR = requireClass('android.R');

        var res = new NativeStateListDrawable();
        let attrState;
        if (self.tabBarItemParent instanceof TabBarController)
            attrState = "state_selected";
        else
            attrState = "state_checked";
        res.addState(array([NativeR.attr[attrState]], "int"), selectedImage.nativeObject);
        res.addState(array([], "int"), normalImage.nativeObject);

        return {
            nativeObject: res
        };
    }
}

module.exports = TabBarItem;