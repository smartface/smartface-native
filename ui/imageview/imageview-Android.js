const extend            = require('js-base/core/extend');
const View              = require('../view');
const TypeUtil          = require("nf-core/util/type");
const Image             = require("nf-core/ui/image");

const NativeImageView   = requireClass("android.widget.ImageView");

const ImageFillTypeDic = {};
ImageFillTypeDic[Image.FillType.NORMAL]    = NativeImageView.ScaleType.CENTER;
ImageFillTypeDic[Image.FillType.STRETCH]   = NativeImageView.ScaleType.FIT_XY;
ImageFillTypeDic[Image.FillType.ASPECTFIT] = NativeImageView.ScaleType.FIT_CENTER;

const ImageView = extend(View)(
    function (_super, params) {
        var self = this;
        var activity = Android.getActivity();
        
        if (!self.nativeObject) {
            self.nativeObject = new NativeImageView(activity);
        }
        _super(self);
        

        var _fillType; // native does not store ImageFillType but ScaleType
        Object.defineProperties(this, {
            'image': {
                get: function() {
                    var drawable =  self.nativeObject.getDrawable();
                    var image = new Image({bitmap: drawable.getBitmap()});
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
            },
            'imageFillType': {
                get: function() {
                    return _fillType;
                },
                set: function(fillType) {
                    _fillType = fillType;
                    
                    var scaleType = ImageFillTypeDic[_fillType];
                    self.nativeObject.setScaleType(scaleType);
                },
                enumerable: true
            },
            'loadFromUrl': {
                value: function(url, placeHolder){
                    const NativePicasso = requireClass("com.squareup.picasso.Picasso");
                    if(TypeUtil.isString(url)){
                        if(placeHolder instanceof Image){
                            NativePicasso.with(activity).load(url).placeholder(placeHolder.nativeObject).into(self.nativeObject);
                        }
                        else{
                             NativePicasso.with(activity).load(url).into(self.nativeObject);
                        }
                    }
                },
                enumerable: true
            }
            
        });

        // SET DEFAULTS
        self.imageFillType = Image.FillType.NORMAL;

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = ImageView;