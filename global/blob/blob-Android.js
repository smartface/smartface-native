const NativeByteArrayOutputStream = requireClass("java.io.ByteArrayOutputStream");

function Blob (parts, properties) {
    var self = this;
    var _type = null;
    var _parts = null;
    if(parts && properties && properties.type) {
        _type = properties.type;
        // self.nativeObject = new NativeByteArrayOutputStream();
        // self.nativeObject.write(parts, 0, parts.length);
        _parts = parts;
    }
    
    Object.defineProperty(this, 'type', {
        get: function() {
            return _type;
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'parts', {
        get: function() {
            return _parts;
        }
    });
    
    
    Object.defineProperty(this, 'size', {
        get: function() {
            return _parts && _parts.length;
        },
        enumerable: true
    });
    
    this.slice = function(start, end, type) {
        return new Blob(_parts.slice(start, end), {type : type });
    };
    
    this.toBase64 = function() {
        const NativeBase64 = requireClass("android.util.Base64");
        // var byteArray = self.nativeObject.toByteArray();
        var encodedString = NativeBase64.encodeToString(_parts, 0, _parts.length, NativeBase64.DEFAULT);
        return encodedString;
    };
    
    this.toString = function() {
        const NativeString = requireClass("java.lang.String");
        var stringFormat = new NativeString(_parts);
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