function TabBarItem(params) {
    let _title, _icon, _badgeObj = undefined;

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
                if (typeof(title) === "string") {
                    _title = title;
                    this.nativeObject && this.nativeObject.setTitle(title);
                }
                else {
                    throw new Error("title should be string.");
                }
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

            let layoutParams = new NativeFrameLayout.LayoutParams(NativeFrameLayout.LayoutParams.WRAP_CONTENT, NativeFrameLayout.LayoutParams.WRAP_CONTENT);
            badgeObj.layoutParams = layoutParams;
            // layoutParams.setMarginStart(AndroidUnitConverter.dpToPixel(10));
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
