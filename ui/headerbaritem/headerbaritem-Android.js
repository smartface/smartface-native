const NativeTextButton = requireClass('android.widget.Button');
const NativePorterDuff = requireClass('android.graphics.PorterDuff');
const NativeImageButton = requireClass('android.widget.ImageButton');
const Color = require("sf-core/ui/color");
const Image = require("sf-core/ui/image");

HeaderBarItem.paddingHorizontal;
HeaderBarItem.paddingVertical;

function HeaderBarItem(params) {
    var _title = "";
    var _image = null;
    var _enabled = true;
    var _onPress = null;
    var _color = null;
    var _searchView = null;
    var _imageButton = false;
    var _menuItem = null;
    var activity = Android.getActivity();
    
    Object.defineProperties(this, {
        'color': {
            get: function() {
                return _color;
            },
            set: function(value) {
                if(value === null)
                    return;
                if(!(typeof(value) === "number" || value instanceof Color)) {
                    throw new TypeError("color must be Color instance");
                }
                _color = value;
                if(this.nativeObject) {
                    if(this.image && this.image.nativeObject) {
                        var imageCopy = this.image.nativeObject.mutate();
                        imageCopy.setColorFilter(this.color, NativePorterDuff.Mode.SRC_IN);
                        this.nativeObject.setImageDrawable(imageCopy);
                    }
                    else {
                        this.nativeObject.setTextColor(_color);
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
                if(!this.nativeObject) {
                    this.nativeObject = new NativeTextButton(activity);
                    this.nativeObject.setText(_title);
                    this.nativeObject.setBackgroundColor(Color.TRANSPARENT);
                    if(HeaderBarItem.paddingVertical !== undefined && HeaderBarItem.paddingHorizontal !== undefined) 
                        this.nativeObject.setPadding(HeaderBarItem.paddingVertical, HeaderBarItem.paddingHorizontal, HeaderBarItem.paddingVertical, HeaderBarItem.paddingHorizontal);
                    
                    this.imageButton = false;
                    if(this.menuItem)
                        this.menuItem.setActionView(this.nativeObject);
                }
                else if(!this.imageButton) {
                    this.nativeObject.setText(_title);
                }
            },
            enumerable: true
        },
        'imageButton' : {
            get: function() { return _imageButton; },
            set: function(value) { _imageButton = value; }
        },
        'menuItem' : {
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
                    if(!this.nativeObject || (this.nativeObject && !this.imageButton)) {
                        this.nativeObject = new NativeImageButton(activity);
                        this.nativeObject.setBackgroundColor(Color.TRANSPARENT);
                        if(HeaderBarItem.paddingVertical !== undefined && HeaderBarItem.paddingHorizontal !== undefined)
                            this.nativeObject.setPadding(HeaderBarItem.paddingVertical, HeaderBarItem.paddingHorizontal, HeaderBarItem.paddingVertical, HeaderBarItem.paddingHorizontal);
                        
                        this.imageButton = true;
                        if(this.menuItem) {
                            this.menuItem.setActionView(this.nativeObject);
                        }
                    }
                    if (this.nativeObject && this.imageButton) {
                        if(_image) {
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
        'setValues' : {
            value: function() {
                this.color = this.color;
                this.enabled = this.enabled; 
                if(this.imageButton) {
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
            value: function(){
                return 'HeaderBarItem';
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
}

module.exports = HeaderBarItem;