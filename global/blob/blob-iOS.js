function Blob(parts, properties) {
    var self = this;
    if (!self.nativeObject) {
        self.nativeObject = parts;
    }

    Object.defineProperty(self, 'size', {
        value: self.nativeObject.length,
        writable: false
    });

    self.toBase64 = function() {
        return self.nativeObject.toBase64();
    }

    self.toString = function() {
        return self.nativeObject.toUtf8();
    }

    self.toBase64Async = function(callbacks){
        var onComplete = callbacks.onComplete;
        var onFailure = callbacks.onFailure;
        self.nativeObject.toBase64Async(function(base64){
            if (base64){
                if (typeof onComplete == 'function') {
                    onComplete(base64);
                }
            }else{
                if (typeof onFailure == 'function') {
                    onFailure(base64);
                }
            }
        });
    }
}

Blob.__base64AddPadding = function(str) {
    return str + Array((4 - str.length % 4) % 4 + 1).join('=');
}

Blob.createFromBase64 = function(base64) {
    return new Blob(__SF_NSData.base64Encoded(Blob.__base64AddPadding(base64)));
}

Blob.createFromUTF8String = function(utf8String) {
    return new Blob(__SF_NSData.dataFromUTF8String(utf8String));
}

module.exports = Blob;