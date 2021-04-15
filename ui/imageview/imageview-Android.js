/*globals requireClass, array*/
const AndroidConfig = require("../../util/Android/androidconfig");
const View = require('../view');
const TypeUtil = require("../../util/type");
const Image = require("../image");
const NativeImageView = requireClass("android.widget.ImageView");
const NativeUri = requireClass("android.net.Uri");
const File = require('../../io/file');
const Path = require('../../io/path');
const {
    ImageViewMemoryPolicy,
    MemoryPolicy,
    ImageViewNetworkPolicy,
    NetworkPolicy
} = require("./Android/policy.js");

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
            const Color = require("sf-core/ui/color");
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
        url = "",
        headers = {},
        placeholder,
        fade,
        onFailure,
        onSuccess,
        networkPolicy,
        memoryPolicy,
        useHTTPCacheControl
    } = getLoadFromUrlParams.apply(null, arguments);
    let callback = null;
    if (onFailure || onSuccess) {
        const NativePicassoCallback = requireClass("com.squareup.picasso.Callback");
        callback = NativePicassoCallback.implement({
            onSuccess: function () {
                onSuccess && onSuccess();
            },
            onError: function () {
                onFailure && onFailure();
            }
        });
    }
    const NativeSFPicassoBuilder = requireClass("io.smartface.android.sfcore.ui.imageview.SFPicassoBuilder");

    let nativePicassoBuilder = new NativeSFPicassoBuilder(AndroidConfig.activity);
    for (let [key, value] of Object.entries(headers)) {
        nativePicassoBuilder.addRequestHeader(key, value);
    }

    let plainRequestCreator = nativePicassoBuilder.build()
        .load(NativeUri.parse(url));

    plainRequestCreator = setArgsToRequestCreator.call(plainRequestCreator, {
        networkPolicy,
        fade,
        placeholder,
        memoryPolicy,
        useHTTPCacheControl
    });
    let requestCreator = scaleImage(plainRequestCreator);
    if (callback !== null)
        requestCreator.into(this.nativeObject, callback);
    else
        requestCreator.into(this.nativeObject);

    this.__newImageLoaded = true;
};

ImageView.prototype.fetchFromUrl = function (params) {
    const self = this;
    const NativeTarget = requireClass("com.squareup.picasso.Target");
    const {
        onSuccess,
        onError,
        onFailure,
        url = "",
        headers = {},
        placeholder,
        android: {
            networkPolicy: networkPolicy,
            memoryPolicy: memoryPolicy
        } = {},
        useHTTPCacheControl
    } = params;
    var target = NativeTarget.implement({
        onBitmapLoaded: function (bitmap, from) {
            onSuccess && onSuccess(new Image({
                bitmap: bitmap
            }), (from && ImageView.CacheType[from.name()]));
        },
        onBitmapFailed: function (errorDrawable) {
            // onFailure callback added instead of onError in sf-core 3.2.1
            var onFailed = (onError ? onError : onFailure);
            onFailed && onFailed();
        },
        onPrepareLoad: function (placeHolderDrawable) {
            self.nativeObject.setImageDrawable(placeHolderDrawable);
        }
    });

    const NativeSFPicassoBuilder = requireClass("io.smartface.android.sfcore.ui.imageview.SFPicassoBuilder");

    let nativePicassoBuilder = new NativeSFPicassoBuilder(AndroidConfig.activity);
    for (let [key, value] of Object.entries(headers)) {
        nativePicassoBuilder.addRequestHeader(key, value);
    }

    let requestCreator = nativePicassoBuilder.build()
        .load(NativeUri.parse(url));
    requestCreator = setArgsToRequestCreator.call(requestCreator, {
        placeholder,
        networkPolicy,
        memoryPolicy,
        useHTTPCacheControl
    });
    requestCreator.into(target);
};

