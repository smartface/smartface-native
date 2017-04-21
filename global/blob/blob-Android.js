const NativeByteArrayOutputStream = requireClass("java.io.ByteArrayOutputStream");

function Blob (parts, properties) {
    var self = this;
    var _type = null;
    if(parts && properties && properties.type) {
        _type = properties.type;
        self.nativeObject = new NativeByteArrayOutputStream();
        self.nativeObject.write(parts, 0, parts.length);
    }
    
    Object.defineProperty(this, 'type', {
        get: function() {
            return _type;
        },
        enumerable: true
    });
    
    
    Object.defineProperty(this, 'size', {
        get: function() {
            return self.nativeObject && self.nativeObject.toByteArray().length;
        },
        enumerable: true
    });
    
    this.slice = function(start, end, type) {
        var newBlob = new Blob();
        var byteArray = self.nativeObject.toByteArray(); 
        newBlob.nativeObject.write(byteArray, byteArray.length - start, end-start); //  write(byte[] b, int off, int len)
        return newBlob;
    };
    
    this.toBase64 = function() {
        const NativeBase64 = requireClass("android.util.Base64");
        var byteArray = self.nativeObject.toByteArray();
        var encodedString = NativeBase64.encodeToString(byteArray, 0, byteArray.length, NativeBase64.DEFAULT);
        return encodedString;
    };
    
    this.toString = function() {
        const NativeString = requireClass("java.lang.String");
        var stringFormat = new NativeString(this.nativeObject.toByteArray());
        return stringFormat.substring(0);
    }
}

Blob.createFromBase64 = function(base64String) {
    const NativeBase64 = requireClass("android.util.Base64");
    var byteArray = NativeBase64.decode(base64String, NativeBase64.DEFAULT);
    var newBlob = new Blob(byteArray, {type:"image"});
    return newBlob;
};

module.exports = Blob;