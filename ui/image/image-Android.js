/*globals requireClass*/
const NativeBitmapFactory = requireClass("android.graphics.BitmapFactory");
const NativeBitmapDrawable = requireClass("android.graphics.drawable.BitmapDrawable");
const NativeBitmap = requireClass("android.graphics.Bitmap");
const NativeMatrix = requireClass("android.graphics.Matrix");
const NativeByteArrayOutputStream = requireClass("java.io.ByteArrayOutputStream");
const RoundedBitmapDrawableFactory = requireClass("android.support.v4.graphics.drawable.RoundedBitmapDrawableFactory");


const AndroidUnitConverter = require("../../util/Android/unitconverter.js");
const AndroidConfig = require("../../util/Android/androidconfig");
const Blob = require('../../blob');
const File = require('../../io/file');
const Path = require("../../io/path");

const CompressFormat = [
    NativeBitmap.CompressFormat.JPEG,
    NativeBitmap.CompressFormat.PNG
];

const Format = {
    JPEG: 0,
    PNG: 1
};

function Image(params) {
    const self = this;

    const androidResources = AndroidConfig.activityResources;
    if (typeof(params) !== 'object')
        throw new Error("Constructor parameters needed for Image!");

    Object.defineProperties(this, {
        'height': {
            get: function() {
                return self.nativeObject.getBitmap().getHeight();
            },
            enumerable: true
        },
        'width': {
            get: function() {
                return self.nativeObject.getBitmap().getWidth();
            },
            enumerable: true
        },
        'toBlob': {
            value: function() {
                var bitmap = self.nativeObject.getBitmap();
                var stream = new NativeByteArrayOutputStream();
                bitmap.compress(CompressFormat[1], 100, stream);
                return new Blob(stream.toByteArray(), { type: "image" });
            },
            enumerable: true
        },
        'resize': {
            value: function(width, height, onSuccess, onFailure) {
                var success = true;
                try {
                    var originalBitmap = self.nativeObject.getBitmap();
                    var newBitmap = NativeBitmap.createScaledBitmap(originalBitmap, width, height, false);
                }
                catch (err) {
                    success = false;
                    if (onFailure)
                        onFailure({ message: err });
                    else
                        return null;
                }
                if (success) {
                    if (onSuccess)
                        onSuccess({ image: new Image({ bitmap: newBitmap }) });
                    else
                        return (new Image({ bitmap: newBitmap }));
                }
            },
            enumerable: true
        },
        'crop': {
            value: function(x, y, width, height, onSuccess, onFailure) {
                var success = true;
                try {
                    var originalBitmap = self.nativeObject.getBitmap();
                    var newBitmap = NativeBitmap.createBitmap(originalBitmap, x, y, width, height);
                }
                catch (err) {
                    success = false;
                    if (onFailure)
                        onFailure({ message: err });
                    else
                        return null;
                }
                if (success) {
                    if (onSuccess)
                        onSuccess({ image: new Image({ bitmap: newBitmap }) });
                    else
                        return (new Image({ bitmap: newBitmap }));
                }
            },
            enumerable: true
        },
        'rotate': {
            value: function(angle, onSuccess, onFailure) {
                var success = true;
                try {
                    var matrix = new NativeMatrix();
                    matrix.postRotate(angle);
                    var bitmap = self.nativeObject.getBitmap();
                    var width = bitmap.getWidth(),
                        height = bitmap.getHeight();
                    var newBitmap = NativeBitmap.createBitmap(bitmap, 0, 0, width, height, matrix, true);
                }
                catch (err) {
                    success = false;
                    if (onFailure)
                        onFailure({ message: err });
                    else
                        return null;
                }
                if (success) {
                    if (onSuccess)
                        onSuccess({ image: new Image({ bitmap: newBitmap }) });
                    else
                        return (new Image({ bitmap: newBitmap }));
                }
            },
            enumerable: true
        },
        'compress': {
            value: function(format, quality, onSuccess, onFailure) {
                var success = true;
                try {
                    var out = new NativeByteArrayOutputStream();
                    var bitmap = self.nativeObject.getBitmap();
                    bitmap.compress(CompressFormat[format], quality, out);
                    var byteArray = out.toByteArray();
                }
                catch (err) {
                    success = false;
                    if (onFailure)
                        onFailure({ message: err });
                    else
                        return null;
                }
                if (success) {
                    if (onSuccess)
                        onSuccess({ blob: new Blob(byteArray, { type: "image" }) });
                    else
                        return (new Blob(byteArray, { type: "image" }));
                }
            },
            enumerable: true
        },
        'toString': {
            value: function() {
                return 'Image';
            },
            enumerable: true,
            configurable: true
        },
        'autoMirrored': {
            get: function() {
                return self.nativeObject.isAutoMirrored();
            },
            set: function(isAutoMirrored) {
                if (typeof isAutoMirrored !== 'boolean')
                    return;
                self.nativeObject.setAutoMirrored(isAutoMirrored);
            }
        },
        'bitmap': {
            set: function(value) {
                self.nativeObject = new NativeBitmapDrawable(androidResources, value);
            },
            enumerable: false,
            configurable: false
        },
        'path': {
            set: function(value) {
                var bitmap = NativeBitmapFactory.decodeFile(value);
                self.nativeObject = new NativeBitmapDrawable(androidResources, bitmap);
            },
            enumerable: false,
            configurable: false
        },
        'roundedBitmapDrawable': {
            set: function(value) {
                self.nativeObject = value;
            },
            enumerable: false,
            configurable: false
        },
        'drawable': {
            set: function(value) {
                self.nativeObject = value;
            },
            enumerable: false,
            configurable: false
        }
    });


    let _android = {};
    Object.defineProperty(self, 'android', {
        get: function() {
            return _android;
        },
        set: function(value) {
            Object.assign(self.android, value || {});
        }
    });

    let _systemIcon;
    Object.defineProperties(self.android, {
        'round': {
            value: function(radius) {
                if (typeof(radius) !== "number")
                    throw new Error("radius value must be a number.");

                var roundedBitmapDrawable = getRoundedBitmapDrawable(self.nativeObject.getBitmap(), radius);
                return new Image({
                    roundedBitmapDrawable: roundedBitmapDrawable
                });
            }
        },
        'systemIcon': {
            get: function() {
                return _systemIcon;
            },
            set: function(systemIcon) {
                const NativeContextCompat = requireClass('android.support.v4.content.ContextCompat');
                _systemIcon = systemIcon;
                self.nativeObject = NativeContextCompat.getDrawable(AndroidConfig.activity, Image.systemDrawableId(_systemIcon));
            },
            enumerable: true
        }
    });

    self.ios = {};
    self.ios.resizableImageWithCapInsetsResizingMode = function() {
        return self;
    };
    self.ios.imageFlippedForRightToLeftLayoutDirection = function() {
        return self;
    };
    self.ios.imageWithRenderingMode = function() {
        return self;
    };

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

Object.defineProperties(Image, {
    'createFromFile': {
        value: function(path, width, height) {
            var imageFile = new File({ path: path });
            if (imageFile && imageFile.nativeObject) {
                var bitmap;
                if (imageFile.type === Path.FILE_TYPE.DRAWABLE) {
                    bitmap = imageFile.nativeObject;
                }
                else {
                    if (width && height) {
                        bitmap = decodeSampledBitmapFromResource(imageFile.fullPath, width, height);
                    }
                    else {
                        bitmap = NativeBitmapFactory.decodeFile(imageFile.fullPath);
                    }
                }
                return (new Image({ bitmap: bitmap }));
            }
            return null;
        },
        enumerable: true
    },
    'createSystemIcon': {
        value: function(systemIcon) {
            return (new Image({
                android: {
                    systemIcon: systemIcon
                }
            }));
        },
        enumerable: true
    },
    'createFromBlob': {
        value: function(blob) {
            var newBitmap = NativeBitmapFactory.decodeByteArray(blob.nativeObject.toByteArray(), 0, blob.size);
            if (newBitmap)
                return (new Image({ bitmap: newBitmap }));
            return null;
        },
        enumerable: true
    },
    'android': {
        value: {},
        enumerable: true
    },
    'Format': {
        value: Format,
        enumerable: true
    }
});

Object.defineProperty(Image.android, 'createRoundedImage', {
    value: function(params) {
        if (typeof(params.path) !== "string")
            throw new Error("path value must be a string.");
        if (typeof(params.radius) !== "number")
            throw new Error("radius value must be a number.");

        var imageFile = new File({ path: params.path });
        if ((imageFile.type === Path.FILE_TYPE.ASSET) || (imageFile.type === Path.FILE_TYPE.DRAWABLE)) {
            var image = Image.createFromFile({ path: params.path });
            return image.android.round(params.radius);
        }
        else {
            var roundedBitmapDrawable = getRoundedBitmapDrawable(imageFile.fullPath, params.radius);
            return new Image({
                roundedBitmapDrawable: roundedBitmapDrawable
            });
        }
    },
    enumerable: true
});

function getRoundedBitmapDrawable(bitmap, radius) {
    var roundedBitmapDrawable = RoundedBitmapDrawableFactory.create(AndroidConfig.activityResources, bitmap);
    roundedBitmapDrawable.setCornerRadius(AndroidUnitConverter.dpToPixel(radius));
    return roundedBitmapDrawable;
}

// Code taken from https://developer.android.com/topic/performance/graphics/load-bitmap.html
function decodeSampledBitmapFromResource(file, reqWidth, reqHeight) {
    var options = new NativeBitmapFactory.Options();
    options.inJustDecodeBounds = true;
    if (typeof(file) === "string")
        NativeBitmapFactory.decodeFile(file, options);
    else // assetsInputStream for reading from assets
        NativeBitmapFactory.decodeStream(file, null, options);

    options.inSampleSize = calculateInSampleSize(options, reqWidth, reqHeight);
    options.inJustDecodeBounds = false;

    if (typeof(file) === "string")
        return NativeBitmapFactory.decodeFile(file, options);
    return NativeBitmapFactory.decodeStream(file, null, options);
}

function calculateInSampleSize(options, reqWidth, reqHeight) {
    // Raw height and width of image
    var height = options.outHeight;
    var width = options.outWidth;
    var inSampleSize = 1;

    if (height > reqHeight || width > reqWidth) {
        var halfHeight = height / 2;
        var halfWidth = width / 2;

        // Calculate the largest inSampleSize value that is a power of 2 and keeps both
        // height and width larger than the requested height and width.
        while ((halfHeight / inSampleSize) >= reqHeight &&
            (halfWidth / inSampleSize) >= reqWidth) {
            inSampleSize *= 2;
        }
    }

    return inSampleSize;
}


Image.createImageFromPath = function(path) {
    if (typeof path === "string")
        path = Image.createFromFile(path);
    return path;
};

Image.systemDrawableId = function(systemIcon) {
    let resID;
    if (systemIcon.constructor === String) {
        const NativeR = requireClass('android.R');
        resID = NativeR.drawable["" + systemIcon];
    }
    else {
        resID = systemIcon;
    }
    return resID;
}

Image.iOS = {};
Image.iOS.RenderingMode = {};

module.exports = Image;
