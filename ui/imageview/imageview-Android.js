/*globals requireClass*/
const extend            = require('js-base/core/extend');
const AndroidConfig     = require("../../util/Android/androidconfig");
const View              = require('../view');
const TypeUtil          = require("../../util/type");
const Image             = require("../image");
const NativeImageView   = requireClass("android.widget.ImageView");

const ImageView = extend(View)(
    function (_super, params) {
        if (!this.nativeObject) {
            this.nativeObject = new NativeImageView(AndroidConfig.activity);
        }
        _super(this);

        if(!this.isNotSetDefaults){
            // SET DEFAULTS
            this.imageFillType = ImageView.FillType.NORMAL;
        }

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    },
    function(imageViewPrototype) {
        imageViewPrototype._fillType = null; // native does not store ImageFillType but ScaleType
        imageViewPrototype._image = null;
        Object.defineProperties(imageViewPrototype, {
            'image': {
                get: function() {
                    return this._image;
                },
                set: function(image) {
                    if (image instanceof Image) {
                        this._image = image;
                        this.nativeObject.setImageDrawable(image.nativeObject);
                    } else {
                        this._image = null;
                        this.nativeObject.setImageDrawable(null);
                    }
                },
                enumerable: true
            },
            'imageFillType': {
                get: function() {
                    return this._fillType;
                },
                set: function(fillType) {
                    if (!(fillType in ImageFillTypeDic)){
                        fillType = ImageView.FillType.NORMAL;
                    }
                    this._fillType = fillType
                    this.nativeObject.setScaleType(ImageFillTypeDic[this._fillType]);
                },
                enumerable: true
            }
        });
        
        imageViewPrototype.toString = function() {
            return 'ImageView';
        };
        
        imageViewPrototype.loadFromUrl = function(url, placeHolder){
            const NativePicasso = requireClass("com.squareup.picasso.Picasso");
            if(TypeUtil.isString(url)){
                if(placeHolder instanceof Image){
                    NativePicasso.with(AndroidConfig.activity).load(url).placeholder(placeHolder.nativeObject).into(this.nativeObject);
                }
                else{
                     NativePicasso.with(AndroidConfig.activity).load(url).into(this.nativeObject);
                }
            }
        };
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