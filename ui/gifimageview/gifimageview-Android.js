const ImageView = require("sf-core/ui/imageview");
const GifImage = require("sf-core/ui/gifimage");
const Image = require("sf-core/ui/image");

GifImageView.prototype = Object.create(ImageView.prototype);
function GifImageView(params) {
    var self = this;
    ImageView.call(this);

    const self = this;

    var _image;
    Object.defineProperties(self, {
        'gifImage': {
            get: function() {
                return _image;
            },
            set: function(value) {
                // We don't use backgroundImage of view. Because, it breaks image fill type.
                if (!(value instanceof GifImage))
                    return;
                _image = value;
                this.nativeObject.setImageDrawable(null);
                this.nativeObject.setImageDrawable(_image.nativeObject);
            },
            enumerable: true
        },
        'startAnimating': {
            value: function() {
                self.gifImage.nativeObject.start();
            },
            enumerable: true
        },
        'stopAnimating': {
            value: function() {
                self.gifImage.nativeObject.stop();
            },
            enumerable: true
        },
        'currentFrameIndex': {
            get: function() {
                return self.gifImage.nativeObject.getCurrentFrameIndex();
            },
            enumerable: true
        },
        'currentFrame': {
            get: function() {
                return new Image({
                    bitmap: self.gifImage.nativeObject.getCurrentFrame()
                });
            },
            enumerable: true
        },
        'isAnimating': {
            get: function() {
                return self.gifImage.nativeObject.isPlaying();
            },
            enumerable: true
        }
    });


    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = GifImageView;