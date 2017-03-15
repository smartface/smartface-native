function Blob(parts, properties) {
        var self = this;
        if(!self.nativeObject){
            self.nativeObject = parts;
        }
        
        Object.defineProperty(self, 'size', {
          value: self.nativeObject.length,
          writable: false
        });
}

module.exports = Blob;