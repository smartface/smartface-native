const NativeTextButton = requireClass('android.widget.Button');
const NativePorterDuff = requireClass('android.graphics.PorterDuff');
const NativeImageButton = requireClass('android.widget.ImageButton');
const Color = require("sf-core/ui/color");
const Image = require("sf-core/ui/image");

function HeaderBarItem(params) {
    var _title = "";
    var _image = null;
    var _enabled = true;
    var _onPress = null;
    var _color = null;
    var _searchView = null;
    var _imageButton = false;
    
    Object.defineProperties(this, {
        'color': {
            get: function() {
                return _color;
            },
            set: function(value) {
                if(!(typeof(value) === "number" || value instanceof Color)) {
                    new TypeError("color must be Color instance");
                    return;
                }
                _color = value;
                if(this.nativeObject && this.image && this.image.nativeObject) {
                    var imageCopy = this.image.nativeObject.mutate();
                    imageCopy.setColorFilter(this.color, NativePorterDuff.Mode.SRC_IN);
                    this.nativeObject.setImageDrawable(imageCopy);
                }
                else if(this.nativeObject) {
                    this.nativeObject.setTextColor(_color);
                }
            },
            enumerable: true
        },
        'title': {
            get: function() {
                return _title;
            },
            set: function(value) {
                if (typeof(value) !== "string") {
                    new TypeError("title must be string");
                    return;
                }
                _title = value;
                if (this.nativeObject && !this.imageButton) {
                    this.nativeObject.setText(_title);
                }
            },
            enumerable: true
        },
        'imageButton' : {
            get: function() { return _imageButton; },
            set: function(value) { _imageButton = value; }
        },
        'image': {
            get: function() {
                return _image;
            },
            set: function(value) {
                if (value instanceof Image) {
                    _image = value;
                    if (this.nativeObject && this.imageButton) {
                        var imageCopy = _image.nativeObject.mutate();
                        this.nativeObject.setImageDrawable(imageCopy);
                    }
                }
                else {
                    new TypeError("image must be Image instance.");
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
                    new TypeError("onPress must be function.");
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