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
            writable: false
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
            writable: false
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
            writable: false
        },
        'isDirectory': {
            get: function(){
                return (resolvedPath.type == Path.FILE_TYPE.FILE ? this.nativeObject.isDirectory() : false);
                
            },
            writable: false
        },
        'isFile': {
            get: function(){
                return (resolvedPath.type == Path.FILE_TYPE.FILE ? this.nativeObject.isFile() : true);
            },
            writable: false
        },
        'modifiedDate': {
            get: function(){
                return (resolvedPath.type == Path.FILE_TYPE.FILE ? this.nativeObject.lastModified() : -1);
            },
            writable: false
        },
        'name': {
            get: function(){
                return params.path.substring(params.path.lastIndexOf("/")+1,params.path.length());
            },
            writable: false
        },
        'parent': {
            get: function(){
                return (resolvedPath.type == Path.FILE_TYPE.FILE ? new File({ path: this.nativeObject.getParent() }) : null);
            },
            writable: false
        },
        'path': {
            value: _path,
            writable: false
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
            writable: false
        },
        'writable': {
            get: function(){
                return (resolvedPath.type == Path.FILE_TYPE.FILE ? this.nativeObject.canWrite() : false);
            },
            writable: false
        }
    });
    
    
    

    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @param {IO.File|String} [destination] // @todo add description
     * @return {Boolean} // @todo add description
     * @method copy
     * @since 0.1
     */
    this.copy = function(destination){};
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @param {Boolean} [withParents = false]
     * @return {Boolean} // @todo add description
     * @method createDirectory
     * @since 0.1
     */
    this.createDirectory = function(withParents){};
    
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