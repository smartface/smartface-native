/**
 * @class IO.File
 * @since 0.1
 *
 * An interface of accessing operating system's filesystem. 
 * 'path' is required property for construction the File object.
 * 
 *     @example
 *     const File = require('sf-core/io/file');
 *     const Path = require('sf-core/io/path');
 *     var myImage = new File({
 *         path: 'images://smartface.png'
 *     });
 *     if(myImage.exists){
 *         myImage.copy(Path.DataDirectory + '/myImage.png');
 *     }
 *     
 */
function File(params) {
    
    /**
     * Gets creation date of the File instance. If the file doesn't exist returns -1.
     *
     * @property {Number} creationDate
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.creationDate;
    
    /**
     * Check whether file or directory exists in given path. 
     *
     * @property {Boolean} exists
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.exists;
    
    /**
     * Gets the extension of the file. 
     *
     * @property {String} extension
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.extension;
    
    /**
     * Check whether the File instance is a directory. 
     * 
     * @property {Boolean} isDirectory
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.isDirectory;
    
    /**
     * Check whether the File instance is a file. 
     * 
     * @property {Boolean} isFile
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.isFile;
    
    /**
     * Gets last modified time of the File. It measured in milliseconds. If file doesn't exists returns -1.
     * 
     * @property {Number} modifiedDate
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.modifiedDate;
    
    /**
     * Gets the name of the file or directory.
     * 
     * @property {String} name
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.name;
    
    /**
     * Gets the parent directory of the file or directory. If the file or parent of the file doesn't exist returns null. 
     * 
     * @property {IO.File} parent
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.parent;
    
    /**
     * Gets the path given on constructor. This property required for creating the File instance. 
     * 
     * @property {String} path
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.path;
    
    /**
     * Gets the size of the file or directory. If file or directory doesn't exists returns -1. 
     * 
     * @property {Number} size
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.size;
    
    /**
     * Check whether the File object can writable.
     * 
     * @property {Boolean} writable
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.writable;
    
    /**
     * Copy file or directory to given path.
     * 
     * @param {String} destination
     * @return {Boolean}
     * @method copy
     * @android
     * @ios
     * @since 0.1
     */
    this.copy = function(destination){};
    
    /**
     * Creates the directory named by this pathname.
     * 
     * @param {Boolean} [withParents = false] If true, directory will created with any necessary parent directories.
     * @return {Boolean}
     * @method createDirectory
     * @android
     * @ios
     * @since 0.1
     */
    this.createDirectory = function(withParents){};
    
    /**
     * Creates the file named by this pathname.
     * 
     * @param {Boolean} [createParents = false] If true, file will created with any necessary parent directories.
     * @return {Boolean}
     * @method createFile
     * @android
     * @ios
     * @since 0.1
     */
    this.createFile = function(createParents){};
    
    /**
     * Deletes the file or directory.
     * 
     * @param {Boolean} [withChilds = false] If true and the File object is a directory, all child files and directories will be removed.
     * @return {Boolean}
     * @method remove
     * @android
     * @ios
     * @since 0.1
     */
    this.remove = function(withChilds){};
    
    /**
     * Returns the list of file and directories that exist in this director. If directory not exists or path is not refer a directory returns null. 
     * 
     * @return {IO.File[]}
     * @method getFiles
     * @android
     * @ios
     * @since 0.1
     */
    this.getFiles = function(){};
    
    /**
     * Move the current file or directory to destination path.
     * 
     * @param {String} destination
     * @return {Boolean}
     * @method move
     * @android
     * @ios
     * @since 0.1
     */
    this.move = function(destination){};
    
    /**
     * Open a IO.FileStream object from this object. If path is refer a directory returns null. 
     * 
     * @param {IO.FileStream.StreamType} mode
     * @return {IO.FileStream}
     * @method openStream
     * @android
     * @ios
     * @since 0.1
     */
    this.openStream = function(mode){};
    
    /**
     * Rename the current file or directory to given name.
     * 
     * @param {String} newName
     * @return {Boolean}
     * @method rename
     * @android
     * @ios
     * @since 0.1
     */
    this.rename = function(newName){};
}

module.exports = File;