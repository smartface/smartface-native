const File = require('../../io/file');
const TypeUtil = require("../../util/type");
const Blob = require('../../blob');

const Format = {
    JPEG: 0,
    PNG: 1
};

function Image(params) {
    var self = this;
    self.ios = {};
    self.android = {};
    self.android.round = function(radius) {
        return self;
    };
    self.createSystemIcon = function(id) {
        return self
    };

    if (params.path) {
        if (params.path.includes(".app")) {
            // Publish project image caching. 
            // For using [UIImage imageNamed:] function.
            var array = params.path.split("/");
            var fileName = array.pop();
            self.nativeObject = __SF_UIImage.createName(fileName);
        } else {
            self.nativeObject = new __SF_UIImage(params.path);
        }
    } else if (params.name) {
        self.nativeObject = new __SF_UIImage.createName(params.name);
    } else if (params.blob) {
        self.nativeObject = __SF_UIImage.createNSData(params.blob.nativeObject);
    } else if (params.image) {
        self.nativeObject = params.image;
    }

    Object.defineProperty(self, 'height', {
        value: self.nativeObject.size.height,
        writable: false
    });

    Object.defineProperty(self, 'width', {
        value: self.nativeObject.size.width,
        writable: false
    });

    Object.defineProperty(self.ios, 'resizableImageWithCapInsetsResizingMode', {
        value: function(capinsets, resizingMode) {
            var image;
            var invocationResizeable = __SF_NSInvocation.createInvocationWithSelectorInstance("resizableImageWithCapInsets:resizingMode:", self.nativeObject);
            if (invocationResizeable) {
                invocationResizeable.target = self.nativeObject;
                invocationResizeable.setSelectorWithString("resizableImageWithCapInsets:resizingMode:");
                invocationResizeable.retainArguments();
                invocationResizeable.setUIEdgeInsetsArgumentAtIndex(capinsets, 2);
                invocationResizeable.setNSIntegerArgumentAtIndex(resizingMode, 3);

                invocationResizeable.invoke();
                image = invocationResizeable.getReturnValue();
            }
            return Image.createFromImage(image);
        },
        writable: false
    });

    Object.defineProperty(self, 'resize', {
        value: function(width, height, onSuccess, onFailure) {
            if (TypeUtil.isNumeric(width) && TypeUtil.isNumeric(height)) {
                var resizeImage = new Image.createFromImage(self.nativeObject.resizeImage({
                    width: width,
                    height: height
                }));
                if (onSuccess) {
                    onSuccess({
                        "image": resizeImage
                    });
                }
                return resizeImage;
            }

            if (onFailure) {
                onFailure();
            }
            return false;
        },
        writable: false
    });

    Object.defineProperty(self, 'crop', {
        value: function(x, y, width, height, onSuccess, onFailure) {
            if (TypeUtil.isNumeric(width) && TypeUtil.isNumeric(height) && TypeUtil.isNumeric(x) && TypeUtil.isNumeric(y)) {
                var resizeImage = new Image.createFromImage(self.nativeObject.cropToBounds({
                    x: x,
                    y: y,
                    width: width,
                    height: height
                }));
                if (onSuccess) {
                    onSuccess({
                        "image": resizeImage
                    });
                }
                return resizeImage;
            }

            if (onFailure) {
                onFailure();
            }
            return false;
        },
        writable: false
    });

    Object.defineProperty(self, 'rotate', {
        value: function(angle, onSuccess, onFailure) {
            if (TypeUtil.isNumeric(angle)) {
                var resizeImage = new Image.createFromImage(self.nativeObject.imageRotatedByDegrees(angle, false));
                if (onSuccess) {
                    onSuccess({
                        "image": resizeImage
                    });
                }
                return resizeImage;
            }

            if (onFailure) {
                onFailure();
            }
            return false;
        },
        writable: false
    });

    Object.defineProperty(self, 'compress', {
        value: function(format, quality, onSuccess, onFailure) {
            if (TypeUtil.isNumeric(quality)) {
                var blob = new Blob(self.nativeObject.compress(format, quality / 100));
                if (onSuccess) {
                    onSuccess({
                        "blob": blob
                    });
                }
                return blob;
            }

            if (onFailure) {
                onFailure();
            }
            return false;
        },
        writable: false
    });

    Object.defineProperty(self, 'toBlob', {
        value: function() {
            var retval = null;
            var imageData = self.nativeObject.convertToData();
            if (imageData) {
                retval = new Blob(imageData);
            }
            return retval;
        },
        writable: false
    });

    Object.defineProperty(self.ios, 'imageWithRenderingMode', {
        value: function(value) {
            return Image.createFromImage(self.nativeObject.imageWithRenderingMode(value));
        },
        writable: false
    });

    Object.defineProperty(self.ios, 'imageFlippedForRightToLeftLayoutDirection', {
        value: function() {
            return Image.createFromImage(self.nativeObject.imageFlippedForRightToLeftLayoutDirection());
        },
        writable: false
    });

    Object.defineProperty(self.ios, 'renderingMode', {
        get: function() {
            return self.nativeObject.valueForKey("renderingMode");
        },
        enumerable: true
    });

    var _flippedImage;
    var _nativeImage = self.nativeObject;
    Object.defineProperty(self.ios, 'flipsForRightToLeftLayoutDirection', {
        get: function() {
            return self.nativeObject.valueForKey("flipsForRightToLeftLayoutDirection");
        },
        enumerable: true
    });

    var _autoMirrored = false;
    Object.defineProperty(self, 'autoMirrored', {
        set: function(value) {
            _autoMirrored = value;
            if (_autoMirrored) {
                if (_flippedImage) {
                    self.nativeObject = _flippedImage;
                } else {
                    _flippedImage = self.nativeObject.imageFlippedForRightToLeftLayoutDirection();
                    self.nativeObject = _flippedImage;
                }
            } else {
                self.nativeObject = _nativeImage
            }
        },
        get: function() {
            return _autoMirrored;
        },
        enumerable: true
    });
}

Image.createFromFile = function(path) {
    var imageFile = new File({
        path: path
    });
    var retval;
    if (typeof imageFile.nativeObject.getActualPath() === 'undefined') {
        retval = null;
    } else {
        retval = new Image({
            "path": imageFile.nativeObject.getActualPath()
        });
    }
    return retval;
};

Image.createFromName = function(name) {
    return new Image({
        "name": name
    });
};

Image.createFromImage = function(image) {
    return new Image({
        "image": image
    });
};

Image.createFromBlob = function(blob) {
    return new Image({
        "blob": blob
    });
};

Image.android = {};
Image.android.createRoundedImage = function() {};

Object.defineProperty(Image, 'Format', {
    value: Format,
    writable: false,
    enumerable: true
});

Image.iOS = {};
Image.iOS.RenderingMode = {
    AUTOMATIC: 0,
    ORIGINAL: 1,
    TEMPLATE: 2
};

module.exports = Image;