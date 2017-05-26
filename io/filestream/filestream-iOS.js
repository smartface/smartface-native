const Blob = require('sf-core/global/blob');

FileStream.create = function(path, streamMode, contentMode){
    var streamModeValue = 0;
    if(typeof streamMode === 'number'){
        streamModeValue = streamMode;
    }
    
    var contentModeValue = 0;
    if(typeof contentMode === 'number'){
        contentModeValue = contentMode;
    }

    var fileStreamInstance = new FileStream();
    fileStreamInstance.nativeObject = __SF_FileStream.createWithPathWithStreamModeWithContentMode(path, streamModeValue, contentModeValue);
    return fileStreamInstance;
};

function FileStream(params) {
    var self = this;
    
    Object.defineProperties(this, {
        'mode': {
            get: function(){
                return self.nativeObject.streamMode;
            },
        },
        'contentMode': {
            get: function(){
                return self.nativeObject.contentMode;
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
        'offset': {
            get: function(){
                return self.nativeObject.offset;
            },
            set: function(offsetValue){
                if(typeof offsetValue === 'number'){
                    self.nativeObject.offset = offsetValue;
                }
            }
        },
    });
    
    this.close = function(){
        return self.nativeObject.closeFile();
    };
    
    this.readBlob = function(){
        return new Blob(self.nativeObject.getBlob());
    };
    
    this.readToEnd = function(){
        var retval = self.nativeObject.readToEnd(); //It will return string or nsdata depends on content mode.
        if (self.contentMode === FileStream.ContentMode.BINARY) {
            var blobObject = new Blob(retval);
            retval = blobObject;
        }
        return retval;
    };
    
    this.write = function(content){
        var retval = null;
        switch (self.contentMode) {
            case FileStream.ContentMode.TEXT:
                retval = self.nativeObject.writeString(content);
                break;
            case FileStream.ContentMode.BINARY:
                retval = self.nativeObject.writeBinary(content.nativeObject);
                break;
            default:
                break;
        }
        return retval;
    };
    
    this.seekToEnd = function(){
        return self.nativeObject.seekToEnd();
    }
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

//////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////

FileStream.ContentMode = {};

Object.defineProperty(FileStream.ContentMode, 'TEXT', {
    value: 0,
    writable: false
});
Object.defineProperty(FileStream.ContentMode, 'BINARY', {
    value: 1,
    writable: false
});

module.exports = FileStream;