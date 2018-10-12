const NativeGifDrawable = requireClass("pl.droidsonroids.gif.GifDrawable");
const NativeBitmap = requireClass("android.graphics.Bitmap");
const NativeByteArrayOutputStream = requireClass("java.io.ByteArrayOutputStream");

const FileStream = require('../../io/filestream');
const File = require('../../io/file');
const Blob = require('../../blob');
const Image = require('sf-core/ui/image');

const CompressFormat = [
    NativeBitmap.CompressFormat.JPEG,
    NativeBitmap.CompressFormat.PNG,
];

function GifImage(params) {
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
                return self.blob;
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

    function bitmapConverter(drawable) {
        const NativeCanvas = requireClass("android.graphics.Canvas");
        const NativeBitmap = requireClass("android.graphics.Bitmap");

        var bitmap = null;
        if (drawable.getIntrinsicHeight() <= 0 || drawable.getIntrinsicWidth() <= 0) {
            bitmap = NativeBitmap.createBitmap(1, 1, NativeBitmap.Config.ARGB_8888);
        }
        else {
            bitmap = NativeBitmap.createBitmap(drawable.getIntrinsicWidth(), drawable.getIntrinsicHeight(), NativeBitmap.Config.ARGB_8888);
        }
        var nativeCanvas = new NativeCanvas(bitmap);
        drawable.setBounds(0, 0, nativeCanvas.getWidth(), nativeCanvas.getHeight());
        drawable.draw(nativeCanvas);

        return bitmap;
    }

    self.ios = {};
    self.ios.getDelayTimesForIndexes = function() {}
};

GifImage.createFromFile = function(pathOrFile) {
    if (typeof pathOrFile === "string")
        pathOrFile = new File({ path: pathOrFile });

    if (pathOrFile && pathOrFile.nativeObject) {
        var myFileStream = pathOrFile.openStream(FileStream.StreamType.READ, FileStream.ContentMode.BINARY);
        return new GifImage({ drawable: new NativeGifDrawable(pathOrFile.nativeObject), blob: myFileStream.readToEnd() });
    }
    else
        return null;
}
GifImage.createFromBlob = function(blob) {
    var byteArray = blob.nativeObject.toByteArray();
    if (byteArray)
        return new GifImage({ drawable: new NativeGifDrawable(byteArray), blob: blob });
    return null;
}

module.exports = GifImage;
