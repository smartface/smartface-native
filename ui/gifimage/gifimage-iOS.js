const File = require('../../io/file');
const Path = require('../../io/path');
const FileStream = require('../../io/filestream');
const Image = require("../../ui/image");
const Blob = require('../../blob');

function GifImage(params) {
    var self = this;
    self.ios = {};
    self.android = {};
    self.android.reset = function() {};

    self.nativeObject = params.nativeObject;

    Object.defineProperty(self, 'loopCount', {
        set: function() {

        },
        get: function() {
            return self.nativeObject.loopCount;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'frameCount', {
        set: function() {

        },
        get: function() {
            return self.nativeObject.frameCount;
        },
        enumerable: true
    });

    Object.defineProperty(self.ios, 'frameCacheSizeCurrent', {
        set: function() {

        },
        get: function() {
            return self.nativeObject.frameCacheSizeCurrent;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'posterImage', {
        set: function() {

        },
        get: function() {
            return Image.createFromImage(self.nativeObject.posterImage);
        },
        enumerable: true
    });

    Object.defineProperty(self, 'instrinsicSize', {
        set: function() {

        },
        get: function() {
            return self.nativeObject.size;
        },
        enumerable: true
    });

    Object.defineProperty(self.ios, 'getDelayTimesForIndexes', {
        value: function() {
            return self.nativeObject.getDelayTimesForIndexes();
        },
        enumerable: true
    });

    Object.defineProperty(self, 'toBlob', {
        value: function() {
            var retval = null;
            var data = self.nativeObject.data;
            if (data) {
                retval = new Blob(data);
            }
            return retval;
        },
        enumerable: true
    });
}

GifImage.createFromFile = function(pathOrFile) {
    var file;
    if (typeof pathOrFile === 'string') {
        file = new File({
            path: pathOrFile
        });
    } else {
        file = pathOrFile
    }

    var fileStream = file.openStream(FileStream.StreamType.READ, FileStream.ContentMode.BINARY);
    var blob = fileStream.readToEnd();
    var nativeObject = __SF_FLAnimatedImage.animatedImageWithGIFData(blob.nativeObject);
    return new GifImage({
        "nativeObject": nativeObject
    });
};

GifImage.createFromBlob = function(blob) {
    var nativeObject = __SF_FLAnimatedImage.animatedImageWithGIFData(blob.nativeObject);
    return new GifImage({
        "nativeObject": nativeObject
    });
};

module.exports = GifImage;