const NativeBitmapFactory  = requireClass("android.graphics.BitmapFactory");
const NativeBitmapDrawable = requireClass("android.graphics.drawable.BitmapDrawable");
const NativeBitmap = requireClass("android.graphics.Bitmap");
const NativeMatrix = requireClass("android.graphics.Matrix");
const NativeByteArrayOutputStream = requireClass("java.io.ByteArrayOutputStream");
const NativeByteArrayInputStream = requireClass("java.io.ByteArrayInputStream");

const CompressFormat = [
    NativeBitmap.CompressFormat.JPEG,
    NativeBitmap.CompressFormat.PNG
];

function Image (params) {
    var self = this;
    var androidResources = Android.getActivity().getResources();
    if (params) {
        if(params.length == 1) {
            var bitmap = NativeBitmapFactory.decodeFile(params[0]);
            self.nativeObject = new NativeBitmapDrawable(androidResources, bitmap);
        }
        else if(params.length == 2) {
            self.nativeObject = new NativeBitmapDrawable(androidResources, params[1]);
        }
    }
    
    // todo Return UI.Blob after Blob implementation 
    var _blob = null;
    Object.defineProperty(this, 'blob', {
        get: function() {
            return _blob;
        }, 
        enumerable: true
    });
    
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
        var success = true;
        try {
            var originalBitmap = self.nativeObject.getBitmap();
            var newBitmap = NativeBitmap.createScaledBitmap(originalBitmap, width, height, false);   
        }
        catch(err) {
            success = false;
            if(onFailure) 
                onFailure.call(this, {message: err});
            else 
                return null;
        }
        if(success) {
            if(onSuccess)
                onSuccess.call(this, {image: new Image(["-resize", newBitmap])});
            else
                return (new Image(["-resize", newBitmap]));
        }
    };
    
    this.crop = function(x, y, width, height, onSuccess, onFailure) {
        var success = true;
        try {
            var originalBitmap = self.nativeObject.getBitmap();
            var newBitmap = NativeBitmap.createBitmap(originalBitmap, x, y, width, height);
        }
        catch(err) {
            success = false;
            if(onFailure) 
                onFailure.call(this, {message: err});
            else 
                return null;
        }
        if(success) {
            if(onSuccess)
                onSuccess.call(this, {image: new Image(["-crop", newBitmap])});
            else
                return (new Image(["-crop", newBitmap]));
        }
    };
    
    this.rotate = function(angle, onSuccess, onFailure) {
        var success = true;
        try {
            var matrix = new NativeMatrix();
            matrix.postRotate(angle);
            var bitmap = self.nativeObject.getBitmap();
            var width = bitmap.getWidth(), height = bitmap.getHeight();
            var newBitmap = NativeBitmap.createBitmap(bitmap, 0, 0, width, height, matrix, true);   
        }
        catch(err) {
            success = false;
            if(onFailure) 
                onFailure.call(this, {message: err});
            else 
                return null;
        }
        if(success) {
            if(onSuccess)
                onSuccess.call(this, {image: new Image(["-rotate", newBitmap])});
            else
                return (new Image(["-rotate", newBitmap]));
        }
    };
    
    this.compress = function(format, quality, onSuccess, onFailure) {
        var success = true;
        try {
            var out = new NativeByteArrayOutputStream();
            var bitmap = self.nativeObject.getBitmap();
            bitmap.compress(CompressFormat[format], quality, out);
            var byteArray = out.toByteArray();
            var inputStream = new NativeByteArrayInputStream(byteArray);
            var newBitmap = NativeBitmapFactory.decodeStream(inputStream);
        }
        catch(err) {
            success = false;
            if(onFailure) 
                onFailure.call(this, {message: err});
            else 
                return null;
        }
        if(success) {
            if(onSuccess)
                onSuccess.call(this, {image: new Image(["-compress", newBitmap])});
            else
                return (new Image(["-compress", newBitmap]));
        }
        // todo Return Blob instance after blob implementation
    };
}

Image.createFromFile = function(path) {
    return (new Image([path]));
};

Image.createFromBlob = function(blob) {
    // todo Implement this method after Blob implementation 
};

module.exports = Image;