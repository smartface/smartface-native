const extend = require('js-base/core/extend');
const View = require('../view');
const Image = require("sf-core/ui/image");


const FillType = { 
    NORMAL: 0,
    STRETCH: 1,
    ASPECTFIT: 2
};

FillType.ios = {
    REDRAW: 3,
    MIDCENTER: 4,
    TOPCENTER: 5,
    BOTTOMCENTER: 6,
    MIDLEFT: 7,
    MIDRIGHT: 8,
    TOPLEFT: 9,
    TOPRIGHT: 10,
    BOTTOMLEFT: 11,
    BOTTOMRIGHT: 12
};

const ImageView = extend(View)(
     function (_super, params) {
        var self = this;
        
        if(!self.nativeObject){
            self.nativeObject = new __SF_UIImageView();
        }
        
        _super(this);
             
        //defaults
        self.nativeObject.contentMode = FillType.ios.MIDCENTER;
        self.touchEnabled = true;
         
        Object.defineProperty(self, 'image', {
            get: function() {
                return Image.createFromImage(self.nativeObject.image);
            },
            set: function(value) {
                if (value) {
                    self.nativeObject.loadImage(value.nativeObject);
                }
            },
            enumerable: true
        });
        
        self.loadFromUrl = function(url, placeHolder){
            if (placeHolder){
                self.nativeObject.loadFromURL(__SF_NSURL.URLWithString(url),placeHolder.nativeObject);
            }else{
                self.nativeObject.loadFromURL(__SF_NSURL.URLWithString(url));
            }
        };
        
        Object.defineProperty(self, 'imageFillType', {
            get: function() {
                return self.nativeObject.contentMode;
            },
            set: function(value) {
                self.nativeObject.contentMode = value;
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

Object.defineProperty(ImageView, "FillType",{
    value: {},
    enumerable: true
});

Object.defineProperties(ImageView.FillType,{
    'NORMAL':{
        value: 4,
        enumerable: true
    },
    'STRETCH':{
        value: 0,
        enumerable: true
    },
    'ASPECTFIT':{
        value: 1,
        enumerable: true
    },
    'ios':{
        value: {},
        enumerable: true
    },
});
Object.defineProperties(ImageView.FillType.ios,{
    'MIDCENTER':{
        value: 4,
        enumerable: true
    },
    'TOPCENTER':{
        value: 5,
        enumerable: true
    },
    'BOTTOMCENTER':{
        value: 6,
        enumerable: true
    },
    'MIDLEFT':{
        value: 7,
        enumerable: true
    },
    'MIDRIGHT':{
        value: 8,
        enumerable: true
    },
    'TOPLEFT':{
        value: 9,
        enumerable: true
    },
    'TOPRIGHT':{
        value: 10,
        enumerable: true
    },
    'BOTTOMLEFT':{
        value: 11,
        enumerable: true
    },
    'BOTTOMRIGHT':{
        value: 12,
        enumerable: true
    }
});

module.exports = ImageView;