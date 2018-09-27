const extend = require('js-base/core/extend');
const View = require('../view');
const Image = require("sf-core/ui/image");
const ImageCacheType = require('sf-core/ui/imagecachetype');

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
                if (typeof value === "string") {
                    var image = Image.createFromFile(value);
                    self.nativeObject.loadImage(image.nativeObject);
                } else {
                    if (value) {
                        self.nativeObject.loadImage(value.nativeObject);
                    }else{
                        self.nativeObject.loadImage(undefined);
                    }
                }
            },
            enumerable: true
        });
        
        self.loadFromFile = function(params){
            if (params.file) {
                var file = params.file;
                var filePath = file.nativeObject.getActualPath();
                var image = Image.createFromFile(filePath);
                
                var fade = true;
                if (typeof params.fade === "boolean") {
                    fade = params.fade;
                }
                
                if (fade) {
                    self.nativeObject.loadImage(image.nativeObject);
    				var alpha = self.nativeObject.alpha;
    				self.nativeObject.alpha = 0;
                    __SF_UIView.animation(0.3,0,function(){
                       self.nativeObject.alpha = alpha; 
                    }.bind(this),function(){});
                } else {
                    self.nativeObject.loadImage(image.nativeObject);
                }
            }
        }
        
        self.loadFromUrl = function(url,placeholder,fade){
        	if (fade === false) {
        		self.nativeObject.loadFromURL(__SF_NSURL.URLWithString(url),placeholder ? placeholder.nativeObject : undefined,undefined);
        	}else{
				self.nativeObject.loadFromURL(__SF_NSURL.URLWithString(url),placeholder ? placeholder.nativeObject : undefined,function(image,error,cache,url){
					if (!error) {
						this.nativeObject.loadImage(image);
						if (cache == ImageCacheType.NONE) {
							var alpha = this.nativeObject.alpha;
							this.nativeObject.alpha = 0;
			                __SF_UIView.animation(0.3,0,function(){
			                   this.nativeObject.alpha = alpha; 
			                }.bind(this),function(){});
						}
					}
				}.bind(self));
        	}
        }
        
        self.fetchFromUrl = function(object){
			self.nativeObject.loadFromURL(__SF_NSURL.URLWithString(object.url),object.placeholder ? object.placeholder.nativeObject : undefined,function(onSuccess,onError,image,error,cache,url){
				if (!error) {
					if (typeof onSuccess === "function") {
					    __SF_Dispatch.mainAsync(function(innerIndex){
						    onSuccess(Image.createFromImage(image),cache);
					    });
					}
				}else{
					if (typeof onError === "function") {
					    __SF_Dispatch.mainAsync(function(innerIndex){
						    onError();
					    });
					}
				}
			}.bind(self,object.onSuccess,object.onError));
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
    'ASPECTFILL':{
        value: 2,
        enumerable: true
    },
    'ios':{
        value: {},
        enumerable: true
    },
    'android':{
        value: {},
        enumerable: true
    }
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