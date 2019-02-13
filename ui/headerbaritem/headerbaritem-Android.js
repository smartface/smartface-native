/* globals requireClass, toJSArray */
const Color = require("../color");
const Image = require("../image");
const AndroidUnitConverter = require("../../util/Android/unitconverter.js");
const HeaderBarItemPadding = require("../../util/Android/headerbaritempadding");
const AndroidConfig = require("../../util/Android/androidconfig");
const SFView = requireClass("io.smartface.android.sfcore.ui.view.SFViewUtil");
const NativeTextButton = requireClass('android.widget.Button');
const NativePorterDuff = requireClass('android.graphics.PorterDuff');
const NativeImageButton = requireClass('android.widget.ImageButton');
const attributedTitleSuper = require("../../util/Android/attributedtitle.js");

function PixelToDp(px) { return AndroidUnitConverter.pixelToDp(px); }

const activity = AndroidConfig.activity;

function HeaderBarItem(params) {

    const self = this;

    let _title = "",
        _attributedTitle,
        _image = null,
        _enabled = true,
        _onPress = null,
        _color = null,
        _searchView = null,
        _imageButton = false,
        _menuItem = null,
        _badgeObj = undefined,
        _systemIconId;


    this.ios = {};

    self.isBadgeEnabled = false;
    Object.defineProperties(this, {
        'color': {
            get: function() {
                return _color;
            },
            set: function(value) {
                if (value === null)
                    return;
                // TODO: Fix it for new router.
                if (!(typeof(value) === "number" || value instanceof Color)) {
                    throw new TypeError("color must be Color instance");
                }
                _color = value;
                if (this.nativeObject) {
                    if (this.image && this.image.nativeObject) {
                        var imageCopy = this.image.nativeObject.mutate();
                        imageCopy.setColorFilter(this.color.nativeObject, NativePorterDuff.Mode.SRC_IN);
                        this.nativeObject.setImageDrawable(imageCopy);
                    }
                    else {
                        this.nativeObject.setTextColor(_color.nativeObject);
                    }
                }
            },
            enumerable: true
        },
        'title': {
            get: function() {
                return _title;
            },
            set: function(value) {
                if (value !== null && typeof(value) !== "string") {
                    throw new TypeError("title must be string or null.");
                }
                _title = value;
                self.__setTitle(_title);
            },
            enumerable: true
        },
        'imageButton': {
            get: function() { return _imageButton; },
            set: function(value) { _imageButton = value; }
        },
        'menuItem': {
            get: function() { return _menuItem; },
            set: function(value) { _menuItem = value; }
        },
        'image': {
            get: function() {
                return _image;
            },
            set: function(value) {
                value = Image.createImageFromPath(value); //IDE requires this implementation.

                if (value === null || value instanceof Image) {
                    _image = value;
                    if (!this.nativeObject || (this.nativeObject && !this.imageButton)) {
                        this.nativeObject = createNativeImageButton.call(this);
                    }
                    if (this.nativeObject && this.imageButton) {
                        if (_image) {
                            var imageCopy = _image.nativeObject.mutate();
                            this.nativeObject.setImageDrawable(imageCopy);
                        }
                        else {
                            this.nativeObject.setImageDrawable(null);
                            this.nativeObject = null;
                            if (_attributedTitle) {
                                this.attributedTitle = _attributedTitle;
                            }
                            else {
                                this.title = _title;
                            }
                        }
                    }
                }
                else {
                    throw new TypeError("image must be Image instance or image path should be given properly.");
                }
            },
            enumerable: true
        },
        // Searchview only property
        'searchView': {
            get: function() {
                return _searchView;
            },
            set: function(searchView) {
                if (searchView) {
                    _searchView = searchView;
                    if (this.nativeObject) {
                        this.nativeObject.setActionView(_searchView.nativeObject);
                    }
                }
            },
            enumerable: false
        },
        'enabled': {
            get: function() {
                return _enabled;
            },
            set: function(value) {
                _enabled = !!value;
                if (this.nativeObject) {
                    this.nativeObject.setEnabled(_enabled);
                }
            },
            enumerable: true
        },
        'onPress': {
            get: function() {
                return _onPress;
            },
            set: function(value) {
                if (value instanceof Function) {
                    _onPress = value.bind(this);
                }
                else {
                    throw new TypeError("onPress must be function.");
                }
            },
            enumerable: true
        },
        'setValues': {
            value: function() {
                this.color = this.color;
                this.enabled = this.enabled;
                if (this.imageButton) {
                    this.image && (this.image = this.image);
                    this.android.systemIcon && (this.android.systemIcon = this.android.systemIcon);
                }
                else if (_attributedTitle) {
                    this.attributedTitle = _attributedTitle;
                }
                else {
                    this.title = _title;
                }

                const NativeView = requireClass('android.view.View');
                this.nativeObject.setOnClickListener(NativeView.OnClickListener.implement({
                    onClick: function(view) {
                        _onPress && _onPress();
                    }
                }));
            }
        },
        'size': {
            get: function() {
                return self.nativeObject ? {
                    width: AndroidUnitConverter.pixelToDp(self.nativeObject.getWidth()),
                    height: AndroidUnitConverter.pixelToDp(self.nativeObject.getHeight())
                } : undefined;
            },
            set: function(size) {
                if (typeof size === 'object' && self.nativeObject) {
                    self.nativeObject.setWidth(AndroidUnitConverter.dpToPixel(size.width));
                    self.nativeObject.setHeight(AndroidUnitConverter.dpToPixel(size.height));
                }
            },
            configurable: true
        },
        'toString': {
            value: function() {
                return 'HeaderBarItem';
            },
            enumerable: true,
            configurable: true
        },
        'badge': {
            get: function() {
                const Badge = require("sf-core/ui/badge");
                if (_badgeObj === undefined) {
                    _badgeObj = new Badge();
                    self.isBadgeEnabled = true;
                    self.assignRules(_badgeObj);
                    self.addToHeaderView(_badgeObj);
                }
                return _badgeObj;
            },
            enumerable: true
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

                if (!self.nativeObject || (self.nativeObject && !self.imageButton))
                    self.nativeObject = createNativeImageButton.call(self);

                self.nativeObject && (self.nativeObject.setImageResource(systemIconId));
            },
            enumerable: true
        }
    });

    this.assignRules = function(badge) {
        if (!self.nativeObject)
            return;

        const NativeRelativeLayout = requireClass("android.widget.RelativeLayout");
        const NativeView = requireClass('android.view.View');

        const ALIGN_END = 19;
        const WRAP_CONTENT = -2;

        var layoutParams = new NativeRelativeLayout.LayoutParams(WRAP_CONTENT, WRAP_CONTENT);
        self.nativeObject.setId(NativeView.generateViewId());
        layoutParams.addRule(ALIGN_END, self.nativeObject.getId());

        badge.nativeObject.setLayoutParams(layoutParams);
    };

    this.addToHeaderView = function(badge) {
        if (!self.nativeBadgeContainer || !badge)
            return;

        if (!badge.nativeObject.getParent()) {
            self.nativeBadgeContainer.addView(badge.nativeObject);
        }
        else {
            var parentOfNativeObject = badge.nativeObject.getParent();
            parentOfNativeObject.removeAllViews();
            self.nativeBadgeContainer.addView(badge.nativeObject);
        }
    };

    /*
    Applies common properties of items.
    */
    attributedTitleSuper(self);

    this.__setTitle = function(title) {
        let itemTitle = title ? title : "";

        if (!self.nativeObject) {
            self.nativeObject = new NativeTextButton(activity);
            self.nativeObject.setText(itemTitle);
            self.nativeObject.setBackgroundColor(Color.TRANSPARENT.nativeObject);
            self.nativeObject.setPaddingRelative(
                HeaderBarItemPadding.vertical, HeaderBarItemPadding.horizontal,
                HeaderBarItemPadding.vertical, HeaderBarItemPadding.horizontal
            );

            self.color = _color;
            self.imageButton = false;
            if (self.menuItem)
                self.menuItem.getActionView().addView(self.nativeObject);
        }
        else if (!self.imageButton) {
            self.nativeObject.setText(itemTitle);
            self.color = _color;
        }
    };

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

