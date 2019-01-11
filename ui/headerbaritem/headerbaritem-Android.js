/* globals requireClass, toJSArray, array */
const Color = require("../color");
const Image = require("../image");
const AndroidUnitConverter = require("../../util/Android/unitconverter.js");
const HeaderBarItemPadding = require("../../util/Android/headerbaritempadding");
const AndroidConfig = require("../../util/Android/androidconfig");
const AttributedString = require("sf-core/ui/attributedstring");
const SFView = requireClass("io.smartface.android.sfcore.ui.view.SFViewUtil");
const NativeTextButton = requireClass('android.widget.Button');
const NativePorterDuff = requireClass('android.graphics.PorterDuff');
const NativeImageButton = requireClass('android.widget.ImageButton');
const NativeSpannableStringBuilder = requireClass("android.text.SpannableStringBuilder");

function PixelToDp(px) { return AndroidUnitConverter.pixelToDp(px); }

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
        _attributedTitleBuilder,
        _badgeObj = undefined,
        _size;
    const activity = AndroidConfig.activity;

    this.ios = {};
    this.android = {};

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
                        this.nativeObject = new NativeImageButton(activity);
                        this.nativeObject.setBackground(null);
                        this.nativeObject.setPaddingRelative(
                            HeaderBarItemPadding.vertical, HeaderBarItemPadding.horizontal,
                            HeaderBarItemPadding.vertical, HeaderBarItemPadding.horizontal
                        );
                        this.imageButton = true;
                        if (this.menuItem) {
                            this.menuItem.setActionView(this.nativeObject);
                        }
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
                    this.image = this.image;
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
                _size = size;
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
                }
                return _badgeObj;
            },
            enumerable: true
        }
    });

    Object.defineProperties(this.android, {
        'attributedTitle': {
            get: function() {
                return _attributedTitle;
            },
            set: function(value) {
                _attributedTitle = value;
                if (_attributedTitle instanceof AttributedString) {
                    if (_attributedTitleBuilder)
                        _attributedTitleBuilder.clear();
                    else
                        _attributedTitleBuilder = new NativeSpannableStringBuilder();

                    _attributedTitle.setSpan(_attributedTitleBuilder);
                    self.__setTitle(_attributedTitleBuilder);
                }
                else {
                    self.__setTitle(null);
                }
            },
            enumerable: true
        }
    });

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
                self.menuItem.setActionView(self.nativeObject);
        }
        else if (!self.imageButton) {
            self.nativeObject.setText(itemTitle);
            self.color = _color;
        }
    };

    if (!_color) {
        if (HeaderBarItem.itemColor) {
            this.color = HeaderBarItem.itemColor;
        }
    }
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
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
