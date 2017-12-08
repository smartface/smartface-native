/*globals requireClass*/
const Path                  = require("../path");
const FileStream            = require("../filestream");
const TypeUtil              = require("../../util/type");
const AndroidConfig         = require("../../util/Android/androidconfig");
const activity              = AndroidConfig.activity;

const NativeFile            = requireClass('java.io.File');
const NativeBitmapFactory   = requireClass('android.graphics.BitmapFactory');

var nativeAssetsList;

function File(params) {
    if(!TypeUtil.isString(params.path)){
        throw new Error("File path must be string");
    }
    
    this.resolvedPath = Path.resolve(params.path);
    this.type = this.resolvedPath.type;
    this.fullPath = this.resolvedPath.fullPath;

    switch(this.resolvedPath.type){
        case Path.FILE_TYPE.ASSET:
            // this.nativeObject will be String for performance
            // Checking assets list loaded.
            if(!nativeAssetsList){
                nativeAssetsList = activity.getAssets().list("");
                if(nativeAssetsList)
                    nativeAssetsList = toJSArray(nativeAssetsList);
            }

            nativeAssetsList.forEach(function(assetName) {
                if (this.resolvedPath.name === assetName) {
                    this.nativeObject = this.resolvedPath.name;
                }
            }.bind(this));
            break;
        case Path.FILE_TYPE.DRAWABLE:
            // this.nativeObject will be Bitmap
            var resources = activity.getResources();
            this.drawableResourceId = resources.getIdentifier(this.resolvedPath.name, "drawable", AndroidConfig.packageName);
            this.nativeObject = this.drawableResourceId !== 0 ? NativeBitmapFactory.decodeResource(resources, this.drawableResourceId) : null;
            break;
        case Path.FILE_TYPE.RAU_ASSETS:
        case Path.FILE_TYPE.RAU_DRAWABLE:
        case Path.FILE_TYPE.EMULATOR_ASSETS:
        case Path.FILE_TYPE.EMULATOR_DRAWABLE:
        case Path.FILE_TYPE.FILE:
            // this.nativeObject will be File
            this.nativeObject = this.resolvedPath.fullPath ? new NativeFile(this.resolvedPath.fullPath) : null;
            break;
        
    }
}

