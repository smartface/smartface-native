/*globals requireClass*/
const NativeTextButton = requireClass('android.widget.Button');
const NativePorterDuff = requireClass('android.graphics.PorterDuff');
const NativeImageButton = requireClass('android.widget.ImageButton');
const Color = require("../color");
const Image = require("../image");
const View = require('../view');
const Font = require('../font');
const HeaderBarItemPadding = require("../../util/Android/headerbaritempadding");
const AndroidConfig = require("../../util/Android/androidconfig");
const NativeTextView = requireClass("android.widget.TextView");
const NativeColorStateList = requireClass("android.content.res.ColorStateList");
const NativeRoundRectShape = requireClass("android.graphics.drawable.shapes.RoundRectShape");
const NativeShapeDrawable = requireClass("android.graphics.drawable.ShapeDrawable");
const NativeRectF = requireClass("android.graphics.RectF");
const TypeUtil = require("../../util/type");
const AndroidUnitConverter = require("../../util/Android/unitconverter.js");


function HeaderBarItem(params) {
    var _title = "";
    var _image = null;
    var _enabled = true;
    var _onPress = null;
    var _color = null;
    var _searchView = null;
    var _imageButton = false;
    var _menuItem = null;
    var activity = AndroidConfig.activity;

    Object.defineProperties(this, {
        'color': {
            get: function() {
                return _color;
            },
            set: function(value) {
                if (value === null)
                    return;
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
                if (!this.nativeObject) {
                    this.nativeObject = new NativeTextButton(activity);
                    this.nativeObject.setText(_title);
                    this.nativeObject.setBackgroundColor(Color.TRANSPARENT.nativeObject);
                    this.nativeObject.setPadding(
                        HeaderBarItemPadding.vertical, HeaderBarItemPadding.horizontal,
                        HeaderBarItemPadding.vertical, HeaderBarItemPadding.horizontal
                    );

                    this.color = _color;
                    this.imageButton = false;
                    if (this.menuItem)
                        this.menuItem.setActionView(this.nativeObject);
                }
                else if (!this.imageButton) {
                    this.nativeObject.setText(_title);
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
                if (value === null || value instanceof Image) {
                    _image = value;
                    if (!this.nativeObject || (this.nativeObject && !this.imageButton)) {
                        this.nativeObject = new NativeImageButton(activity);
                        this.nativeObject.setBackgroundColor(Color.TRANSPARENT.nativeObject);
                        this.nativeObject.setPadding(
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
                    throw new TypeError("image must be Image instance.");
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
    // _badge.ios = {};
    // _badge.ios.move = function(x,y){};
    
    _badge.nativeObject = new NativeTextView(activity);
    _badge.layoutParams;
    Object.defineProperties(_badge, {
        'setVisible': {
            value: function(visible) {
                _badge.visible = visible;
                if (visible) {
                    _badge.nativeObject.setVisibility(0);
                }
                else {
                    _badge.nativeObject.setVisibility(4);
                }
            }
        },
        'setText': {
            value: function(text) {
                _badge.text = text;
                if (_badge.nativeObject) {
                    _badge.nativeObject.setText("" + text);
                    _badge.nativeObject.setGravity(17);
                }
            }
        },
        'setBackgroundColor': {
            value: function(color) {
                _badge.backgroundColor = color;
                if (_badge.nativeObject && color) {
                    var _borderRadius = AndroidUnitConverter.dpToPixel(10);
                    var _radii = array([_borderRadius, _borderRadius, _borderRadius, _borderRadius,
                        _borderRadius, _borderRadius, _borderRadius, _borderRadius
                    ], "float");
                    
                    var _rectF  = new NativeRectF(0, 0, 0, 0);
                    var nativeRoundRectShape = new NativeRoundRectShape(_radii, _rectF, _radii);
                    var nativeShapeDrawable = new NativeShapeDrawable(nativeRoundRectShape);

                    nativeShapeDrawable.getPaint().setColor(_badge.backgroundColor.nativeObject);

                    _badge.nativeObject.setBackgroundDrawable(nativeShapeDrawable);
                }
            }
        },
        'setTextColor': {
            value: function(color) {
                _badge.textColor = color;
                if (_badge.nativeObject && color) {
                    if (color.nativeObject) {
                        _badge.nativeObject.setTextColor(color.nativeObject);
                    }
                    else if (TypeUtil.isObject(color)) {
                        var textColorStateListDrawable = createColorStateList(color);
                        this.nativeObject.setTextColor(textColorStateListDrawable);
                    }
                }
            }
        },
        'setFont': {
            value: function(font) {
                _badge.font = font;
                if (_badge.nativeObject && font) {
                    _badge.nativeObject.setTypeface(font.nativeObject);
                    if (font.size && TypeUtil.isNumeric(font.size)) {
                        _badge.nativeObject.setTextSize(font.size);
                    }
                }
            }
        },
        'move' : {
            value :function(x,y){
                _badge.x = (x < 0 ? x * -1 : x );
                _badge.y = (y < 0 ? y : y );
            }
        }
    });
    if (_badge.nativeObject) {
        //sets default values
        if (!_badge.backgroundColor)
            _badge.setBackgroundColor(Color.RED);
        if (!_badge.font)
            _badge.setFont(Font.create("Arial", 11, Font.NORMAL));
        if (!_badge.textColor)
            _badge.setTextColor(Color.WHITE);
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

module.exports = HeaderBarItem;
