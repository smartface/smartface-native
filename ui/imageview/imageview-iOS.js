const extend = require('js-base/core/extend');
const View = require('../view');
const ImageFillType = require('sf-core/ui/imagefilltype');

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
}

const ImageView = extend(View)(
     function (_super, params) {
        var self = this;
        
        if(!self.nativeObject){
            self.nativeObject = new SMFUIImageView();
        }
        
        _super(this);
             
        //defaults
         self.nativeObject.contentMode = UIViewContentMode.center;
          
        Object.defineProperty(self, 'image', {
            get: function() {
                return 0;// Image Path or JS Image Object ?
            },
            set: function(value) {
                self.nativeObject.image = value;
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'imageFillType', {
            get: function() {
               var returnValue = null;
                
               switch(self.nativeObject.contentMode) {
                    case  UIViewContentMode.center:
                        returnValue = ImageFillType.NORMAL;
                        break;
                    case UIViewContentMode.scaleToFill:
                        returnValue = ImageFillType.STRETCH;
                        break;
                    case UIViewContentMode.scaleAspectFit:
                        returnValue = ImageFillType.ASPECTFIT;
                    break;
                    default:
                        returnValue = null;
                }
                return returnValue;
            },
            set: function(value) {
                switch(value) {
                    case ImageFillType.NORMAL:
                        self.nativeObject.contentMode = UIViewContentMode.center;
                        break;
                    case ImageFillType.STRETCH:
                        self.nativeObject.contentMode = UIViewContentMode.scaleToFill;
                        break;
                    case ImageFillType.ASPECTFIT:
                        self.nativeObject.contentMode = UIViewContentMode.scaleAspectFit;
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

module.exports = ImageView;