const NativeGifDrawable = requireClass("pl.droidsonroids.gif.GifDrawable");

const FileStream = require('../../io/filestream');
const File = require('../../io/file');
const Blob = require('../../blob');
const Image = require('sf-core/ui/image');

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
                if (self.content instanceof File) {
                    var myFileStream = self.content.openStream(FileStream.StreamType.READ, FileStream.ContentMode.BINARY);
                    return myFileStream.readToEnd();
                }
                else if (self.content instanceof Blob) {
                    return self.content;
                }
            },
            enumerable: true
        }
    });

    self.android = {};
    var _seekPosition, _speed;
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
    if (typeof pathOrFile === "string")
        pathOrFile = new File({ path: pathOrFile });

    if (pathOrFile && pathOrFile.nativeObject) {
        return new GifImage({ drawable: new NativeGifDrawable(pathOrFile.nativeObject), content: pathOrFile });
    }
    else
        return null;
}
GifImage.createFromBlob = function(blob) {
    var byteArray = blob.nativeObject.toByteArray();
    if (byteArray)
        return new GifImage({ drawable: new NativeGifDrawable(byteArray), content: blob });
    return null;
}

module.exports = GifImage;
