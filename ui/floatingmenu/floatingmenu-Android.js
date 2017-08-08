const NativeView            = requireClass("android.view.View");
const NativeSpannableString = requireClass("android.text.SpannableString");
const NativeForegroundColor = requireClass("android.text.style.ForegroundColorSpan");
const NativeTextView        = requireClass("android.widget.TextView");

const NativeClickListener = NativeView.OnClickListener;
const NativeYogaNode = requireClass('com.facebook.yoga.YogaNode');

const NativeFloatingButton   = requireClass("uk.co.markormesher.android_fab.FloatingActionButton");
const NativeOnOpenListener   = NativeFloatingButton.OnSpeedDialOpenListener;
const NativeOnCloseListener  = NativeFloatingButton.OnSpeedDialCloseListener;
const NativeSpeedDialAdapter = requireClass("uk.co.markormesher.android_fab.SpeedDialMenuAdapter");
const NativeMenuItem = NativeSpeedDialAdapter.MenuItem;

const Color = require("sf-core/ui/color");

function FloatingMenu(params) {
    var nativeObject;
    var _items = [];
    var _icon;
    var _rotateEnabled = true;
    var _color = Color.create("#00A1F1");
    var _callbackClick;
    var _callbackOpen;
    var _callbackClose;

    var menuAdapter = NativeSpeedDialAdapter.extend("FABMenuAdapter", {
        getCount: function() {
            return _items.length;
        },
        getViews: function(context, position) {
            position = reposition(position, _items.length);
            
            var item = new NativeMenuItem();
            _items[position].icon  && (item.iconDrawable = _items[position].icon.nativeObject);
            if (_items[position].title) {
                var spannedTitle = new NativeSpannableString(_items[position].title);
                var foregroundColor = new NativeForegroundColor(_items[position].titleColor.nativeObject);
                var titleLength = spannedTitle.length();
                spannedTitle.setSpan(foregroundColor, 0, titleLength, 17); // 17 means SPAN_INCLUSIVE_EXCLUSIVE

                var labelView = new NativeTextView(Android.getActivity());
                labelView.setText(spannedTitle);
                item.labelView = labelView;
            }
            return item;
        },
        getBackgroundColour: function(position) {
            position = reposition(position, _items.length);

            var color = Color.GRAY;
            (_items[position].color) && (color = _items[position].color);
            return color.nativeObject;
        },
        onMenuItemClick: function(position) {
            position = reposition(position, _items.length);

            _items[position].onClick && _items[position].onClick();
            return true;
        },
        rotateFab: function() {
            return _items.length > 0 && _rotateEnabled;
        }
    }, null);
    
    var clickListener = NativeClickListener.implement({
        onClick: function(view) {
            _callbackClick && _callbackClick();
        }
    });
    
    var openListener = NativeOnOpenListener.implement({
        onOpen: function(button) {
            _callbackOpen && _callbackOpen();
        }
    });

    var closeListener = NativeOnCloseListener.implement({
        onClose: function(button) {
            _callbackClose && _callbackClose();
        }
    });

    if(!this.nativeObject){
        const NativeYogaEdge         = requireClass('com.facebook.yoga.YogaEdge');
        const NativeYogaPositionType = requireClass('com.facebook.yoga.YogaPositionType');
        
        this.yogaNode = new NativeYogaNode();
        this.yogaNode.setPositionType(NativeYogaPositionType.ABSOLUTE);
        this.yogaNode.setPosition(NativeYogaEdge.TOP, 0);
        this.yogaNode.setPosition(NativeYogaEdge.LEFT, 0);
        this.yogaNode.setPosition(NativeYogaEdge.RIGHT, 0);
        this.yogaNode.setPosition(NativeYogaEdge.BOTTOM, 0);

        this.nativeObject = new NativeFloatingButton(Android.getActivity());
        this.nativeObject.setMenuAdapter(menuAdapter);
        this.nativeObject.setBackgroundColour(_color.nativeObject);
        this.nativeObject.setOnClickListener(clickListener);
        this.nativeObject.setOnSpeedDialOpenListener(openListener);
        this.nativeObject.setOnSpeedDialCloseListener(closeListener);

        nativeObject = this.nativeObject;
    }
        
    Object.defineProperties(this, {
        'items': {
            get: function() {
                return _items;
            },
            set: function(items) {
                _items = items;
                nativeObject.rebuildSpeedDialMenu();
            }
        },
        'icon': {
            get: function() {
                return _icon;
            },
            set: function(image) {
                if (image && image.nativeObject && (image instanceof require("sf-core/ui/image"))) {
                    _icon = image;
                    nativeObject.setIcon(image.nativeObject);
                } else {
                    throw new Error("Provide floatingMenu's icon with a UI.Image.");
                }
            }
        },
        'color': {
            get: function() {
                return _color;
            },
            set: function(color) {
                console.log("Color.nativeObject " + color.nativeObject );
                if (color && (color instanceof Color)) { // Don't add if(color.nativeObject) check. nativeObject value is 0 for Color.TRANSPARENT.
                                                        // It causes exception.
                    nativeObject.setBackgroundColour(color.nativeObject);
                } else {
                    throw new Error("Provide floatingMenu's color with a UI.Color.");
                }
            }
        },
        'rotateEnabled': {
            get: function() {
                return _rotateEnabled;
            },
            set: function(enabled) {
                _rotateEnabled = enabled;
            }
        },
        'onClick': {
            get: function() {
                return _callbackClick;
            },
            set: function(callback) {
                _callbackClick = callback;
            }
        },
        'onMenuOpen': {
            get: function() {
                return _callbackOpen;
            },
            set: function(callback) {
                _callbackOpen = callback;
            }
        },
        'onMenuClose': {
            get: function() {
                return _callbackClose;
            },
            set: function(callback) {
                _callbackClose = callback;
            }
        },
        'visible': {
            get: function() {
                return (nativeObject.getVisibility() === 0); // View.VISIBLE
            },
            set: function(visibility) {
                if (visibility === true) {
                    nativeObject.setVisibility(0); // View.VISIBLE
                } else {
                    nativeObject.setVisibility(4); // View.INVISIBLE    
                }
            }
        }
    });

    this.open = function() {
        nativeObject.openSpeedDialMenu();
    };

    this.close = function() {
        nativeObject.closeSpeedDialMenu();
    };

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

// Position must match with iOS
function reposition(position, arrayLength) {
    return (arrayLength - 1) - position;
};

FloatingMenu.Item = require("./floatingMenuItem");

module.exports = FloatingMenu;