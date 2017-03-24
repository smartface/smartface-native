const extend            = require('js-base/core/extend');
const View              = require('../view');
const TypeUtil          = require("nf-core/util/type");
const Image             = require("nf-core/ui/image");
const NativeImageView   = requireClass("android.widget.ImageView");

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
                    if (!(fillType in ImageFillTypeDic)){
                        fillType = ImageView.FillType.NORMAL;
                    }
                    _fillType = fillType
                    self.nativeObject.setScaleType(ImageFillTypeDic[_fillType]);
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
            },
            // Overloaded from view due to AND-2702
            'alpha': {
                get: function() {
                    return self.nativeObject.getAlpha()/255;
                },
                set: function(alpha) {
                    self.nativeObject.setAlpha(alpha*255);
                },
                enumerable: true,
                configurable: true
            }
        });

        // SET DEFAULTS
        self.imageFillType = ImageView.FillType.NORMAL;

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

Object.defineProperty(ImageView, "FillType",{
    value: {},
    enumerable: true
});
Object.defineProperties(ImageView.FillType,{
    'NORMAL':{
        value: 0,
        enumerable: true
    },
    'STRETCH':{
        value: 1,
        enumerable: true
    },
    'ASPECTFIT':{
        value: 2,
        enumerable: true
    },
    'ios':{
        value: {},
        enumerable: true
    },
});

const ImageFillTypeDic = {};
ImageFillTypeDic[ImageView.FillType.NORMAL]    = NativeImageView.ScaleType.CENTER;
ImageFillTypeDic[ImageView.FillType.STRETCH]   = NativeImageView.ScaleType.FIT_XY;
ImageFillTypeDic[ImageView.FillType.ASPECTFIT] = NativeImageView.ScaleType.FIT_CENTER;

module.exports = ImageView;