ImageView.prototype.loadFromFile = function (params) {
    var {
        file,
        fade,
        width,
        height,
        placeholder,
        android: {
            memoryPolicy: memoryPolicy
        } = {}
    } = params;
    const NativePicasso = requireClass("com.squareup.picasso.Picasso");
    if (file instanceof File) {
        var resolvedPath = file.resolvedPath;
        if (!AndroidConfig.isEmulator && resolvedPath.type == Path.FILE_TYPE.DRAWABLE) {
            var resources = AndroidConfig.activity.getResources();
            var drawableResourceId = resources.getIdentifier(resolvedPath.name, "drawable", AndroidConfig.packageName);
            let plainRequestCreatorDrawable = NativePicasso.with(AndroidConfig.activity).load(drawableResourceId);
            plainRequestCreatorDrawable = setArgsToRequestCreator.call(plainRequestCreatorDrawable, {
                fade,
                placeholder,
                memoryPolicy
            });
            if (width && height) {
                plainRequestCreatorDrawable.resize(width, height).onlyScaleDown().into(this.nativeObject);
            } else {
                var requestCreatorDrawable = scaleImage(plainRequestCreatorDrawable);
                requestCreatorDrawable.into(this.nativeObject);
            }
        } else if (!AndroidConfig.isEmulator && resolvedPath.type == Path.FILE_TYPE.ASSET) {
            var assetPrefix = "file:///android_asset/";
            var assetFilePath = assetPrefix + resolvedPath.name;
            let plainRequestCreatorAsset = NativePicasso.with(AndroidConfig.activity).load(assetFilePath);
            plainRequestCreatorAsset = setArgsToRequestCreator.call(plainRequestCreatorAsset, {
                fade,
                placeholder,
                memoryPolicy
            });
            if (width && height) {
                plainRequestCreatorAsset.resize(width, height).onlyScaleDown().into(this.nativeObject);
            } else {
                var requestCreatorAsset = scaleImage(plainRequestCreatorAsset);
                requestCreatorAsset.into(this.nativeObject);
            }
        } else {
            let plainRequestCreator = NativePicasso.with(AndroidConfig.activity).load(file.nativeObject);
            plainRequestCreator = setArgsToRequestCreator.call(plainRequestCreator, {
                fade,
                placeholder,
                memoryPolicy
            });
            if (width && height) {
                plainRequestCreator.resize(width, height).onlyScaleDown().into(this.nativeObject);
            } else {
                let requestCreator = scaleImage(plainRequestCreator);
                requestCreator.into(this.nativeObject);
            }
        }
        this.__newImageLoaded = true;
    }
};

function scaleImage(loadedImage) {
    if (loadedImage && ImageView.prototype._fillType !== null) {
        switch (ImageView.prototype._fillType) {
            case ImageView.FillType.NORMAL:
                return loadedImage;
            case ImageView.FillType.STRETCH:
                return loadedImage.fit();
            case ImageView.FillType.ASPECTFIT:
                return loadedImage.fit().centerInside();
            case ImageView.FillType.ASPECTFILL:
                return loadedImage.fit().centerCrop();
            default:
                return loadedImage;
        }
    } else {
        return loadedImage;
    }
}


function setArgsToRequestCreator(params = {}) {
    let plainRequestCreator = this;
    let {
        networkPolicy,
        fade,
        placeholder,
        memoryPolicy,
        useHTTPCacheControl
    } = params;

    let shouldSetPolicy = (useHTTPCacheControl === undefined);
    if (networkPolicy != undefined && shouldSetPolicy) {
        let {
            fPolicy,
            policies
        } = getPolicyArgs(networkPolicy, ImageViewNetworkPolicy);
        if (fPolicy != undefined) {
            plainRequestCreator = plainRequestCreator.networkPolicy(fPolicy, array(policies, "com.squareup.picasso.NetworkPolicy"));
        }
    }

    if (memoryPolicy != undefined && shouldSetPolicy) {
        let {
            fPolicy,
            policies
        } = getPolicyArgs(memoryPolicy, ImageViewMemoryPolicy);
        if (fPolicy != undefined)
            plainRequestCreator = plainRequestCreator.memoryPolicy(fPolicy, array(policies, "com.squareup.picasso.MemoryPolicy"));
    }

    if (useHTTPCacheControl)
        plainRequestCreator = plainRequestCreator.memoryPolicy(ImageViewMemoryPolicy[ImageView.Android.MemoryPolicy.NO_CACHE], array([], "com.squareup.picasso.MemoryPolicy"));


    if (fade === false)
        plainRequestCreator = plainRequestCreator.noFade();

    if (placeholder instanceof Image)
        plainRequestCreator = plainRequestCreator.placeholder(placeholder.nativeObject);
    return plainRequestCreator;
}

function getPolicyArgs(policy, convertionObj) {
    let fPolicy, policies = [];
    if (TypeUtil.isArray(policy)) {
        policies = policy.map(e => convertionObj[e]);
        fPolicy = policies.shift();
    } else {
        fPolicy = convertionObj[policy];
    }
    return {
        fPolicy,
        policies
    };
}

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
            networkPolicy: params.android ? params.android.networkPolicy : undefined,
            memoryPolicy: params.android ? params.android.memoryPolicy : undefined,
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

const ImageFillTypeDic = {};
ImageFillTypeDic[ImageView.FillType.NORMAL] = NativeImageView.ScaleType.CENTER;
ImageFillTypeDic[ImageView.FillType.STRETCH] = NativeImageView.ScaleType.FIT_XY;
ImageFillTypeDic[ImageView.FillType.ASPECTFIT] = NativeImageView.ScaleType.FIT_CENTER; // should be fit().centerInside()
ImageFillTypeDic[ImageView.FillType.ASPECTFILL] = NativeImageView.ScaleType.CENTER_CROP; //should be centerCrop

ImageView.Android = {};
Object.defineProperties(ImageView.Android, {
    'NetworkPolicy': {
        value: NetworkPolicy,
        enumerable: true
    },
    'MemoryPolicy': {
        value: MemoryPolicy,
        enumerable: true
    },
});

module.exports = ImageView;