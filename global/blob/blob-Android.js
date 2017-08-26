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
    
    /** @todo check this for 
     *      java.lang.NullPointerException: Attempt to invoke virtual method 'java.lang.Class java.lang.Object.getClass()' on a null object reference
     *      System.err  W  at io.smartface.ExposingEngine.JsObjectConversions.ToArray(JsObjectConversions.java:97) 
     */
    this.toBase64 = function() {
        const NativeBase64 = requireClass("android.util.Base64");
        return string(NativeBase64.encodeToString(array(_parts), int(0), int(_parts.length), NativeBase64.DEFAULT));
    };
    
    this.toString = function() {
        return Base64Util.Utf8ArrayToStr(_parts);
    }
}

Blob.createFromBase64 = function(base64String) {
    const NativeBase64 = requireClass("android.util.Base64");
    var byteArray = array(NativeBase64.decode(string(base64String), NativeBase64.DEFAULT));
    var newBlob = new Blob(byteArray, {type:"image"});
    return newBlob;
};


module.exports = Blob;