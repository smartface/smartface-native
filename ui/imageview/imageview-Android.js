/*globals requireClass, array*/
const AndroidConfig = require("../../util/Android/androidconfig");
const View = require('../view');
const Image = require("../image");
const NativeImageView = requireClass("android.widget.ImageView");
const File = require('../../io/file');
const Path = require('../../io/path');

const SFGlide = requireClass("io.smartface.android.sfcore.ui.imageview.SFGlide");
const LoadFromUrlParameters = requireClass("io.smartface.android.sfcore.ui.imageview.models.LoadFromUrlParameters");
const FetchFromUrlParameters = requireClass("io.smartface.android.sfcore.ui.imageview.models.FetchFromUrlParameters");
const LoadFromFileParameters = requireClass("io.smartface.android.sfcore.ui.imageview.models.LoadFromFileParameters");

ImageView.Events = { ...View.Events };

ImageView.prototype = Object.create(View.prototype)
function ImageView(params) {
    if (!this.nativeObject) {
        this.nativeObject = new NativeImageView(AndroidConfig.activity);
    }
    View.apply(this);

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}
//ImageView.prototype._fillType = null; // native does not store ImageFillType but ScaleType
ImageView.prototype._image = null;
ImageView.prototype._adjustViewBounds = false;

ImageView.prototype._fillType = null;
ImageView.prototype._tintColor;
ImageView.prototype.__newImageLoaded = false;
Object.defineProperties(ImageView.prototype, {
    'image': {
        get: function () {
            if (!this._image || this.__newImageLoaded) {
                this.__newImageLoaded = false;
                let drawable = this.nativeObject.getDrawable();
                return this._image = (drawable ? new Image({
                    drawable: drawable
                }) : null);
            } else
                return this._image;
        },
        set: function (value) {
            // We don't use backgroundImage of view. Because, it breaks image fill type.
            if (value instanceof Image) {
                var image = value;
                this._image = image;
                this.nativeObject.setImageDrawable(image.nativeObject);
            } else if (typeof value === "string") {
                var imageFile = new File({
                    path: value
                });
                this.loadFromFile({
                    file: imageFile
                });
            } else {
                this._image = null;
                this.nativeObject.setImageDrawable(null);
            }
        },
        enumerable: true
    },
    'tintColor': {
        get: function () {
            return this._tintColor;
        },
        set: function (tintColor) {
            const Color = require("../../ui/color");
            if (!tintColor instanceof Color)
                return;
            this._tintColor = tintColor;

            const NativeImageCompat = requireClass("androidx.core.widget.ImageViewCompat");
            const NativeColorStateListUtil = requireClass("io.smartface.android.utils.ColorStateListUtil");

            NativeImageCompat.setImageTintList(this.nativeObject, NativeColorStateListUtil.getColorStateListWithValueOf(this._tintColor.nativeObject));

        },
        enumerable: true
    },
    'imageFillType': {
        get: function () {
            return this._fillType === undefined ? this.nativeObject.getScaleType() : this._fillType;
        },
        set: function (fillType) {
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

ImageView.prototype.toString = function () {
    return 'ImageView';
};

ImageView.prototype.loadFromUrl = function () { //ToDo: Paramters should be object this usage is deprecated
    let {
        url = null,
        headers = {},
        placeholder = null,
        fade = true,
        onSuccess = null,
        onFailure = null,
        useHTTPCacheControl = false,
        useDiskCache = true,
        useMemoryCache = true,
    } = getLoadFromUrlParams.apply(null, arguments);
    if(!url){
        onFailure && onFailure();
        return;
    }
    let glideRequestListener = null;
    if (onFailure || onSuccess) {
        const GlideRequestListener = requireClass("io.smartface.android.sfcore.ui.imageview.listeners.GlideRequestListener");
        glideRequestListener = GlideRequestListener.implement({
            onSuccess: function (resource, model, target, dataSource, isFirstResource) {
                onSuccess && onSuccess();
            },
            onFailure: function (glideException, model, target, isFirstResource) {
                onFailure && onFailure();
            }
        });
    }
    if (!useHTTPCacheControl) {
        if (!headers.hasOwnProperty("Cache-Control")) {
            headers["Cache-Control"] = "no-cache";
        }
    }
    const loadFromUrlParameters = new LoadFromUrlParameters(
        AndroidConfig.activity,
        this.nativeObject,
        url,
        placeholder ? placeholder.nativeObject : null,
        glideRequestListener,
        fade,
        headers,
        useHTTPCacheControl,
        useHTTPCacheControl ? false : useDiskCache,
        useMemoryCache,
    );
    try {
        SFGlide.loadFromUrl(loadFromUrlParameters);
    } catch (error) {
        onFailure && onFailure();
    }
};

ImageView.prototype.fetchFromUrl = function (params) {
    const self = this;
    const {
        url = null,
        headers = {},
        placeholder = null,
        onSuccess = null,
        onFailure = null,
        useHTTPCacheControl = false,
        android: {
            useDiskCache = true,
            useMemoryCache = true,
        } = {}
    } = params;
    if(!url){
        onFailure && onFailure();
        return;
    }
    let glideTarget = null;
    if (onSuccess) {
        const GlideTarget = requireClass("io.smartface.android.sfcore.ui.imageview.listeners.GlideTarget");
        glideTarget = GlideTarget.implement({
            onResourceReady(resource, transition) {

            },
            onLoadStarted(placeholder) {
                if (placeholder) {
                    self.nativeObject.setImageDrawable(placeholder);
                }
            },
            onLoadCleared(placeholder) {
            }
        });
    }
    if (!useHTTPCacheControl) {
        if (!headers.hasOwnProperty("Cache-Control")) {
            headers["Cache-Control"] = "no-cache";
        }
    }
    let glideRequestListener = null;
    if (onFailure) {
        const GlideRequestListener = requireClass("io.smartface.android.sfcore.ui.imageview.listeners.GlideRequestListener");
        glideRequestListener = GlideRequestListener.implement({
            onSuccess: function (resource, model, target, dataSource, isFirstResource) {
                const cacheName = dataSource.toString();
                let cacheType = getCacheTypeByName(cacheName);
                const image = new Image({ drawable: resource });
                onSuccess(image, cacheType);
            },
            onFailure: function (glideException, model, target, isFirstResource) {
                onFailure();
            }
        });
    }
    const parameters = new FetchFromUrlParameters(
        AndroidConfig.activity,
        this.nativeObject,
        url,
        placeholder ? placeholder.nativeObject : null,
        glideRequestListener,
        true,
        headers,
        useHTTPCacheControl,
        useHTTPCacheControl ? false : useDiskCache,
        useMemoryCache,
        glideTarget
    );
    try {
        SFGlide.fetchFromUrl(parameters);
    } catch (error) {
        onFailure && onFailure();
    }
};

ImageView.prototype.loadFromFile = function (params) {
    var {
        file = null,
        placeholder = null,
        fade = true,
        width = -1,
        height = -1,
        android: {
            useMemoryCache: useMemoryCache,
        } = { useMemoryCache: true }
    } = params;
    if (file instanceof File) {
        const parameters = new LoadFromFileParameters(
            AndroidConfig.activity,
            this.nativeObject,
            placeholder ? placeholder.nativeObject : null,
            null,
            fade,
            useMemoryCache,
            width,
            height
        );
        var resolvedPath = file.resolvedPath;
        if (!AndroidConfig.isEmulator && resolvedPath.type == Path.FILE_TYPE.DRAWABLE) {
            var resources = AndroidConfig.activity.getResources();
            var drawableResourceId = resources.getIdentifier(resolvedPath.name, "drawable", AndroidConfig.packageName);
            SFGlide.loadByResourceId(drawableResourceId, parameters);

        } else if (!AndroidConfig.isEmulator && resolvedPath.type == Path.FILE_TYPE.ASSET) {
            var assetPrefix = "file:///android_asset/";
            var assetFilePath = assetPrefix + resolvedPath.name;
            SFGlide.loadFromAsset(assetFilePath, parameters);
        } else {
            SFGlide.loadFromFile(file.nativeObject, parameters);
        }
        this.__newImageLoaded = true;
    }
};

function getLoadFromUrlParams() {
    if (typeof arguments[0] === "object") {
        var params = arguments[0];
        // onFailure callback added instead of onError in sf-core 3.2.1
        return {
            url: params.url,
            headers: params.headers,
            placeholder: params.placeholder,
            onFailure: (params.onError ? params.onError : params.onFailure),
            fade: params.fade,
            onSuccess: params.onSuccess,
            useMemoryCache: params.android ? params.android.useMemoryCache : true,
            useDiskCache: params.android ? params.android.useDiskCache : true,
            useHTTPCacheControl: params.useHTTPCacheControl
        };
    } else {
        return {
            url: arguments[0],
            placeholder: arguments[1],
            fade: arguments[2]
        };
    }
}

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

function getCacheTypeByName(cacheName) {
    //TODO : define enum
    if (cacheName === "MEMORY_CACHE") {
        return ImageView.CacheType.MEMORY;
    } else if (cacheName === "LOCAL" || cacheName === "DATA_DISK_CACHE" || cacheName === "RESOURCE_DISK_CACHE") {
        return ImageView.CacheType.DISK;
    } else {
        return ImageView.CacheType.NETWORK;
    }
}

const ImageFillTypeDic = {};
ImageFillTypeDic[ImageView.FillType.NORMAL] = NativeImageView.ScaleType.CENTER;
ImageFillTypeDic[ImageView.FillType.STRETCH] = NativeImageView.ScaleType.FIT_XY;
ImageFillTypeDic[ImageView.FillType.ASPECTFIT] = NativeImageView.ScaleType.FIT_CENTER; // should be fit().centerInside()
ImageFillTypeDic[ImageView.FillType.ASPECTFILL] = NativeImageView.ScaleType.CENTER_CROP; //should be centerCrop

ImageView.Android = {};

module.exports = ImageView;