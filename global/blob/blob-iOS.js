function Blob(parts, properties) {
        var self = this;
        if(!self.nativeObject){
            self.nativeObject = parts;
        }
        
        Object.defineProperty(self, 'size', {
          value: self.nativeObject.length,
          writable: false
        });
        
        self.toBase64 = function(){
            return self.nativeObject.toBase64();
        }
        
        self.toString = function() {
            return self.nativeObject.toUtf8();
        }
    
}

Blob.createFromBase64 = function(base64) {
     return new Blob(__SF_NSData.base64Encoded(base64));;
}

module.exports = Blob;