const Base64Util = require("sf-core/util/base64");

function Blob (parts, properties) {
    var _type = null;
    var _parts = null;
    if(parts && properties && properties.type) {
        _type = properties.type;
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
            return _parts ? _parts.length : null;
        },
        enumerable: true
    });
    
    this.slice = function(start, end, type) {
        return new Blob(_parts.slice(start, end), {type : type });
    };
    
    this.toBase64 = function() {
        const NativeBase64 = requireClass("android.util.Base64");
        var encodedString = NativeBase64.encodeToString(_parts, 0, _parts.length, NativeBase64.DEFAULT);
        return encodedString;
    };
    
    this.toString = function() {
        return Base64Util.Utf8ArrayToStr( _parts);
    }
}

Blob.createFromBase64 = function(base64String) {
    const NativeBase64 = requireClass("android.util.Base64");
    var byteArray = NativeBase64.decode(base64String, NativeBase64.DEFAULT);
    var newBlob = new Blob(byteArray, {type:"image"});
    return newBlob;
};

Blob.createFromUTF8String = function(str) { // utf string or string
    var utf8Array = Base64Util.StrToUtf8Array(str);
    return new Blob(utf8Array, {type: "text"});
}

module.exports = Blob;