FileStream.create = function(path, mode){
    var modeValue = 0;
    if(typeof mode === 'number'){
        modeValue = mode;
    }

    var fileStreamInstance = new FileStream();
    fileStreamInstance.nativeObject = __SF_FileStream.createWithPathWithMode(path, modeValue);
    return fileStreamInstance;
};

function FileStream(params) {
    var self = this;
    
    Object.defineProperties(this, {
        'mode': {
            get: function(){
                return self.nativeObject.mode;
            },
        },
        'isReadable': {
            get: function(){
                return self.nativeObject.isReadable();
            },
        },
        'isWritable': {
            get: function(){
                return self.nativeObject.isWritable();
            },
        },
        'name': {
            get: function(){
                return self.nativeObject.getName();
            },
        },
        'path': {
            get: function(){
                return self.nativeObject.getPath();
            },
        },
    });
    
    this.close = function(){
        return self.nativeObject.closeFile();
    };
    
    this.readBlob = function(){
        return self.nativeObject.getBlob();
    };
    
    this.readToEnd = function(){
        return self.nativeObject.readToEnd();
    };
    
    this.write = function(text){
        return self.nativeObject.write(text);
    };
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

FileStream.StreamType = {};

Object.defineProperty(FileStream.StreamType, 'APPEND', {
    value: 0,
    writable: false
});
Object.defineProperty(FileStream.StreamType, 'READ', {
    value: 1,
    writable: false
});
Object.defineProperty(FileStream.StreamType, 'WRITE', {
    value: 2,
    writable: false
});

module.exports = FileStream;