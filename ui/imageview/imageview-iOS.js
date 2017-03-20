const extend = require('js-base/core/extend');
const View = require('../view');
const Image = require("nf-core/ui/image");
const ImageView = require("nf-core/ui/imageview");

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
            self.nativeObject = new SMFUIImageView();
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
                self.nativeObject.loadFromURL(NSURL.URLWithString(url),placeHolder.nativeObject);
            }else{
                self.nativeObject.loadFromURL(NSURL.URLWithString(url));
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

Object.defineProperty(Image, 'FillType', {
    value: FillType,
    writable: false,
    enumerable: true
});

module.exports = ImageView;