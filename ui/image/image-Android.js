const NativeBitmapFactory  = requireClass("android.graphics.BitmapFactory");
const NativeBitmapDrawable = requireClass("android.graphics.drawable.BitmapDrawable");
const NativeBitmap = requireClass("android.graphics.Bitmap");
const NativeMatrix = requireClass("android.graphics.Matrix");

function Image (params) {
    console.log("params " + params);
    var self = this;
    var androidResources = Android.getActivity().getResources();
    if (params != undefined) {
        if(params.length == 1) {
            var bitmap = NativeBitmapFactory.decodeFile(params[0]);
            _imageUri = params[0];
            self.nativeObject = new NativeBitmapDrawable(androidResources, bitmap);
        }
        else if(params.length == 2) {
            self.nativeObject = new NativeBitmapDrawable(androidResources, params[1]);
        }
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
    var _imageUri = null;
    Object.defineProperty(this, 'imageUri', {
        get: function() {
            return _imageUri;
        }, 
        enumerable: true
    });
    
    this.resize = function(width, height){
        console.log("Bitmap " + (self.nativeObject.getBitmap()) + " W " + width + " H " + height);
        var originalBitmap = self.nativeObject.getBitmap();
        var newBitmap = NativeBitmap.createScaledBitmap(originalBitmap, width, height, false);
        return (new Image(["-resize", newBitmap]));
    };
    
    this.crop = function(x, y, width, height) {
        // todo Add parameter controls
        var originalBitmap = self.nativeObject.getBitmap();
        var newBitmap = NativeBitmap.createBitmap(originalBitmap, x, y, width, height);
        return (new Image(["-crop", newBitmap]));
    }
    
    this.rotate = function(angle) {
        //  todo Add parameter controls
        var matrix = new NativeMatrix();
        matrix.postRotate(angle);
        var bitmap = self.nativeObject.getBitmap();
        var width = bitmap.getWidth(), height = bitmap.getHeight();
        var newBitmap = NativeBitmap.createBitmap(bitmap, 0, 0, width, height, matrix, true);
        return (new Image(["-rotate", newBitmap]));
    }
}

Image.createFromFile = function(path) {
    //var params = [path];
    return (new Image([path]));
};

module.exports = Image;