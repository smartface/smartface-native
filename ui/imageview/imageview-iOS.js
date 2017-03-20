const extend = require('js-base/core/extend');
const View = require('../view');
const Image = require("nf-core/ui/image");

const UIViewContentMode = {
    scaleToFill : 0,
    scaleAspectFit : 1, // contents scaled to fit with fixed aspect. remainder is transparent
    scaleAspectFill : 2, // contents scaled to fill with fixed aspect. some portion of content may be clipped.
    redraw : 3, // redraw on bounds change (calls -setNeedsDisplay)
    center : 4, // contents remain same size. positioned adjusted.
    top : 5,
    bottom : 6,
    left : 7,
    right : 8,
    topLeft : 9,
    topRight : 10,
    bottomLeft : 11,
    bottomRight : 12
};

const FillType = { 
    NORMAL: 0,
    STRETCH: 1,
    ASPECTFIT: 2,
    TOPLEFT: 3,
    TOPCENTER: 4,
    TOPRIGHT: 5,
    MIDLEFT: 6,
    MIDCENTER: 7,
    MIDRIGHT: 8,
    BOTTOMLEFT: 9,
    BOTTOMCENTER: 10,
    BOTTOMRIGHT: 11
};

const ImageView = extend(View)(
     function (_super, params) {
        var self = this;
        
        if(!self.nativeObject){
            self.nativeObject = new SMFUIImageView();
        }
        
        _super(this);
             
        //defaults
        self.nativeObject.contentMode = UIViewContentMode.center;
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
        }
        
        Object.defineProperty(self, 'imageFillType', {
            get: function() {
               var returnValue = null;
                
               switch(self.nativeObject.contentMode) {
                    case  UIViewContentMode.center:
                        returnValue = Image.FillType.NORMAL;
                        break;
                    case UIViewContentMode.scaleToFill:
                        returnValue = Image.FillType.STRETCH;
                        break;
                    case UIViewContentMode.scaleAspectFit:
                        returnValue = Image.FillType.ASPECTFIT;
                    break;
                    case UIViewContentMode.topLeft:
                        returnValue = Image.FillType.TOPLEFT;
                    break;
                    case UIViewContentMode.top:
                        returnValue = Image.FillType.TOPCENTER;
                    break;
                    case UIViewContentMode.topRight:
                        returnValue = Image.FillType.TOPRIGHT;
                    break;
                    case UIViewContentMode.left:
                        returnValue = Image.FillType.MIDLEFT;
                    break;
                    case UIViewContentMode.center:
                        returnValue = Image.FillType.MIDCENTER;
                    break;
                    case UIViewContentMode.right:
                        returnValue = Image.FillType.MIDRIGHT;
                    break;
                    case UIViewContentMode.bottomLeft:
                        returnValue = Image.FillType.BOTTOMLEFT;
                    break;
                    case UIViewContentMode.bottom:
                        returnValue = Image.FillType.BOTTOMCENTER;
                    break;
                    case UIViewContentMode.bottomRight:
                        returnValue = Image.FillType.BOTTOMRIGHT;
                    break;
                    default:
                        returnValue = null;
                }
                return returnValue;
            },
            set: function(value) {
                switch(value) {
                    case Image.FillType.NORMAL:
                        self.nativeObject.contentMode = UIViewContentMode.center;
                        break;
                    case Image.FillType.STRETCH:
                        self.nativeObject.contentMode = UIViewContentMode.scaleToFill;
                        break;
                    case Image.FillType.ASPECTFIT:
                        self.nativeObject.contentMode = UIViewContentMode.scaleAspectFit;
                        break;
                    case Image.FillType.TOPLEFT:
                        self.nativeObject.contentMode = UIViewContentMode.topLeft;
                    break;
                    case Image.FillType.TOPCENTER:
                        self.nativeObject.contentMode = UIViewContentMode.top;
                    break;
                    case Image.FillType.TOPRIGHT:
                        self.nativeObject.contentMode = UIViewContentMode.topRight;
                    break;
                    case Image.FillType.MIDLEFT:
                        self.nativeObject.contentMode = UIViewContentMode.left;
                    break;
                    case Image.FillType.MIDCENTER:
                        self.nativeObject.contentMode = UIViewContentMode.center;
                    break;
                    case Image.FillType.MIDRIGHT:
                        self.nativeObject.contentMode = UIViewContentMode.right;
                    break;
                    case Image.FillType.BOTTOMLEFT:
                        self.nativeObject.contentMode = UIViewContentMode.bottomLeft;
                    break;
                    case Image.FillType.BOTTOMCENTER:
                        self.nativeObject.contentMode = UIViewContentMode.bottom;
                    break;
                    case Image.FillType.BOTTOMRIGHT:
                        self.nativeObject.contentMode = UIViewContentMode.bottomRight;
                    break;
                    default:
                        self.nativeObject.contentMode = UIViewContentMode.center;
                }

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