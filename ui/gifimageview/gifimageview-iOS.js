const extend = require('js-base/core/extend');
const ImageView = require('../imageview');
const Image = require("sf-core/ui/image");

const GifImageView = extend(ImageView)(
    function(_super, params) {
        var self = this;

        if (!self.nativeObject) {
            self.nativeObject = new __SF_FLAnimatedImageView();
        }

        _super(this);

        var _gifimage;
        Object.defineProperty(self, 'gifImage', {
            get: function() {
                return _gifimage
            },
            set: function(value) {
                _gifimage = value;
                self.nativeObject.animatedImage = value.nativeObject;
            },
            enumerable: true
        });

        Object.defineProperty(self, 'currentFrame', {
            get: function() {
                return Image.createFromImage(self.nativeObject.currentFrame);;
            },
            enumerable: true
        });

        Object.defineProperty(self, 'currentFrameIndex', {
            get: function() {
                return self.nativeObject.currentFrameIndex;
            },
            enumerable: true
        });

        Object.defineProperty(self, 'isAnimating', {
            get: function() {
                return self.nativeObject.animating;
            },
            enumerable: true
        });

        Object.defineProperty(self, 'startAnimating', {
            value: function() {
                self.nativeObject.startAnimating();
            },
            enumerable: true
        });

        Object.defineProperty(self, 'stopAnimating', {
            value: function() {
                self.nativeObject.stopAnimating();
            },
            enumerable: true
        });

        var _loopCompletionCallback;
        Object.defineProperty(self.ios, 'loopCompletionCallback', {
            get: function() {
                return _loopCompletionCallback
            },
            set: function(value) {
                _loopCompletionCallback = value;
                var handler = function(_loopCompletionCallback, loopCountRemaining) {
                    if (typeof _loopCompletionCallback === 'function') {
                        _loopCompletionCallback(loopCountRemaining);
                    }
                }.bind(this, _loopCompletionCallback);
                self.nativeObject.setLoopCompletionBlockWithJSValue(handler);
            },
            enumerable: true
        });

        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = GifImageView;