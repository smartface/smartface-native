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
    var self = this;
    self.ios = {};
    self.ios.resizableImageWithCapInsetsResizingMode = function() {
        return self.nativeObject;
    };
    self.android = {};

    var androidResources = AndroidConfig.activity.getResources();
    if (params) {
        if (params.bitmap) {
            self.nativeObject = new NativeBitmapDrawable(androidResources, params.bitmap);
        }
        else if (params.path) {
            var bitmap = NativeBitmapFactory.decodeFile(params.path);
            self.nativeObject = new NativeBitmapDrawable(androidResources, bitmap);
        }
        else if (params.roundedBitmapDrawable) {
            self.nativeObject = params.roundedBitmapDrawable;
        }
        else {
            throw new Error("path or bitmap can not be empty for Image!");
        }
    }
    else {
        throw new Error("Constructor parameters needed for Image!");
    }

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
        }
    });
    
    Object.defineProperty(self.android, 'round', {
        value: function(radius) {
            var roundedBitmapDrawable = getRoundedBitmapDrawable(self.nativeObject.getBitmap(), radius);
            return new Image({
                roundedBitmapDrawable: roundedBitmapDrawable
            });
        }
    });
}

Object.defineProperties(Image, {
    'createFromFile': {
        value: function(path, width, height) {
            var imageFile = new File({ path: path });
            if (imageFile && imageFile.nativeObject) {
                var bitmap;
                if (imageFile.type === Path.FILE_TYPE.ASSET) {
                    var assetsInputStream = AndroidConfig.activity.getAssets().open(imageFile.nativeObject);
                    if (width && height)
                        bitmap = decodeSampledBitmapFromResource(assetsInputStream, width, height);
                    else
                        bitmap = NativeBitmapFactory.decodeStream(assetsInputStream);
                    assetsInputStream.close();
                }
                else if (imageFile.type === Path.FILE_TYPE.DRAWABLE) {
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
        if (params.path) {
            var imageFile = new File({ path: params.path });
            if ((imageFile.type === Path.FILE_TYPE.ASSET) || (imageFile.type === Path.FILE_TYPE.DRAWABLE)) {
                var image = Image.createFromFile({ path: params.path });
                return image.android.round(params.radius ? params.radius : 0);
            }
            else {
                var roundedBitmapDrawable = getRoundedBitmapDrawable(imageFile.fullPath, params.radius ? params.radius : 0);
                return new Image({
                    roundedBitmapDrawable: roundedBitmapDrawable
                });
            }
        }
    },
    enumerable: true
});

function getRoundedBitmapDrawable(bitmap, radius) {
    var roundedBitmapDrawable = RoundedBitmapDrawableFactory.create(AndroidConfig.activity.getResources(), bitmap);
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

module.exports = Image;