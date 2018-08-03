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
        //imageViewPrototype._fillType = null; // native does not store ImageFillType but ScaleType
        imageViewPrototype._image = null;
        imageViewPrototype._adjustViewBounds = false;

        var _fillType = null;
        Object.defineProperties(imageViewPrototype, {
            'image': {
                get: function() {
                    return this._image;
                },
                set: function(value) {
                    // We don't use backgroundImage of view. Because, it breaks image fill type.
                    if (value.constructor === Image) {
                        var image = value;
                        this._image = image;
                        this.nativeObject.setImageDrawable(image.nativeObject);
                    }
                    else if (typeof value === "string") {
                        var imageFile = new File({
                            path: value
                        });
                        this.loadFromFile(imageFile);
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
                    return _fillType;
                },
                set: function(fillType) {
                    if (!(fillType in ImageFillTypeDic)) {
                        fillType = ImageView.FillType.NORMAL;
                    }
                    _fillType = fillType;
                    if (fillType === ImageView.FillType.ASPECTFILL && !this._adjustViewBounds) {
                        this.nativeObject.setAdjustViewBounds(true);
                        this._adjustViewBounds = true;
                    }
                    this.nativeObject.setScaleType(ImageFillTypeDic[_fillType]);
                },
                enumerable: true
            }
        });

        imageViewPrototype.toString = function() {
            return 'ImageView';
        };

        imageViewPrototype.loadFromUrl = function(url, placeHolder, isFade) {
            const NativePicasso = requireClass("com.squareup.picasso.Picasso");
            if (TypeUtil.isString(url)) {
                var requestCreator = scaleImage(NativePicasso.with(AndroidConfig.activity).load(url));
                (isFade === false) && (requestCreator = requestCreator.noFade());
                if (placeHolder instanceof Image) {
                    requestCreator.placeholder(placeHolder.nativeObject).into(this.nativeObject);
                }
                else {
                    requestCreator.into(this.nativeObject);
                }
            }
        };

        imageViewPrototype.fetchFromUrl = function(params) {
            const NativeTarget = requireClass("com.squareup.picasso.Target");
            const NativePicasso = requireClass("com.squareup.picasso.Picasso");
            var target = NativeTarget.implement({
                onBitmapLoaded: function(bitmap, from) {
                    params.onSuccess && params.onSuccess(new Image({ bitmap: bitmap }), (from && ImageView.CacheType[from.name()]));
                },
                onBitmapFailed: function(errorDrawable) {
                    params.onError && params.onError();
                },
                onPrepareLoad: function(placeHolderDrawable) {}
            });

            if (TypeUtil.isString(params.url)) {
                var requestCreator = scaleImage(NativePicasso.with(AndroidConfig.activity).load(params.url));
                if ((params.placeholder) instanceof Image) {
                    requestCreator.placeholder(params.placeholder.nativeObject).into(target);
                }
                else {
                    requestCreator.into(target);
                }
            }
        };
        imageViewPrototype.loadFromFile = function(file, isFade, width, height) {
            const NativePicasso = requireClass("com.squareup.picasso.Picasso");
            if (file instanceof File) {
                var resolvedPath = file.resolvedPath;
                if (!AndroidConfig.isEmulator && resolvedPath.type == Path.FILE_TYPE.DRAWABLE) {
                    var resources = AndroidConfig.activity.getResources();
                    var drawableResourceId = resources.getIdentifier(resolvedPath.name, "drawable", AndroidConfig.packageName);
                    var requestCreatorDrawable = scaleImage(NativePicasso.with(AndroidConfig.activity).load(drawableResourceId));
                    (isFade === false) && (requestCreatorDrawable = requestCreatorDrawable.noFade());
                    if (width && height) {
                        var requestCreatorDrawableWithResize = NativePicasso.with(AndroidConfig.activity).load(drawableResourceId);
                        (isFade === false) && (requestCreatorDrawableWithResize = requestCreatorDrawableWithResize.noFade());
                        requestCreatorDrawableWithResize.resize(width, height).onlyScaleDown().into(this.nativeObject);
                    }
                    else {
                        requestCreatorDrawable.into(this.nativeObject);
                    }
                }
                else if (!AndroidConfig.isEmulator && resolvedPath.type == Path.FILE_TYPE.ASSET) {
                    var assetPrefix = "file:///android_asset/";
                    var assetFilePath = assetPrefix + resolvedPath.name;
                    var requestCreatorAsset = scaleImage(NativePicasso.with(AndroidConfig.activity).load(assetFilePath));
                    (isFade === false) && (requestCreatorAsset = requestCreatorAsset.noFade());
                    if (width && height) {
                        var requestCreatorAssetWithResize = NativePicasso.with(AndroidConfig.activity).load(assetFilePath);
                        (isFade === false) && (requestCreatorAssetWithResize = requestCreatorAssetWithResize.noFade());
                        requestCreatorAssetWithResize.resize(width, height).onlyScaleDown().into(this.nativeObject);
                    }
                    else {
                        requestCreatorAsset.into(this.nativeObject);
                    }
                }
                else {
                    var requestCreator = scaleImage(NativePicasso.with(AndroidConfig.activity).load(file.nativeObject));
                    (isFade === false) && (requestCreator = requestCreator.noFade());
                    if (width && height) {
                        var requestCreatorWithResize = NativePicasso.with(AndroidConfig.activity).load(file.nativeObject);
                        (isFade === false) && (requestCreatorWithResize = requestCreatorWithResize.noFade());
                        requestCreatorWithResize.resize(width, height).onlyScaleDown().into(this.nativeObject);
                    }
                    else {
                        requestCreator.into(this.nativeObject);
                    }
                }
            }
        };

        function scaleImage(loadedImage) {
            if (loadedImage && _fillType !== null) {
                switch (_fillType) {
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
