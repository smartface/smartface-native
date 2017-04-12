const File                  = require("sf-core/io/file");
const Path                  = require("sf-core/io/path");
const TypeUtil              = require("sf-core/util/type");
const Blob                  = require('sf-core/blob');

function FileStream(params) {
    const NativeBufferedReader = requireClass("java.io.BufferedReader");
    const NativeBufferedWriter = requireClass("java.io.BufferedWriter");
    const NativeFileWriter = requireClass("java.io.FileWriter");
    const NativeFileReader = requireClass("java.io.FileReader");
    const NativeInputStreamReader = requireClass("java.io.InputStreamReader");
    const NativeByteArrayOutputStream = requireClass("java.io.ByteArrayOutputStream");
    const NativeBitmap   = requireClass('android.graphics.Bitmap');
    const NativeByteArrayInputStream = requireClass('java.io.ByteArrayInputStream');
            
    var fileObject;
    var streamObject;
    var intermediaryStreamObjects = [];
    var _mode = params.mode;
    
    if(TypeUtil.isNumeric(params.mode)){
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
    
    if(_mode === FileStream.StreamType.APPEND){
        if(fileObject.type !== Path.FILE_TYPE.FILE){
            throw new Error("FileStream.StreamType.APPEND can be used for only files.");
        }
        streamObject = new NativeFileWriter(fileObject.nativeObject,true);
        this.nativeObject = new NativeBufferedWriter(streamObject);
        
    }
    else if(_mode === FileStream.StreamType.READ){
        if(fileObject.nativeObject){
            if(fileObject.type === Path.FILE_TYPE.ASSET){
                var assetsStreamObject = Android.getActivity().getAssets().open(fileObject.nativeObject);
                streamObject = new NativeInputStreamReader(assetsStreamObject);
                intermediaryStreamObjects.push(assetsStreamObject);
            }
            else if(fileObject.type === Path.FILE_TYPE.DRAWABLE){
                var bitmapStreamObject = new NativeByteArrayOutputStream();
                fileObject.nativeObject.compress(NativeBitmap.CompressFormat.PNG, 100, bitmapStreamObject);
                var imageInByte = bitmapStreamObject.toByteArray();
                var bitmapInputStream = new NativeByteArrayInputStream(imageInByte);
                streamObject = new NativeInputStreamReader(bitmapInputStream);
                intermediaryStreamObjects.push(bitmapStreamObject);
                intermediaryStreamObjects.push(bitmapInputStream);
            }
            else{
                streamObject = new NativeFileReader(fileObject.nativeObject);
            }
            this.nativeObject = new NativeBufferedReader(streamObject);
        }
    }
    else if(_mode === FileStream.StreamType.WRITE){
        if(fileObject.type !== Path.FILE_TYPE.FILE){
            throw new Error("FileStream.StreamType.WRITE can be used for only files.");
        }
        streamObject = new NativeFileWriter(fileObject.nativeObject,false);
        this.nativeObject = new NativeBufferedWriter(streamObject);
    }
    else {throw new Error("Mode must be FileStream.StreamType")}
    
    
    // For prevent crashing, we should keep stream status.
    var _closed = false;
    
    Object.defineProperties(this, {
        'mode' : {
            value: _mode,
            writable: false,
            enumarable: true
        },
        'isReadable': {
            get: function(){
                return this.nativeObject && _closed && (_mode === FileStream.StreamType.READ);
            },
            enumerable: true
        },
        'isWritable': {
            get: function(){
                return this.nativeObject && _closed && (_mode !== FileStream.StreamType.READ);
            },
            enumerable: true
        },
        'name': {
            value: fileObject.name,
            writable: false,
            enumerable: true
        },
        'path': {
            value: fileObject.path,
            writable: false,
            enumerable: true
        },
        'close' : {
            value: function(){
                !_closed && ( this.nativeObject.close() || streamObject.close() );
            },
            enumarable: true
        },
        'readBlob' : {
            value: function(param){
                const NativeString = requireClass('java.lang.String');
                var fileContent = this.readToEnd();
                var byteArray = new NativeString(fileContent).getBytes();
                // var byteArray = fileContent.getBytes();
                return new Blob(byteArray, {type:"file"});
            },
            enumarable: true
        },
        'readToEnd' : {
            value: function(){
                if(!_closed && _mode === FileStream.StreamType.READ){
                    var inputLine = this.nativeObject.readLine();
                    var fileContent = "";
                    while(inputLine){
                        fileContent += inputLine;
                        inputLine = this.nativeObject.readLine();
                    }
                    return fileContent;
                }
                return null;
            },
            enumarable: true
        },
        'write' : {
            value: function(data){
                if(!_closed && (_mode !== FileStream.StreamType.READ)){
                    this.nativeObject.write(data);
                }
            },
            enumarable: true
        }
    });
}

FileStream.StreamType = {};

Object.defineProperties(FileStream.StreamType, {
    'APPEND': {
        value: 0,
        writable: false
    },
    'READ': {
        value: 1,
        writable: false
    },
    'WRITE': {
        value: 2,
        writable: false
    }
});

module.exports = FileStream;