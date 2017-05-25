/* globals requireClass */
const File                  = require("sf-core/io/file");
const Path                  = require("sf-core/io/path");
const TypeUtil              = require("sf-core/util/type");
const Blob                  = require('sf-core/blob');

function FileStream(params) {
    var fileObject;
    var _streamType = params.streamType;
    var _contentMode = FileStream.ContentMode.hasValue(params.contentMode) ? params.contentMode : FileStream.ContentMode.TEXT;
    if(FileStream.StreamType.hasValue(params.streamType)){
        if(TypeUtil.isString(params.path)){
            fileObject = new File({path: params.path});
        }
        // must check instance of File but
        // instanceof check, but got #<Object>
        else if(params.source){
            fileObject = params.source;
        }
        else{
            throw new Error("File path must be string or source must be given");
        }
    }
    else{
        throw new Error("Mode must be FileStream.StreamType");
    }
    
    if(_streamType === FileStream.StreamType.APPEND){
        if(fileObject.type !== Path.FILE_TYPE.FILE){
            throw new Error("FileStream.StreamType.APPEND can be used for only files.");
        }
        const NativeBufferedOutputStream = requireClass("java.io.BufferedOutputStream");
        const NativeFileOutputStream = requireClass("java.io.FileOutputStream");
        const NativeOutputStreamWriter = requireClass("java.io.OutputStreamWriter");
        const NativeBufferedWriter = requireClass("java.io.BufferedWriter");
        
        if(_contentMode === FileStream.ContentMode.TEXT){
            var fileOutputStream = new NativeFileOutputStream(fileObject.nativeObject,true);
            var outputStreamWriter = new NativeOutputStreamWriter(fileOutputStream);
            this.nativeObject = new NativeBufferedWriter(outputStreamWriter);
        }
        else{
            var fileOutputStream = new NativeFileOutputStream(fileObject.nativeObject,true);
            this.nativeObject = new NativeBufferedOutputStream(fileOutputStream);
        }
    }
    else if(_streamType === FileStream.StreamType.READ){
        if(fileObject.type === Path.FILE_TYPE.ASSET){
            const NativeInputStreamReader = requireClass("java.io.InputStreamReader");
            const NativeBufferedReader = requireClass("java.io.BufferedReader");
            const NativeBufferedInputStream = requireClass("java.io.BufferedInputStream");
            
            var assetsStreamObject = Android.getActivity().getAssets().open(fileObject.nativeObject);
            if(_contentMode === FileStream.ContentMode.TEXT){
                var inputStreamReader = new NativeInputStreamReader(assetsStreamObject);
                this.nativeObject = new NativeBufferedReader(inputStreamReader);
            }
            else{
                this.nativeObject = new NativeBufferedInputStream(assetsStreamObject);
            }
        }
        else if(fileObject.type === Path.FILE_TYPE.DRAWABLE){
            const NativeInputStreamReader = requireClass("java.io.InputStreamReader");
            const NativeBufferedReader = requireClass("java.io.BufferedReader");
            const NativeBufferedInputStream = requireClass("java.io.BufferedInputStream");
            
            var inputStream = Android.getActivity().openRawResource(fileObject.drawableResourceId);
            if(_contentMode === FileStream.ContentMode.TEXT){
                var inputStreamReader = new NativeInputStreamReader(inputStream);
                this.nativeObject = new NativeBufferedReader(inputStreamReader);
            }
            else{
                this.nativeObject = new NativeBufferedInputStream(inputStream);
            }
        }
        else{
            const NativeBufferedReader = requireClass("java.io.BufferedReader");
            const NativeBufferedInputStream = requireClass("java.io.BufferedInputStream");
            const NativeFileInputStream = requireClass("java.io.FileInputStream");
            const NativeFileReader = requireClass("java.io.FileReader");
            
            if(_contentMode === FileStream.ContentMode.TEXT){
                var fileReader = new NativeFileReader(fileObject.nativeObject);
                this.nativeObject = new NativeBufferedReader(fileReader);
            }
            else{
                var fileInputStream = new NativeFileInputStream(fileObject.nativeObject);
                this.nativeObject = new NativeBufferedInputStream(fileInputStream);
            }
        }
    }
    else if(_streamType === FileStream.StreamType.WRITE){
        if(fileObject.type !== Path.FILE_TYPE.FILE){
            throw new Error("FileStream.StreamType.WRITE can be used for only files.");
        }
        const NativeBufferedOutputStream = requireClass("java.io.BufferedOutputStream");
        const NativeFileOutputStream = requireClass("java.io.FileOutputStream");
        const NativeOutputStreamWriter = requireClass("java.io.OutputStreamWriter");
        const NativeBufferedWriter = requireClass("java.io.BufferedWriter");
        
        if(_contentMode === FileStream.ContentMode.TEXT){
            var fileOutputStream = new NativeFileOutputStream(fileObject.nativeObject,false);
            var outputStreamWriter = new NativeOutputStreamWriter(fileOutputStream);
            this.nativeObject = new NativeBufferedWriter(outputStreamWriter);
        }
        else{
            var fileOutputStream = new NativeFileOutputStream(fileObject.nativeObject,true);
            this.nativeObject = new NativeBufferedOutputStream(fileOutputStream);
        }
    }
    else {throw new Error("Mode must be FileStream.StreamType")}
    
    
    // For prevent crashing, we should keep stream status.
    var _closed = false;
    Object.defineProperties(this, {
        'mode' : {
            value: _streamType,
            enumerable: true
        },
        'contentMode' : {
            value: _contentMode,
            enumerable: true
        },
        'isReadable': {
            get: function(){
                return this.nativeObject && _closed && (_streamType === FileStream.StreamType.READ);
            },
            enumerable: true
        },
        'isWritable': {
            get: function(){
                return this.nativeObject && _closed && (_streamType !== FileStream.StreamType.READ);
            },
            enumerable: true
        },
        'name': {
            value: fileObject.name,
            enumerable: true
        },
        'path': {
            value: fileObject.path,
            enumerable: true
        },
        'close' : {
            value: function(){
                !_closed && ( this.nativeObject.close() );
            },
            enumerable: true
        },
        'readBlob' : {
            value: function(){
                if(_closed || (_streamType !== FileStream.StreamType.READ)){
                    throw new Error("FileStream already closed or streamType is not READ");
                }
                var fileContent = this.readToEnd();
                if(_contentMode === FileStream.ContentMode.BINARY){
                    return fileContent;
                }
                else{
                    const NativeString = requireClass("java.lang.String");
                    return new Blob(new NativeString(fileContent).getBytes(), {type:"file"});
                }
            },
            enumerable: true
        },
        'readToEnd' : {
            value: function(){
                if(_closed || (_streamType !== FileStream.StreamType.READ)){
                    throw new Error("FileStream already closed or streamType is not READ");
                }
                if(_contentMode === FileStream.ContentMode.TEXT){
                    var readLine = this.nativeObject.readLine();
                    var fileContent = "";
                    while (readLine != null) {
                        fileContent += readLine + '\n';
                        readLine = this.nativeObject.readLine();
                    }
                    return fileContent;
                }
                else{
                    var input = null;
                    var bytes = [];
                    while((input = this.nativeObject.read()) !== -1){
                        bytes.push(input);
                    }
                    return new Blob(bytes, {type:"file"});
                }
            },
            enumerable: true
        },
        'write' : {
            value: function(data){
                if(_closed || (_streamType === FileStream.StreamType.READ)){
                    throw new Error("FileStream already closed or streamType is READ");
                }
                var dataToWrite;
                if(_contentMode === FileStream.ContentMode.BINARY){
                    if(!(data instanceof Blob)){
                        throw new Error("Parameter must be Blob")
                    }
                    dataToWrite = data.nativeObject.toByteArray();
                }
                else{
                    if(!TypeUtil.isString(data)){
                        throw new Error("Parameter must be string")
                    }
                    dataToWrite = data;
                }
                this.nativeObject.write(dataToWrite);
            },
            enumerable: true
        }
    });
}

Object.defineProperties(FileStream, {
    'StreamType': {
        value: {},
        enumerable: true
    },
    'ContentMode': {
        value: {},
        enumerable: true
    }
});

Object.defineProperties(FileStream.StreamType, {
    'APPEND': {
        value: 0,
        enumerable: true
    },
    'READ': {
        value: 1,
        enumerable: true
    },
    'WRITE': {
        value: 2,
        enumerable: true
    },
    'hasValue': {
        value: function(valueToFind){
            return Object.keys(FileStream.StreamType).some(function(element, index, array){
                return FileStream.StreamType[element] === valueToFind;
            });
            
        },
        enumerable: false
    }
});

Object.defineProperties(FileStream.ContentMode, {
    'TEXT': {
        value: 0,
        enumerable: true
    },
    'BINARY': {
        value: 1,
        enumerable: true
    },
    'hasValue': {
        value: function(valueToFind){
            return Object.keys(FileStream.ContentMode).some(function(element, index, array){
                return FileStream.ContentMode[element] === valueToFind;
            });
        },
        enumerable: false
    }
});

module.exports = FileStream;