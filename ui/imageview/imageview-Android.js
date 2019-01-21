/*globals requireClass*/
const extend = require('js-base/core/extend');
const AndroidConfig = require("../../util/Android/androidconfig");
const View = require('../view');
const TypeUtil = require("../../util/type");
const Image = require("../image");
const NativeImageView = requireClass("android.widget.ImageView");
const File = require('../../io/file');
const Path = require('../../io/path');

const ImageView = extend(View)(
    function(_super, params) {
        if (!this.nativeObject) {
            this.nativeObject = new NativeImageView(AndroidConfig.activity);
        }
        _super(this);

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    },
    function(imageViewPrototype) {
        //imageViewPrototype._fillType = null; // native does not store ImageFillType but ScaleType
        imageViewPrototype._image = null;
        imageViewPrototype._adjustViewBounds = false;

        imageViewPrototype._fillType = null;
        imageViewPrototype._tintColor;
        imageViewPrototype.newImageLoaded = false;
        Object.defineProperties(imageViewPrototype, {
            'image': {
                get: function() {
                    if (!this._image || this.newImageLoaded) {
                        this.newImageLoaded = false;
                        return this._image = this.nativeObject.getDrawable() ? new Image({
                            drawable: this.nativeObject.getDrawable()
                        }) : null;
                    }
                    else
                        return this._image;
                },
                set: function(value) {
                    // We don't use backgroundImage of view. Because, it breaks image fill type.
                    if (value instanceof Image) {
                        var image = value;
                        this._image = image;
                        this.nativeObject.setImageDrawable(image.nativeObject);
                    }
                    else if (typeof value === "string") {
                        var imageFile = new File({
                            path: value
                        });
                        this.loadFromFile({ file: imageFile });
                    }
                    else {
                        this._image = null;
                        this.nativeObject.setImageDrawable(null);
                    }
                },
                enumerable: true
            },
            'tintColor': {
                get: function() {
                    return this._tintColor;
                },
                set: function(tintColor) {
                    const Color = require("sf-core/ui/color");
                    if (!tintColor instanceof Color)
                        return;
                    this._tintColor = tintColor;

                    const NativeImageCompat = requireClass("android.support.v4.widget.ImageViewCompat");
                    const NativeColorStateListUtil = requireClass("io.smartface.android.utils.ColorStateListUtil");

                    NativeImageCompat.setImageTintList(this.nativeObject, NativeColorStateListUtil.getColorStateListWithValueOf(this._tintColor.nativeObject));

                },
                enumerable: true
            },
            'imageFillType': {
                get: function() {
                    return this._fillType === undefined ? this.nativeObject.getScaleType() : this._fillType;
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

        imageViewPrototype.loadFromUrl = function() { //ToDo: Paramters should be object this usage is deprecated
            var url, placeholder, isFade, onFailure, onSuccess;

            if (typeof arguments[0] === "object") {
                var params = arguments[0];
                url = params.url;
                placeholder = params.placeholder;
                isFade = params.fade;
                // onFailure callback added instead of onError in sf-core 3.2.1
                onFailure = (params.onError ? params.onError : params.onFailure);
                onSuccess = params.onSuccess;
            }
            else {
                url = arguments[0];
                placeholder = arguments[1];
                isFade = arguments[2];
            }


            var callback = null;
            if (onFailure || onSuccess) {
                const NativePicassoCallback = requireClass("com.squareup.picasso.Callback");
                callback = NativePicassoCallback.implement({
                    onSuccess: function() {
                        onSuccess && onSuccess();
                    },
                    onError: function() {
                        onFailure && onFailure();
                    }
                });
            }
            const NativePicasso = requireClass("com.squareup.picasso.Picasso");
            if (TypeUtil.isString(url)) {
                var plainRequestCreator = NativePicasso.with(AndroidConfig.activity).load(url);
                (isFade === false) && (plainRequestCreator = plainRequestCreator.noFade());
                if (placeholder instanceof Image)
                    plainRequestCreator.placeholder(placeholder.nativeObject);
                var requestCreator = scaleImage(plainRequestCreator);
                if (callback !== null)
                    requestCreator.into(this.nativeObject, callback);
                else
                    requestCreator.into(this.nativeObject);
            }
            this.newImageLoaded = true;
        };

        imageViewPrototype.fetchFromUrl = function(params) {
            const self = this;
            const NativeTarget = requireClass("com.squareup.picasso.Target");
            const NativePicasso = requireClass("com.squareup.picasso.Picasso");
            var target = NativeTarget.implement({
                onBitmapLoaded: function(bitmap, from) {
                    params.onSuccess && params.onSuccess(new Image({ bitmap: bitmap }), (from && ImageView.CacheType[from.name()]));
                },
                onBitmapFailed: function(errorDrawable) {
                    // onFailure callback added instead of onError in sf-core 3.2.1
                    var onFailure = (params.onError ? params.onError : params.onFailure);
                    onFailure && onFailure();
                },
                onPrepareLoad: function(placeHolderDrawable) {
                    self.nativeObject.setImageDrawable(placeHolderDrawable);
                }
            });

            if (TypeUtil.isString(params.url)) {
                var requestCreator = NativePicasso.with(AndroidConfig.activity).load(params.url);
                if ((params.placeholder) instanceof Image) {
                    requestCreator.placeholder(params.placeholder.nativeObject).into(target);
                }
                else {
                    requestCreator.into(target);
                }
            }
        };

        imageViewPrototype.loadFromFile = function(params) {
            var file = params.file;
            var isFade = params.fade;
            var width = params.width;
            var height = params.height;
            var placeHolder = params.placeHolder;
            const NativePicasso = requireClass("com.squareup.picasso.Picasso");
            if (file instanceof File) {
                var resolvedPath = file.resolvedPath;
                if (!AndroidConfig.isEmulator && resolvedPath.type == Path.FILE_TYPE.DRAWABLE) {
                    var resources = AndroidConfig.activity.getResources();
                    var drawableResourceId = resources.getIdentifier(resolvedPath.name, "drawable", AndroidConfig.packageName);
                    var plainRequestCreatorDrawable = NativePicasso.with(AndroidConfig.activity).load(drawableResourceId);
                    (isFade === false) && (plainRequestCreatorDrawable = plainRequestCreatorDrawable.noFade());
                    (placeHolder instanceof Image) && (plainRequestCreatorDrawable.placeholder(placeHolder.nativeObject));
                    if (width && height) {
                        plainRequestCreatorDrawable.resize(width, height).onlyScaleDown().into(this.nativeObject);
                    }
                    else {
                        var requestCreatorDrawable = scaleImage(plainRequestCreatorDrawable);
                        requestCreatorDrawable.into(this.nativeObject);
                    }
                }
                else if (!AndroidConfig.isEmulator && resolvedPath.type == Path.FILE_TYPE.ASSET) {
                    var assetPrefix = "file:///android_asset/";
                    var assetFilePath = assetPrefix + resolvedPath.name;
                    var plaingRequestCreatorAsset = NativePicasso.with(AndroidConfig.activity).load(assetFilePath);
                    (isFade === false) && (plaingRequestCreatorAsset = plaingRequestCreatorAsset.noFade());
                    (placeHolder instanceof Image) && (plaingRequestCreatorAsset.placeholder(placeHolder.nativeObject));
                    if (width && height) {
                        plaingRequestCreatorAsset.resize(width, height).onlyScaleDown().into(this.nativeObject);
                    }
                    else {
                        var requestCreatorAsset = scaleImage(plaingRequestCreatorAsset);
                        requestCreatorAsset.into(this.nativeObject);
                    }
                }
                else {
                    var plainRequestCreator = NativePicasso.with(AndroidConfig.activity).load(file.nativeObject);
                    (isFade === false) && (plainRequestCreator = plainRequestCreator.noFade());
                    (placeHolder instanceof Image) && (plainRequestCreator.placeholder(placeHolder.nativeObject));
                    if (width && height) {
                        plainRequestCreator.resize(width, height).onlyScaleDown().into(this.nativeObject);
                    }
                    else {
                        var requestCreator = scaleImage(plainRequestCreator);
                        requestCreator.into(this.nativeObject);
                    }
                }
                this.newImageLoaded = true;
            }
        };

        function scaleImage(loadedImage) {
            if (loadedImage && imageViewPrototype._fillType !== null) {
                switch (imageViewPrototype._fillType) {
                    case ImageView.FillType.NORMAL:
                        return loadedImage
                        break;
                    case ImageView.FillType.STRETCH:
                        return loadedImage.fit();
                        break;
                    case ImageView.FillType.ASPECTFIT:
                        return loadedImage.fit().centerInside();
                        break;
                    case ImageView.FillType.ASPECTFILL:
                        return loadedImage.fit().centerCrop();
                        break;
                    default:
                        return loadedImage;
                }
            }
            else {
                return loadedImage;
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
ImageFillTypeDic[ImageView.FillType.ASPECTFIT] = NativeImageView.ScaleType.FIT_CENTER; // should be fit().centerInside()
ImageFillTypeDic[ImageView.FillType.ASPECTFILL] = NativeImageView.ScaleType.CENTER_CROP; //should be centerCrop

module.exports = ImageView;