function createNativeImageButton() {
    const headerBarItem = this;

    let nativeImageButton;
    if (!headerBarItem.nativeObject) {
        nativeImageButton = new NativeImageButton(activity);
        nativeImageButton.setBackground(null);
        nativeImageButton.setPaddingRelative(
            HeaderBarItemPadding.vertical, HeaderBarItemPadding.horizontal,
            HeaderBarItemPadding.vertical, HeaderBarItemPadding.horizontal
        );
    }
    else
        nativeImageButton = headerBarItem.nativeObject;
    headerBarItem.imageButton = true;
    if (headerBarItem.menuItem)
        headerBarItem.menuItem.getActionView().addView(nativeImageButton);

    return nativeImageButton;
}



HeaderBarItem.prototype = {
    getScreenLocation: function() {
        var location = toJSArray(SFView.getLocationOnScreen(this.nativeObject));
        var position = {};
        position.x = PixelToDp(location[0]);
        position.y = PixelToDp(location[1]);
        return position;
    },
};

var _itemColor = Color.WHITE;
Object.defineProperty(HeaderBarItem, 'itemColor', {
    get: function() {
        return _itemColor;
    },
    set: function(color) {
        if (color instanceof Color) {
            _itemColor = color;
        }
    },
    enumerable: true,
    configurable: true
});



HeaderBarItem.iOS = {};
HeaderBarItem.iOS.SystemItem = {};

module.exports = HeaderBarItem;
