const attributedTitleSuper = require("../../util/Android/attributedtitle.js");

function TabBarItem(params) {
    this.ios = {};

    let _title, _icon, _badgeObj = undefined,
        _systemIconId = null;

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
            set: function(valueObj) {
                const Image = require("../image");
                const NativeDrawable = requireClass("android.graphics.drawable.Drawable");

                var EmptyImage = {
                    nativeObject: NativeDrawable.createFromPath(null)
                };

                var icon = valueObj;
                if (!(icon instanceof Object)) { //IDE requires this implementation.
                    icon = Image.createImageFromPath(icon);
                }
                else {
                    icon.normal = Image.createImageFromPath(icon.normal);
                    icon.selected = Image.createImageFromPath(icon.selected);
                }

                if (icon instanceof Image || icon === null) {
                    _icon = icon;
                }
                else if (icon instanceof Object) {
                    // TODO: Refactor this implemenation. Discuss with ios team.
                    if (icon.normal instanceof Image && icon.selected instanceof Image) {
                        _icon = makeSelector(icon.normal, icon.selected);
                    }
                    else if (icon.normal instanceof Image) {
                        _icon = makeSelector(icon.normal, EmptyImage);
                    }
                    else if (icon.selected instanceof Image) {
                        _icon = makeSelector(EmptyImage, icon.selected);
                    }
                    else if (typeof icon.normal === "string" && typeof icon.selected === "string") { //IDE requires this implementation.
                        icon.normal = icon.normal && Image.createFromFile(icon.normal);
                        icon.selected = icon.selected && Image.createFromFile(icon.selected);
                    }

                }
                else if (typeof icon === "string") {
                    icon = Image.createFromFile(icon);
                }
                else {
                    throw new Error("icon should be an instance of Image or given icon path should be properly.");
                }
                self.nativeObject && (self.nativeObject.setIcon(icon.nativeObject));
            },
            enumerable: true
        },
        'badge': {
            get: function() {
                const Badge = require("sf-core/ui/badge");
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
                return _systemIconId;
            },
            set: function(systemIconId) {
                _systemIconId = systemIconId;
                self.nativeObject && (self.nativeObject.setIcon(systemIconId));
            },
            enumerable: true
        }
    });

    /*
    Applies common properties of items.
    */
    attributedTitleSuper(self);

    this.__setTitle = function(title) {
        self.nativeObject && self.nativeObject.setTitle(title);
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

            let nativeBottomTabarMenuView = self.tabBarItemParent.getChildAt(0);
            let nativeMenuItem = nativeBottomTabarMenuView.getChildAt(self.index);
            nativeMenuItem.addView(badgeObj.nativeObject);
        }
    }

    function makeSelector(normalImage, selectedImage) {
        const NativeStateListDrawable = requireClass("android.graphics.drawable.StateListDrawable");
        const NativeR = requireClass('android.R');

        var res = new NativeStateListDrawable();
        res.addState(array([NativeR.attr.state_checked], "int"), selectedImage.nativeObject);
        res.addState(array([], "int"), normalImage.nativeObject);

        return res;
    }
}

module.exports = TabBarItem;
