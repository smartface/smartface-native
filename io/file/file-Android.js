const Path                  = require("sf-core/io/path");
const FileStream            = require("sf-core/io/filestream");
const TypeUtil              = require("sf-core/util/type");
const AndroidConfig         = require("sf-core/util/Android/androidconfig");

const NativeFile            = requireClass('java.io.File');
const NativeBitmapFactory   = requireClass('android.graphics.BitmapFactory');

var nativeAssetsList;

function File(params) {
    if(!TypeUtil.isString(params.path)){
        throw new Error("File path must be string");
    }
    
    this.nativeObject;
    var resolvedPath = Path.resolve(params.path);
    this.type = resolvedPath.type;
    this.fullPath = resolvedPath.fullPath;
    // If file is Drawable we need to use drawableResourceId on notification etc.
    this.drawableResourceId = -1;
    
    switch(resolvedPath.type){
        case Path.FILE_TYPE.ASSET:
            // this.nativeObject will be String for performance
            // Checking assets list loaded.
            if(!nativeAssetsList){
                nativeAssetsList = Android.getActivity().getAssets().list("");
            }

            if(nativeAssetsList.indexOf(resolvedPath.name) !== -1){
                this.nativeObject = resolvedPath.name;
            }
            else{
                this.nativeObject = null;
            }
            break;
        case Path.FILE_TYPE.DRAWABLE:
            // this.nativeObject will be Bitmap
            var resources = Android.getActivity().getResources();
            this.drawableResourceId = resources.getIdentifier(resolvedPath.name, "drawable", AndroidConfig.packageName);
            this.nativeObject = this.drawableResourceId !== 0 ? NativeBitmapFactory.decodeResource(resources, this.drawableResourceId) : null;
            break;
        case Path.FILE_TYPE.RAU_ASSETS:
        case Path.FILE_TYPE.RAU_DRAWABLE:
        case Path.FILE_TYPE.EMULATOR_ASSETS:
        case Path.FILE_TYPE.EMULATOR_DRAWABLE:
        case Path.FILE_TYPE.FILE:
            // this.nativeObject will be File
            this.nativeObject = resolvedPath.fullPath ? new NativeFile(resolvedPath.fullPath) : null;
            break;
        
    }

    Object.defineProperties(this, {
        'creationDate': {
            get: function(){
                return resolvedPath.type === Path.FILE_TYPE.FILE ? this.nativeObject.lastModified() : -1 ;
            },
            enumerable: true
        },
        'exists': {
            get: function(){
                if(resolvedPath.type === Path.FILE_TYPE.DRAWABLE || resolvedPath.type === Path.FILE_TYPE.ASSET){
                    return this.nativeObject ? true: false;
                }
                else{
                    return this.nativeObject && this.nativeObject.exists();
                }
            },
            enumerable: true
        },
        'extension': {
            get: function(){
                var fileName = this.name;
                if (fileName.lastIndexOf(".") !== -1) {
                    return fileName.substring(fileName.lastIndexOf(".")+1, fileName.length);
                } else {
                    return fileName;
                }
            },
            enumerable: true
        },
        'isDirectory': {
            get: function(){
                return (this.nativeObject ? (resolvedPath.type === Path.FILE_TYPE.FILE ? this.nativeObject.isDirectory() : false) : false);
            },
            enumerable: true
        },
        'isFile': {
            get: function(){
                return (this.nativeObject ? (resolvedPath.type === Path.FILE_TYPE.FILE ? this.nativeObject.isFile() : true) : false);
            },
            enumerable: true
        },
        'modifiedDate': {
            get: function(){
                return (resolvedPath.type === Path.FILE_TYPE.FILE && this.nativeObject ? this.nativeObject.lastModified() : -1);
            },
            enumerable: true
        },
        'name': {
            get: function(){
                return resolvedPath.name;
            },
            enumerable: true
        },
        'parent': {
            get: function(){
                return (resolvedPath.type === Path.FILE_TYPE.FILE && this.nativeObject ? new File({ path: this.nativeObject.getParent() }) : null);
            },
            enumerable: true
        },
        'path': {
            value: resolvedPath.path,
            writable: false,
            enumerable: true
        },
        'size': {
            get: function(){
                if(this.nativeObject){
                    switch (resolvedPath.type){
                        case Path.FILE_TYPE.ASSET:
                            var assetsInputStream = Android.getActivity().getAssets().open(this.nativeObject);
                            var size = assetsInputStream.available();
                            assetsInputStream.close();
                            return size;
                        case Path.FILE_TYPE.DRAWABLE:
                            return this.nativeObject.getByteCount();
                        case Path.FILE_TYPE.FILE:
                        case Path.FILE_TYPE.EMULATOR_ASSETS:
                        case Path.FILE_TYPE.EMULATOR_DRAWABLE:
                        case Path.FILE_TYPE.RAU_ASSETS:
                        case Path.FILE_TYPE.RAU_DRAWABLE:
                            return this.nativeObject.length();
                    }
                }
                return -1;
            },
            enumerable: true
        },
        'writable': {
            get: function(){
                return (resolvedPath.type === Path.FILE_TYPE.FILE && this.nativeObject ? this.nativeObject.canWrite() : false);
            },
            enumerable: true
        },
        'copy': {
            value: function(destination){
                if(this.nativeObject){
                    var destinationFile = new File({path: destination});
                    if(destinationFile.type === Path.FILE_TYPE.FILE){
                        var destinationFileStream;
                        if(resolvedPath.type === Path.FILE_TYPE.FILE){
                            var destinationConfigured;
                            if(this.isDirectory){
                                destinationConfigured = destinationFile.isDirectory || (destinationFile.exists ? false : destinationFile.createDirectory(true));
                                return destinationConfigured && copyDirectory(this, destinationFile);
                            }
                            else if(this.isFile){
                                destinationConfigured = false;
                                if(destinationFile.exists && destinationFile.isDirectory){
                                    destinationFile = new File({path: destinationFile.path + "/" + this.name});
                                    destinationConfigured = destinationFile.createFile(true);
                                }
                                else if(!destinationFile.exists){
                                    destinationConfigured = destinationFile.createFile(true);
                                }
                                return destinationConfigured && copyFile(this, destinationFile);
                            }
                        }
                        else if(resolvedPath.type === Path.FILE_TYPE.ASSET){
                            if (destinationFile.exists && destinationFile.isDirectory){
                                destinationFile = new File({path: destination + "/" + this.name});
                            }
                            if(destinationFile.createFile(true)){
                                const NativeFileOutputStream = requireClass("java.io.FileOutputStream");
                                const NativeBufferedInputStream = requireClass('java.io.BufferedInputStream');
                                var assetsInputStream = Android.getActivity().getAssets().open(this.nativeObject);
                                var assetsBufferedInputStream = new NativeBufferedInputStream(assetsInputStream);
                                destinationFileStream = new NativeFileOutputStream(destinationFile.nativeObject, false);
                                copyStream(assetsBufferedInputStream,destinationFileStream);
                                destinationFileStream.flush();
                                assetsBufferedInputStream.close();
                                assetsInputStream.close();
                                destinationFileStream.close();
                                return true;
                            }
                            
                        }
                        else if(resolvedPath.type === Path.FILE_TYPE.DRAWABLE){
                            if (destinationFile.exists && destinationFile.isDirectory){
                                destinationFile = new File({path: destination + "/" + this.name + ".png"});
                            }
                            if (destinationFile.createFile(true)) {
                                const NativeByteArrayOutputStream = requireClass('java.io.ByteArrayOutputStream');
                                const NativeBufferedOutputStream = requireClass('java.io.BufferedOutputStream');
                                const NativeFileOutputStream = requireClass("java.io.FileOutputStream");
                                const NativeBitmap = requireClass('android.graphics.Bitmap');
                                
                                var drawableByteArrayStream = new NativeByteArrayOutputStream();
                                this.nativeObject.compress(NativeBitmap.CompressFormat.PNG, 0 /*ignored for PNG*/, drawableByteArrayStream);
                                var bitmapdata = drawableByteArrayStream.toByteArray();
        
                                var destinationFileOutputStream = new NativeFileOutputStream(destinationFile.nativeObject, false);
                                destinationFileStream = new NativeBufferedOutputStream(destinationFileOutputStream);
                                destinationFileStream.write(bitmapdata);
                                destinationFileStream.flush();
                                destinationFileStream.close();
                                drawableByteArrayStream.close();
                                return true;
                            }
                        }
                        else{
                            if (destinationFile.exists && destinationFile.isDirectory){
                                var destinationFileName = destination + "/" + this.name;
                                if(resolvedPath.type === Path.FILE_TYPE.EMULATOR_DRAWABLE || resolvedPath.type === Path.FILE_TYPE.RAU_DRAWABLE)
                                    destinationFileName += ".png";
                                destinationFile = new File({path: destinationFileName});
                                
                            }
                            if (destinationFile.createFile(true)) {
                                return copyFile(this, destinationFile);
                            }
                        }
                    }
                }
                return false;
            },
            enumerable: true
        },
        'createFile' : {
            value: function(createParents){
                if(resolvedPath.type === Path.FILE_TYPE.FILE){
                    if(this.nativeObject.exists){
                        this.remove(true);
                    }
                    if (createParents) {
                        var fileParentPath = resolvedPath.fullPath.substring(0, resolvedPath.fullPath.lastIndexOf("/"));
                        var fileParent = new NativeFile(fileParentPath);
                        if (!fileParent.exists()) {
                            fileParent.mkdirs();
                        }
                    }
                    return this.nativeObject.createNewFile();
                }
                return false;
            },
            enumarable: true
        },
        'createDirectory' : {
            value: function(createParents){
                if(resolvedPath.type === Path.FILE_TYPE.FILE){
                    return createParents ? this.nativeObject.mkdirs() : this.nativeObject.mkdir();
                }
                return false;
            },
            enumarable: true
        },
        'remove' : {
            value: function(withChilds){
                return (resolvedPath.type === Path.FILE_TYPE.FILE) && removeFile(this,withChilds);
            },
            enumarable: true
        },
        'getFiles': {
            value: function(){
                if(resolvedPath.type === Path.FILE_TYPE.FILE && this.nativeObject && this.exists){
                    var allJSFiles = [];
                    var allNativeFiles = this.nativeObject.listFiles();
                    allNativeFiles.foreach(function(tmpFile){
                        allJSFiles.push(new File({path: tmpFile.getAbsolutePath()}));
                    });
                    return allJSFiles;
                }
                return null;
            },
            enumarable: true
        },
        'move' : {
            value: function(destination){
                if(resolvedPath.type === Path.FILE_TYPE.FILE){
                    var destinationFile = new File({path: destination});
                    if(destinationFile === Path.FILE_TYPE.FILE){
                        if(this.isFile || this.isDirectory){
                            if(destinationFile.exists){
                                if(destinationFile.isDirectory){
                                    // Move to folder
                                    destinationFile = new File({path: destinationFile.path + "/" +this.name});
                                }
                                else{
                                    // MOVE TO FILE
                                    destinationFile.remove();
                                }
                            }
                        }
                        if(this.nativeObject.renameTo(destinationFile.nativeObject)){
                            resolvedPath.path = destinationFile.path;
                            resolvedPath.fullPath = destinationFile.path;
                            return true;
                        }
                    }
                }
                return false;
            },
            enumarable: true
        },
        'openStream': { 
            value: function(mode){
                return new FileStream({source: this, mode: mode})
            },
            enumarable: true
        },
        'rename': {
            value: function(newName){
                if(resolvedPath.type === Path.FILE_TYPE.FILE){
                    var newFileFullPath = this.path.substring(0, this.path.lastIndexOf("/")+1) + newName;
                    var newFile = new NativeFile(newFileFullPath);
                    if (this.nativeObject.renameTo(newFile)) {
                        resolvedPath.path = newFileFullPath;
                        resolvedPath.fullPath = newFileFullPath;
                        return true;
                    }
                }
                return  false;
            },
            enumarable: true
        }
    });
    
    function copyStream(sourceFileStream, destinationFileStream) {
        var buffer = [];
        buffer.length = 1024;
        var len = sourceFileStream.read(buffer);
        while(len > 0){
            destinationFileStream.write(buffer, 0, len);
            len = sourceFileStream.read(buffer);
        }
    }
    
    function copyFile(sourceFile, destinationFile){
        if(sourceFile.isFile && destinationFile.isFile){
            const NativeFileInputStream = requireClass("java.io.FileInputStream");
            const NativeFileOutputStream = requireClass("java.io.FileOutputStream");
            var sourceFileStream = new NativeFileInputStream(sourceFile.nativeObject);
            var destinationFileStream = new NativeFileOutputStream(destinationFile.nativeObject,false);
            copyStream(sourceFileStream,destinationFileStream);
            sourceFileStream.close();
            destinationFileStream.close();
            return true;
        }
        return false;
    }
    
    function copyDirectory(sourceDirectory, destinationDirectory){
        var sourceFiles = sourceDirectory.getFiles();
        sourceFiles.foreach(function(tmpFile){
            if(tmpFile.isFile){
                var destinationFile = new File({path: destinationDirectory.path + "/" + tmpFile.name});
                if(destinationFile.createFile(true)){
                    copyFile(tmpFile,destinationFile);
                }
            }
            else if(tmpFile.isDirectory){
                var newDirectory = new File({path: tmpFile.path + "/" + tmpFile.name});
                if(newDirectory.createDirectory(true)){
                    copyDirectory(tmpFile,newDirectory);
                }
            }
        });
        return true;
    }
    
    function removeFile(fileToRemove, withChilds){
        if (fileToRemove.exists) {
            if(fileToRemove.isDirectory){
                if(withChilds){
                    var allFiles = fileToRemove.getFiles();
                    if(allFiles){
                        allFiles.foreach(function(tmpFile){
                            removeFile(tmpFile, withChilds);
                        });
                    }
                    return removeFile(fileToRemove,false);
                }
            }
            return fileToRemove.nativeObject.delete();
        }
    }
}

module.exports = File;