File.prototype = {
    // If file is Drawable we need to use drawableResourceId on notification etc.
    drawableResourceId: -1,
    nativeObject: null,
    get creationDate(){
        return this.resolvedPath.type === Path.FILE_TYPE.FILE ? this.nativeObject.lastModified() : -1 ;
    },
    get exists(){
        if(this.resolvedPath.type === Path.FILE_TYPE.DRAWABLE || this.resolvedPath.type === Path.FILE_TYPE.ASSET){
            return this.nativeObject ? true : false;
        }
        else{
            return this.nativeObject && this.nativeObject.exists();
        }
    },
    get extension(){
        var fileName = this.name;
        if (fileName.lastIndexOf(".") !== -1) {
            return fileName.substring(fileName.lastIndexOf(".")+1, fileName.length);
        } else {
            return fileName;
        }
    },
    get isDirectory(){
        return (this.nativeObject ? (this.resolvedPath.type === Path.FILE_TYPE.FILE ? this.nativeObject.isDirectory() : false) : false);
    },
    get isFile(){
        return (this.nativeObject ? (this.resolvedPath.type === Path.FILE_TYPE.FILE ? this.nativeObject.isFile() : true) : false);
    },
    get modifiedDate(){
        return (this.resolvedPath.type === Path.FILE_TYPE.FILE && this.nativeObject ? this.nativeObject.lastModified() : -1);
    },
    get name(){
        return this.resolvedPath.name;
    },
    get parent(){
        return (this.resolvedPath.type === Path.FILE_TYPE.FILE && this.nativeObject ? new File({ path: this.nativeObject.getParent().getAbsolutePath() }) : null);
    },
    get path() {
        return this.resolvedPath.path;
    },
    get size(){
        if(this.nativeObject){
            switch (this.resolvedPath.type){
                case Path.FILE_TYPE.ASSET:
                    var assetsInputStream = activity.getAssets().open(this.nativeObject);
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
    get writable(){
        return (this.resolvedPath.type === Path.FILE_TYPE.FILE && this.nativeObject ? this.nativeObject.canWrite() : false);
    }
};

File.prototype.copy = function(destination){
    if(this.nativeObject){
        var destinationFile = new File({path: destination});
        if(destinationFile.type === Path.FILE_TYPE.FILE){
            var destinationFileStream;
            if(this.resolvedPath.type === Path.FILE_TYPE.FILE){
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
            else if(this.resolvedPath.type === Path.FILE_TYPE.ASSET){
                if (destinationFile.exists && destinationFile.isDirectory){
                    destinationFile = new File({path: destination + "/" + this.name});
                }
                if(destinationFile.createFile(true)){
                    const NativeFileOutputStream = requireClass("java.io.FileOutputStream");
                    const NativeBufferedInputStream = requireClass('java.io.BufferedInputStream');
                    var assetsInputStream = activity.getAssets().open(this.nativeObject);
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
            else if(this.resolvedPath.type === Path.FILE_TYPE.DRAWABLE){
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
                    if(this.resolvedPath.type === Path.FILE_TYPE.EMULATOR_DRAWABLE || this.resolvedPath.type === Path.FILE_TYPE.RAU_DRAWABLE)
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
};

File.prototype.createFile = function(createParents){
    if(this.resolvedPath.type === Path.FILE_TYPE.FILE){
        if(this.nativeObject.exists()){
            this.remove(true);
        }
        if (createParents) {
            var fileParentPath = this.resolvedPath.fullPath.substring(0, this.resolvedPath.fullPath.lastIndexOf("/"));
            var fileParent = new NativeFile(fileParentPath);
            if (!fileParent.exists()) {
                fileParent.mkdirs();
            }
        }
        return this.nativeObject.createNewFile();
    }
    return false;
};

File.prototype.createDirectory = function(createParents){
    if(this.resolvedPath.type === Path.FILE_TYPE.FILE){
        return createParents ? this.nativeObject.mkdirs() : this.nativeObject.mkdir();
    }
    return false;
};

File.prototype.remove = function(withChilds){
    return (this.resolvedPath.type === Path.FILE_TYPE.FILE) && removeFile(this,withChilds);
};

File.prototype.getFiles = function(){
    if(this.resolvedPath.type === Path.FILE_TYPE.FILE && this.nativeObject && this.exists){
        var allJSFiles = [];
        var allNativeFiles = this.nativeObject.listFiles();
        allNativeFiles.foreach(function(tmpFile){
            allJSFiles.push(new File({path: tmpFile.getAbsolutePath()}));
        });
        return allJSFiles;
    }
    return null;
};

File.prototype.move = function(destination){
    if(this.resolvedPath.type === Path.FILE_TYPE.FILE){
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
                this.resolvedPath.path = destinationFile.path;
                this.resolvedPath.fullPath = destinationFile.path;
                return true;
            }
        }
    }
    return false;
}

File.prototype.openStream = function(streamType, contentMode) {
    return new FileStream({source: this, streamType: streamType, contentMode: contentMode});
};

File.prototype.rename = function(newName) {
    if(this.resolvedPath.type === Path.FILE_TYPE.FILE){
        var newFileFullPath = this.path.substring(0, this.path.lastIndexOf("/")+1) + newName;
        var newFile = new NativeFile(newFileFullPath);
        if (this.nativeObject.renameTo(newFile)) {
            this.resolvedPath.path = newFileFullPath;
            this.resolvedPath.fullPath = newFileFullPath;
            return true;
        }
    }
    return  false;
};

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

function copyStream(sourceFileStream, destinationFileStream) {
    var buffer = [];
    buffer.length = 1024;
    var len = sourceFileStream.read(array(buffer, "byte"));
    while(len > 0){
        destinationFileStream.write(array(buffer, "byte"), 0, len);
        len = sourceFileStream.read(array(buffer, "byte"));
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

module.exports = File;