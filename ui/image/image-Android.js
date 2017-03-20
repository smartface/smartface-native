const NativeBitmapFactory  = requireClass("android.graphics.BitmapFactory");
const NativeBitmapDrawable = requireClass("android.graphics.drawable.BitmapDrawable");
const NativeBitmap = requireClass("android.graphics.Bitmap");
const NativeMatrix = requireClass("android.graphics.Matrix");
const NativeByteArrayOutputStream = requireClass("java.io.ByteArrayOutputStream");

const Blob = require('nf-core/blob');
const File = require('nf-core/io/file');
const Path = require("nf-core/io/path");

const CompressFormat = [
    NativeBitmap.CompressFormat.JPEG,
    NativeBitmap.CompressFormat.PNG
];

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

const Format = {
    JPEG: 0,
    PNG: 1
};

function Image (params) {
    var self = this;
    var androidResources = Android.getActivity().getResources();
    if (params) {
        if(params.bitmap){
            self.nativeObject = new NativeBitmapDrawable(androidResources, params.bitmap);
        }
        else if(params.path){
            var bitmap = NativeBitmapFactory.decodeFile(params.path);
            self.nativeObject = new NativeBitmapDrawable(androidResources, bitmap);
        }
        else{
            throw new Error("path or bitmap can not be empty for Image!");
        }
    }
    else{
        throw new Error("Constructor parameters needed for Image!");
    }
    
    Object.defineProperty(this, 'height', {
        get: function() {
            return self.nativeObject.getBitmap().getHeight();
        }, 
        enumerable: true
    });

    Object.defineProperty(this, 'width', {
        get: function() {
            return self.nativeObject.getBitmap().getWidth();
        }, 
        enumerable: true
    });
    
    this.resize = function(width, height, onSuccess, onFailure){
        try {
            var originalBitmap = self.nativeObject.getBitmap();
            var newBitmap = NativeBitmap.createScaledBitmap(originalBitmap, width, height, false);  
            if(onSuccess)
                onSuccess({image: new Image({bitmap: newBitmap})});
            else
                return (new Image({bitmap: newBitmap})); 
        }
        catch(err) {
            if(onFailure) 
                onFailure({message: err});
            else 
                return null;
        }
    };
    
    this.crop = function(x, y, width, height, onSuccess, onFailure) {
        try {
            var originalBitmap = self.nativeObject.getBitmap();
            var newBitmap = NativeBitmap.createBitmap(originalBitmap, x, y, width, height);
            
            if(onSuccess)
                onSuccess.call(this, {image: new Image({bitmap: newBitmap})});
            else
                return (new Image({bitmap: newBitmap}));
        }
        catch(err) {
            if(onFailure) 
                onFailure.call(this, {message: err});
            else 
                return null;
        }
    };
    
    this.rotate = function(angle, onSuccess, onFailure) {
        try {
            var matrix = new NativeMatrix();
            matrix.postRotate(angle);
            var bitmap = self.nativeObject.getBitmap();
            var width = bitmap.getWidth(), height = bitmap.getHeight();
            var newBitmap = NativeBitmap.createBitmap(bitmap, 0, 0, width, height, matrix, true);  
            
            if(onSuccess)
                onSuccess.call(this, {image: new Image({bitmap: newBitmap})});
            else
                return (new Image({bitmap: newBitmap}));
        }
        catch(err) {
            if(onFailure) 
                onFailure.call(this, {message: err});
            else 
                return null;
        }
    };
    
    this.compress = function(format, quality, onSuccess, onFailure) {
        try {
            var out = new NativeByteArrayOutputStream();
            var bitmap = self.nativeObject.getBitmap();
            bitmap.compress(CompressFormat[format], quality, out);
            var byteArray = out.toByteArray();
            
            if(onSuccess) 
                onSuccess.call(this, {blob: new Blob(byteArray, {type:"image"})});
            else 
                return (new Blob(byteArray, {type:"image"}));
        }
        catch(err) {
            if(onFailure) 
                onFailure.call(this, {message: err});
            else 
                return null;
        }
    };
}

Image.createFromFile = function(path) {
    var imageFile = new File({path:path});
    if(imageFile.nativeObject){
        var bitmap;
        if(imageFile.type == Path.FILE_TYPE.ASSET){
            var assetsInputStream = Android.getActivity().getAssets().open(imageFile.nativeObject);
            bitmap = NativeBitmapFactory.decodeStream(assetsInputStream);
            assetsInputStream.close();
        }
        else if(imageFile.type == Path.FILE_TYPE.DRAWABLE){
            bitmap = imageFile.nativeObject;
        }
        else{
            bitmap = NativeBitmapFactory.decodeFile(imageFile.fullPath);
        }
        return (new Image({bitmap: bitmap}));
    }
    return null;
};

Image.createFromBlob = function(blob) {
    var byteArray = blob.nativeObject.toByteArray();
    var size = blob.nativeObject.size();
    var newBitmap = NativeBitmapFactory.decodeByteArray(byteArray, 0, size);
    if(newBitmap)
        return (new Image({bitmap: newBitmap}));
    return null;
};

Object.defineProperty(Image, 'FillType', {
    value: FillType,
    writable: false,
    enumerable: true
});

Object.defineProperty(Image, 'Format', {
    value: Format,
    writable: false,
    enumerable: true
});

module.exports = Image;