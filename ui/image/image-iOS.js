const TypeUtil = require("nf-core/util/type");
const Blob = require('nf-core/global/blob');

function Image(params) {
    var self = this;
    
    if (params.path){
        self.nativeObject = new UIImage(params.path);
    }else if (params.name){
        self.nativeObject = new UIImage.createName(params.name);
    }else if (params.blob){
        self.nativeObject = UIImage.createNSData(params.blob.nativeObject);
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
          return  false
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
          return  false
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
          return  false
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
          return  false
      },
      writable: false
    });
    
}

Image.createFromFile = function(path) { 
    return new Image({"path": path});
}

Image.createFromName = function(name) { 
    return new Image({"name": name});
}

Image.createFromImage = function(image) { 
    return new Image({"image": image});
}

Image.createFromBlob = function(blob) {
     return new Image({"blob": blob});
}

module.exports = Image;
