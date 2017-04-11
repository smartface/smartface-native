const File = require('sf-core/io/file');
const TypeUtil = require("sf-core/util/type");
const Blob = require('sf-core/blob');

const Format = {
    JPEG: 0,
    PNG: 1
};

function Image(params) {
    var self = this;
    
    if (params.path){
      if (params.path.includes(".app")) {
        // Publish project image caching. 
        // For using [UIImage imageNamed:] function.
        var array = params.path.split("/");
        var fileName = array.pop();
        self.nativeObject = __SF_UIImage.createName(fileName);
      } else {
        self.nativeObject = new __SF_UIImage(params.path);
      }        
    }else if (params.name){
        self.nativeObject = new __SF_UIImage.createName(params.name);
    }else if (params.blob){
        self.nativeObject = __SF_UIImage.createNSData(params.blob.nativeObject);
    }else if (params.image){
        self.nativeObject = params.image;
    }

    Object.defineProperty(self, 'height', {
      value: self.nativeObject.size.height,
      writable: false
    });

    Object.defineProperty(self, 'width', {
      value: self.nativeObject.size.width,
      writable: false
    });

    Object.defineProperty(self, 'resize', {
      value: function(width, height, onSuccess, onFailure){
          if (TypeUtil.isNumeric(width) && TypeUtil.isNumeric(height)){
              var resizeImage = new Image.createFromImage(self.nativeObject.resizeImage({width : width, height : height}));
              if (onSuccess) {
                  onSuccess({"image" : resizeImage});
              }
              return resizeImage;
          }
          
          if (onFailure) {
              onFailure();
          }
          return  false;
      },
      writable: false
    });
    
    Object.defineProperty(self, 'crop', {
      value: function(x, y, width, height, onSuccess, onFailure){
          if (TypeUtil.isNumeric(width) && TypeUtil.isNumeric(height) && TypeUtil.isNumeric(x) && TypeUtil.isNumeric(y)){
              var resizeImage = new Image.createFromImage(self.nativeObject.cropToBounds({x : x, y : y, width : width, height : height}));
              if (onSuccess) {
                  onSuccess({"image" : resizeImage});
              }
              return resizeImage;
          }
          
          if (onFailure) {
              onFailure();
          }
          return  false;
      },
      writable: false
    });
    
    Object.defineProperty(self, 'rotate', {
      value: function(angle, onSuccess, onFailure){
          if (TypeUtil.isNumeric(angle)){
              var resizeImage = new Image.createFromImage(self.nativeObject.imageRotatedByDegrees(angle,false));
              if (onSuccess) {
                  onSuccess({"image" : resizeImage});
              }
              return resizeImage;
          }
          
          if (onFailure) {
              onFailure();
          }
          return  false;
      },
      writable: false
    });
    
    Object.defineProperty(self, 'compress', {
      value: function(format, quality, onSuccess, onFailure){
          if (TypeUtil.isNumeric(quality)){
              var blob = new Blob(self.nativeObject.compress(format,quality/100));
              if (onSuccess) {
                  onSuccess({"blob" : blob});
              }
              return blob;
          }
          
          if (onFailure) {
              onFailure();
          }
          return  false;
      },
      writable: false
    });
    
}

Image.createFromFile = function(path) {
  var imageFile = new File({path:path});
  var retval;
  if (typeof imageFile.nativeObject.getActualPath() === 'undefined') {
    retval = null;
  } else {
    retval = new Image({"path": imageFile.nativeObject.getActualPath()});
  }
  return retval;
};

Image.createFromName = function(name) { 
    return new Image({"name": name});
};

Image.createFromImage = function(image) { 
    return new Image({"image": image});
};

Image.createFromBlob = function(blob) {
     return new Image({"blob": blob});
};

Object.defineProperty(Image, 'Format', {
    value: Format,
    writable: false,
    enumerable: true
});

module.exports = Image;
