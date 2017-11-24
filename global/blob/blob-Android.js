const Base64Util = require("../..//util/base64");

const NativeByteArrayOutputStream = requireClass("java.io.ByteArrayOutputStream");

function Blob(parts, properties) {
    var self = this;
    var _type = null;
    if (parts && properties && properties.type) {
        _type = properties.type;
        
        self.nativeObject = new NativeByteArrayOutputStream();
        self.nativeObject.write(parts);
    }

    Object.defineProperty(this, 'type', {
        get: function() {
            return _type;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'size', {
        get: function() {
            return self.nativeObject && arrayLength(self.nativeObject.toByteArray());
        },
        enumerable: true
    });

    this.slice = function(start, end, type) {
        var newBlob = new Blob();
        var byteArray = self.nativeObject.toByteArray();
        newBlob.nativeObject.write(byteArray, arrayLength(byteArray) - start, end - start); //  write(byte[] b, int off, int len)
        return newBlob;
    };

    this.toBase64 = function() {
        const NativeBase64 = requireClass("android.util.Base64");
        var byteArray = self.nativeObject.toByteArray();
        var encodedString = NativeBase64.encodeToString(byteArray, NativeBase64.DEFAULT);
        return encodedString;
    };

    this.toString = function() {
        return this.nativeObject.toString();
    };
}

/** @todo 
 * Error: Attempt to invoke virtual method 'int io.smartface.ExposingEngine.FastArray.size()' on a null object reference
 */
Blob.createFromBase64 = function(base64String) {
    const NativeBase64 = requireClass("android.util.Base64");
    var byteArray = NativeBase64.decode(base64String, NativeBase64.DEFAULT);
    var newBlob = new Blob(byteArray, { type: "image" });
    return newBlob;
};

Blob.createFromUTF8String = function(str) { // utf string or string
    var utf8Array = Base64Util.StrToUtf8Array(str);
    return new Blob(array(utf8Array, "byte"), { type: "text" });
};

module.exports = Blob;