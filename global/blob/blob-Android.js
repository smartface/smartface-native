const NativeByteArrayOutputStream = requireClass("java.io.ByteArrayOutputStream");

function Blob (parts, properties) {
    var self = this;
    var _type = null;
    var _parts = [];
    if(parts && properties.type) {
        _parts = parts;
        _type = properties.type;
        self.nativeObject = new NativeByteArrayOutputStream();
        self.nativeObject.write(parts, 0, parts.length);
    }
    else{
        throw "Part and Type can not be empty for Blob!";
    }
    
    Object.defineProperty(this, 'type', {
        get: function() {
            return _type;
        },
        enumerable: true
    });
    
    var _size = 0;
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
}

module.exports = Blob;