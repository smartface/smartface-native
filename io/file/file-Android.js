const Path                  = require("nf-core/io/path");
const TypeUtil              = require("nf-core/util/type");
const AndroidConfig         = require("nf-core/util/Android/androidconfig");

const NativeFile            = requireClass('java.io.File');
const NativeBitmapFactory   = requireClass('android.graphics.BitmapFactory');

function File(params) {
    if(!TypeUtil.isString(params.path)){
        throw "File path must be string";
    }
    
    this.nativeObject;
    
    var resolvedPath = Path.resolve(params.path);
    switch(resolvedPath.type){
        case Path.FILE_TYPE.ASSET:
                // this.nativeObject is AssetFileDescriptor
                this.nativeObject = Android.getActivity().getAssets().openFd(resolvedPath.name);
            break;
        case Path.FILE_TYPE.DRAWABLE:
                // this.nativeObject is Bitmap
                var resources = Android.getActivity().getResources();
                var drawableResourceId = resources.getIdentifier(resolvedPath.name, "drawable", AndroidConfig.packageName);
                if(drawableResourceId != 0){
                    this.nativeObject = NativeBitmapFactory.decodeResource(resources, drawableResourceId);
                }
                else{
                    this.nativeObject = null;
                }
            break;
        case Path.FILE_TYPE.RAU_ASSETS:
        case Path.FILE_TYPE.RAU_DRAWABLE:
        case Path.FILE_TYPE.EMULATOR_ASSETS:
        case Path.FILE_TYPE.EMULATOR_DRAWABLE:
        case Path.FILE_TYPE.FILE: 
            this.nativeObject = new NativeFile(params.path);
            break;
        
    }

    var _path = params.path;
    Object.defineProperties(Path, {
        'creationDate': {
            get: function(){
                resolvedPath.type == Path.FILE_TYPE.FILE ? this.nativeObject.lastModified() : -1 ;
            },
            writable: false,
            enumerable: true
        },
        'exists': {
            get: function(){
                if(resolvedPath.type == Path.FILE_TYPE.DRAWABLE || resolvedPath.type == Path.FILE_TYPE.ASSET){
                    return this.nativeObject ? true: false;
                }
                else{
                    this.nativeObject.exists();
                }
            },
            writable: false,
            enumerable: true
        },
        'extension': {
            get: function(){
                var fileName = this.name;
                if (fileName.lastIndexOf(".") != -1) {
                    return fileName.substring(fileName.lastIndexOf(".")+1, fileName.length());
                } else {
                    return "";
                }
            },
            writable: false,
            enumerable: true
        },
        'isDirectory': {
            get: function(){
                return (resolvedPath.type == Path.FILE_TYPE.FILE ? this.nativeObject.isDirectory() : false);
                
            },
            writable: false,
            enumerable: true
        },
        'isFile': {
            get: function(){
                return (resolvedPath.type == Path.FILE_TYPE.FILE ? this.nativeObject.isFile() : true);
            },
            writable: false,
            enumerable: true
        },
        'modifiedDate': {
            get: function(){
                return (resolvedPath.type == Path.FILE_TYPE.FILE ? this.nativeObject.lastModified() : -1);
            },
            writable: false,
            enumerable: true
        },
        'name': {
            get: function(){
                return params.path.substring(params.path.lastIndexOf("/")+1,params.path.length());
            },
            writable: false,
            enumerable: true
        },
        'parent': {
            get: function(){
                return (resolvedPath.type == Path.FILE_TYPE.FILE ? new File({ path: this.nativeObject.getParent() }) : null);
            },
            writable: false,
            enumerable: true
        },
        'path': {
            value: _path,
            writable: false,
            enumerable: true
        },
        'size': {
            get: function(){
                switch (resolvedPath.type){
                    case Path.FILE_TYPE.ASSET:
                        return ( (this.nativeObject != null ? this.nativeObject.getLength() : -1) );
                    case Path.FILE_TYPE.DRAWABLE:
                        return ( (this.nativeObject != null ? this.nativeObject.getByteCount() : -1) );
                    case Path.FILE_TYPE.FILE:
                    case Path.FILE_TYPE.EMULATOR_ASSETS:
                    case Path.FILE_TYPE.EMULATOR_DRAWABLE:
                    case Path.FILE_TYPE.RAU_ASSETS:
                    case Path.FILE_TYPE.RAU_DRAWABLE:
                        return ( (this.nativeObject.exists() ? this.nativeObject.length() : -1) );
                }
                return -1;
            },
            writable: false,
            enumerable: true
        },
        'writable': {
            get: function(){
                return (resolvedPath.type == Path.FILE_TYPE.FILE ? this.nativeObject.canWrite() : false);
            },
            writable: false,
            enumerable: true
        },
        'copy': {
            value: function(destination){
                var destinationFile = new File({path: destination});
                
                if(resolvedPath.type == Path.FILE_TYPE.FILE && this.nativeObject){
                    
                }
                else if(resolvedPath.type == Path.FILE_TYPE.ASSET && this.nativeObject){
                    if (destinationFile.exists && destinationFile.isDirectory){
                        destinationFile = new File({path: destination + this.name});
                    }
                    if(destinationFile.createFile(true)){
                        const NativeFileOutputStream = requireClass("java.io.FileOutputStream");
                        var sourceFileStream = this.nativeObject.createInputStream();
                        var destinationFileStream = new NativeFileOutputStream(destinationFile.nativeObject, false);
                        copyStream(sourceFileStream,destinationFileStream);
                        destinationFileStream.flush();
                        sourceFileStream.close();
                        destinationFileStream.close();
                        return true;
                    }
                    
                }
                else if(resolvedPath.type == Path.FILE_TYPE.DRAWABLE && this.nativeObject){
                    if (destinationFile.exists && destinationFile.isDirectory){
                        destinationFile = new File({path: destination + this.name});
                    }
                    if (destinationFile.createFile(true)) {
                        const NativeByteArrayOutputStream = requireClass('java.io.ByteArrayOutputStream');
                        const NativeBufferedOutputStream = requireClass('java.io.BufferedOutputStream');
                        const NativeFileOutputStream = requireClass("java.io.FileOutputStream");
                        const NativeBitmap = requireClass('android.graphics.Bitmap');
                        
                        var drawableByteArrayStream = new NativeByteArrayOutputStream();
                        this.nativeObject.compress(NativeBitmap.CompressFormat.PNG, 0 /*ignored for PNG*/, drawableByteArrayStream);
                        var bitmapdata = drawableByteArrayStream.toByteArray();

                        var destinationFileOutputStream = new NativeFileOutputStream(destinationFile.nativeObject, false)
                        var destinationFileStream = new NativeBufferedOutputStream(destinationFileOutputStream);
                        destinationFileStream.write(bitmapdata);
                        destinationFileStream.flush();
                        destinationFileStream.close();
                        drawableByteArrayStream.close();
                        return true;
                    }
                }
                else{
                    if (destinationFile.exists && destinationFile.isDirectory){
                        destinationFile = new File({path: destination + this.name});
                    }
                    if (destinationFile.createFile(true)) {
                        const NativeByteArrayOutputStream = requireClass('java.io.ByteArrayOutputStream');
                        const NativeBufferedOutputStream = requireClass('java.io.BufferedOutputStream');
                        const NativeFileOutputStream = requireClass("java.io.FileOutputStream");
                        const NativeBitmap = requireClass('android.graphics.Bitmap');
                        
                        var drawableByteArrayStream = new NativeByteArrayOutputStream();
                        this.nativeObject.compress(NativeBitmap.CompressFormat.PNG, 0 /*ignored for PNG*/, drawableByteArrayStream);
                        var bitmapdata = drawableByteArrayStream.toByteArray();

                        var destinationFileOutputStream = new NativeFileOutputStream(destinationFile.nativeObject, false)
                        var destinationFileStream = new NativeBufferedOutputStream(destinationFileOutputStream);
                        destinationFileStream.write(bitmapdata);
                        destinationFileStream.flush();
                        destinationFileStream.close();
                        drawableByteArrayStream.close();
                        return true;
                    }
                }
                return false;
            },
            writable: false,
            enumerable: true
            
        }
    });
    
    function copyStream(sourceFileStream, destinationFileStream) {
        var buf = new Int8Array(1024);
        var len = 0;
        while ((len = sourceFileStream.read(buf)) > 0) {
            destinationFileStream.write(buf, 0, len);
        }
    }
    function copyFile(sourceFile, destinationFile){
        FileInputStream sourceFileStream = new FileInputStream(sourceFile.getCurrentFile());
        FileOutputStream destinationFileStream = new FileOutputStream(destinationFile.getCurrentFile(),false);
        copyStream(sourceFileStream,destinationFileStream);
        sourceFileStream.close();
        destinationFileStream.close();
    }

    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @param {Boolean} [createParents = false]
     * @return {Boolean} // @todo add description
     * @method createFile
     * @since 0.1
     */
    this.createFile = function(createParents){};
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     * 
     * @param {Boolean} [withChilds = false]
     * @return {Boolean} // @todo add description
     * @method remove
     * @since 0.1
     */
    this.remove = function(withChilds){};
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @return {IO.File[]} // @todo add description
     * @method getFiles
     * @since 0.1
     */
    this.getFiles = function(){};
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @param {IO.File|String} [destination]
     * @return {Boolean} // @todo add description
     * @method move
     * @since 0.1
     */
    this.move = function(destination){};
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @param {IO.FileStream.StreamType} [mode] // @todo add description
     * @return {IO.FileStream} // @todo add description
     * @method openStream
     * @since 0.1
     */
    this.openStream = function(mode){};
    
    this.rename = function(newName){
        if(resolvedPath.type === Path.FILE_TYPE.FILE){
            var newFileFullPath = this.path.substring(0, this.path.lastIndexOf("/")+1) + newName;
            if (this.nativeObject.renameTo(new NativeFile(newFileFullPath))) {
                _path = newFileFullPath;
                return true;
            }
        }
        return  false;
    };
}

module.exports = File;