const NativeImageView = requireClass("android.widget.ImageView");
const NativeScaleType = NativeImageView.ScaleType;

const extend         = require('js-base/core/extend');
const View           = require('../view');
const Image          = require("nf-core/ui/image");
const ImageFillType  = require("nf-core/ui/imagefilltype");

const ImageFillTypeDic = {};
ImageFillTypeDic[ImageFillType.NORMAL]    = NativeScaleType.CENTER;
ImageFillTypeDic[ImageFillType.STRETCH]   = NativeScaleType.FIT_XY;
ImageFillTypeDic[ImageFillType.ASPECTFIT] = NativeScaleType.FIT_CENTER;

const ImageView = extend(View)(
    function (_super, params) {
        var self = this;
        if (!self.nativeObject) {
            self.nativeObject = new NativeImageView(Android.getActivity());
        }
        _super(self);

        Object.defineProperty(this, 'image', {
            get: function() {
                var image = new Image();
                image.nativeObject = self.nativeObject.getDrawable();
                return image;
            },
            set: function(image) {
                if (image instanceof Image) {
                    self.nativeObject.setImageDrawable(image.nativeObject);
                } else {
                    self.nativeObject.setImageDrawable(null);
                }
            },
            enumerable: true
        });

        var _fillType; // native does not store ImageFillType but ScaleType
        Object.defineProperty(this, 'imageFillType', {
            get: function() {
                return _fillType;
            },
            set: function(fillType) {
                _fillType = fillType;
                
                var scaleType = ImageFillTypeDic[_fillType];
                self.nativeObject.setScaleType(scaleType);
            },
            enumerable: true
        });

        // SET DEFAULTS
        self.imageFillType = ImageFillType.NORMAL;

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = ImageView;