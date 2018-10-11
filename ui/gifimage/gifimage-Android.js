const NativeGifDrawable = requireClass("pl.droidsonroids.gif.GifDrawable");
const NativeBitmap = requireClass("android.graphics.Bitmap");
const NativeByteArrayOutputStream = requireClass("java.io.ByteArrayOutputStream");

const File = require('../../io/file');
const Blob = require('../../blob');
const Image = require('sf-core/ui/image');

const CompressFormat = [
    NativeBitmap.CompressFormat.JPEG,
    NativeBitmap.CompressFormat.PNG
];
const GifImage = function(params) {
    const self = this;

    if (params && params.drawable)
        self.nativeObject = params.drawable;

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }

    Object.defineProperties(self, {
        'loopCount': {
            get: function() {
                return self.nativeObject.getLoopCount();
            },
            set: function(count) {
                if (typeof count !== "number")
                    return;
                self.nativeObject.setLoopCount(count)
            },
            enumerable: true
        },
        'frameCount': {
            get: function() {
                return self.nativeObject.getNumberOfFrames();
            },
            enumerable: true
        },
        'posterImage': {
            get: function() {
                var newBitmap = self.nativeObject.seekToFrameAndGet(0);
                return (new Image({ bitmap: newBitmap }));
            },
            enumerable: true
        },
        'instrinsicSize': {
            get: function() {
                var instrinsicWidth = self.nativeObject.getIntrinsicWidth();
                var instrinsicHeight = self.nativeObject.getIntrinsicHeight();
                return { width: instrinsicWidth, height: instrinsicHeight };
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
        }
    });

    self.android = {};
    var _seekPosition, _speed, _seekFrame;
    Object.defineProperties(self.android, {
        'reset': {
            value: function() {
                self.nativeObject.reset();
            },
            enumerable: true
        },
        'seekTo': {
            get: function() {
                return _seekPosition;
            },
            set: function(seekPosition) {
                if (typeof seekPosition !== "number")
                    return;
                _seekPosition = seekPosition
                self.nativeObject.seekTo(seekPosition);
            },
            enumerable: true
        },
        'seekToFrame': {
            get: function() {
                return _seekFrame;
            },
            set: function(seekFrame) {
                if (typeof _seekFrame !== "number")
                    return;
                _seekFrame = seekFrame
                self.nativeObject.seekToFrame(_seekFrame);
            },
            enumerable: true
        },
        'speed': {
            get: function() {
                return _speed;
            },
            set: function(speed) {
                if (typeof speed !== "number")
                    return;
                _speed = speed;
                self.nativeObject.setSpeed(_speed);
            },
            enumerable: true
        }
    });

    self.ios = {};
    self.ios.getDelayTimesForIndexes = function() {}
};


GifImage.createFromFile = function(pathOrFile) {
    if (pathOrFile instanceof File) {
        return new GifImage({ drawable: GifImage(new NativeGifDrawable(pathOrFile)) });
    }
    else {
        var imageFile = new File({ path: pathOrFile });
        if (imageFile && imageFile.nativeObject) {
            return new GifImage({ drawable: GifImage(new NativeGifDrawable(imageFile)) });
        }
    }
    return null;
}
GifImage.createFromBlob = function(blob) {
    var byteArray = blob.nativeObject.toByteArray();
    if (byteArray)
        return new GifImage({ drawable: GifImage(new NativeGifDrawable(byteArray)) });
    return null;
}

module.exports = GifImage;
