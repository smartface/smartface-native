/* globals requireClass, toJSArray, array */
const NativeTextButton = requireClass('android.widget.Button');
const NativePorterDuff = requireClass('android.graphics.PorterDuff');
const NativeImageButton = requireClass('android.widget.ImageButton');
const SFView = requireClass("io.smartface.android.sfcore.ui.view.SFViewUtil");

const Color = require("../color");
const Image = require("../image");
const View = require('../view');
const Font = require('../font');
const AttributedString = require("../attributedstring");
const HeaderBarItemPadding = require("../../util/Android/headerbaritempadding");
const AndroidConfig = require("../../util/Android/androidconfig");
const NativeTextView = requireClass("android.widget.TextView");
const NativeColorStateList = requireClass("android.content.res.ColorStateList");
const NativeGradientDrawable = requireClass("android.graphics.drawable.GradientDrawable");
const NativeSpannableStringBuilder = requireClass("android.text.SpannableStringBuilder");
const TypeUtil = require("../../util/type");
const AndroidUnitConverter = require("../../util/Android/unitconverter.js");

function PixelToDp(px) { return AndroidUnitConverter.pixelToDp(px); }

function HeaderBarItem(params) {
    var _title = "";
    var _image = null;
    var _enabled = true;
    var _onPress = null;
    var _color = null;
    var _searchView = null;
    var _imageButton = false;
    var _menuItem = null;
    var _font = null;
    var activity = AndroidConfig.activity;
    
    this.ios = {};
    
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
                    } else {
                        this.nativeObject.setTextColor(_color.nativeObject);
                    }
                }
            },
            enumerable: true
        },
        'font': {
            get: function() {
                return _font;
            },
            set: function(value) {
                _font = value;
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
                let titleText = _title;
                if(this.font) {
                    titleText = this.__createAttributedText();
                }
            
                if (!this.nativeObject) {
                    this.nativeObject = new NativeTextButton(activity);
                    this.nativeObject.setText(titleText);
                    this.nativeObject.setBackgroundColor(Color.TRANSPARENT.nativeObject);
                    this.nativeObject.setPaddingRelative(
                        HeaderBarItemPadding.vertical, HeaderBarItemPadding.horizontal,
                        HeaderBarItemPadding.vertical, HeaderBarItemPadding.horizontal
                    );

                    this.color = _color;
                    this.imageButton = false;
                    if (this.menuItem)
                        this.menuItem.setActionView(this.nativeObject);
                }
                else if (!this.imageButton) {
                    this.nativeObject.setText(titleText);
                    this.color = _color;
                }
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
                            this.title = _title;
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
                else {
                    this.title = this.title;
                }

                const NativeView = requireClass('android.view.View');
                this.nativeObject.setOnClickListener(NativeView.OnClickListener.implement({
                    onClick: function(view) {
                        _onPress && _onPress();
                    }
                }));
            }
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
                return _badge;
            },
            enumerable: true
        }
    });

    var _badge = {};


    var _borderRadius = AndroidUnitConverter.dpToPixel(10);
    var _borderWidth = AndroidUnitConverter.dpToPixel(2);

    _badge.nativeObject = new NativeTextView(activity);
    var nativeGradientDrawable = new NativeGradientDrawable();
    nativeGradientDrawable.setCornerRadius(_borderRadius);

    _badge.layoutParams;
    var _borderColor = Color.WHITE;
    var _badgeVisible = false;
    var _badgeText;
    var _badgeBackgroundColor;
    var _badgeTextColor;
    var _badgeFont;
    Object.defineProperties(_badge, {
        'visible': {
            get: function() {
                return _badgeVisible;
            },
            set: function(visible) {
                _badgeVisible = visible;
                if (visible) {
                    _badge.nativeObject.setVisibility(0);
                }
                else {
                    _badge.nativeObject.setVisibility(4);
                }
            },
            enumerable: true
        },
        'text': {
            get: function() {
                return _badgeText;
            },
            set: function(text) {
                _badgeText = text;
                _badge.visible = true;
                if (_badge.nativeObject) {
                    _badge.nativeObject.setText("" + text);
                    _badge.nativeObject.setGravity(17);
                }
            },
            enumerable: true
        },
        'backgroundColor': {
            get: function() {
                return _badgeBackgroundColor;
            },
            set: function(color) {
                _badgeBackgroundColor = color;
                if (_badge.nativeObject && color) {
                    nativeGradientDrawable.setColor(color.nativeObject);
                }
                else if (_badge.nativeObject) {
                    nativeGradientDrawable.mutate(); //Makes mutable, applied to fix unexpected behavior
                    nativeGradientDrawable.setStroke(_borderWidth, _borderColor.nativeObject);
                }
                _badge.nativeObject.setBackground(nativeGradientDrawable);
            },
            enumerable: true
        },
        'textColor': {
            get: function() {
                return _badgeTextColor;
            },
            set: function(color) {
                _badgeTextColor = color;
                if (_badge.nativeObject && color) {
                    if (color.nativeObject) {
                        _badge.nativeObject.setTextColor(color.nativeObject);
                    }
                    else if (TypeUtil.isObject(color)) {
                        var textColorStateListDrawable = createColorStateList(color);
                        this.nativeObject.setTextColor(textColorStateListDrawable);
                    }
                }
            },
            enumerable: true
        },
        'font': {
            get: function() {
                return _badgeFont;
            },
            set: function(font) {
                _badgeFont = font;
                if (_badge.nativeObject && font) {
                    _badge.nativeObject.setTypeface(font.nativeObject);
                    if (font.size && TypeUtil.isNumeric(font.size)) {
                        _badge.nativeObject.setTextSize(font.size);
                    }
                }
            },
            enumerable: true
        },
        'borderWidth': {
            get: function() {
                return _borderWidth;
            },
            set: function(borderWidth) {
                if (typeof borderWidth !== 'number')
                    return;

                _borderWidth = AndroidUnitConverter.dpToPixel(borderWidth);
                _badge.backgroundColor = null; //re-set Drawable
            },
            enumerable: true
        },
        'borderColor': {
            get: function() {
                return _borderColor;
            },
            set: function(borderColor) {
                if (!(borderColor instanceof Color))
                    return;

                _borderColor = borderColor;
                _badge.backgroundColor = null;; //re-set Drawable
            },
            enumerable: true
        },
        'move': {
            value: function(x, y) {
                _badge.nativeObject.setX(AndroidUnitConverter.dpToPixel(x));
                _badge.nativeObject.setY(AndroidUnitConverter.dpToPixel(y));
            }
        }
    });
    if (_badge.nativeObject) {
        //sets default values
        if (!_badge.backgroundColor)
            _badge.backgroundColor = Color.RED;
        if (!_badge.font)
            _badge.font = Font.create("Arial", 11, Font.NORMAL);
        if (!_badge.textColor)
            _badge.textColor = Color.WHITE;
    }

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
    __createAttributedText: function() {
        if (this.__attributedTitleBuilder)
            this.__attributedTitleBuilder.clear();
        else
            this.__attributedTitleBuilder = new NativeSpannableStringBuilder();
            
        if(!this.__attributedTitleString) {
            this.__attributedTitleString = new AttributedString();
        } 
        
        this.__attributedTitleString.font = this.font;
        this.__attributedTitleString.string = this.title;
        
        let titleBuilder = this.__attributedTitleBuilder;
        this.__attributedTitleString.foregroundColor = this.color ? this.color : HeaderBarItem.itemColor;
        this.__attributedTitleString.setSpan(titleBuilder);
        
        return titleBuilder;
    }
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

function createColorStateList(textColors) {
    var statesSet = [];
    var colorsSets = [];
    if (textColors.normal) {
        statesSet.push(View.State.STATE_NORMAL);
        colorsSets.push(textColors.normal.nativeObject);
    }
    if (textColors.disabled) {
        statesSet.push(View.State.STATE_DISABLED);
        colorsSets.push(textColors.disabled.nativeObject);
    }
    if (textColors.selected) {
        statesSet.push(View.State.STATE_SELECTED);
        colorsSets.push(textColors.selected.nativeObject);
    }
    if (textColors.pressed) {
        statesSet.push(View.State.STATE_PRESSED);
        colorsSets.push(textColors.pressed.nativeObject);
    }
    if (textColors.focused) {
        statesSet.push(View.State.STATE_FOCUSED);
        colorsSets.push(textColors.focused.nativeObject);
    }
    return (new NativeColorStateList(array(statesSet), array(colorsSets, "int")));
}

HeaderBarItem.iOS = {};
HeaderBarItem.iOS.SystemItem = {};

module.exports = HeaderBarItem;
