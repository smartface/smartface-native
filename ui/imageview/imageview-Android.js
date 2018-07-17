/*globals requireClass*/
const extend = require('js-base/core/extend');
const AndroidConfig = require("../../util/Android/androidconfig");
const View = require('../view');
const TypeUtil = require("../../util/type");
const Image = require("../image");
const NativeImageView = requireClass("android.widget.ImageView");

const ImageView = extend(View)(
    function(_super, params) {
        if (!this.nativeObject) {
            this.nativeObject = new NativeImageView(AndroidConfig.activity);
        }
        _super(this);

        if (!this.isNotSetDefaults) {
            // SET DEFAULTS
            this.imageFillType = ImageView.FillType.NORMAL;
        }

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    },
    function(imageViewPrototype) {
        imageViewPrototype._fillType = null; // native does not store ImageFillType but ScaleType
        imageViewPrototype._image = null;
        imageViewPrototype._adjustViewBounds = false;
        
        Object.defineProperties(imageViewPrototype, {
            'image': {
                get: function() {
                    return this._image;
                },
                set: function(image) {
                    // We don't use backgroundImage of view. Because, it breaks image fill type.
                    if (image instanceof Image) {
                        this._image = image;
                        this.nativeObject.setImageDrawable(image.nativeObject);
                    }
                    else {
                        this._image = null;
                        this.nativeObject.setImageDrawable(null);
                    }
                },
                enumerable: true
            },
            'imageFillType': {
                get: function() {
                    return this._fillType;
                },
                set: function(fillType) {
                    if (!(fillType in ImageFillTypeDic)) {
                        fillType = ImageView.FillType.NORMAL;
                    }
                    this._fillType = fillType;
                    if (fillType === ImageView.FillType.ASPECTFILL && !this._adjustViewBounds) {
                        this.nativeObject.setAdjustViewBounds(true);
                        this._adjustViewBounds = true;
                    }
                    this.nativeObject.setScaleType(ImageFillTypeDic[this._fillType]);
                },
                enumerable: true
            }
        });

        imageViewPrototype.toString = function() {
            return 'ImageView';
        };
        
        imageViewPrototype.loadFromUrl = function(){
            if(typeof(arguments[0]) === "object") {
                var params = arguments[0];
                if(params.onSuccess || params.onError) {
                    loadFromUrlWithCallback(params.url, params.placeHolder, params.onSuccess, params.onError);
                } else {
                    loadFromUrl(this, params.url, params.placeHolder);
                }
            } else { // deprecated usage
                loadFromUrl(this, arguments[0], arguments[1]);
            }
        };
        
        function loadFromUrl(self, url, placeHolder) {
            const NativePicasso = requireClass("com.squareup.picasso.Picasso");
            if (TypeUtil.isString(url)) {
                if(placeHolder instanceof Image){
                    NativePicasso.with(AndroidConfig.activity).load(url).fit().placeholder(placeHolder.nativeObject).into(self.nativeObject);
                }
                else{
                    NativePicasso.with(AndroidConfig.activity).load(url).into(self.nativeObject);
                }
            }
        }
        
        function loadFromUrlWithCallback (url, placeHolder, onSuccess, onError) {
            const NativeTarget = requireClass("com.squareup.picasso.Target");
            const NativePicasso = requireClass("com.squareup.picasso.Picasso");
            var target = NativeTarget.implement({
                onBitmapLoaded: function(bitmap, from) {
                    onSuccess && onSuccess(new Image({ bitmap: bitmap}), (from && ImageView.CacheType[from.name()]));
                },
                onBitmapFailed: function(errorDrawable) {
                    onError && onError();
                },
                onPrepareLoad: function(placeHolderDrawable) {}
            });

            if (TypeUtil.isString(url)) {
                if (placeHolder instanceof Image) {
                    NativePicasso.with(AndroidConfig.activity).load(url).placeholder(placeHolder.nativeObject).into(target);
                }
                else {
                    NativePicasso.with(AndroidConfig.activity).load(url).into(target);
                }
            }
        }
    }
);

ImageView.CacheType = {};
ImageView.CacheType["NETWORK"] = 0; // NONE
ImageView.CacheType["DISK"] = 1; 
ImageView.CacheType["MEMORY"] = 2; 


Object.defineProperty(ImageView, "FillType", {
    value: {},
    enumerable: true
});
Object.defineProperties(ImageView.FillType, {
    'NORMAL': {
        value: 0,
        enumerable: true
    },
    'STRETCH': {
        value: 1,
        enumerable: true
    },
    'ASPECTFIT': {
        value: 2,
        enumerable: true
    },
    'ASPECTFILL': {
        value: 3,
        enumerable: true
    },
    'ios': {
        value: {},
        enumerable: true
    },
});

const ImageFillTypeDic = {};
ImageFillTypeDic[ImageView.FillType.NORMAL] = NativeImageView.ScaleType.CENTER;
ImageFillTypeDic[ImageView.FillType.STRETCH] = NativeImageView.ScaleType.FIT_XY;
ImageFillTypeDic[ImageView.FillType.ASPECTFIT] = NativeImageView.ScaleType.FIT_CENTER;
ImageFillTypeDic[ImageView.FillType.ASPECTFILL] = NativeImageView.ScaleType.CENTER_CROP;

module.exports = ImageView;